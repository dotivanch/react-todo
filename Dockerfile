###
### Builder for frontend
###
FROM node:slim as builder

WORKDIR /web
COPY ./frontend/package* /web
RUN cd /web && \
    yarn install

COPY ./frontend ./
RUN yarn build

###
### Runner
###
FROM node:alpine

WORKDIR /web
COPY ./backend/package* ./
RUN cd /web && \
    yarn install && \
    apk add --no-cache nginx && \
    mkdir /run/nginx

COPY ./backend ./
RUN addgroup www && \
    adduser -D -H -G www www && \
    chmod -R 770 ./ && \
    chown -R www:www ./
COPY ./assets/exec.sh ./
COPY ./assets/nginx* /etc/nginx/

COPY --from=builder /web/build /var/www

ENTRYPOINT [ "sh", "exec.sh" ]