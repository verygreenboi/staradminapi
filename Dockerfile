FROM nginx:1.15.3-alpine

COPY ./dist/client/ /usr/share/nginx/html/
