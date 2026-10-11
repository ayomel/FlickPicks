import FeatureMovieHero from '../components/FeatureMovieHero/FeatureMovieHero'
import { WatchlistRow } from '@/components/Watchlist/WatchlistRow'

export const Home = () => {
  return (
    <div className="min-h-svh bg-background">
      <FeatureMovieHero />
      <WatchlistRow />
    </div>
  )
}

export default Home
