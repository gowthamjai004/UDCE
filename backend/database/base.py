from abc import ABC, abstractmethod


class DatabaseAdapter(ABC):

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def disconnect(self):
        pass

    @abstractmethod
    def get_database_names(self):
        pass

    @abstractmethod
    def get_collection_names(self, database_name):
        pass

    @abstractmethod
    def get_documents(self, database_name, collection_name):
        pass

    @abstractmethod
    def save_collection(self, database_name, collection_name, data):
        pass