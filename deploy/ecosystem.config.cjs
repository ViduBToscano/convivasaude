// pm2 config. Uso: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "conviva",
      cwd: "/var/www/convivasaude",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      max_memory_restart: "500M",
      error_file: "/var/log/conviva/error.log",
      out_file: "/var/log/conviva/out.log",
      merge_logs: true,
      time: true,
    },
  ],
}
