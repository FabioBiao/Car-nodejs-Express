const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions, auth } = require("../middleware/authentication");

const { getCars, createCar } = require("../controllers/carsController");

router.get("/getCars", getCars);

router.route("/createCar").post(authenticateUser, createCar);
// router.route("/createCar").post(createCar);


module.exports = router;
