const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions, auth } = require("../middleware/authentication");

const { getCars, createCar, deleteCar, addBrand, deleteBrand } = require("../controllers/carsController");

router.get("/getCars", getCars);

router.route("/createCar").post(authenticateUser, createCar);
router.route("/deleteCar").post(authenticateUser, deleteCar);

router.route("/addBrand").post(authenticateUser, addBrand);
// router.route("/deleteBrand").post(authenticateUser, deleteBrand);
router.route("/deleteBrand").delete(authenticateUser, deleteBrand);


module.exports = router;
