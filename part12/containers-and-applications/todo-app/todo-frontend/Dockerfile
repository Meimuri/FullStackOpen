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

RUN npm ci --only=production

RUN npm run build

RUN npm install -g serve

EXPOSE 5001

CMD ["serve", "build"]

# Build: docker build . -t todo-frontend
# Run: docker run -p 5173:3000 todo-frontend