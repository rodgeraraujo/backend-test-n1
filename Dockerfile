FROM node:14.16.1-alpine

WORKDIR /app

COPY package*.json ./

# Install deps
RUN npm install && npm cache clean --force

COPY . .

RUN ls

EXPOSE 3000

CMD npm run migration:run && npm run dev
