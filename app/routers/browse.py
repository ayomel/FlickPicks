from fastapi import APIRouter, HTTPException
import httpx

from app import tmdb

router = APIRouter(tags=["browse"])


@router.get("/movies/{movie_id}")
def get_movie(movie_id: int):
    try:
        return tmdb.get_movie(movie_id)
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail="TMDB request failed") from exc


@router.get("/trending/movies")
def get_trending_movies():
    try:
        return tmdb.get_trending_movies()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail="TMDB request failed") from exc


@router.get("/search/movie")
def search_movies(query: str):
    try:
        return tmdb.search_movies(query)
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail="TMDB request failed") from exc
