import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { RequireAuth } from './components/auth/RequireAuth'
import Home from './pages/home/Home'
import Popular from './pages/popular/Popular'
import Search from './pages/search/Search'
import Wishlist from './pages/wishlist/Wishlist'
import MovieDetail from './pages/movie/MovieDetail'
import SignIn from './pages/auth/SignIn'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const theme = createTheme({
  primaryColor: 'red',
  primaryShade: 7,
  components: {
    Menu: {
      defaultProps: {
        shadow: 'lg',
      },
    },
  },
})

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications position='bottom-right' zIndex={1000} />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/signin" element={<SignIn />} />

            <Route element={<RequireAuth><Layout /></RequireAuth>}>
              <Route index element={<Home />} />
              <Route path="popular" element={<Popular />} />
              <Route path="search" element={<Search />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="movies/:id" element={<MovieDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}


