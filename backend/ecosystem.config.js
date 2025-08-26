module.exports = {
  apps: [{
    name: 'ranked-choice-api',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
    },
    error_file: '/opt/ranked-choice/logs/err.log',
    out_file: '/opt/ranked-choice/logs/out.log',
    log_file: '/opt/ranked-choice/logs/combined.log',
    time: true
  }]
};
