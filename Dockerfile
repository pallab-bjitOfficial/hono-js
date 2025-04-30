# Base image
FROM node:22.15.0-alpine3.21 AS build

RUN npm install -g typescript

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .
COPY .env.example .env

RUN npm run build

# This stage is used to run the application in production mode
FROM node:22.15.0-alpine3.21

WORKDIR /app

COPY --from=build /app/.env .
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

ENTRYPOINT [ "node","dist/index.js" ]