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
COPY ./assets/exec.sh ./
COPY ./backend/package* ./
COPY ./assets/nginx* /etc/nginx/
RUN cd /web && \
    yarn install && \
    apk add --no-cache nginx && \
    mkdir /run/nginx

COPY ./backend ./
RUN addgroup www && \
    adduser -D -H -G www www && \
    chmod -R 770 ./ && \
    chown -R www:www ./

EXPOSE 80

COPY --from=builder /web/build /var/www

ENTRYPOINT [ "sh", "exec.sh" ]