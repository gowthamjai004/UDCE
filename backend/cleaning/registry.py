from cleaning.operations import DataCleaningOperations


class OperationRegistry:

    def __init__(self):

        self.operations = {

            "remove_duplicates": DataCleaningOperations.remove_duplicates,

            "remove_nulls": DataCleaningOperations.remove_nulls,

            "remove_empty_strings": DataCleaningOperations.remove_empty_strings,

            "trim_spaces": DataCleaningOperations.trim_spaces,

            "uppercase": DataCleaningOperations.uppercase,

            "lowercase": DataCleaningOperations.lowercase,

            "title_case": DataCleaningOperations.title_case,

            "sort": DataCleaningOperations.sort_data,

            "filter": DataCleaningOperations.filter_data,

            "fill_nulls": DataCleaningOperations.fill_null_values,

            "remove_special_characters":
                DataCleaningOperations.remove_special_characters
        }

    def get(self, operation):

        return self.operations.get(operation)

    def list_operations(self):

        return list(self.operations.keys())