require("dotenv").config(); // Load environment variables first
const express = require("express");
const pool = require("./db");

const port = process.env.LOCALHOST_PORT || 3000;

const app = express();
app.use(logger);

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  console.log("here");
  res.status(200).send("hi");
});

/* ROUTERS */
const routes = [
  { path: "/clients", router: require("./routes/clients") },
  { path: "/agents", router: require("./routes/agents") },
  { path: "/vehicles", router: require("./routes/vehicles") },
  { path: "/sold_vehicles", router: require("./routes/sold_vehicles") },
  {
    path: "/prospective_vehicles",
    router: require("./routes/prospective_vehicles"),
  },
];
// loops through each router and run the app.use() call so that the routes are utilized
routes.forEach((route) => app.use(route.path, route.router));

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

// Start the server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server has started on port ${port}`);
  }
});
