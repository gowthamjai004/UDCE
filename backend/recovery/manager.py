from datetime import datetime

from database.connection import connection_manager


class RecoveryManager:

    DATABASE_NAME = "UDCE_RECOVERY"

    COLLECTION_NAME = "backups"

    def create_backup(
        self,
        database_name,
        collection_name,
        documents
    ):

        db = connection_manager.get_database()

        recovery_collection = db.get_collection(
            self.DATABASE_NAME,
            self.COLLECTION_NAME
        )

        timestamp = datetime.now()

        backup_name = (
            f"{collection_name}_backup_"
            f"{timestamp.strftime('%Y%m%d_%H%M%S')}"
        )

        backup = {

            "backup_name": backup_name,

            "original_database": database_name,

            "original_collection": collection_name,

            "created_at": timestamp,

            "records": len(documents),

            "data": documents

        }

        recovery_collection.insert_one(backup)

        return backup