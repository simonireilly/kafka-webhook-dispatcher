FROM node:11.15.0-alpine

RUN apk add --no-cache \
  git \
  autoconf \
  automake \
  bash \
  g++ \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  make \
  nasm

RUN yarn global add concurrently

WORKDIR /app
