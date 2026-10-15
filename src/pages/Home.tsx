import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FeatureMovieHero from '../components/FeatureMovieHero/FeatureMovieHero'
import { ComingSoonRow } from '@/components/Row/ComingSoonRow'
import { TrendingRows } from '@/components/Row/TrendingRows'
import { WatchlistRow } from '@/components/Watchlist/WatchlistRow'

export const Home = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#watchlist') return
    document.getElementById('watchlist')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [location.hash])

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
