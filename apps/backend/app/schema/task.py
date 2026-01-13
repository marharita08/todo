from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    isCompleted: bool = False
    priority: int
    dueDate: Optional[datetime] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    isCompleted: Optional[bool] = None
    priority: Optional[int] = None
    dueDate: Optional[datetime] = None


class Task(TaskBase):
    id: UUID
    createdAt: datetime
    updatedAt: datetime
    