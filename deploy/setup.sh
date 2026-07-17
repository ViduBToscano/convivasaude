#!/usr/bin/env bash
# Setup inicial da VPS (rodar uma vez como root). Ubuntu 24.04.
set -euo pipefail

DOMAIN="${DOMAIN:-convivasaude.com.br}"
APP_USER="${APP_USER:-deploy}"
APP_DIR="/var/www/convivasaude"
NODE_MAJOR="20"

echo "==> 1. Update sistema"
apt update && apt upgrade -y

echo "==> 2. Pacotes base"
apt install -y curl ca-certificates gnupg git nginx ufw fail2ban

echo "==> 3. Node $NODE_MAJOR via NodeSource"
curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
apt install -y nodejs
npm i -g pm2

echo "==> 4. User $APP_USER"
if ! id -u "$APP_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$APP_USER"
  usermod -aG sudo "$APP_USER"
fi

echo "==> 5. Dirs"
mkdir -p "$APP_DIR" /var/log/conviva /var/www/certbot
chown -R "$APP_USER:$APP_USER" "$APP_DIR" /var/log/conviva

echo "==> 6. Firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> 7. SSH hardening"
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config || true
# Note: só desativa password quando user $APP_USER tiver chave SSH configurada
echo "ATENCAO: PasswordAuthentication mantido ate confirmar acesso por chave"

echo "==> 8. Fail2ban basic"
systemctl enable --now fail2ban

echo "==> 9. Certbot"
apt install -y certbot python3-certbot-nginx

echo
echo "OK. Proximo passo:"
echo "  1. Adicione chave SSH em /home/$APP_USER/.ssh/authorized_keys"
echo "  2. Su $APP_USER, clone repo em $APP_DIR"
echo "  3. cp .env.example .env.production e edita variaveis"
echo "  4. npm ci && npm run build"
echo "  5. pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup"
echo "  6. cp deploy/nginx.conf /etc/nginx/sites-available/$DOMAIN"
echo "     ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
echo "     nginx -t && systemctl reload nginx"
echo "  7. certbot --nginx -d $DOMAIN -d www.$DOMAIN"
