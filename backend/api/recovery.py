from fastapi import APIRouter

from database.connection import connection_manager

router = APIRouter(prefix="/recovery", tags=["Recovery"])


@router.get("/backups")
def get_backups():

    db = connection_manager.get_database()

    collection = db.get_collection(
        "UDCE_RECOVERY",
        "backups"
    )

    backups = list(collection.find())

    for backup in backups:

        backup["_id"] = str(backup["_id"])

        # Don't send full backup data in list view
        backup.pop("data", None)


    return backups
from fastapi import HTTPException
from bson import ObjectId


@router.post("/restore/{backup_id}")
def restore_backup(backup_id: str):

    db = connection_manager.get_database()

    recovery_collection = db.get_collection(
        "UDCE_RECOVERY",
        "backups"
    )

    backup = recovery_collection.find_one(
        {
            "_id": ObjectId(backup_id)
        }
    )

    if backup is None:

        raise HTTPException(
            status_code=404,
            detail="Backup not found."
        )

    target_collection = db.get_collection(
        backup["original_database"],
        backup["original_collection"]
    )

    # Remove current data
    target_collection.delete_many({})

    documents = backup["data"]

    # Remove MongoDB _id values
    for doc in documents:

        doc.pop("_id", None)

    if len(documents) > 0:

        target_collection.insert_many(documents)

    return {

        "status": "success",

        "message": "Backup restored successfully."

    }