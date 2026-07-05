FROM node:20.19.2-alpine

USER node

WORKDIR /app

COPY ./dist/services/back-end /app
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "main.js"]
