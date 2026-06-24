const fallbackMovies = require('../data/movies');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

function mapMovie(item, category = 'popular') {
  return {
    id: item.id,
    title: item.title || item.name,
    type: item.media_type === 'tv' || item.name ? 'Series' : 'Movie',
    genre: 'TMDB',
    year: (item.release_date || item.first_air_date || '').slice(0, 4) || 'N/A',
    rating: Number(item.vote_average || 0).toFixed(1),
    category,
    runtime: 'Details available on movie page',
    language: item.original_language?.toUpperCase() || 'N/A',
    posterUrl: item.poster_path ? `${IMAGE_BASE_URL}/w500${item.poster_path}` : fallbackMovies[0].posterUrl,
    backdropUrl: item.backdrop_path ? `${IMAGE_BASE_URL}/original${item.backdrop_path}` : fallbackMovies[0].backdropUrl,
    description: item.overview || 'No description available.',
    cast: []
  };
}

async function tmdbFetch(path) {
  if (!process.env.TMDB_API_KEY) return null;
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${TMDB_BASE_URL}${path}${separator}api_key=${process.env.TMDB_API_KEY}`);
  if (!response.ok) throw new Error('TMDB API request failed');
  return response.json();
}

async function getMoviesFromTmdb({ category, search }) {
  if (!process.env.TMDB_API_KEY) return null;

  if (search) {
    const data = await tmdbFetch(`/search/multi?query=${encodeURIComponent(search)}&include_adult=false&language=en-US&page=1`);
    return data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv').map((item) => mapMovie(item, 'search'));
  }

  const endpointMap = {
    popular: '/movie/popular?language=en-US&page=1',
    trending: '/trending/all/week?language=en-US',
    'top-rated': '/movie/top_rated?language=en-US&page=1',
    upcoming: '/movie/upcoming?language=en-US&page=1',
    series: '/tv/popular?language=en-US&page=1'
  };

  const endpoint = endpointMap[category] || '/trending/all/week?language=en-US';
  const data = await tmdbFetch(endpoint);
  return data.results.map((item) => mapMovie(item, category || 'trending'));
}

async function getMovieDetailsFromTmdb(id) {
  if (!process.env.TMDB_API_KEY) return null;

  const movie = await tmdbFetch(`/movie/${id}?append_to_response=videos,credits&language=en-US`);
  const trailer = movie.videos?.results?.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  return {
    id: movie.id,
    title: movie.title,
    type: 'Movie',
    genre: movie.genres?.map((genre) => genre.name).join(', ') || 'Movie',
    year: movie.release_date?.slice(0, 4) || 'N/A',
    rating: Number(movie.vote_average || 0).toFixed(1),
    runtime: movie.runtime ? `${movie.runtime} min` : 'N/A',
    language: movie.original_language?.toUpperCase() || 'N/A',
    category: 'tmdb',
    posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : fallbackMovies[0].posterUrl,
    backdropUrl: movie.backdrop_path ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}` : fallbackMovies[0].backdropUrl,
    description: movie.overview || 'No description available.',
    trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : fallbackMovies[0].trailerUrl,
    cast: movie.credits?.cast?.slice(0, 5).map((person) => person.name) || []
  };
}

module.exports = { getMoviesFromTmdb, getMovieDetailsFromTmdb };
