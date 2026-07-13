from fastapi import APIRouter

from database.connection import connection_manager

router = APIRouter()


@router.get("/databases")
def get_databases():

    db = connection_manager.get_database()

    return db.get_database_names()


@router.get("/collections/{database_name}")
def get_collections(database_name: str):

    db = connection_manager.get_database()

    return db.get_collection_names(database_name)


@router.get("/documents/{database_name}/{collection_name}")
def get_documents(database_name: str, collection_name: str):

    db = connection_manager.get_database()

    return db.get_documents(
        database_name,
        collection_name
    )


@router.get("/columns/{database_name}/{collection_name}")
def get_columns(database_name: str, collection_name: str):

    db = connection_manager.get_database()

    data = db.get_documents(
        database_name,
        collection_name
    )

    if len(data) == 0:
        return []

    columns = list(data[0].keys())

    if "_id" in columns:
        columns.remove("_id")

    return columns