###
### Builder for frontend
###
FROM node:slim as builder

WORKDIR /web
COPY ./frontend/package* /web
RUN yarn install

COPY ./frontend ./
RUN yarn build

###
### Runner
###
FROM node:alpine

RUN apk add python3 build-base

WORKDIR /web
COPY ./backend/package* ./
RUN yarn install

COPY ./backend ./

COPY --from=builder /web/build /web/src/client/build

CMD [ "yarn", "production" ]