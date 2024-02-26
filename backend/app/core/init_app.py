import time
import os
import logging

from asyncio import sleep

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from app.core.exceptions import APIException
from app.settings.log import DEFAULT_LOGGING
from app.settings.config import settings
from app.applications.users.models import User
from app.applications.users.schemas import BaseUserCreate
from app.core.auth.utils.password import get_password_hash

from app.core.auth.routers.login import router as login_router
from app.applications.users.routers import router as users_router

from aerich import Command

def set_tz():
    os.environ["TZ"] = "Europe/Moscow"
    time.tzset()


def configure_logging(log_settings: dict = None):
    log_settings = log_settings or DEFAULT_LOGGING
    logging.config.dictConfig(log_settings)


def init_middlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
        allow_methods=settings.CORS_ALLOW_METHODS,
        allow_headers=settings.CORS_ALLOW_HEADERS
    )


def get_app_list() -> list:
    app_list = [f"{settings.APPLICATIONS_MODULE}.{app}.models" for app in settings.APPLICATIONS]
    return app_list


def get_tortoise_config() -> dict:
    app_list = get_app_list()
    app_list.append("aerich.models")
    config = {
        "connections": settings.DB_CONNECTIONS,
        "apps": {
            "models": {
                "models": app_list,
                "default_connection": "default"
            }
        }
    }
    return config

TORTOISE_ORM = get_tortoise_config()


def register_db(app: FastAPI, db_url: str = None):
    db_url = db_url or settings.DB_URL
    app_list = get_app_list()
    app_list.append("aerich.models")
    register_tortoise(
        app,
        db_url=db_url,
        modules={"models": app_list},
        generate_schemas=True,
        add_exception_handlers=True
    )


async def upgrade_db(app: FastAPI, db_url: str = None):
    # if not os.path.exists("migrations/models"):
    #     os.makedirs("migrations/models", exist_ok=True)
    command = Command(tortoise_config=TORTOISE_ORM, app="models", location="./migrations")
    if not os.path.exists("./migrations/models"):
        await command.init_db(safe=True)
    await command.init()
    await command.migrate("update")
    await command.upgrade(run_in_transaction=True)


def register_exceptions(app: FastAPI):
    app.exception_handler(APIException)


def register_routers(app: FastAPI):
    app.include_router(login_router, prefix="/auth/login", tags=["login"])
    app.include_router(users_router, prefix="/users", tags=["users"])