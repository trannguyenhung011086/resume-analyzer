FROM --platform=linux/amd64 node:lts-alpine
ENV NODE_ENV=production
USER node
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm run build
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD [ "node", "dist/index.js" ]
