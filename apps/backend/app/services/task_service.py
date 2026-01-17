"""
Service for the Task entity.

This module provides the necessary service for the Task entity,
including the task service and the database session.
"""

from datetime import datetime
from uuid import UUID
from math import ceil

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.task import Task as TaskModel
from app.schemas.task import TaskCreate, TaskUpdate, Task
from app.schemas.task_query import TaskQueryParams
from app.schemas.pagination import PaginatedResponse
from app.schemas.task_sort_by import TaskSortBy


SORT_FIELD_MAPPING = {
    TaskSortBy.title: TaskModel.title,
    TaskSortBy.createdAt: TaskModel.created_at,
    TaskSortBy.priority: TaskModel.priority,
    TaskSortBy.dueDate: TaskModel.due_date,
}


class TaskService:
    """
    Service for the Task entity.
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize the task service.
        """
        self.session = session

    async def get_all(self, params: TaskQueryParams):
        """
        Get all tasks.
        """
        query = select(TaskModel)

        if params.is_completed is not None:
            query = query.where(TaskModel.is_completed == params.is_completed)

        if params.is_overdue:
            query = query.where(
                TaskModel.is_completed.is_(False),
                TaskModel.due_date < datetime.utcnow(),
            )

        sort_column = SORT_FIELD_MAPPING.get(
            params.sort_by,
            TaskModel.created_at,
        )
        if params.search:
            query = query.where(TaskModel.title.ilike(f"%{params.search}%"))

        if params.sort_order == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        total = await self.session.scalar(
            select(func.count()).select_from(query.subquery())
        )

        query = query.offset((params.page - 1) * params.page_size).limit(params.page_size)

        result = await self.session.execute(query)
        tasks = result.scalars().all()

        return PaginatedResponse[Task](
            items=tasks,
            total_items=total,
            page=params.page,
            page_size=params.page_size,
            total_pages=ceil(total / params.page_size),
        )

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
