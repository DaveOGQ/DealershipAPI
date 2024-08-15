# DealershipAPI

Technologies: Expresss.js PostgreSQL Node.js Docker

The Project will have to docker containers, one containing the posrgreSQL database, the other containinng the express.js server and endpoints.

Ultimately you will be able use the Api endpoints to at a dealership to keep track of prospective clients,  sales agents, and  vehicles. One can monitor the vehicles that a clinet is interested in and also keep track of all the vehicles sold by sales agaents.

Initializing respository
  -create .env file for keeping secrets and add .env to gitignore
  -npm init -y
  -npm i express pg dotenv
  -npm i --save-dev nodemon
  -add this line to scripts ["devStart": "nodemon server.js"] then run with npm run devStart
