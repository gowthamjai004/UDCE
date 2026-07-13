from fastapi import APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel

import json
import pandas as pd
import os

router = APIRouter()

EXPORT_FOLDER = "exports"

os.makedirs(EXPORT_FOLDER, exist_ok=True)


# ----------------------------
# Request Model
# ----------------------------

class ExportRequest(BaseModel):
    data: list


# ----------------------------
# Export JSON
# ----------------------------

@router.post("/export/json")
def export_json(request: ExportRequest):

    filename = "cleaned_data.json"

    filepath = os.path.join(EXPORT_FOLDER, filename)

    with open(filepath, "w", encoding="utf-8") as file:

        json.dump(
            request.data,
            file,
            indent=4,
            ensure_ascii=False
        )

    return FileResponse(
        filepath,
        filename=filename,
        media_type="application/json"
    )


# ----------------------------
# Export CSV
# ----------------------------

@router.post("/export/csv")
def export_csv(request: ExportRequest):

    filename = "cleaned_data.csv"

    filepath = os.path.join(EXPORT_FOLDER, filename)

    df = pd.DataFrame(request.data)

    df.to_csv(filepath, index=False)

    return FileResponse(
        filepath,
        filename=filename,
        media_type="text/csv"
    )


# ----------------------------
# Export Excel
# ----------------------------

@router.post("/export/excel")
def export_excel(request: ExportRequest):

    filename = "cleaned_data.xlsx"

    filepath = os.path.join(EXPORT_FOLDER, filename)

    df = pd.DataFrame(request.data)

    df.to_excel(
        filepath,
        index=False
    )

    return FileResponse(
        filepath,
        filename=filename,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )