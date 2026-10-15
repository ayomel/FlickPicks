import FeatureMovieHero from '../components/FeatureMovieHero/FeatureMovieHero'
import { ComingSoonRow } from '@/components/Row/ComingSoonRow'
import { TrendingRows } from '@/components/Row/TrendingRows'
import { WatchlistRow } from '@/components/Watchlist/WatchlistRow'

export const Home = () => {
  return (
    <div className="min-h-svh bg-background">
      <FeatureMovieHero />
      <div className="relative z-10 pb-16">
        <TrendingRows />
        <ComingSoonRow />
        <WatchlistRow />
      </div>
    </div>
  )
}

export default Home
