from fastapi import FastAPI, Depends
import requests
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, Field, Session
from database import create_db_and_tables, get_session
from datetime import datetime, timezone
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

class WatchlistStatus(str, Enum):
    WANT = "want"
    WATCHED = "watched"

class MovieEntry(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    tmdb_id: int
    status: WatchlistStatus = Field(default=WatchlistStatus.WANT)

    rating: int | None = Field(default=None, ge=1, le=10)
    review: str = ""
    added_by: str = ""

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def home():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/movies/{movie_id}")
def get_movie(movie_id: int):
    response = requests.get(f"https://api.themoviedb.org/3/movie/{movie_id}", headers={"Authorization": f"Bearer {API_KEY}"})
    return response.json()

@app.get("/trending/movies")
def get_trending_movies():
    response = requests.get(f"https://api.themoviedb.org/3/trending/movie/week", headers={"Authorization": f"Bearer {API_KEY}"})
    return response.json()

@app.get("/search/movie")
def search_movies(query: str):
    response = requests.get(f"https://api.themoviedb.org/3/search/movie", headers={"Authorization": f"Bearer {API_KEY}"} , params={"query": query})
    return response.json()

@app.post("/entry")
def create_movie_entry(movie_entry: MovieEntry, session: Session = Depends(get_session)):
    session.add(movie_entry)
    session.commit()
    session.refresh(movie_entry)
    return movie_entry

@app.get("/entry")
def get_movie_entries(session: Session = Depends(get_session)):
    from sqlmodel import select
    return session.exec(select(MovieEntry)).all()