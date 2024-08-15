const express = require("express");
const router = express.Router();

//all routes from this file will be prefixed with the path "/users" in server js thus "/" here is actually "/users"

router.get("/", (req, res) => {
  res.send("Sold Vehicle list");
});

module.exports = router;
