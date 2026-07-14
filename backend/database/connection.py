class ConnectionManager:

    def __init__(self):
        self.database = None
        self.database_name = None

    def set_database(self, database):
        self.database = database

    def get_database(self):
        return self.database

    def set_database_name(self, name):
        self.database_name = name

    def get_database_name(self):
        return self.database_name


connection_manager = ConnectionManager()