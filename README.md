# DealershipAPI

## Description

The Project will have to docker containers, one containing the posrgreSQL database, the other containinng the express.js server and endpoints.

Ultimately you will be able use the Api endpoints to at a dealership to keep track of prospective clients, sales agents, and vehicles. One can monitor the vehicles that a clinet is interested in and also keep track of all the vehicles sold by sales agaents.

## Technologies Used:

- Expresss.js
- PostgreSQL
- Node.js
- Docker
- Postman

### Getting Started

- Install Docker
- Install Postman(optional for testing api calls)
- Clone this repository
- setup .env file
- run command "docker compose up"
- access database and server routes through the ports that you defined in the .env file for your local machine
  - postman can be used to test api calls here if you dont have a forntend setup just yet

## Steps for starting this project

- create .env file for keeping secrets and add .env to gitignore
- npm init -y
- npm i express pg dotenv
- npm i --save-dev nodemon
- add this line to scripts ["devStart": "nodemon server.js"] then run with 'npm run devStart'(development)
- add this line to scripts ["start": "node server.js"] then run with 'npm start'(production)
- installing Postman to test Api calls
- install docker daemon to run docker containers

# Routes

The folowing routes are available and you can see the corresponding subroutes for each one in the routes folder.

    /agents
    /clients
    /vehicles
    /vehicles_sold
    /prospective_vehicles

Each route will have basic CRUD operations and more specific routes and queuries will be added in future iterations.

# Docker Information

- For development purposes uncomment the Dockerfile command, and console.log() statements

  - CMD ["npm", "run", "devStart"]

- For production keep the default "
  - CMD ["npm", "run", "start"]

### Continous Development

#### local development

for local developement add the following variables to the .env file and rename them accoringly in db.js

    DB_HOST=localhost
    DB_PORT=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=

#### docker develepment

The dockerfile and docker compsose files can be cofigured to update the containers upon any saved changes.

- For development purposes uncomment the Dockerfile command, docker-compose volumes line for the api and console.log() statements in the routes files

  - CMD ["npm", "run", "devStart"] in Dockerfile
  - volumes: .:/usr/src/app in docker-compose.yml

- For production keep the default
  - CMD ["npm", "run", "start"]

## Creating and Running Docker Containers

- When running the .yml file for the first time the init.sql file will be used to setup the databse.
- Afterwards any changes made within the databse will be persited within the mounted volume managed by docker.
- The .yml file depends on your enviroment variables so ensure those are setup on your local machine.

### Run Docker container

    docker compose up

Access the server and db at the ports you define below.

# .env file

    POSTGRESDB_USER= db user
    POSTGRESDB_ROOT_PASSWORD= db password
    POSTGRESDB_DATABASE= db name

    POSTGRESDB_LOCAL_PORT= db port on local machine
    POSTGRESDB_DOCKER_PORT= db port in docker container

    NODE_LOCAL_PORT = server port on local machine
    NODE_DOCKER_PORT= server port in container

Note: Make sure to map ports accordingly if you have applications running on default ports in your local machine, namely 5432 which is the default postgress port or 5000 which apple air receiver on mac now runs on.

# PostgreSql

- ### init.sql
  - This file setup up for database the first time you run the docker containers, if you want to add to the database feel free to do so and add the corresponding routes
