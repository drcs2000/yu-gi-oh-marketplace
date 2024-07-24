FROM node:16.20.2

WORKDIR /app-backend

COPY package* .

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run"]
CMD ["dev"]