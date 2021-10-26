FROM node:12 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
