const { config } = require('dotenv');
const path = require('path');
const fs = require('fs');

// Mixed list of comments and variable descriptors
// - string entries are emitted as "# comment" lines
// - object entries are env var definitions with metadata
const ENV_VARS = [
  'DO NOT EDIT - THIS FILE IS GENERATED. See /backend/src/utils/envVars.js',
  '',
  'Ranked Choice Environment Variables',
  'Copy this file to .env and fill in your values',
  '',
  '==============================================================================',
  'BACKEND CONFIGURATION',
  '==============================================================================',
  '',
  'Server Configuration',
  { name: 'PORT', example: '3000', required: true },
  { name: 'NODE_ENV', example: 'production', required: false },
  { name: 'API_DOMAIN', example: 'ranked-choice-api.blurp.ca', required: true },
  { name: 'CORS_ORIGINS', example: 'https://ranked-choice.blurp.ca,https://ranked-choice-api.blurp.ca,http://localhost:3000,http://localhost:5173', required: true },
  '',
  'Database',
  { name: 'DATABASE_URL', example: 'postgresql://user:password@localhost:5432/ranked_choice', required: true },
  '',
  '==============================================================================',
  'CLOUDFLARE DNS UPDATE SCRIPT',
  '==============================================================================',
  '',
  'Cloudflare credentials for the DNS updater script (optional)',
  { name: 'CLOUDFLARE_ZONE_ID', example: 'your_zone_id_here', required: false },
  { name: 'CLOUDFLARE_API_TOKEN', example: 'your_api_token_here', required: false },
  { name: 'CLOUDFLARE_RECORD_ID', example: 'your_record_id_here', required: false },
];

function assertRequiredEnv() {
  const requiredNames = ENV_VARS.filter((e) => typeof e === 'object' && e.required).map((e) => e.name);
  const missing = requiredNames.filter((key) => !process.env[key] || String(process.env[key]).length === 0);
  if (missing.length > 0) {
    const message = `Missing required environment variables:\n${missing.map((k) => `- ${k}`).join('\n')}`;
    // eslint-disable-next-line no-console
    console.error(message);
    throw new Error(message);
  }
}

let cachedEnv = null;

function loadEnv() {
  const rootEnvPath = path.resolve(__dirname, '../../../.env');
  if (fs.existsSync(rootEnvPath)) {
    config({ path: rootEnvPath });
  }
}

function getEnv() {
  if (cachedEnv) return cachedEnv;
  loadEnv();
  generateExampleEnvFile();
  assertRequiredEnv();
  const values = Object.fromEntries(
    ENV_VARS
      .filter((e) => typeof e === 'object' && e.name)
      .map((e) => [e.name, process.env[e.name]])
  );
  cachedEnv = Object.freeze(values);
  return cachedEnv;
}

function generateExampleEnvContent() {
  const lines = [];
  for (const entry of ENV_VARS) {
    if (typeof entry === 'string') {
      if (entry === '') {
        lines.push('');
      } else {
        lines.push(`# ${entry}`);
      }
      continue;
    }
    if (entry.comment) {
      lines.push(`# ${entry.comment}`);
    }
    const value = entry.example != null ? String(entry.example) : '';
    lines.push(`${entry.name}=${value}`);
  }
  return lines.join('\n');
}

function generateExampleEnvFile() {
  const outPath = path.resolve(__dirname, '../../../example.env');
  const content = generateExampleEnvContent();
  fs.writeFileSync(outPath, `${content}\n`, 'utf-8');
}

module.exports = { ENV_VARS, assertRequiredEnv, getEnv, generateExampleEnvContent, generateExampleEnvFile };

// Allow running directly: `node backend/src/utils/envVars.js`
if (require.main === module) {
  try {
    // Load .env from repo root if present
    const repoRoot = path.resolve(__dirname, '../../..');
    const envPath = path.join(repoRoot, '.env');
    if (fs.existsSync(envPath)) {
      config({ path: envPath });
    }
    generateExampleEnvFile()
    assertRequiredEnv();
    // eslint-disable-next-line no-console
    console.log('All required environment variables are set.');
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}


