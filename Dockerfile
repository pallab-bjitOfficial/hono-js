FROM node as build

WORKDIR /app
COPY package.json package-lock.json .env ./
RUN npm install
COPY . .
CMD [ "npm","run","build" ]

EXPOSE 3000

ENTRYPOINT [ "npm","run","start" ]