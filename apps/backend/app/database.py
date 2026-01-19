"""
Database configuration for the Task API.

This module sets up the database connection and provides
the necessary utilities for interacting with the database.
"""

import os

from databases import Database
from dotenv import load_dotenv
from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL, echo=True)

async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

metadata = MetaData()
Base = declarative_base()
