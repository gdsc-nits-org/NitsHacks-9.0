import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TeamsPage from './pages/TeamsPage'
import TimelinePage from './pages/TimelinePage'
import FAQsPage from './pages/FAQsPage'
import TrackPage from './pages/Trackpage'
import LandingPage from './pages/LandingPage'
import ComingSoon from './pages/ComingSoon'
import Navbar from './components/Navbar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (typeof document !== 'undefined') {
      if (document.documentElement) document.documentElement.scrollTop = 0
      if (document.body) document.body.scrollTop = 0
    }
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/faq" element={<FAQsPage />} />
        <Route path="/tracks" element={<TrackPage />} />
        <Route path="/track" element={<TrackPage />} />
      </Routes>
    </BrowserRouter>
  )
}
