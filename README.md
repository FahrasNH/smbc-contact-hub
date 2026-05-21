# SMBC Contact Hub

Contact directory CRUD app built for the SMBC frontend challenge.

## Stack

- React 19 + Vite
- Redux Toolkit
- Tailwind CSS v4
- Axios
- Vitest + React Testing Library
- JSONPlaceholder Users API (Heroku contact API unavailable)

## Features

- Create, read, update, delete contacts
- Real-time search filter
- Design aligned with next-users (Fluid Admin tokens)
- Local persistence for mutations (JSONPlaceholder does not persist writes)

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Tests with coverage report |

## Environment

| Variable | Default |
|----------|---------|
| `VITE_API_PROVIDER` | `jsonplaceholder` |
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` |

Set `VITE_API_PROVIDER=heroku` if the Heroku contact API is restored.

## Deploy

Deploy to Vercel with the same environment variables.

## API note

POST, PUT, and DELETE against JSONPlaceholder simulate success only. Created, updated, and deleted contacts are stored in browser `localStorage` so the UI stays consistent across reloads.
