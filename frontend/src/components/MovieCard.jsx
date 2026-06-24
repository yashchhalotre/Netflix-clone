import { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Link onClick={() => setLoading(true)} to={`/movies/${movie.id}`} className="group relative block min-w-[150px] overflow-hidden rounded bg-zinc-900 shadow-lg light-theme:bg-white md:min-w-[190px]">
      <img src={movie.posterUrl} alt={movie.title} className="h-56 w-full object-cover transition duration-300 group-hover:scale-105 md:h-72" />
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-black/70">
          <div className="spinner" />
        </div>
      )}
      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-white light-theme:text-zinc-900">{movie.title}</h3>
        <p className="text-xs text-gray-400 light-theme:text-zinc-600">{movie.year} • {movie.type}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
