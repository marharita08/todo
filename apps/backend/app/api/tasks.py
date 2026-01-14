"""
API endpoints for CRUD operations on the Task entity.

This module defines all HTTP routes related to Task management,
including creation, retrieval, update, and deletion of tasks.
"""

from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.schemas.task_query import TaskQueryParams
from app.services.dependencies import get_task_service
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("/", response_model=List[Task])
async def get_tasks(
    params: TaskQueryParams = Depends(),
    service: TaskService = Depends(get_task_service),
):
    """
    Retrieve all tasks.

    Returns:
        List[Task]: A list of all task objects.
    """
    return await service.get_all(params)


@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: UUID, service: TaskService = Depends(get_task_service)):
    """
    Retrieve a single task by its unique ID.

    Args:
        task_id (UUID): The unique identifier of the task.

    Raises:
        HTTPException: If no task with the given ID is found (404).

    Returns:
        Task: The task object corresponding to the provided ID.
    """
    task = await service.get_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(
    payload: TaskCreate, service: TaskService = Depends(get_task_service)
):
    """
    Create a new task.

    Args:
        payload (TaskCreate): The data required to create a new task.

    Returns:
        Task: The newly created task object.
    """
    return await service.create(payload)


@router.patch("/{task_id}", response_model=Task)
async def update_task(
    task_id: UUID, payload: TaskUpdate, service: TaskService = Depends(get_task_service)
):
    """
    Update an existing task by its unique ID.

    Args:
        task_id (UUID): The unique identifier of the task to update.
        payload (TaskUpdate): The fields to update in the task.

    Raises:
        HTTPException: If no task with the given ID is found (404).

    Returns:
        Task: The updated task object.
    """
    task = await service.update(task_id, payload)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: UUID, service: TaskService = Depends(get_task_service)):
    """
    Delete a task by its unique ID.

    Args:
        task_id (UUID): The unique identifier of the task to delete.

    Raises:
        HTTPException: If no task with the given ID is found (404).

    Returns:
        None
    """
    deleted = await service.delete(task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
