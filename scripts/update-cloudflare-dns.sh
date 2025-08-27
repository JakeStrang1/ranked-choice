#!/bin/bash

# Cloudflare DNS Auto-Update Script
# Updates ranked-choice-api.blurp.ca DNS record when EC2 IP changes

# Log function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Load environment variables from top-level .env file
if [ -f "../.env" ]; then
    source ../.env
    log "Loaded environment from ../.env"
elif [ -f ".env" ]; then
    source .env
    log "Loaded environment from .env"
else
    warning "No .env file found"
fi

# Configuration - Set these environment variables
ZONE_ID="${CLOUDFLARE_ZONE_ID}"
API_TOKEN="${CLOUDFLARE_API_TOKEN}"
RECORD_ID="${CLOUDFLARE_RECORD_ID}"
DOMAIN="${API_DOMAIN}"


# Debug: Show configuration (without sensitive data)
log "Configuration:"
log "  Domain: $DOMAIN"
log "  Zone ID: ${ZONE_ID:0:8}..."  # Show first 8 chars
log "  Record ID: ${RECORD_ID:0:8}..."  # Show first 8 chars
log "  API Token: ${API_TOKEN:0:8}..."  # Show first 8 chars


# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

# Check if required environment variables are set
if [ -z "$CLOUDFLARE_ZONE_ID" ] || [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_RECORD_ID" ]; then
    error "Please set the required environment variables:"
    error "  - CLOUDFLARE_ZONE_ID: Your Cloudflare Zone ID"
    error "  - CLOUDFLARE_API_TOKEN: Your Cloudflare API Token"
    error "  - CLOUDFLARE_RECORD_ID: Your DNS Record ID"
    error ""
    error "Example:"
    error "  export CLOUDFLARE_ZONE_ID='your_zone_id'"
    error "  export CLOUDFLARE_API_TOKEN='your_api_token'"
    error "  export CLOUDFLARE_RECORD_ID='your_record_id'"
    exit 1
fi

# Get current EC2 public IP
log "Getting current EC2 public IP..."
CURRENT_IP=$(curl -s https://checkip.amazonaws.com/)

if [ $? -ne 0 ]; then
    error "Failed to get current IP address"
    error "curl exit code: $?"
    error "Trying alternative method..."
    CURRENT_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
    if [ $? -ne 0 ] || [ -z "$CURRENT_IP" ]; then
        error "Alternative method also failed"
        exit 1
    fi
    log "Got IP using alternative method"
fi

if [ -z "$CURRENT_IP" ]; then
    error "Failed to get current IP address"
    exit 1
fi

log "Current IP: $CURRENT_IP"

# Get current DNS record
log "Getting current DNS record..."
DNS_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json")

if [ $? -ne 0 ]; then
    error "Failed to get DNS record"
    error "curl exit code: $?"
    exit 1
fi

# Debug: Show API response (truncated for security)
log "DNS API Response:"
log "  Status: $(echo "$DNS_RESPONSE" | grep -o '"success":[^,]*' || echo 'unknown')"
log "  Response length: ${#DNS_RESPONSE} characters"

# Extract current DNS IP
# Try jq first (more reliable for JSON parsing)
if command -v jq >/dev/null 2>&1; then
    CURRENT_DNS_IP=$(echo "$DNS_RESPONSE" | jq -r '.result.content // empty')
    log "Using jq for JSON parsing"
else
    # Fallback to grep (works with the actual response structure)
    CURRENT_DNS_IP=$(echo "$DNS_RESPONSE" | grep -o '"content":"[^"]*"' | cut -d'"' -f4)
    log "Using grep for JSON parsing"
fi

if [ -z "$CURRENT_DNS_IP" ]; then
    error "Failed to extract current DNS IP"
    error "DNS Response preview:"
    echo "$DNS_RESPONSE" | head -3 | while read line; do
        error "  $line"
    done
    exit 1
fi

log "Current DNS IP: $CURRENT_DNS_IP"

# Check if IP has changed
if [ "$CURRENT_IP" = "$CURRENT_DNS_IP" ]; then
    log "IP has not changed. No update needed."
    exit 0
fi

log "IP has changed. Updating DNS record..."

# Update DNS record
log "Updating DNS record..."
UPDATE_RESPONSE=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"A\",
    \"name\": \"$DOMAIN\",
    \"content\": \"$CURRENT_IP\",
    \"ttl\": 1,
    \"proxied\": true
  }")

# Debug: Show update response
log "Update API Response:"
log "  Status: $(echo "$UPDATE_RESPONSE" | grep -o '"success":[^,]*' || echo 'unknown')"
log "  Response length: ${#UPDATE_RESPONSE} characters"

# Check if update was successful
if echo "$UPDATE_RESPONSE" | grep -q '"success":true'; then
    log "DNS record updated successfully!"
    log "New IP: $CURRENT_IP"
else
    error "Failed to update DNS record"
    error "Update Response preview:"
    echo "$UPDATE_RESPONSE" | head -5 | while read line; do
        error "  $line"
    done
    exit 1
fi

log "DNS update complete!"
