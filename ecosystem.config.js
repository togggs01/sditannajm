require('dotenv').config();
const fs = require('fs');

// Check if standalone build exists
const useStandalone = fs.existsSync('.next/standalone/server.js');

module.exports = {
  apps: [{
    name: 'sdit-annajm',
    script: useStandalone ? '.next/standalone/server.js' : 'node_modules/next/dist/bin/next',
    args: useStandalone ? '' : 'start',
    cwd: './',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: process.env.DATABASE_URL
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
}
