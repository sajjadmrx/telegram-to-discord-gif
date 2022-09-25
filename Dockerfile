FROM node:alpine
WORKDIR /usr/app
COPY package.json .

RUN npm install
COPY package.lock.json .


COPY . .


CMD ["npm","run","start"]