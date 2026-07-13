from datetime import datetime


class CleaningReport:

    def __init__(self):

        self.report = {
            "status": "Success",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            "records_before": 0,
            "records_after": 0,

            "duplicates_removed": 0,
            "null_records_removed": 0,
            "empty_records_removed": 0,

            "operations_executed": []
        }

    # -----------------------------
    # Add Executed Operation
    # -----------------------------
    def add_operation(self, operation):

        self.report["operations_executed"].append(operation)

    # -----------------------------
    # Update Any Report Value
    # -----------------------------
    def update(self, key, value):

        self.report[key] = value

    # -----------------------------
    # Generate Final Report
    # -----------------------------
    def generate(self):

        return self.report