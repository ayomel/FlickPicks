export type WatchlistStatus = 'want' | 'watched'

export type WatchlistEntryCreate = {
  tmdb_id: number
  status?: WatchlistStatus
  rating?: number | null
  review?: string
  added_by?: string
}

export type WatchlistEntryRead = {
  id: number
  tmdb_id: number
  status: WatchlistStatus
  rating: number | null
  review: string
  added_by: string
  created_at: string
  updated_at: string
}
