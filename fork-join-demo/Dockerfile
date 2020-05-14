FROM nginx:alpine

COPY /tmp/workspace/cicd/cicd-banking-app-pipeline/fork-join-demo/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY dist/fork-join-demo/ .

RUN chmod -R 777 /var/log/nginx /var/cache/nginx /var/run \
     && chgrp -R 0 /etc/nginx \
     && chmod -R g+rwX /etc/nginx \
     && rm /etc/nginx/conf.d/default.conf

USER nginx


