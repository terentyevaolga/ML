from typing import List
from datetime import datetime, timedelta

from pydantic import UUID4
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.core.auth.utils.contrib import get_current_user, get_current_admin
from app.core.auth.utils.password import get_password_hash

from app.applications.users.models import User
from app.applications.users.schemas import (
    BaseUserCreate,
    BaseUserOut
)

import logging
import string

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/me", response_model=BaseUserOut)
async def get_user_me(
    current_user: User = Depends(get_current_user)
):
    return current_user


@router.post("", response_model=BaseUserOut)
async def create_user(
    *,
    user_in: BaseUserCreate
):
    user = await User.get_by_email(email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists"
        )

    hashed_password = get_password_hash(user_in.password)
    db_user = BaseUserCreate(**user_in.model_dump(), hashed_password=hashed_password)
    user = await User.create(db_user)

    return user