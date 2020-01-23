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
    yarn install

COPY ./backend ./
COPY ./assets/exec.sh ./
COPY ./assets/nginx* /etc/nginx/

COPY --from=builder /web/build /web/src/client/build

ENTRYPOINT [ "sh", "exec.sh" ]