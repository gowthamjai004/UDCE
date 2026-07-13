import copy

from pymongo import MongoClient
from database.base import DatabaseAdapter


class MongoDB(DatabaseAdapter):

    def __init__(self, uri="mongodb://localhost:27017"):

        self.uri = uri
        self.client = None

    # -----------------------------------------
    # Connect
    # -----------------------------------------

    def connect(self):

        if self.client is None:

            self.client = MongoClient(self.uri)

        return self.client

    # -----------------------------------------
    # Disconnect
    # -----------------------------------------

    def disconnect(self):

        if self.client:

            self.client.close()

            self.client = None

    # -----------------------------------------
    # Database
    # -----------------------------------------

    def get_database(self, database_name):

        self.connect()

        return self.client[database_name]

    # -----------------------------------------
    # Collection
    # -----------------------------------------

    def get_collection(self, database_name, collection_name):

        db = self.get_database(database_name)

        return db[collection_name]

    # -----------------------------------------
    # Database Names
    # -----------------------------------------

    def get_database_names(self):

        self.connect()

        return self.client.list_database_names()

    # -----------------------------------------
    # Collection Names
    # -----------------------------------------

    def get_collection_names(self, database_name):

        db = self.get_database(database_name)

        return db.list_collection_names()

    # -----------------------------------------
    # Documents
    # -----------------------------------------

    def get_documents(self, database_name, collection_name):

        collection = self.get_collection(
            database_name,
            collection_name
        )

        data = list(collection.find())

        for doc in data:

            if "_id" in doc:

                doc["_id"] = str(doc["_id"])

        return data

    # -----------------------------------------
    # Save Collection
    # -----------------------------------------

    def save_collection(
        self,
        database_name,
        collection_name,
        data
    ):

        collection = self.get_collection(
            database_name,
            collection_name
        )

        collection.delete_many({})

        if len(data) == 0:
            return

        data_to_save = copy.deepcopy(data)

        for doc in data_to_save:

            doc.pop("_id", None)

        collection.insert_many(data_to_save)