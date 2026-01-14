"""
Query parameters for the Task entity.

This module defines the query parameters for the Task entity,
including the page, page size, is completed, is overdue, sort by, and sort order.
"""

from typing import Optional, Literal
from pydantic import BaseModel, Field


class TaskQueryParams(BaseModel):
    """
    Query parameters for the Task entity.
    """

    page: int = Field(1, ge=1)
    pageSize: int = Field(10, ge=1, le=100)

    isCompleted: Optional[bool] = None
    isOverdue: Optional[bool] = None

    sortBy: Optional[Literal["title", "createdAt", "priority", "dueDate"]] = "createdAt"

    sortOrder: Literal["asc", "desc"] = "desc"
