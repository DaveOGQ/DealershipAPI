const express = require("express");
const router = express.Router();

//all routes from this file will be prefixed with the path "/users" in server js thus "/" here is actually "/users"

/* || HOME PATH ROUTE FOR GETTING ALL VEHICLES AND ADDING A NEW VEHICLE || */
router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM vehicle");

      result.rows.length > 0
        ? res.status(200).json(result.rows)
        : res.status(400).send("No vehicles exist.");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  })
  .post(async (req, res) => {
    try {
      const {
        vin,
        make,
        model,
        manufacture_year,
        kilometers,
        price,
        delivery_available,
        sold,
        body_type,
      } = req.body;

      const result = await pool.query(
        "INSERT INTO vehicle (vin, make, model, manufacture_year, kilometers, price, delivery_available, sold, body_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          vin,
          make,
          model,
          manufacture_year,
          kilometers,
          price,
          delivery_available,
          sold,
          body_type,
        ]
      );
      res.status(200).json({ vin });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  });

/* || VIN-SPECIFIC ROUTES FOR GETTING AND DELETING A VEHICLE || */
router
  .route("/:vin")
  .get(async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM vehicle WHERE vin = $1", [
        req.params.vin,
      ]);

      result.rows.length > 0
        ? res.status(200).json(result.rows[0])
        : res.status(400).send("No vehicle exists with the given VIN.");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await pool.query("DELETE FROM vehicle WHERE vin = $1", [
        req.params.vin,
      ]);

      result.rowCount > 0
        ? res
            .status(200)
            .send(
              `Vehicle with VIN ${req.params.vin} was deleted successfully.`
            )
        : res.status(400).send("No vehicle exists with the given VIN.");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("An unexpected error occurred. Please try again later.");
    }
  });

module.exports = router;
