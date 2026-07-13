from fastapi import APIRouter
from pydantic import BaseModel

from database.factory import DatabaseFactory
from database.connection import connection_manager

router = APIRouter()


class ConnectionRequest(BaseModel):
    database_type: str
    uri: str


@router.post("/connect")
def connect_database(request: ConnectionRequest):

    try:

        database = DatabaseFactory.create(
            request.database_type,
            uri=request.uri
        )

        database.connect()

        connection_manager.set_database(database)

        return {
            "status": "success",
            "message": "Connected Successfully"
        }

    except Exception as e:

        return {
            "status": "failed",
            "message": str(e)
        }