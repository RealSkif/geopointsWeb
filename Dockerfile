FROM nginx:alpine

COPY templates /usr/share/nginx/html

EXPOSE 80
