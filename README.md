# Netflix Clone – Kiwi Connect Digital Internship Task

## Project Overview

This project was built as part of the **Kiwi Connect Digital Internship Selection Task**.

The application is a Netflix-inspired movie streaming platform built using **React.js** for the frontend and **Node.js + Express.js** for the backend.

---

## Live Demo

### Frontend Deployment

https://netflix-clone-chi-topaz.vercel.app/browse?category=top-rated

### Backend API

https://netflix-clone-u4wm.onrender.com

---

## Features

### Frontend

* Responsive Design (Desktop & Mobile)
* Netflix-inspired UI
* Hero Banner Section
* Movie & Series Rows
* Search Functionality
* React Router Navigation
* Loading States
* Modern Netflix Styling
* Dynamic Movie Categories

### Backend

* REST API built with Express.js
* Authentication APIs
* Movie Data APIs
* Error Handling Middleware
* Modular Route Structure

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Redux Toolkit
* Tailwind CSS
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* CORS
* dotenv

---

## API Endpoints

### Authentication

#### Register User

POST /register

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login User

POST /login

Request Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

### Movies

#### Get All Movies

GET /movies

#### Get Movie By ID

GET /movies/:id

Example:

GET /movies/1

---

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_BASE_URL=https://netflix-clone-u4wm.onrender.com
```

### Backend (.env)

```env
CLIENT_URL=https://netflix-clone-chi-topaz.vercel.app
NODE_ENV=production
```

---

## Project Structure

```text
## Project Structure

```text
Netflix-clone/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

```

---

## Evaluation Requirements Covered

✅ Responsive UI

✅ Hero Banner

✅ Movie Rows

✅ Search Functionality

✅ React Router

✅ Reusable Components

✅ Backend APIs

✅ Error Handling

✅ Live Deployment

✅ Documentation

---

## Author

Yash Chhalotre

Frontend Developer | React.js Developer
