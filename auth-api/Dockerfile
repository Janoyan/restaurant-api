FROM keymetrics/pm2:12-alpine
MAINTAINER jan

ADD . /tmp/auth-api/

RUN cd /tmp/auth-api && npm install && npm run build

RUN mkdir -p /var/www/auth-api
RUN cp -a /tmp/auth-api/node_modules /var/www/auth-api
RUN cp -a /tmp/auth-api/dist/* /var/www/auth-api
RUN cp /tmp/auth-api/pm2.config.json /var/www/auth-api

WORKDIR /var/www/auth-api

CMD ["pm2-runtime", "start", "pm2.config.json"]
