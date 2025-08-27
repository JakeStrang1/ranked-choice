# 🔄 Cloudflare DNS Auto-Update Setup

This guide helps you set up automatic DNS updates when your EC2 IP changes.

## Prerequisites
- Cloudflare account with `blurp.ca` domain
- DNS record for `ranked-choice-api.blurp.ca` already created
- EC2 instance with the update script

## Step 1: Get Cloudflare API Credentials

### Get Zone ID
1. **In Cloudflare Dashboard:**
   - Go to **blurp.ca** domain
   - Look for **Zone ID** in the right sidebar
   - Copy the Zone ID (looks like: `a1b2c3d4e5f6g7h8i9j0`)

### Create API Token
1. **In Cloudflare Dashboard:**
   - Go to **My Profile** → **API Tokens**
   - Click **Create Token**
   - Use **Custom token** template
   - **Permissions:**
     - Zone:Zone:Edit
     - Zone:Zone:Read
   - **Zone Resources:** Include: Specific zone → blurp.ca
   - **Token Name:** `ranked-choice-dns-update`
   - Click **Continue to summary** → **Create Token**
   - Copy the token (starts with `v1.0-`)

## Step 2: Get DNS Record ID

### Method A: Using Cloudflare API
```bash
# Replace ZONE_ID and API_TOKEN with your values
curl -X GET "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records?name=ranked-choice-api.blurp.ca" \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json"
```

**Look for the `id` field in the response.**

### Method B: Using Cloudflare Dashboard
1. **In Cloudflare Dashboard:**
   - Go to **DNS** → **Records**
   - Find the `ranked-choice-api.blurp.ca` record
   - Click **Edit**
   - Look at the URL: `https://dash.cloudflare.com/.../dns/records/...`
   - The last part is your Record ID

## Step 3: Configure Environment Variables

### Option A: Using top-level .env file (Recommended)
```bash
# Copy the example file
cp example.env .env

# Edit the .env file with your credentials
nano .env
```

Fill in your values:
```bash
# API Domain
API_DOMAIN=ranked-choice-api.blurp.ca

# Cloudflare Configuration
CLOUDFLARE_ZONE_ID=your_zone_id_here      # From Step 1
CLOUDFLARE_API_TOKEN=your_api_token_here   # From Step 1
CLOUDFLARE_RECORD_ID=your_record_id_here   # From Step 2
```

### Option B: Using system environment variables
```bash
# Set environment variables in your shell
export CLOUDFLARE_ZONE_ID="your_zone_id_here"
export CLOUDFLARE_API_TOKEN="your_api_token_here"
export CLOUDFLARE_RECORD_ID="your_record_id_here"
```

## Step 4: Test the Script

### If using .env file:
```bash
# Source the environment variables
source .env

# Test the script manually
./scripts/update-cloudflare-dns.sh
```

### If using system environment variables:
```bash
# Test the script manually (variables already set)
./scripts/update-cloudflare-dns.sh
```

**Expected output:**
```
[2025-08-07 15:30:00] Getting current EC2 public IP...
[2025-08-07 15:30:01] Current IP: 3.141.41.63
[2025-08-07 15:30:01] Getting current DNS record...
[2025-08-07 15:30:02] Current DNS IP: 3.141.41.63
[2025-08-07 15:30:02] IP has not changed. No update needed.
```

## Step 5: Set Up Startup DNS Update

### Option A: Systemd Service (Recommended)
```bash
# Create service file
sudo nano /etc/systemd/system/cloudflare-dns-update-ranked-choice.service
```

Add:
```ini
[Unit]
Description=Update Cloudflare DNS record on startup
After=network.target
Wants=network.target

[Service]
Type=oneshot
User=ubuntu
WorkingDirectory=/opt/ranked-choice
ExecStart=/bin/bash -c './scripts/update-cloudflare-dns.sh'
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```bash
# Enable the service
sudo systemctl daemon-reload
sudo systemctl enable cloudflare-dns-update-ranked-choice.service
```

## Step 6: Monitor the Updates

```bash
# Check systemd logs (if using systemd service)
sudo journalctl -u cloudflare-dns-update.service -f

# Check manual logs
tail -f /opt/ranked-choice/logs/dns-update.log

# Test DNS resolution
nslookup ranked-choice-api.blurp.ca

# Check service status
sudo systemctl status cloudflare-dns-update.service
```

## Troubleshooting

### Common Issues

**1. Permission Denied**
```bash
# Make script executable
chmod +x scripts/update-cloudflare-dns.sh
```

**2. API Token Invalid**
- Check token permissions
- Ensure token has Zone:Zone:Edit permission
- Verify zone is correct
- Check if environment variables are set correctly

**3. Record ID Not Found**
```bash
# List all DNS records
curl -X GET "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records" \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json"
```

**4. IP Not Updating**
```bash
# Check if script can get EC2 IP
curl -s http://169.254.169.254/latest/meta-data/public-ipv4
```

### Manual DNS Update
```bash
# Force update (ignores IP change check)
curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records/RECORD_ID" \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "A",
    "name": "ranked-choice-api.blurp.ca",
    "content": "YOUR_EC2_IP",
    "ttl": 1,
    "proxied": true
  }'
```

## Security Notes

- **API Token:** Keep your API token secure
- **Environment Variables:** Never commit `.env` files to git
- **Permissions:** Use minimal required permissions
- **Logs:** Monitor logs for unauthorized access
- **Backup:** Keep a backup of your DNS configuration

### .env File Security
```bash
# Add .env to .gitignore (if not already there)
echo "scripts/.env" >> .gitignore

# Set proper permissions on .env file
chmod 600 scripts/.env
```

## Benefits

- ✅ **Automatic IP updates** when EC2 restarts
- ✅ **Runs once on startup** (no continuous polling)
- ✅ **Fast DNS propagation** (Cloudflare's global network)
- ✅ **Reliable monitoring** with detailed logs
- ✅ **Resource efficient** (no cron jobs running continuously)

