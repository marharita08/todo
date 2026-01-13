from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from typing import List

from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["Tasks"])

task_service = TaskService()


@router.get("/", response_model=List[Task])
def get_tasks():
    return task_service.get_all()


@router.get("/{task_id}", response_model=Task)
def get_task(task_id: UUID):
    task = task_service.get_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate):
    return task_service.create(payload)


@router.patch("/{task_id}", response_model=Task)
def update_task(task_id: UUID, payload: TaskUpdate):
    task = task_service.update(task_id, payload)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: UUID):
    deleted = task_service.delete(task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
        