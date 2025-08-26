# 🚀 Hoist Serverless Application Plan

## 🎯 Goal
Serverless app on EC2 with PostgreSQL, frontend on Cloudflare Pages

## 🏗️ Architecture
- **Frontend**: React + Vite → Cloudflare Pages
- **Backend**: Hono.js → EC2 with PM2
- **Database**: PostgreSQL on EC2
- **Email**: AWS SES

## 📋 Milestones

### 1. Simple Hono Backend ✅
**Goal**: Basic server running on EC2 with HTTPS
- Health endpoint: `GET /api/health`
- Test: `curl -k https://YOUR_EC2_IP/api/health`

### 2. Frontend on Cloudflare ✅
**Goal**: Frontend deployed with CORS
- Deploy to Cloudflare Pages
- Set env: `VITE_API_BASE_URL=https://YOUR_EC2_IP/api`
- Test: Health data displays on frontend

### 3. Deployment Automation ✅
**Goal**: One-command deployment
- Scripts: `deploy-backend.sh`, `deploy-frontend.sh`
- Test: Idempotent deployment process

### 4. PostgreSQL Integration ✅
**Goal**: Database with connection pooling
- MikroORM + PostgreSQL
- Health check includes: `SELECT COUNT(*) FROM users`
- Test: Fast queries (< 100ms)

### 5. AWS Email ✅
**Goal**: Email sending via SES
- Endpoint: `POST /api/email/send`
- Test: Email received at specified address

### 6. Passwordless Auth ✅
**Goal**: Email-based login with JWT
- Sign up/in with email
- JWT in localStorage
- Protected routes
- Test: Complete auth flow

## 🔧 Tech Stack
- **Backend**: Hono.js, MikroORM, PostgreSQL
- **Frontend**: React, Vite, Cloudflare Pages
- **Deployment**: PM2, Nginx, AWS SES
- **Auth**: JWT, passwordless email

## 💰 Cost
- Cloudflare Pages: Free
- EC2 t3.small: ~$16/month
- **Total**: ~$16/month

## 🚀 Next Steps
1. Set up EC2 with Node.js, PostgreSQL, PM2
2. Create basic Hono server with health endpoint
3. Deploy frontend to Cloudflare Pages
4. Add database integration
5. Implement email sending
6. Build authentication flow
