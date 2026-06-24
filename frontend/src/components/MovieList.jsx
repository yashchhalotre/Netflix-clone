import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  if (!movies?.length) return null;

  return (
    <section className="px-4 py-5 md:px-12">
      <h2 className="mb-3 text-xl font-bold text-white light-theme:text-zinc-950 md:text-2xl">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {movies.map((movie) => <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} />)}
      </div>
    </section>
  );
};

export default MovieList;
