import { useSearch } from '../../hooks/queries/searchQueries'
import {
  Container,
  Grid,
  TextInput,
  Box,
  Stack,
  Title,
  Text,
  MultiSelect,
  NumberInput,
  Paper,
  Center,
  Loader,
  ScrollArea,
  List,
  Group,
  Image,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { Movie } from '../../hooks/queries/movieQueries'

const genres = [
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
]

export default function Search() {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch] = useDebouncedValue(searchInput, 500)
  const {
    setQuery,
    movies,
    totalResults,
    isLoading,
    genres: selectedGenres,
    setGenres,
    year,
    setYear,
    loadMoreRef,
  } = useSearch()

  useEffect(() => {
    setQuery(debouncedSearch)
  }, [debouncedSearch, setQuery])

  return (
    <Container size="xl" py="xl">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper
            p="md"
            pos="sticky"
            top="calc(var(--header-height, 60px) + 1rem)"
            withBorder
          >
            <Stack>
              <TextInput
                placeholder="Search movies..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                size="lg"
                leftSection={<IconSearch size={20} />}
              />

              <Box>
                <Title order={6} mb="xs">Genres</Title>
                <MultiSelect
                  data={genres}
                  value={selectedGenres.map(String)}
                  onChange={(values) => setGenres(values.map(Number))}
                  searchable
                  clearable
                />
              </Box>

              <Box>
                <Title order={6} mb="xs">Year</Title>
                <NumberInput
                  value={year || ''}
                  onChange={(val) => setYear(val as number)}
                  placeholder="Filter by year"
                  min={1900}
                  max={new Date().getFullYear()}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 9 }}>
          {searchInput === '' ? (
            <Center h={200}>
              <Text size="xl" c="dimmed">Start typing to search movies</Text>
            </Center>
          ) : isLoading && movies.length === 0 ? (
            <Center h={200}>
              <Loader size="xl" />
            </Center>
          ) : movies.length === 0 ? (
            <Center h={200}>
              <Text size="xl" c="dimmed">No movies found</Text>
            </Center>
          ) : (
            <ScrollArea h="calc(100vh - var(--header-height, 60px) - 2rem)" type="auto" offsetScrollbars>
              <Stack gap="md">
                <Text size="sm" c="dimmed">{totalResults} results found</Text>
                <List spacing="md" listStyleType="none">
                  {movies.map((movie: Movie) => (
                    <List.Item key={movie.id}>
                      <Box
                        component={Link}
                        to={`/movies/${movie.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Group gap="md" wrap="nowrap">
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            radius="md"
                            w={100}
                            h={150}
                            fit="cover"
                          />
                          <Stack gap="xs">
                            <Title order={4} c="white">
                              {movie.title}
                            </Title>
                            <Text c="dimmed" size="sm" lineClamp={3}>
                              {movie.overview}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {new Date(movie.release_date).getFullYear()}
                            </Text>
                          </Stack>
                        </Group>
                      </Box>
                    </List.Item>
                  ))}
                </List>
                <Center h={50} ref={loadMoreRef}>
                  {isLoading && movies.length > 0 && (
                    <Loader size="md" />
                  )}
                </Center>
              </Stack>
            </ScrollArea>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  )
}
