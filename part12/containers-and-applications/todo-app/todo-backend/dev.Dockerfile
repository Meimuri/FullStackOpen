FROM node:18
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=todo-backend:*


USER node
CMD npm run dev

# Build: docker build -f ./dev.Dockerfile -t todo-backend-dev .