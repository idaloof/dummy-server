FROM node:18

WORKDIR /server

COPY package*.json .

RUN npm install

COPY app.js .

EXPOSE 1338

CMD ["npm", "start"]