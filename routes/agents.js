const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const generateUniqueRandomId = require("./generateID.js"); // Importing the function

//all routes from this file will be prefixed with the path "/users" in server js thus "/" here is actually "/users"

router
  .route("/")
  .get(async (req, res) => {
    try {
      result = await pool.query("SELECT * FROM agent");
      result.rows.length > 0
        ? res.status(200).json(result.rows)
        : res.status(400).send("No agents exist");
    } catch (err) {
      console.log(err);
      res.sendStatus(); //SENDS STATUS TO CONSOLE AND CLIENT
    }
  })
  .post(async (req, res) => {
    try {
      // Access the body content directly as an object
      console.log(req.body); // This will log the request body data
      const { fname, lname, address, city, province_state, vehicles_sold } =
        req.body;

      const id = generateUniqueRandomId();
      console.log("Generated ID:", id);

      result = await pool.query(
        "INSERT INTO agent (agent_id, fname, lname, address, city, province_state, vehicles_sold)VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [id, fname, lname, address, city, province_state, vehicles_sold]
      );

      // do something to check that the row was

      // Respond with a 200 status
      res.status(200).json({ agent_id: id });
    } catch (err) {
      console.error(err);
      res.status(500).send(`An error occured: ${err.detail}`);
    }
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
  .delete(async (req, res) => {
    try {
      result = await pool.query("DELETE FROM agent WHERE agent_id = $1", [
        req.params.id,
      ]);
      result.rowCount > 0
        ? res
            .status(200)
            .send(`Agent with ID ${req.params.id} was deleted successfully.`)
        : res.status(400).send("Agent not found");
    } catch (err) {
      console.log(err);
      res.sendStatus(); //SENDS STATUS TO CONSOLE AND CLIENT
    }
  });

router.put("/address", async (req, res) => {
  try {
    console.log(req.body);
    const { id, address } = req.body;

    result = await pool.query(
      "Update agent SET address=$1 WHERE agent_id=$2 ",
      [address, id]
    );

    console.log(result.rowCount);

    result.rowCount > 0
      ? res
          .status(200)
          .send(`Address for Agent_id: ${id} was successfully updated!`)
      : res.status(400).send("Address Update incomplete");
  } catch (err) {
    console.log(err);
    res.status(500).send(`An error occured: ${err.detail}`); //SENDS STATUS TO CONSOLE AND CLIENT
  }

  //run sql query for update into the agents
});

router.put("/city", async (req, res) => {
  try {
    console.log(req.body);
    const { id, city } = req.body;

    result = await pool.query("Update agent SET city=$1 WHERE agent_id=$2 ", [
      city,
      id,
    ]);

    console.log(result.rowCount);

    result.rowCount > 0
      ? res
          .status(200)
          .send(`City for Agent_id: ${id} was successfully updated!`)
      : res.status(400).send("City Update incomplete");
  } catch (err) {
    console.log(err);
    res.status(500).send(`An error occured: ${err.detail}`); //SENDS STATUS TO CONSOLE AND CLIENT
  }
  //run sql query for update into the agents
});

router.put("/province_state", async (req, res) => {
  try {
    console.log(req.body);
    const { id, province_state } = req.body;

    result = await pool.query(
      "Update agent SET province_state=$1 WHERE agent_id=$2 ",
      [province_state, id]
    );

    console.log(result.rowCount);

    result.rowCount > 0
      ? res
          .status(200)
          .send(`Province/State for Agent_id: ${id} was successfully updated!`)
      : res.status(400).send("Province/State Update incomplete");
  } catch (err) {
    console.log(err);
    res.status(500).send(`An error occured: ${err.detail}`); //SENDS STATUS TO CONSOLE AND CLIENT
  }
});

router.put("/vehicles_sold", async (req, res) => {
  try {
    console.log(req.body);
    const { id, vehicles_sold } = req.body;

    result = await pool.query(
      "Update agent SET vehicles_sold=$1 WHERE agent_id=$2 ",
      [vehicles_sold, id]
    );

    console.log(result.rowCount);

    result.rowCount > 0
      ? res
          .status(200)
          .send(
            `Number of vehicles solde for Agent_id: ${id} was successfully updated!`
          )
      : res.status(400).send("Province/State Update incomplete");
  } catch (err) {
    console.log(err);
    res.status(500).send(`An error occured: ${err.detail}`); //SENDS STATUS TO CONSOLE AND CLIENT
  }
});

//USE PARAMS TO ALSO MAKE QURIES TO get the users first name an dlast name then log that? , before doing any consequent operations?
module.exports = router;
