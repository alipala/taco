from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["api"])

@router.get("/items")
async def get_items():
    """
    Sample endpoint to get a list of items.
    This is just a placeholder - replace with actual implementation.
    """
    return [
        {"id": 1, "name": "Item 1"},
        {"id": 2, "name": "Item 2"},
        {"id": 3, "name": "Item 3"},
    ]
