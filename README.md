# ranked-choice
A simple site for setting up ranked choice polls 

## Usage
- Dev (root):
  - `npm run install:all`
  - `npm run dev` (starts backend + frontend)
- Backend only:
  - `cd backend && npm run dev`
- Frontend only:
  - `cd frontend && npm run dev`

## Set up
1) Environment
- Copy `example.env` to `.env` at repo root and fill values
- Validate: `cd backend && npm run check:env`

2) Backend
- `cd backend && npm run build`
- Start locally: `node dist/server.js`
- Health: `GET ${VITE_API_URL}/health`

3) Frontend
- Configure `frontend/.env` or `VITE_API_URL` as needed
- `cd frontend && npm run build && npm run preview`

## Deploy
Backend (EC2 + PM2)
- Copy production .env file to GitHub Secrets `BACKEND_ENV` 
- Push to `main` triggers deploy workflow for backend

Frontend (Cloudflare Pages)
- Copy production .env vars to Cloudflare Build Variables
- Push to `main` builds and deploys frontend

Notes
- DB migrations are run via CI (no boot-time migrations)
- Env variables are validated at startup; see `backend/src/utils/envVars.js`
