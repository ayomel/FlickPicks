from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_db
from app.models import WatchlistEntry
from app.schemas import WatchlistEntryCreate, WatchlistEntryRead, WatchlistEntryUpdate

router = APIRouter(tags=["entries"])


@router.get("/entry", response_model=list[WatchlistEntryRead])
def list_entries(session: Session = Depends(get_db)):
    return session.exec(select(WatchlistEntry)).all()


@router.post("/entry", response_model=WatchlistEntryRead)
def create_entry(body: WatchlistEntryCreate, session: Session = Depends(get_db)):
    entry = WatchlistEntry.model_validate(body)
    session.add(entry)
    session.commit()
    session.refresh(entry)
    return entry


@router.get("/entry/{entry_id}", response_model=WatchlistEntryRead)
def get_entry(entry_id: int, session: Session = Depends(get_db)):
    entry = session.get(WatchlistEntry, entry_id)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry


@router.patch("/entry/{entry_id}", response_model=WatchlistEntryRead)
def update_entry(
    entry_id: int,
    body: WatchlistEntryUpdate,
    session: Session = Depends(get_db),
):
    entry = session.get(WatchlistEntry, entry_id)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")

    data = body.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(entry, key, value)
    entry.updated_at = datetime.now(timezone.utc)

    session.add(entry)
    session.commit()
    session.refresh(entry)
    return entry


@router.delete("/entry/{entry_id}", status_code=204)
def delete_entry(entry_id: int, session: Session = Depends(get_db)):
    entry = session.get(WatchlistEntry, entry_id)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    session.delete(entry)
    session.commit()
