const express = require("express");
const router = express.Router();
const generateUniqueRandomId = require("./generateID.js"); // Importing the function

//all routes from this file will be prefixed with the path "/clients" in server js thus "/" here is actually "/clients"

router.get("/", (req, res) => {
  const id = generateUniqueRandomId();
  console.log("Generated ID:", id);
  res.send(`Client list and generated id ${id}`);
});

module.exports = router;
