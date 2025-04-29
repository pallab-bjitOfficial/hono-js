# Base image
FROM node:22.15.0-alpine3.21 AS build

RUN npm install -g typescript

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .
COPY .env.example .env

RUN npm run build

# Linting stage
# This stage is used to run the linter and formatter
FROM build AS lint

WORKDIR /app

CMD [ "sh", "-c", "npm run format:write && npm run lint:fix" ]

# Production stage
# This stage is used to run the application in production mode
FROM node:22.15.0-alpine3.21

WORKDIR /app

COPY --from=lint /app/.env .
COPY --from=lint /app/dist ./dist
COPY --from=lint /app/package.json .
COPY --from=lint /app/package-lock.json .
COPY --from=lint /app/node_modules ./node_modules

EXPOSE 3000

ENTRYPOINT [ "npm","start" ]