import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { RequireAuth } from './components/auth/RequireAuth';
import Home from './pages/home/Home';
import Popular from './pages/popular/Popular';
import Search from './pages/search/Search';
import Wishlist from './pages/wishlist/Wishlist';
import MovieDetail from './pages/movie/MovieDetail';
import SignIn from './pages/auth/SignIn';

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route element={<RequireAuth><Layout /></RequireAuth>}>
        <Route index element={<Home />} />
        <Route path="popular" element={<Popular />} />
        <Route path="search" element={<Search />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="movies/:id" element={<MovieDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


