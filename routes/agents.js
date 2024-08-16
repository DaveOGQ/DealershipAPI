const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const generateUniqueRandomId = require("./generateID.js"); // Importing the function

//all routes from this file will be prefixed with the path "/users" in server js thus "/" here is actually "/users"

router.get("/", (req, res) => {
  const id = generateUniqueRandomId();
  console.log("Generated ID:", id);
  res.send(`Agent list and generated id ${id}`);
});

// a post to "/" would mena that a new user is being added,
//meaning the req body will contain all the information we need to create a user, and then id have to generate the id myself and then return that id for them to associate with that user

router
  .route("/:id")
  .get(async (req, res) => {
    /* GETS A SINGLE USER BY ID */
    try {
      result = await pool.query("SELECT * FROM agent WHERE agent_id = $1", [
        req.params.id,
      ]);
      result.rows.length > 0
        ? res.status(200).json(result.rows[0])
        : res.status(400).send("Agent not found");
    } catch (err) {
      console.log(err);
      res.sendStatus(); //SENDS STATUS TO CONSOLE AND CLIENT
    }
  })
  .delete((req, res) => {
    /* DELETES A SINGLE USER BY ID */
    const id = generateUniqueRandomId();
    console.log("Generated ID:", id);
    res.send(`Agent list and generated id ${id}`);
  });

//USE PARAMS TO ALSO MAKE QURIES TO get the users first name an dlast name then log that? , before doing any consequent operations?
module.exports = router;
