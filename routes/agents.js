const express = require("express");
const router = express.Router();
const pool = require("../db.js"); // pool for database connection
const generateUniqueRandomId = require("./generateID.js"); //generate id function

//all routes from this file will be prefixed with the path "/users" in server js thus "/" here is actually "/users"

/* || HOME PATH ROUTE FOR GETTING ALL USERS AND ADDING A NEW USER || */
router
  .route("/")
  .get(async (req, res) => {
    try {
      result = await pool.query("SELECT * FROM agent");

      //check result of rows selected
      result.rows.length > 0
        ? res.status(200).json(result.rows)
        : res.status(400).send("No agents exist");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body);

      //destructure the req.body object
      const { fname, lname, address, city, province_state, vehicles_sold } =
        req.body;

      //create new id for the user being added
      const id = generateUniqueRandomId();
      console.log("Generated ID:", id);

      result = await pool.query(
        "INSERT INTO agent (agent_id, fname, lname, address, city, province_state, vehicles_sold)VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [id, fname, lname, address, city, province_state, vehicles_sold]
      );

      //return the new generated id to the client
      res.status(200).json({ agent_id: id });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  });

/* || ID  ROUTES, GETTING A SPECIFIC AGENT AND DELETING ONE BY SPECIFIED ID || */
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
        : res.status(400).send("No agents exist with the given ID.");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  })
  .delete(async (req, res) => {
    try {
      result = await pool.query("DELETE FROM agent WHERE agent_id = $1", [
        req.params.id,
      ]);
      // check that rows are affected to verify succesfully operation
      result.rowCount > 0
        ? res
            .status(200)
            .send(`Agent with ID ${req.params.id} was deleted successfully.`)
        : res.status(400).send("No agents exist with the given ID.");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  });

/* || ADDRESS UPDATE  ROUTE || */
router.put("/address", async (req, res) => {
  try {
    console.log(req.body);
    const { id, address } = req.body;

    result = await pool.query(
      "Update agent SET address=$1 WHERE agent_id=$2 ",
      [address, id]
    );

    console.log(result.rowCount);

    // check that rows are affected to verify succesfully operation
    result.rowCount > 0
      ? res
          .status(200)
          .send(`Address for Agent_id: ${id} was successfully updated!`)
      : res
          .status(400)
          .send(
            "Bad request: Missing or incorrect data provided for 'id' or 'address'."
          );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later."); //SENDS STATUS TO CONSOLE AND CLIENT
  }
});

/* || CITY UPDATE  ROUTE || */
router.put("/city", async (req, res) => {
  try {
    console.log(req.body);
    const { id, city } = req.body;

    result = await pool.query("Update agent SET city=$1 WHERE agent_id=$2 ", [
      city,
      id,
    ]);

    console.log(result.rowCount);

    // check that rows are affected to verify succesfully operation
    result.rowCount > 0
      ? res
          .status(200)
          .send(`City for Agent_id: ${id} was successfully updated!`)
      : res
          .status(400)
          .send(
            "Bad request: Missing or incorrect data provided for 'id' or 'city'."
          );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later."); //SENDS STATUS TO CONSOLE AND CLIENT
  }
  //run sql query for update into the agents
});

/* || PROVINCE/STATE UPDATE  ROUTE || */
router.put("/province_state", async (req, res) => {
  try {
    console.log(req.body);
    const { id, province_state } = req.body;

    result = await pool.query(
      "Update agent SET province_state=$1 WHERE agent_id=$2 ",
      [province_state, id]
    );

    // check that rows are affected to verify succesfully operation
    result.rowCount > 0
      ? res
          .status(200)
          .send(`Province/State for Agent_id: ${id} was successfully updated!`)
      : res
          .status(400)
          .send(
            "Bad request: Missing or incorrect data provided for 'id' or 'province_state'."
          );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
  }
});

/* || NUMBER OF SOLD VEHICLES UPDATE  ROUTE || */
router.put("/vehicles_sold", async (req, res) => {
  try {
    console.log(req.body);
    const { id, vehicles_sold } = req.body;

    result = await pool.query(
      "Update agent SET vehicles_sold=$1 WHERE agent_id=$2 ",
      [vehicles_sold, id]
    );

    console.log(result.rowCount);

    // check that rows are affected to verify succesfully operation
    result.rowCount > 0
      ? res
          .status(200)
          .send(
            `Number of vehicles sold for Agent_id: ${id} was successfully updated!`
          )
      : res.status(400).send("Province/State Update incomplete");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
  }
});

//USE PARAMS TO ALSO MAKE QURIES TO get the users first name and last name then log that? , before doing any consequent operations?
module.exports = router;
