# Netflix Clone Assignment

Full-stack Netflix clone built with React.js and Node.js/Express.

## Features Added

### Frontend

- Responsive Netflix-style UI for desktop and mobile
- Home page with hero banner and movie/series rows
- Working navigation routes: Home, Movies, Series, Upcoming, Top Rated
- Search functionality with loading skeletons
- Register page and Login page
- Movie details page with trailer, description, rating, runtime, language, and cast
- Dark mode / light mode toggle
- Loading skeletons and spinners on page load, search, login, register, cards, and trailer load
- React Router routes:
  - `/login`
  - `/register`
  - `/browse`
  - `/browse?category=popular`
  - `/browse?category=series`
  - `/browse?category=upcoming`
  - `/browse?category=top-rated`
  - `/movies/:id`

### Backend

- Express.js API
- `GET /movies`
- `GET /movies/:id`
- `POST /login`
- `POST /register`
- Proper route/controller/service structure
- Error handling middleware
- In-memory fallback movie data
- Optional TMDB API support for real popular/upcoming/search/details data

## How to Run

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Optional Real Movie API Setup

The app works without an API key using mock fallback data.

To get real movie/upcoming/search data from TMDB:

1. Create a `.env` file inside `backend/`.
2. Add:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
TMDB_API_KEY=your_tmdb_api_key_here
```

Then restart backend.

## API Documentation

### GET `/movies`

Returns movies/series.

Optional query params:

```txt
/movies?category=popular
/movies?category=series
/movies?category=upcoming
/movies?category=top-rated
/movies?search=dark
```

### GET `/movies/:id`

Returns full movie details with trailer URL and description.

Example:

```txt
GET /movies/1
```

### POST `/login`

Mock login.

```json
{
  "email": "demo@netflix.com",
  "password": "123456"
}
```

### POST `/register`

Mock register.

```json
{
  "name": "Yash",
  "email": "yash@example.com",
  "password": "123456"
}
```
