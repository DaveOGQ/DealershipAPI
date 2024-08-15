require("dotenv").config(); // Load environment variables first
const express = require("express");
const pool = require("./db");

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  console.log("here");
  res.status(200).send("hi");
});

// Start the server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server has started on port ${port}`);
  }
});
