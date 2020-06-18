FROM keymetrics/pm2:12-alpine
MAINTAINER jan

ADD . /tmp/data-provider/

RUN cd /tmp/data-provider && npm install && npm run build

RUN mkdir -p /var/www/data-provider
RUN cp -a /tmp/data-provider/node_modules /var/www/data-provider
RUN cp -a /tmp/data-provider/dist/* /var/www/data-provider
RUN cp /tmp/data-provider/pm2.config.json /var/www/data-provider

WORKDIR /var/www/data-provider

CMD ["pm2-runtime", "start", "pm2.config.json"]
