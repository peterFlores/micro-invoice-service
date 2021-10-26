FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf
RUN npm install -g phantomjs --unsafe-perm
RUN npm install html-pdf
RUN npm install @sendgrid/mail
RUN npm install axios form-data mustache
RUN npm i puppeteer
RUN npm i puppeteer-core
RUN npm i handlebars puppeteer
RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
