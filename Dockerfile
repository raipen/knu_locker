FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies and react dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY .env ./
RUN mkdir /usr/src/app/react
COPY react/package*.json ./react/
RUN npm install -g pm2
RUN npm install

# Bundle app source
COPY . .

# build react app
RUN npm run build
EXPOSE 8080
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]