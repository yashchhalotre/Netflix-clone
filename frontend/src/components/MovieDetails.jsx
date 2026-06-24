import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/constant';
import PageSpinner from './PageSpinner';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [trailerLoading, setTrailerLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('netflixUser');
    if (!user) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const loadMovie = async () => {
      setError('');
      setMovie(null);
      setTrailerLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/movies/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Movie not found');
        setMovie(data.movie);
      } catch (err) {
        setError(err.message);
      }
    };
    loadMovie();
  }, [id]);

  if (error) return <main className="min-h-screen bg-black p-8 text-red-400 light-theme:bg-zinc-100">{error}</main>;
  if (!movie) return <PageSpinner label="Opening movie details..." />;

  return (
    <main className="min-h-screen bg-black text-white light-theme:bg-zinc-100 light-theme:text-zinc-950">
      <section className="relative bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to right, #000 18%, rgba(0,0,0,.5)), url(${movie.backdropUrl})` }}>
        <div className="px-6 pb-12 pt-8 md:px-14 md:pt-12">
          <Link to="/browse" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400"><FiArrowLeft /> Back to Home</Link>
          <div className="grid gap-8 pt-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-red-500">{movie.type}</p>
              <h1 className="text-4xl font-black md:text-6xl">{movie.title}</h1>
              <p className="mt-4 text-gray-300">{movie.year} • {movie.genre} • {movie.runtime} • ⭐ {movie.rating}</p>
              <p className="mt-6 max-w-2xl leading-7 text-gray-100 light-theme:text-zinc-100">{movie.description}</p>
              <div className="mt-6 grid gap-2 text-sm text-gray-300">
                <p><span className="font-bold text-white">Language:</span> {movie.language}</p>
                <p><span className="font-bold text-white">Cast:</span> {movie.cast?.length ? movie.cast.join(', ') : 'Cast details not available'}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-2xl ring-1 ring-white/10 light-theme:bg-white">
              <div className="relative aspect-video w-full">
                {trailerLoading && <div className="absolute inset-0 grid place-items-center bg-zinc-900"><div className="spinner" /></div>}
                <iframe
                  className="h-full w-full"
                  src={`${movie.trailerUrl}?rel=0`}
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setTrailerLoading(false)}
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-white light-theme:text-zinc-950">Trailer & Description</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-300 light-theme:text-zinc-700">Watch the trailer above and read the complete overview, rating, cast and details for this title.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
