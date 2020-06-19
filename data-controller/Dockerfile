FROM keymetrics/pm2:12-alpine
MAINTAINER jan

RUN apk add --no-cache python build-base

ADD . /tmp/data-controller/

RUN cd /tmp/data-controller && npm install && npm run build

RUN mkdir -p /var/www/data-controller
RUN cp -a /tmp/data-controller/node_modules /var/www/data-controller
RUN cp -a /tmp/data-controller/dist/* /var/www/data-controller
RUN cp /tmp/data-controller/pm2.config.json /var/www/data-controller

WORKDIR /var/www/data-controller

CMD ["pm2-runtime", "start", "pm2.config.json"]
