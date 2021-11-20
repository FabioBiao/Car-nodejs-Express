const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions, auth } = require("../middleware/authentication");

const { getJobs, createjob } = require("../controllers/jobsController");

router.get("/getJobs", getJobs);
router.route("/createJob").get(authenticateUser, createjob);

module.exports = router;
