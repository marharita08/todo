"""
Dependency functions for the Task API.

This module provides the necessary dependencies for the Task API,
including the task service and the database session.
"""

from app.database import async_session
from app.services.task_service import TaskService


async def get_task_service() -> TaskService:
    """
    Get the task service.
    """
    async with async_session() as session:
        yield TaskService(session)
