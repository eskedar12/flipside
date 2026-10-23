# Flipside

A full-stack coin-flip decision app. Type two options, flip the coin, and Flipside picks one and saves the decision to your history.

I’m building this project to learn full-stack development deeply, step by step, writing and understanding every file myself and using AI as a tutor instead of a code generator.


## Features

- Register and log in with a secure account (passwords are hashed with bcrypt, sessions use JWT)
- Enter two options and flip an animated coin
- Each decision is saved to your personal history
- View and delete your past decisions

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
├── .gitignore
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── schema.sql
│   └── src/
│       ├── index.js
│       ├── app.js
│       ├── db.js
│       ├── middleware/        auth.js, errorHandler.js
│       ├── routes/            auth.routes.js, decisions.routes.js
│       └── controllers/       auth.controller.js, decisions.controller.js
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api.js
        ├── AuthContext.jsx
        ├── pages/             Register.jsx, Login.jsx, Flip.jsx, History.jsx
        └── components/        Coin.jsx, ProtectedRoute.jsx
```

## Database

Two tables:
- **users**: `id`, `email` (unique), `password_hash`, `created_at`
- **decisions**: `id`, `user_id` (references `users`, deleted along with the user), `option_a`, `option_b`, `result`, `created_at`
