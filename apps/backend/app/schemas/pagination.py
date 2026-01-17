"""
Pydantic schemas for pagination.

This module defines the data structures used for validating
and serializing pagination responses.
"""

from typing import Generic, List, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    """
    Schema for a paginated response.
    """

    items: List[T]

    page: int

    page_size: int = Field(
        ...,
        alias="pageSize",
    )

    total_items: int = Field(
        ...,
        alias="totalItems",
    )

    total_pages: int = Field(
        ...,
        alias="totalPages",
    )

    class Config:
        """
        Config for the PaginatedResponse schema.
        """
        populate_by_name = True
