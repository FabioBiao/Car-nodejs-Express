const Car = require("../models/Car.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// endpoint to get list of cars
const getCars = async (req, res) => {
    res.status(StatusCodes.OK).json("here we will return a list of cars");
};

// endpoint to create car
const createCar = async (req, res) => {
    const { brand, price } = req.body;

    // set user, from authenticate
    const user = req.user;

    if (!brand || !price) {
        throw new CustomError.BadRequestError("Please provide all required fields");
    }

    const car = await Car.create({
        brand,
        price,
        user: user._id
    });
    console.log(car);

    res.status(StatusCodes.OK).json("created jobs");
};

module.exports = {
    getCars,
    createCar,
};
