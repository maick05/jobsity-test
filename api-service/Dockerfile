# image
FROM node:latest
# owner
LABEL maintainer="Maick Speck"
# app folder
COPY ./ ./
# working directoryd
WORKDIR /var/www/api-service 
# install
RUN npm install
#Solve lf header problem reinstaling bcrypt
RUN npm uninstall bcryptjs
RUN npm i bcryptjs
# start
ENTRYPOINT npm run start
# port
EXPOSE 3001
# CMD
CMD [ "sh", "-c", "npm install && npm run start" ]