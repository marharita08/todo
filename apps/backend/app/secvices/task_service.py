from datetime import datetime
from uuid import uuid4, UUID
from typing import List, Dict

from app.schemas.task import Task, TaskCreate, TaskUpdate


class TaskService:
    def __init__(self):
        self._tasks: Dict[UUID, Task] = {}

    def get_all(self) -> List[Task]:
        return list(self._tasks.values())

    def get_by_id(self, task_id: UUID) -> Task | None:
        return self._tasks.get(task_id)

    def create(self, data: TaskCreate) -> Task:
        now = datetime.utcnow()
        task = Task(
            id=uuid4(),
            createdAt=now,
            updatedAt=now,
            **data.model_dump()
        )
        self._tasks[task.id] = task
        return task

    def update(self, task_id: UUID, data: TaskUpdate) -> Task | None:
        task = self._tasks.get(task_id)
        if not task:
            return None

        updated_data = data.model_dump(exclude_unset=True)
        updated_task = task.model_copy(
            update={**updated_data, "updatedAt": datetime.utcnow()}
        )

        self._tasks[task_id] = updated_task
        return updated_task

    def delete(self, task_id: UUID) -> bool:
        return self._tasks.pop(task_id, None) is not None
        