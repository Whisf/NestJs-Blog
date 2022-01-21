FROM node:14-alpine
RUN apk add --no-cache python2 g++ make

WORKDIR /app

ENV DATABASE_URL=postgresql://postgres:156327@localhost:5432/mydb?schema=public

COPY package*.json ./
COPY ./prisma ./prisma

RUN npm install 

COPY . .


CMD ["node", "dist/src/main"]