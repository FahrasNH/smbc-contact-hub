# SMBC Contact Hub

Contact directory CRUD app built for the SMBC frontend challenge.

## Stack

- React 19 + Vite
- Redux Toolkit
- Tailwind CSS v4
- Axios
- Vitest + React Testing Library
- Random User Generator API

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
| `VITE_API_BASE_URL` | `https://randomuser.me` |

## Deploy

Deploy to Vercel with the same environment variables.

## API

Project ini menggunakan [Random User Generator](https://randomuser.me/api/?results=30) sebagai data source.

```
GET https://randomuser.me/api/?results=30&seed=smbc-hub
```

Karena Random User Generator hanya mendukung `GET`, semua operasi mutasi (create, update, delete) ditangani sepenuhnya di sisi klien menggunakan strategi **localStorage overlay**:

- Data awal di-fetch dari `/api/?results=30&seed=smbc-hub` (seed tetap agar data konsisten setiap reload)
- Create, update, delete disimpan di `localStorage` dan di-merge ke data server saat fetch
