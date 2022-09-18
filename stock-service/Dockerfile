# image
FROM node:latest
# owner
LABEL maintainer="Maick Speck"
# app folder
COPY . /
# working directoryd
WORKDIR /var/www/stock-service
# install
RUN npm install
# start
ENTRYPOINT npm run start
# port
EXPOSE 3002