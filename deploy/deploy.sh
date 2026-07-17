#!/usr/bin/env bash
# Deploy/update do app. Rodar como user deploy dentro de $APP_DIR.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/convivasaude}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

echo "==> git pull"
git fetch origin
git reset --hard "origin/$BRANCH"

echo "==> npm ci"
npm ci --omit=dev=false

echo "==> next build"
npm run build

echo "==> pm2 reload"
pm2 reload conviva || pm2 start deploy/ecosystem.config.cjs

echo
echo "OK deploy concluido."
pm2 status conviva
