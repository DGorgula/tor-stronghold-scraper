FROM node:16-alpine
WORKDIR /server
COPY package.json .
RUN npm i --silent
COPY . .

CMD [ "node", "index.js" ]