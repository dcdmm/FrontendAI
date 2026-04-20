#!/bin/bash
set -e

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ROOT="/var/www/demo0"

echo "===== 1. 构建前端 ====="
cd "$APP_DIR/frontend"
npm install
npm run build

echo "===== 2. 部署静态文件到$WEB_ROOT ====="
mkdir -p "$WEB_ROOT"
rsync -a --delete "$APP_DIR/frontend/dist/" "$WEB_ROOT/"
chown -R www-data:www-data "$WEB_ROOT"

echo "===== 3. 安装后端依赖 ====="
cd "$APP_DIR/backend"
uv sync --frozen

echo "===== 4. 配置Nginx ====="
cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/demo0
ln -sf /etc/nginx/sites-available/demo0 /etc/nginx/sites-enabled/demo0
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "===== 5. 配置systemd ====="
sed "s|__APP_DIR__|$APP_DIR|g" "$APP_DIR/deploy/demo0-backend.service" > /etc/systemd/system/demo0-backend.service
systemctl daemon-reload
systemctl enable demo0-backend
systemctl restart demo0-backend

echo "===== 部署完成 ====="