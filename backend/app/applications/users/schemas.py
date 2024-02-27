from datetime import datetime, timedelta
from typing import Optional
import uuid

from pydantic import BaseModel, EmailStr, UUID4, validator


class BaseProperties(BaseModel):
    @validator("uuid", pre=True, always=True, check_fields=False)
    def default_hashed_id(cls, v):
        return v or uuid.uuid4()
    

class BaseUser(BaseProperties):
    uuid: Optional[UUID4] = None
    email: Optional[EmailStr] = None
    fido: Optional[str] = None


class BaseUserCreate(BaseProperties):
    email: EmailStr
    fido: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "my_email@email.com",
                "fido": "Name Surname",
                "password": "qwerty"
            }
        }


class BaseUserOut(BaseUser):
    uuid: UUID4
    email: EmailStr
    fido: str

    class Config:
        from_attributes = True


class BaseConfirmEmail(BaseProperties):
    user_id: UUID4
    email: EmailStr
    time: timedelta


class BaseConfirmedEmail(BaseProperties):
    user_id: UUID4
    email: EmailStr
    is_confirmed: bool
