# SMBC Contact Hub

Contact directory CRUD app built for the SMBC frontend challenge.

## Stack

- React 19 + Vite
- Redux Toolkit
- Tailwind CSS v4
- Axios
- Vitest + React Testing Library
- JSONPlaceholder Users API

## Features

- Create, read, update, delete contacts
- Real-time search filter
- Sort by name (A→Z / Z→A) or last updated
- Pagination
- Design aligned with next-users (Fluid Admin tokens)
- Local persistence for mutations via `localStorage`

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

## Deploy

Deploy to Vercel with the same environment variables.

## API

Project ini menggunakan [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) sebagai data source.

API Heroku yang tercantum di soal challenge (`contact.herokuapp.com`) sudah tidak dapat diakses (deprecated / down). Sebagai gantinya, app ini menggunakan JSONPlaceholder dengan strategi **localStorage overlay**:

- `GET /users` tetap diambil dari JSONPlaceholder
- Operasi POST, PUT, DELETE hanya disimulasikan oleh JSONPlaceholder (tidak benar-benar persist di server)
- Semua mutasi (create, update, delete) disimpan di `localStorage` browser agar data konsisten saat reload

Arsitektur adapter memungkinkan penggantian data source cukup dengan mengubah `VITE_API_PROVIDER` tanpa menyentuh kode UI.
