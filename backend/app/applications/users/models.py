from typing import Optional

from tortoise import fields
from tortoise.exceptions import DoesNotExist
from pydantic import UUID4

from app.applications.users.schemas import BaseUserCreate

from app.core.auth.utils import password

from app.core.base.base_models import BaseModel


class User(BaseModel):
    email = fields.CharField(max_length=255, unique=True)
    phone_number = fields.CharField(max_length=32, unique=True, null=True)
    password_hash = fields.CharField(max_length=255, null=True)
    first_name = fields.CharField(max_length=64)
    second_name = fields.CharField(max_length=64)
    is_admin = fields.BooleanField(default=False)

    @classmethod
    async def get_by_email(cls, email: str) -> Optional["User"]:
        try:
            query = cls.get_or_none(email=email)
            user = await query
            return user
        except DoesNotExist:
            return None
        
    @classmethod
    async def get_by_uuid(cls, uuid: UUID4) -> "User":
        try:
            query = cls.get_or_none(uuid=uuid)
            user = await query
            return user
        except DoesNotExist:
            return None
        
    @classmethod
    async def create(cls, user: BaseUserCreate) -> "User":
        user_dict = user.model_dump()
        password_hash = password.get_password_hash(password=user.password)
        model = cls(**user_dict, password_hash=password_hash)
        await model.save()
        return model
    
    class Meta:
        table = "users"
