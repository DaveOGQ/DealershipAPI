FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm cli
COPY . .
# CMD ["npm", "run", "devStart"]
CMD ["npm", "start"]
