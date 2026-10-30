# Flipside

A full-stack coin-flip decision app. Type two options, flip the coin, and Flipside picks one and saves the decision to your history.

I'm building this project to learn full-stack development deeply, step by step, writing and understanding every file myself and using AI as a tutor instead of a code generator.

**Live demo:** coming soon

## Screenshots

| Login | Flip | History |
|---|---|---|
| ![Login page](docs/login.png) | ![Flip page](docs/flip.png) | ![History page](docs/history.png) |

## Features

- Register and log in (passwords are hashed with bcrypt, sessions use JWT)
- Enter two options and flip an animated 3D coin
- Every decision is saved to your personal history
- View and delete your past decisions
- Each user only ever sees and deletes their own data
- Automatic logout when a login token expires
- Rate limiting on login and register to slow down password guessing
- Light and dark mode that follows the device setting

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Auth | bcrypt, JSON Web Tokens (JWT) |

## Project structure

```
flipside/
├── package.json               build and start scripts for deployment
├── .gitignore
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── schema.sql             creates the users and decisions tables
│   └── src/
│       ├── index.js           starts the server
│       ├── app.js             Express app, routes, production static serving
│       ├── db.js              PostgreSQL connection pool
│       ├── middleware/        auth.js, errorHandler.js, rateLimit.js
│       ├── routes/            auth.routes.js, decisions.routes.js
│       └── controllers/       auth.controller.js, decisions.controller.js
└── frontend/
    ├── package.json
    ├── vite.config.js         dev server and proxy to the backend
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api.js             all calls to the backend
        ├── AuthContext.jsx    who is logged in
        ├── pages/             Login.jsx, Register.jsx, Flip.jsx, History.jsx
        └── components/        Coin.jsx, Nav.jsx, ProtectedRoute.jsx
```

## API

| Method | URL | Login required | What it does |
|---|---|---|---|
| POST | `/api/auth/register` | no | create an account |
| POST | `/api/auth/login` | no | log in, returns a token |
| POST | `/api/decisions` | yes | save a decision |
| GET | `/api/decisions` | yes | list your decisions |
| DELETE | `/api/decisions/:id` | yes | delete one of your decisions |

## Database

- **users**: `id`, `email` (unique), `password_hash`, `created_at`
- **decisions**: `id`, `user_id` (references `users`, deleted along with the user), `option_a`, `option_b`, `result`, `created_at`

The flip result is chosen in the browser and sent to the backend, which validates and stores it.

## Getting started

### Prerequisites

- Node.js
- PostgreSQL

### 1. Create the database

```sql
CREATE DATABASE flipside;
```

Then run `backend/schema.sql` against the `flipside` database (for example in pgAdmin's Query Tool, or with `psql`).

### 2. Configure the backend

Copy `backend/.env.example` to `backend/.env` and fill in your own values:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/flipside
JWT_SECRET=a_long_random_secret
PORT=5000
```

Never commit `.env` to Git.

### 3. Install and run

In one terminal:

```
cd backend
npm install
npm run dev
```

In a second terminal:

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The frontend dev server forwards `/api` requests to the backend on port 5000.

## Running in production mode

In production, the backend also serves the built frontend, so the whole app runs as one service on one address.

```
npm run build
```

Then start it with `NODE_ENV=production` set, plus `DATABASE_URL` and `JWT_SECRET`:

```
npm start
```

Set `DATABASE_SSL=true` if your hosted database requires SSL.

## Progress

- [x] Folder structure
- [x] PostgreSQL database and schema
- [x] Backend: database connection
- [x] Backend: register and login
- [x] Backend: create, list, and delete decisions
- [x] Backend: validation, error handling, rate limiting
- [x] Frontend: auth pages and protected routes
- [x] Frontend: flip page with coin animation
- [x] Frontend: history page
- [x] Styling and dark mode
- [ ] Deployment
