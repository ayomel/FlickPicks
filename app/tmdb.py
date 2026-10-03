import os
import time
from typing import Any

import httpx
from dotenv import load_dotenv

load_dotenv()

TMDB_BASE_URL = "https://api.themoviedb.org/3"
_CACHE_TTL_SECONDS = 300
_cache: dict[tuple[str, tuple[tuple[str, str], ...]], tuple[float, Any]] = {}


def _api_key() -> str | None:
    return os.getenv("TMDB_API_KEY")


def _auth_headers() -> dict[str, str]:
    return {"Authorization": f"Bearer {_api_key()}"}


def _cached_get(path: str, params: dict[str, str] | None = None) -> Any:
    url = f"{TMDB_BASE_URL}{path}"
    cache_key = (url, tuple(sorted((params or {}).items())))
    now = time.monotonic()
    cached = _cache.get(cache_key)
    if cached is not None:
        cached_at, payload = cached
        if now - cached_at < _CACHE_TTL_SECONDS:
            return payload

    response = httpx.get(url, headers=_auth_headers(), params=params, timeout=30)
    response.raise_for_status()
    payload = response.json()
    _cache[cache_key] = (now, payload)
    return payload


def get_trailer_url(videos: list[dict]) -> str | None:
    youtube_trailers = [
        video
        for video in videos
        if video.get("site") == "YouTube" and video.get("type") == "Trailer"
    ]
    if not youtube_trailers:
        return None

    official = [video for video in youtube_trailers if video.get("official") is True]
    chosen = official[0] if official else youtube_trailers[0]
    key = chosen.get("key")
    if not key:
        return None
    return f"https://www.youtube.com/watch?v={key}"


def get_movie(movie_id: int) -> Any:
    return _cached_get(
        f"/movie/{movie_id}",
        params={"append_to_response": "videos"},
    )


def get_movie_watch_providers(movie_id: int) -> Any:
    return _cached_get(f"/movie/{movie_id}/watch/providers")


def get_trending_movies(time_window: str = "week") -> Any:
    return _cached_get(f"/trending/movie/{time_window}")


def search_movies(query: str) -> Any:
    return _cached_get("/search/movie", params={"query": query})
