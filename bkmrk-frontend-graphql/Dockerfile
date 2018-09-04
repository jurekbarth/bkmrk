FROM node:9.4.0

LABEL maintainer="post@jurekbarth.de"

COPY ./ ./app
WORKDIR /app

RUN npm install

RUN npm run build

FROM nginx:latest
COPY --from=0 /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf


RUN touch /var/run/nginx.pid && \
  chown -R www-data:www-data /var/run/nginx.pid && \
  chown -R www-data:www-data /var/cache/nginx && \
  chown -R www-data:www-data /usr/share/nginx/html


EXPOSE 8080
USER www-data

CMD nginx -g 'daemon off;'
