FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY dist/fork-join-demo/ .

RUN chown -R nginx /var/log/nginx /var/cache/nginx /var/run \
     && chgrp -R 0 /etc/nginx \
     && rm /etc/nginx/conf.d/default.conf

USER nginx


