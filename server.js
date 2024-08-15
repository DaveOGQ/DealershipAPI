require("dotenv").config(); // Load environment variables first
const express = require("express");
const pool = require("./db");

const port = process.env.LOCALHOST_PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  console.log("here");
  res.status(200).send("hi");
});

const clientRouter = require("./routes/clients");

const agentRouter = require("./routes/agents");
app.use("/clients", clientRouter);
app.use("/agents", agentRouter);

// Start the server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server has started on port ${port}`);
  }
});
