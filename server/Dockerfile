FROM node:16

WORKDIR /api

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 9000

CMD ["yarn", "start"]