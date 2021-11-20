const Job = require("../models/Job.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getJobs = async (req, res) => {
    res.status(StatusCodes.OK).json('jobs');
}

const createjob = async (req, res) => {
    res.status(StatusCodes.OK).json('created jobs');
}

module.exports = {
    getJobs,
    createjob
};
