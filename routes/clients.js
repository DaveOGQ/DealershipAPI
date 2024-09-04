const express = require("express");
const router = express.Router();
const pool = require("../db.js"); // pool for database connection
const generateUniqueRandomId = require("./generateID.js"); //generate id function

//all routes from this file will be prefixed with the path "/clients" in server js thus "/" here is actually "/clients"

/* || HOME PATH ROUTE FOR GETTING ALL CLIENTS AND ADDING A NEW CLIENT || */
router
  .route("/")
  .get(async (req, res) => {
    try {
      result = await pool.query("SELECT * FROM client");

      //check result of rows selected
      result.rows.length > 0
        ? res.status(200).json(result.rows)
        : res.status(400).send("No clients exist");
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
      const { fname, lname, address, city, province_state, client_since } =
        req.body;

      //create new id for the user being added
      const id = generateUniqueRandomId();
      console.log("Generated ID:", id);

      result = await pool.query(
        "INSERT INTO client (client_id, fname, lname, address, city, province_state, client_since)VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [id, fname, lname, address, city, province_state, client_since]
      );

      //return the new generated id to the client
      res.status(200).json({ client_id: id });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  });

/* || ID  ROUTES, GETTING A SPECIFIC CLIENT AND DELETING ONE BY SPECIFIED ID || */
router
  .route("/:id")
  .get(async (req, res) => {
    /* GETS A SINGLE USER BY ID */
    try {
      result = await pool.query("SELECT * FROM client WHERE client_id = $1", [
        req.params.id,
      ]);
      result.rows.length > 0
        ? res.status(200).json(result.rows[0])
        : res.status(400).send("No clients exist with the given ID.");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  })
  .delete(async (req, res) => {
    try {
      result = await pool.query("DELETE FROM client WHERE client_id = $1", [
        req.params.id,
      ]);
      // check that rows are affected to verify succesfully operation
      result.rowCount > 0
        ? res
            .status(200)
            .send(`client with ID ${req.params.id} was deleted successfully.`)
        : res.status(400).send("No clients exist with the given ID.");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  });

/* || ADDRESS UPDATE  ROUTE || */
// router.put("/address", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { id, address } = req.body;

//     result = await pool.query(
//       "Update client SET address=$1 WHERE client_id=$2 ",
//       [address, id]
//     );

//     console.log(result.rowCount);

//     // check that rows are affected to verify succesfully operation
//     result.rowCount > 0
//       ? res
//           .status(200)
//           .send(`Address for client_id: ${id} was successfully updated!`)
//       : res
//           .status(400)
//           .send(
//             "Bad request: Missing or incorrect data provided for 'id' or 'address'."
//           );
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .send("An unexpected error occurred. Please try again later."); //SENDS STATUS TO CONSOLE AND CLIENT
//   }
// });

// /* || CITY UPDATE  ROUTE || */
// router.put("/city", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { id, city } = req.body;

//     result = await pool.query("Update client SET city=$1 WHERE client_id=$2 ", [
//       city,
//       id,
//     ]);

//     console.log(result.rowCount);

//     // check that rows are affected to verify succesfully operation
//     result.rowCount > 0
//       ? res
//           .status(200)
//           .send(`City for client_id: ${id} was successfully updated!`)
//       : res
//           .status(400)
//           .send(
//             "Bad request: Missing or incorrect data provided for 'id' or 'city'."
//           );
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .send("An unexpected error occurred. Please try again later."); //SENDS STATUS TO CONSOLE AND CLIENT
//   }
//   //run sql query for update into the clients
// });

// /* || PROVINCE/STATE UPDATE  ROUTE || */
// router.put("/province_state", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { id, province_state } = req.body;

//     result = await pool.query(
//       "Update client SET province_state=$1 WHERE client_id=$2 ",
//       [province_state, id]
//     );

//     // check that rows are affected to verify succesfully operation
//     result.rowCount > 0
//       ? res
//           .status(200)
//           .send(`Province/State for client_id: ${id} was successfully updated!`)
//       : res
//           .status(400)
//           .send(
//             "Bad request: Missing or incorrect data provided for 'id' or 'province_state'."
//           );
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .send("An unexpected error occurred. Please try again later.");
//   }
// });

// /* || Sign Up date UPDATE  ROUTE || */
// router.put("/client_since", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { id, client_since } = req.body;

//     result = await pool.query(
//       "Update client SET client_since=$1 WHERE client_id=$2 ",
//       [client_since, id]
//     );

//     console.log(result.rowCount);

//     // check that rows are affected to verify succesfully operation
//     result.rowCount > 0
//       ? res
//           .status(200)
//           .send(
//             `Number of vehicles sold for client_id: ${id} was successfully updated!`
//           )
//       : res
//           .status(400)
//           .send(
//             "Bad request: Missing or incorrect data provided for 'id' or 'client_since'."
//           );
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .send("An unexpected error occurred. Please try again later.");
//   }
// });

//USE PARAMS TO ALSO MAKE QURIES TO get the users first name and last name then log that? , before doing any consequent operations?
module.exports = router;
