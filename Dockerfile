FROM node:alpine
WORKDIR /src/usr/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./src ./src
CMD ["npm", "start"]