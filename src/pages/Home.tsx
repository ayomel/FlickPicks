import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FeatureMovieHero from '../components/FeatureMovieHero/FeatureMovieHero'
import { ComingSoonRow } from '@/components/Row/ComingSoonRow'
import { TrendingRows } from '@/components/Row/TrendingRows'
import { WatchlistRow } from '@/components/Watchlist/WatchlistRow'
import { useTrendingQuery } from '@/hooks/useTrendingQuery'
import { useUpcomingQuery } from '@/hooks/useUpcomingQuery'
import { useWatchlistMovies } from '@/hooks/useWatchlistQuery'

export const Home = () => {
  const location = useLocation()
  const trendingQuery = useTrendingQuery()
  const upcomingQuery = useUpcomingQuery()
  const { isLoadingMovies, movies } = useWatchlistMovies()

  const rowsSettled =
    !trendingQuery.isLoading && !upcomingQuery.isLoading && !isLoadingMovies

  useEffect(() => {
    if (location.hash !== '#watchlist') return
    if (!rowsSettled) return

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('watchlist')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.hash, rowsSettled, movies.length])

  return (
    <div className="min-h-svh bg-background">
      <FeatureMovieHero />
      <div className="relative z-10 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-16">
        <TrendingRows />
        <ComingSoonRow />
        <div id="watchlist" className="scroll-mt-20">
          <WatchlistRow />
        </div>
      </div>
    </div>
  )
}

export default Home
