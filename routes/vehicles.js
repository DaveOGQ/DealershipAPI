const express = require("express");
const router = express.Router();

//all routes from this file will be prefixed with the path "/users" in server js thus "/" here is actually "/users"

/* || HOME PATH ROUTE FOR GETTING ALL VEHICLES AND ADDING A NEW VEHICLE || */
router.route("/").get(async (req, res) => {
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
});

module.exports = router;
