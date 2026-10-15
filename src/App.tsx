import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppHeader } from '@/components/AppHeader'
import { MobileTabBar } from '@/components/MobileTabBar'
import { Home } from './pages/Home'
import { MovieDetails } from './pages/MovieDetails'
import { NotFound } from './pages/NotFound'

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileTabBar />
    </>
  )
}

export default App
