FROM node:20

# Create app directory
WORKDIR /usr/src

COPY . .

# build react app
RUN npm install
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 8080
