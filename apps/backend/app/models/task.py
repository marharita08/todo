"""
Model for the Task entity.

This module defines the model for the Task entity,
including the table schema and the columns.
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.dialects.postgresql import UUID as PGUUID

from app.database import Base


class Task(Base):
    """
    Model for the Task entity.
    """

    __tablename__ = "tasks"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    is_completed = Column(Boolean, default=False)
    priority = Column(Integer, nullable=False)
    due_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
