FROM keymetrics/pm2:12-alpine
MAINTAINER jan

ADD . /tmp/restaurant-api/

RUN cd /tmp/restaurant-api && npm install && npm run build

RUN mkdir -p /var/www/restaurant-api
RUN cp -a /tmp/restaurant-api/node_modules /var/www/restaurant-api
RUN cp -a /tmp/restaurant-api/dist/* /var/www/restaurant-api
RUN cp /tmp/restaurant-api/pm2.config.json /var/www/restaurant-api

WORKDIR /var/www/restaurant-api

CMD ["pm2-runtime", "start", "pm2.config.json"]
