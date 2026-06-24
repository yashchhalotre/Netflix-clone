const movies = require('../data/movies');
const { getMoviesFromTmdb, getMovieDetailsFromTmdb } = require('../services/tmdb.service');

function filterLocalMovies({ category, search }) {
  let result = [...movies];

  if (category && category !== 'all') {
    if (category === 'series') result = result.filter((movie) => movie.type === 'Series');
    else result = result.filter((movie) => movie.category === category);
  }

  if (search) {
    const value = search.toLowerCase();
    result = result.filter((movie) => [movie.title, movie.genre, movie.type].some((field) => String(field).toLowerCase().includes(value)));
  }

  return result;
}

async function getMovies(req, res, next) {
  try {
    const { category = 'all', search = '' } = req.query;
    const tmdbMovies = await getMoviesFromTmdb({ category, search });
    const result = tmdbMovies || filterLocalMovies({ category, search });

    res.status(200).json({ success: true, source: tmdbMovies ? 'tmdb' : 'mock', count: result.length, movies: result });
  } catch (error) {
    next(error);
  }
}

async function getMovieById(req, res, next) {
  try {
    const movieId = Number(req.params.id);
    const localMovie = movies.find((item) => item.id === movieId);
    if (localMovie) return res.status(200).json({ success: true, source: 'mock', movie: localMovie });

    const tmdbMovie = await getMovieDetailsFromTmdb(movieId);
    if (tmdbMovie) return res.status(200).json({ success: true, source: 'tmdb', movie: tmdbMovie });

    return res.status(404).json({ success: false, message: 'Movie not found' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getMovies, getMovieById };
