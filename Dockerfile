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
RUN yarn install

COPY ./backend ./

COPY --from=builder /web/build /web/client/build

ENTRYPOINT [ "yarn", "production" ]