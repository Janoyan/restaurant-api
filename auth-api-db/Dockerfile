FROM mongo:4.2.2
MAINTAINER jan

COPY provision/db/docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
RUN chown -R mongodb:mongodb /docker-entrypoint-initdb.d
