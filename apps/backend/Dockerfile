FROM node:lts-alpine

COPY . /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm i

ENV NODE_ENV=production

RUN npm run build

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD [ "node", "dist/index.js" ]
