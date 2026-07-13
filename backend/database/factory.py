from database.mongodb import MongoDB


class DatabaseFactory:

    @staticmethod
    def create(database_type, **kwargs):

        if database_type.lower() == "mongodb":

            return MongoDB(
                uri=kwargs.get("uri")
            )

        raise ValueError(
            f"Unsupported database type: {database_type}"
        )