import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/home/Home'
import Popular from './pages/popular/Popular'
import Search from './pages/search/Search'
import Wishlist from './pages/wishlist/Wishlist'
import SignIn from './pages/auth/SignIn'
import MovieDetail from './pages/movie/MovieDetail'
import { RequireAuth } from './components/auth/RequireAuth'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />

          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/popular" element={<RequireAuth><Popular /></RequireAuth>} />
          <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
          <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
          <Route path="/movies/:id" element={<RequireAuth><MovieDetail /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
