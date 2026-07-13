import pandas as pd


class DataCleaningOperations:

    # -------------------------------------------------
    # Remove Duplicate Records
    # -------------------------------------------------
    @staticmethod
    def remove_duplicates(df, columns=None):

        before = len(df)

        # Ignore MongoDB ObjectId
        if "_id" in df.columns:
            df = df.drop(columns=["_id"])

        if columns:
            df = df.drop_duplicates(subset=columns)
        else:
            df = df.drop_duplicates()

        after = len(df)

        return df.reset_index(drop=True), before - after

    # -------------------------------------------------
    # Remove Records with Null Values
    # -------------------------------------------------
    @staticmethod
    def remove_nulls(df):

        before = len(df)

        df = df.dropna()

        after = len(df)

        return df.reset_index(drop=True), before - after

    # -------------------------------------------------
    # Remove Empty Strings
    # -------------------------------------------------
    @staticmethod
    def remove_empty_strings(df):

        before = len(df)

        df = df.replace(r'^\s*$', pd.NA, regex=True)

        df = df.dropna()

        after = len(df)

        return df.reset_index(drop=True), before - after

    # -------------------------------------------------
    # Trim Spaces
    # -------------------------------------------------
    @staticmethod
    def trim_spaces(df):

        for column in df.columns:

            if df[column].dtype == object:

                df[column] = df[column].astype(str).str.strip()

        return df

    # -------------------------------------------------
    # Convert Text to Uppercase
    # -------------------------------------------------
    @staticmethod
    def uppercase(df):

        for column in df.columns:

            if df[column].dtype == object:

                df[column] = df[column].astype(str).str.upper()

        return df

    # -------------------------------------------------
    # Convert Text to Lowercase
    # -------------------------------------------------
    @staticmethod
    def lowercase(df):

        for column in df.columns:

            if df[column].dtype == object:

                df[column] = df[column].astype(str).str.lower()

        return df

    # -------------------------------------------------
    # Title Case
    # -------------------------------------------------
    @staticmethod
    def title_case(df):

        for column in df.columns:

            if df[column].dtype == object:

                df[column] = df[column].astype(str).str.title()

        return df

    # -------------------------------------------------
    # Sort Data
    # -------------------------------------------------
    @staticmethod
    def sort_data(df, column, ascending=True):

        if column:

            if column in df.columns:

                df = df.sort_values(
                    by=column,
                    ascending=ascending
                )

        return df.reset_index(drop=True)

    # -------------------------------------------------
    # Filter Data
    # -------------------------------------------------
    @staticmethod
    def filter_data(df, column, value):

        if column:

            if column in df.columns:

                df = df[df[column] == value]

        return df.reset_index(drop=True)

    # -------------------------------------------------
    # Remove Selected Columns
    # -------------------------------------------------
    @staticmethod
    def remove_columns(df, columns):

        if columns:

            existing = [c for c in columns if c in df.columns]

            df = df.drop(columns=existing)

        return df

    # -------------------------------------------------
    # Rename Columns
    # -------------------------------------------------
    @staticmethod
    def rename_columns(df, mapping):

        if mapping:

            df = df.rename(columns=mapping)

        return df

    # -------------------------------------------------
    # Fill Null Values
    # -------------------------------------------------
    @staticmethod
    def fill_null_values(df, value="Unknown"):

        df = df.fillna(value)

        return df

    # -------------------------------------------------
    # Remove Special Characters
    # -------------------------------------------------
    @staticmethod
    def remove_special_characters(df):

        for column in df.columns:

            if df[column].dtype == object:

                df[column] = df[column].str.replace(
                    r'[^A-Za-z0-9 ]',
                    '',
                    regex=True
                )

        return df