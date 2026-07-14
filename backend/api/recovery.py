from fastapi import APIRouter

from database.connection import connection_manager

from bson import ObjectId
from fastapi import HTTPException



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


import copy

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

    # Make a copy of the backup data
    documents = copy.deepcopy(
        backup["data"]
    )

    # Remove MongoDB _id field
    for doc in documents:
        doc.pop("_id", None)

    print("===================================")
    print("RESTORE STARTED")
    print("Database :", backup["original_database"])
    print("Collection :", backup["original_collection"])
    print("Backup Records :", len(documents))

    delete_result = target_collection.delete_many({})

    print("Deleted :", delete_result.deleted_count)

    if documents:

        insert_result = target_collection.insert_many(documents)

        print("Inserted :", len(insert_result.inserted_ids))

    print("RESTORE FINISHED")
    print("===================================")

    return {
        "status": "success",
        "message": "Backup restored successfully."
    }

@router.delete("/delete/{backup_id}")
def delete_backup(backup_id: str):

    db = connection_manager.get_database()

    recovery_collection = db.get_collection(
        "UDCE_RECOVERY",
        "backups"
    )

    result = recovery_collection.delete_one(
        {
            "_id": ObjectId(backup_id)
        }
    )

    if result.deleted_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Backup not found."
        )

    return {
        "status": "success",
        "message": "Backup deleted successfully."
    }