FROM node:12.19.0-alpine3.9 

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /usr/src/app

COPY package*.json ./

USER node

RUN npm install 

COPY --chown=node:node . .

CMD ["node", "dist/main"]
