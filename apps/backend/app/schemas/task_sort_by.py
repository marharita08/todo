"""
Enum for the task sort by.
"""
from enum import Enum


class TaskSortBy(str, Enum):
    """
    Enum for the task sort by.
    """
    title = "title"
    createdAt = "createdAt"
    priority = "priority"
    dueDate = "dueDate"
