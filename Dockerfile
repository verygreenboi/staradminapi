FROM nginx:1.15.3-alpine

COPY ./config/proxy/angular/nginx.conf /etc/nginx/nginx.conf

