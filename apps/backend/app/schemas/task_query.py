"""
Query parameters for the Task entity.

This module defines the query parameters for the Task entity,
including the page, page size, is completed, is overdue, sort by, and sort order.
"""

from typing import Optional, Literal
from pydantic import BaseModel, Field

from app.schemas.task_sort_by import TaskSortBy


class TaskQueryParams(BaseModel):
    """
    Query parameters to filter and sort tasks.
    """

    page: int = Field(1, ge=1)

    page_size: int = Field(
        10,
        ge=1,
        le=100,
        alias="pageSize",
    )

    search: Optional[str] = Field(
        None,
    )

    is_completed: Optional[bool] = Field(
        None,
        alias="isCompleted",
    )

    is_overdue: Optional[bool] = Field(
        None,
        alias="isOverdue",
    )

    sort_by: TaskSortBy = Field(
        TaskSortBy.createdAt,
        alias="sortBy",
    )

    sort_order: Literal["asc", "desc"] = Field(
        "desc",
        alias="sortOrder",
    )

    class Config:
        """
        Config for the TaskQueryParams schema.
        """
        populate_by_name = True
