#!/bin/bash
set -e

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "===== 1. 构建前端 ====="
cd "$APP_DIR/frontend"
npm install
npm run build

echo "===== 2. 安装后端依赖 ====="
cd "$APP_DIR/backend"
uv sync --frozen

echo "===== 3. 配置 Nginx ====="
sed "s|__APP_DIR__|$APP_DIR|g" "$APP_DIR/deploy/nginx.conf" > /etc/nginx/sites-available/demo0
ln -sf /etc/nginx/sites-available/demo0 /etc/nginx/sites-enabled/demo0
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "===== 4. 配置 systemd ====="
sed "s|__APP_DIR__|$APP_DIR|g" "$APP_DIR/deploy/demo0-backend.service" > /etc/systemd/system/demo0-backend.service
systemctl daemon-reload
systemctl enable demo0-backend
systemctl restart demo0-backend