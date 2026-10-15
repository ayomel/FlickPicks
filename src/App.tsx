import { Routes, Route } from 'react-router-dom'
import { AppHeader } from '@/components/AppHeader'
import { Home } from './pages/Home'
import { MovieDetails } from './pages/MovieDetails'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
