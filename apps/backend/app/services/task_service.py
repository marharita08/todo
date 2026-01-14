"""
Service for the Task entity.

This module provides the necessary service for the Task entity,
including the task service and the database session.
"""

from datetime import datetime, timezone
from typing import List
from uuid import UUID

from sqlalchemy import and_, asc, desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.task import Task as TaskModel
from app.schemas.task import TaskCreate, TaskUpdate
from app.schemas.task_query import TaskQueryParams


class TaskService:
    """
    Service for the Task entity.
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize the task service.
        """
        self.session = session

    async def get_all(self, params: TaskQueryParams) -> List[TaskModel]:
        """
        Get list of tasks with filters, sorting and pagination.
        """
        query = select(TaskModel)

        if params.isCompleted is not None:
            query = query.where(TaskModel.is_completed == params.isCompleted)

        if params.isOverdue is not None:
            now = datetime.now(timezone.utc)

            overdue_condition = and_(
                TaskModel.is_completed.is_(False),
                TaskModel.due_date.is_not(None),
                TaskModel.due_date < now,
            )

            if params.isOverdue:
                query = query.where(overdue_condition)
            else:
                query = query.where(~overdue_condition)

        sort_mapping = {
            "title": TaskModel.title,
            "createdAt": TaskModel.created_at,
            "priority": TaskModel.priority,
            "dueDate": TaskModel.due_date,
        }

        sort_column = sort_mapping[params.sortBy]
        order_func = asc if params.sortOrder == "asc" else desc
        query = query.order_by(order_func(sort_column))

        offset = (params.page - 1) * params.pageSize
        query = query.offset(offset).limit(params.pageSize)

        result = await self.session.execute(query)
        return result.scalars().all()

    async def get_by_id(self, task_id: UUID) -> TaskModel | None:
        """
        Get a task by its ID.
        """
        result = await self.session.execute(
            select(TaskModel).where(TaskModel.id == task_id)
        )
        return result.scalar_one_or_none()

    async def create(self, data: TaskCreate) -> TaskModel:
        """
        Create a new task.
        """
        task = TaskModel(**data.model_dump())
        self.session.add(task)
        await self.session.commit()
        await self.session.refresh(task)
        return task

    async def update(self, task_id: UUID, data: TaskUpdate) -> TaskModel | None:
        """
        Update a task by its ID.
        """
        task = await self.get_by_id(task_id)
        if not task:
            return None

        for key, value in data.model_dump(exclude_unset=True).items():
            setattr(task, key, value)
        task.updated_at = datetime.utcnow()
        self.session.add(task)
        await self.session.commit()
        await self.session.refresh(task)
        return task

    async def delete(self, task_id: UUID) -> bool:
        """
        Delete a task by its ID.
        """
        task = await self.get_by_id(task_id)
        if not task:
            return False
        await self.session.delete(task)
        await self.session.commit()
        return True
