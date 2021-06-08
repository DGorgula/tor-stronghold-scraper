FROM node:latest
WORKDIR /scraper
COPY package.json .
RUN npm i
COPY . .
# COPY wait-for-it.sh .
RUN chmod +x ./wait-for-it.sh

CMD ["node", "index.js"]