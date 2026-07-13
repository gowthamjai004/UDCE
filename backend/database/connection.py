class ConnectionManager:

    def __init__(self):
        self.database = None

    def set_database(self, database):
        self.database = database

    def get_database(self):
        return self.database


connection_manager = ConnectionManager()