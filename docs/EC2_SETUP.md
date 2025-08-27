# 🚀 EC2 Backend Setup Guide

## Prerequisites
- EC2 instance running Ubuntu 22.04 LTS
- SSH access to EC2 instance
- Cloudflare Origin Certificate for `ranked-choice-api.blurp.ca`
- Origin certificate files (`.pem` and `.key`)
- Domain `ranked-choice-api.blurp.ca` pointing to your EC2 IP

## Step 1: EC2 Initial Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install basic tools
sudo apt install curl git -y

# Create application directory
sudo mkdir -p /opt/ranked-choice
sudo chown $USER:$USER /opt/ranked-choice

```bash
# Clone repository (replace with your repo URL)
cd /opt/ranked-choice
git clone <your-repo-url> ./

# Create logs directory
sudo mkdir -p /opt/ranked-choice/logs
sudo chown $USER:$USER /opt/ranked-choice/logs
```

# Make sure ssh user can act as the appropriate psql user
```bash
sudo nano /etc/postgresql/*/main/pg_ident.conf

# Add this line to pg_ident.conf:
# MAPNAME     SYSTEM-USERNAME         PG-USERNAME
jake_map      ubuntu                  jake

# Edit pg_hba.conf to enable ident authentication
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Add/modify this line in pg_hba.conf:
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             jake                                   ident map=jake_map

# Restart PostgreSQL
sudo systemctl restart postgresql

# Test the connection
psql -U jake -d ranked_choice
```

## Step 2: Application Setup

# Install backend dependencies
cd backend
npm install
npm run build

# Set up environment variables
cd /opt/ranked-choice
cp example.env .env
nano .env
```

**Edit the `.env` file with your configuration:**
```bash
# Backend Configuration
# ...
```

## Step 3: PM2 Configuration

```bash
# Start application with PM2
cd /opt/ranked-choice/backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Verify PM2 is running
pm2 status
pm2 logs ranked-choice-api
```

## Step 4: Initial Nginx Configuration (HTTP)

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/backend
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name ranked-choice-api.blurp.ca;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t
sudo systemctl restart nginx
```

## Step 5: SSL Certificate Setup

### Upload Certificate Files

```bash
# On EC2 server
sudo mkdir -p /etc/ssl/private
sudo nano /etc/ssl/certs/ranked-choice-api.pem
# Paste your origin certificate content (.pem file)

sudo nano /etc/ssl/private/ranked-choice-api.key
# Paste your origin private key content (.key file)
```

### Set Proper Permissions
```bash
# Set secure permissions
sudo chmod 644 /etc/ssl/certs/ranked-choice-api.pem
sudo chmod 600 /etc/ssl/private/ranked-choice-api.key
sudo chown root:root /etc/ssl/certs/ranked-choice-api.pem
sudo chown root:root /etc/ssl/private/ranked-choice-api.key
```

## Step 6: HTTPS Nginx Configuration

```bash
# Update Nginx config for HTTPS
sudo nano /etc/nginx/sites-available/backend
```

Replace with:
```nginx
server {
    listen 80;
    server_name ranked-choice-api.blurp.ca;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ranked-choice-api.blurp.ca;
    
    # Cloudflare Origin Certificate (separate files)
    ssl_certificate /etc/ssl/certs/ranked-choice-api.pem;
    ssl_certificate_key /etc/ssl/private/ranked-choice-api.key;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## Step 7: Cloudflare DNS Configuration

### Enable Cloudflare Proxy
1. **In Cloudflare Dashboard:**
   - Go to **DNS settings**
   - Find the `ranked-choice-api.blurp.ca` record
   - **Click the orange cloud icon** (enable proxy)

## Step 8: Test Deployment

```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://ranked-choice-api.blurp.ca/api/health

# Test HTTPS from external (should work with Cloudflare proxy)
curl https://ranked-choice-api.blurp.ca/api/health

# Expected response:
# {"status":"ok","timestamp":"...","service":"ranked-choice-api"}

# View backend logs for debugging
pm2 logs ranked-choice-api --lines 50
```

## Step 9: Firewall Setup

```bash
# Allow HTTP, HTTPS, and SSH
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Step 10: Update CORS Configuration

Update your backend CORS to include the new domain:
```typescript
// backend/src/middleware/cors.ts
export const corsMiddleware = cors({
  origin: [
    'https://ranked-choice.blurp.ca',
    'https://ranked-choice-api.blurp.ca',
    'http://localhost:3001',
    'http://localhost:5173'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
```

## Deployment Commands

```bash
# Deploy updates
cd /opt/ranked-choice
git pull origin main
cd backend
npm install
npm run build
pm2 restart ranked-choice-api

# View logs
pm2 logs ranked-choice-api
pm2 monit

# Check status
pm2 status
sudo systemctl status nginx
```

## Troubleshooting

### Check Certificate Chain
```bash
# Verify certificate chain is being served
echo | openssl s_client -connect localhost:443 -servername localhost 2>/dev/null | grep -c "BEGIN CERTIFICATE"
# Expected: 2 (your cert + Cloudflare root cert)

# Check certificate details
echo | openssl s_client -connect localhost:443 -servername localhost 2>/dev/null | openssl x509 -noout -subject -issuer
```

### Check Services
```bash
# Check PM2 logs
pm2 logs ranked-choice-api --lines 50

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check application status
pm2 status
sudo systemctl status nginx

# Restart services
pm2 restart ranked-choice-api
sudo systemctl restart nginx
```

### SSL Certificate Issues
```bash
# Test with Cloudflare root certificate
curl --cacert /etc/ssl/certs/cloudflare-origin-ca.pem https://localhost/api/health

# Test with -k flag (bypass verification)
curl -k https://localhost/api/health
```

## Important Notes

### Wildcard Certificate Limitations
- `*.blurp.ca` covers: `api.blurp.ca`, `ranked-choice-api.blurp.ca`, `test.blurp.ca`
- `*.blurp.ca` does **NOT** cover: `api.ranked-choice.blurp.ca`, `sub.domain.blurp.ca`

### Cloudflare Proxy Benefits
- ✅ **Trusted SSL certificates** (no client-side certificate management)
- ✅ **DDoS protection**
- ✅ **Global CDN**
- ✅ **Automatic HTTPS termination**

### Final Configuration
- **Domain:** `ranked-choice-api.blurp.ca`
- **Endpoint:** `https://ranked-choice-api.blurp.ca/api/health`
- **Cloudflare Proxy:** Enabled with SSL Flexible mode
- **Backend:** Running on EC2 with PM2
- **SSL:** Cloudflare Origin Certificate with proper chain
