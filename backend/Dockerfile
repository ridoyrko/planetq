# Builder
FROM node:18.4-alpine AS builder
WORKDIR /app

RUN apk update && apk add bash curl npm && rm -rf /var/cache/apk/*

# Download node-prune
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

COPY package*.json ./
RUN npm i

COPY . .

RUN npm prune --production
RUN /usr/local/bin/node-prune

# Minimalistic image
FROM useparagon/ts-node


WORKDIR /app
RUN npm i moment
COPY --from=builder /app ./

RUN mkdir /musicdata
EXPOSE 8080
ENTRYPOINT [ "ts-node", "./src/server.ts" ]