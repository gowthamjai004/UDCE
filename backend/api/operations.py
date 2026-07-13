from fastapi import APIRouter

from cleaning.registry import OperationRegistry

router = APIRouter()

registry = OperationRegistry()


@router.get("/operations")
def get_operations():

    return {
        "operations": registry.list_operations()
    }