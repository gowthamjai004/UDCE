import copy

from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from cleaning.engine import CleaningEngine
from cleaning.registry import OperationRegistry

# Import Export Router
from api.export import router as export_router

from recovery.manager import RecoveryManager
from api.recovery import router as recovery_router
# -------------------------------------------------
# FastAPI App
# -------------------------------------------------

app = FastAPI(title="Universal Data Cleaning Engine (UDCE)")

@app.get("/current_database")
def current_database():

    return {
        "database": connection_manager.get_database_name()
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Export Router
app.include_router(export_router)
app.include_router(recovery_router)
# -------------------------------------------------
# Initialize Classes
# -------------------------------------------------
from database.connection import connection_manager
from database.factory import DatabaseFactory

mongo = DatabaseFactory.create(
    "mongodb",
    uri="mongodb://localhost:27017"
)

mongo.connect()

connection_manager.set_database(mongo)
engine = CleaningEngine()
registry = OperationRegistry()

recovery = RecoveryManager()
engine = CleaningEngine()

registry = OperationRegistry()



# -------------------------------------------------
# Request Model
# -------------------------------------------------

class ConnectionRequest(BaseModel):
    database_type: str
    host: str
    port: int
    username: str = ""
    password: str = ""
    database: str


class CleanRequest(BaseModel):
    database: str
    collection: str

    operations: list[str]

    duplicate_columns: Optional[list[str]] = None

    sort_column: Optional[str] = None
    ascending: Optional[bool] = True

    filter_column: Optional[str] = None
    filter_value: Optional[str] = None

    save_output: Optional[bool] = False
    output_collection: Optional[str] = None

    # NEW
    save_mode: Optional[str] = "new"


# -------------------------------------------------
# Home
# -------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Universal Data Cleaning Engine API Running Successfully"
    }

# -------------------------------------------------
# Connect Database
# -------------------------------------------------

@app.post("/connect")
def connect_database(request: ConnectionRequest):

    try:

        if request.username and request.password:

            uri = (
                f"mongodb://{request.username}:"
                f"{request.password}@"
                f"{request.host}:{request.port}"
            )

        else:

            uri = f"mongodb://{request.host}:{request.port}"

        database = DatabaseFactory.create(
            request.database_type,
            uri=uri
        )

        database.connect()

        connection_manager.set_database(database)

        connection_manager.set_database_name(
    request.database
)

        return {
            "status": "success",
            "message": "Connected Successfully",
            "uri": uri
        }

    except Exception as e:

        return {
            "status": "failed",
            "message": str(e)
        }
    

# -------------------------------------------------
# Databases
# -------------------------------------------------

@app.get("/databases")
def get_databases():
    db = connection_manager.get_database()

    return db.get_database_names()


# -------------------------------------------------
# Collections
# -------------------------------------------------

@app.get("/collections/{database_name}")
def get_collections(database_name: str):
    db = connection_manager.get_database()

    return db.get_collection_names(database_name)


# -------------------------------------------------
# Documents
# -------------------------------------------------

@app.get("/documents/{database_name}/{collection_name}")
def get_documents(database_name: str, collection_name: str):

    db = connection_manager.get_database()

    return db.get_documents(
        database_name,
        collection_name
    )


# -------------------------------------------------
# Columns
# -------------------------------------------------

@app.get("/columns/{database_name}/{collection_name}")
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


# -------------------------------------------------
# Operations
# -------------------------------------------------

@app.get("/operations")
def get_operations():
    return {
        "operations": registry.list_operations()
    }


# -------------------------------------------------
# Cleaning API
# -------------------------------------------------

@app.post("/clean")
def clean(request: CleanRequest):

    db = connection_manager.get_database()

    # ----------------------------
    # Read Original Data
    # ----------------------------

    data = db.get_documents(
        request.database,
        request.collection
    )

    # ----------------------------
    # Clean Data
    # ----------------------------

    cleaned_data, report = engine.execute(
        data,
        request
    )

    # ----------------------------
    # Save Output
    # ----------------------------

    if request.save_output:

        # ----------------------------------
        # Update Existing Collection
        # ----------------------------------

        if request.save_mode == "overwrite":

            recovery.create_backup(
                request.database,
                request.collection,
                data
            )

            db.save_collection(
                request.database,
                request.collection,
                cleaned_data
            )

        # ----------------------------------
        # Save As New Collection
        # ----------------------------------

        elif request.save_mode == "new":

            output_collection = request.output_collection

            if not output_collection:

                output_collection = (
                    request.collection + "_cleaned"
                )

            db.save_collection(
                request.database,
                output_collection,
                cleaned_data
            )

        # ----------------------------------
        # Download Only
        # ----------------------------------

        elif request.save_mode == "download":

            pass

    return {

        "status": "success",

        "cleaned_data": copy.deepcopy(cleaned_data),

        "report": report

    }
        

    return {
        "status": "success",
        "cleaned_data": copy.deepcopy(cleaned_data),
        "report": report
    }
 