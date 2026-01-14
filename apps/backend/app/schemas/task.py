"""
Pydantic schemas for the Task entity.

This module defines the data structures used for validating
and serializing Task objects in API requests and responses.
"""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    """
    Base schema for a Task containing common fields.

    Attributes:
        title (str): The title of the task.
        description (Optional[str]): Detailed description of the task.
        isCompleted (bool): Whether the task is completed.
        priority (int): Priority level of the task.
        dueDate (Optional[datetime]): Optional due date of the task.
    """

    title: str
    description: Optional[str] = None
    is_completed: bool = Field(False, alias="isCompleted")
    priority: int
    due_date: Optional[datetime] = Field(None, alias="dueDate")

    class Config:
        """
        Config for the TaskBase schema.
        """

        populate_by_name = True


class TaskCreate(TaskBase):
    """
    Schema for creating a new Task.

    Inherits all fields from TaskBase. Used in POST requests
    when creating a task.
    """

    pass


class TaskUpdate(BaseModel):
    """
    Schema for updating an existing Task.

    All fields are optional. Only provided fields will be updated.

    Attributes:
        title (Optional[str]): New title of the task.
        description (Optional[str]): New description of the task.
        isCompleted (Optional[bool]): Updated completion status.
        priority (Optional[int]): Updated priority level.
        dueDate (Optional[datetime]): Updated due date.
    """

    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: bool = Field(False, alias="isCompleted")
    priority: Optional[int] = None
    due_date: Optional[datetime] = Field(None, alias="dueDate")

    class Config:
        """
        Config for the TaskUpdate schema.
        """

        populate_by_name = True


class Task(TaskBase):
    """
    Schema representing a Task with all fields including metadata.

    Attributes:
        id (UUID): Unique identifier of the task.
        createdAt (datetime): Timestamp when the task was created.
        updatedAt (datetime): Timestamp when the task was last updated.
    """

    id: UUID
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    class Config:
        """
        Config for the Task schema.
        """

        populate_by_name = True
