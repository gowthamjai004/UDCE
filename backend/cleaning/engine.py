import math
import pandas as pd

from cleaning.registry import OperationRegistry
from cleaning.report import CleaningReport


class CleaningEngine:

    def __init__(self):
        self.registry = OperationRegistry()

    def execute(self, data, request):

        # -----------------------------
        # Create DataFrame
        # -----------------------------
        df = pd.DataFrame(data)

        report = CleaningReport()

        report.update("records_before", len(df))

        # -----------------------------
        # Execute Operations
        # -----------------------------
        for operation in request.operations:

            function = self.registry.get(operation)

            if function is None:
                continue

            # -----------------------------
            # Remove Duplicates
            # -----------------------------
            if operation == "remove_duplicates":

                df, removed = function(
                    df,
                    request.duplicate_columns
                )

                report.update(
                    "duplicates_removed",
                    removed
                )

            # -----------------------------
            # Remove Nulls
            # -----------------------------
            elif operation == "remove_nulls":

                df, removed = function(df)

                report.update(
                    "null_records_removed",
                    removed
                )

            # -----------------------------
            # Remove Empty Strings
            # -----------------------------
            elif operation == "remove_empty_strings":

                df, removed = function(df)

                report.update(
                    "empty_records_removed",
                    removed
                )

            # -----------------------------
            # Sort
            # -----------------------------
            elif operation == "sort":

                df = function(
                    df,
                    request.sort_column,
                    request.ascending
                )

            # -----------------------------
            # Filter
            # -----------------------------
            elif operation == "filter":

                df = function(
                    df,
                    request.filter_column,
                    request.filter_value
                )

            # -----------------------------
            # Other Operations
            # -----------------------------
            else:

                df = function(df)

            report.add_operation(operation)

        # -----------------------------
        # Records After Cleaning
        # -----------------------------
        report.update(
            "records_after",
            len(df)
        )

        # -----------------------------
        # Convert NaN / Infinity to None
        # -----------------------------
        df = df.replace([float("inf"), float("-inf")], None)

        # Replace pandas NaN with None
        df = df.where(pd.notnull(df), None)

        cleaned_data = df.to_dict(orient="records")

        # Extra safety check
        for row in cleaned_data:

            for key, value in row.items():

                if isinstance(value, float):

                    if math.isnan(value):

                        row[key] = None

                    elif math.isinf(value):

                        row[key] = None

        return (
            cleaned_data,
            report.generate()
        )