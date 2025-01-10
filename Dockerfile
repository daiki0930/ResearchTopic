FROM node:22-slim

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]