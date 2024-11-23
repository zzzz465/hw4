import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout'
import Home from './pages/home/Home'
import Popular from './pages/popular/Popular'
import Search from './pages/search/Search'
import Wishlist from './pages/wishlist/Wishlist'
import SignIn from './pages/auth/SignIn'
import MovieDetail from './pages/movie/MovieDetail'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
