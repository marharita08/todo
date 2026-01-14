"""
Main entry point for the Task API application.

This module initializes the FastAPI app and includes all API
routers for task management. It serves as the starting point
for running the server using Uvicorn.

Routers:
    - /tasks: CRUD operations for Task entities
"""

from fastapi import FastAPI
from app.database import Base, engine
from app.api.tasks import router as task_router

app = FastAPI(title="Task API", version="1.0")

app.include_router(task_router)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.on_event("shutdown")
async def shutdown():
    await engine.dispose()
