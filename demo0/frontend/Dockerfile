FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
# 复制前端静态文件到nginx默认静态资源目录(/usr/share/nginx/html)
COPY --from=build /app/dist /usr/share/nginx/html
# 删除镜像自带的默认配置文件
RUN rm /etc/nginx/conf.d/default.conf
