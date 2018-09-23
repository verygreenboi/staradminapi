FROM nginx:1.15.3-alpine

COPY ./config/proxy/angular/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY ./dist/client .
