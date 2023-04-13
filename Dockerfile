FROM mongo

ENV MONGO_INITDB_ROOT_USERNAME artshvecz
ENV MONGO_INITDB_ROOT_PASSWORD Lrn7S40vv6e4KLcp
ENV MONGO_INITDB_DATABASE capsule-rest

COPY ./init-mongo.js /docker-entrypoint-initdb.d/

RUN apt-get update && apt-get install -y mongodb-clients