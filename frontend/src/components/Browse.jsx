import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from './Header';
import MovieList from './MovieList';
import SkeletonRow from './SkeletonRow';
import { API_BASE_URL } from '../utils/constant';

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    const user = localStorage.getItem('netflixUser');
    if (!user) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const controller = new AbortController();
    const loadMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (category !== 'all') params.set('category', category);
        if (query.trim()) params.set('search', query.trim());

        const response = await fetch(`${API_BASE_URL}/movies?${params.toString()}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch movies');
        setMovies(data.movies || []);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadMovies, query ? 450 : 0);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [category, query]);

  const hero = movies[0];
  const rows = useMemo(() => {
    if (query || category !== 'all') return { Results: movies };
    return {
      'Popular Movies': movies.filter((movie) => movie.category === 'popular'),
      'Trending Now': movies.filter((movie) => movie.category === 'trending'),
      'Upcoming Movies': movies.filter((movie) => movie.category === 'upcoming'),
      'Top Rated': movies.filter((movie) => movie.category === 'top-rated'),
      'Web Series': movies.filter((movie) => movie.type === 'Series')
    };
  }, [movies, query, category]);

  return (
    <main className="min-h-screen bg-black text-white light-theme:bg-zinc-100 light-theme:text-zinc-950">
      <Header query={query} setQuery={setQuery} />

      {loading ? (
        <div className="pt-28"><SkeletonRow /><SkeletonRow /><SkeletonRow /></div>
      ) : error ? (
        <div className="px-6 pt-32 text-red-400">{error}</div>
      ) : (
        <>
          {hero && (
            <section className="relative flex min-h-[75vh] items-end bg-cover bg-center px-4 pb-16 md:px-12" style={{ backgroundImage: `linear-gradient(to top, #000 5%, rgba(0,0,0,.35)), url(${hero.backdropUrl})` }}>
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-red-500">Netflix Original</p>
                <h1 className="text-4xl font-black md:text-6xl">{hero.title}</h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-gray-200 md:text-base">{hero.description}</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => navigate(`/movies/${hero.id}`)} className="rounded bg-white px-6 py-3 font-bold text-black hover:bg-gray-200">▶ Play</button>
                  <button onClick={() => navigate(`/movies/${hero.id}`)} className="rounded bg-gray-600/80 px-6 py-3 font-bold text-white hover:bg-gray-700">More Info</button>
                </div>
              </div>
            </section>
          )}

          {query && <MovieList title={`Search Results for "${query}"`} movies={movies} />}
          {!query && Object.entries(rows).map(([title, rowMovies]) => <MovieList key={title} title={title} movies={rowMovies} />)}
          {!movies.length && <p className="px-6 py-20 text-center text-gray-400">No movies found.</p>}
        </>
      )}
    </main>
  );
};

export default Browse;
