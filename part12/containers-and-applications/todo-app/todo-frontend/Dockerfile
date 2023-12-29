FROM node:18 AS testing

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN CI=true npm test

# Build after testing

FROM node:18 AS build

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm ci

RUN npm run build

RUN npm install -g serve

EXPOSE 5001

CMD ["serve", "build"]