const Car = require("../models/Car.model");
const Brand = require("../models/Brand.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// endpoint to get list of cars
const getCars = async (req, res) => {
    const { brand } = req.query;
    console.log(brand);
    console.log(req.query);

    const cars = await Car.find({ brand: brand });

    res.status(StatusCodes.OK).json({ carList: cars, count: cars.length });
};

// endpoint to create car
const createCar = async (req, res) => {
    const { brand, price, image, description, colors } = req.body;

    // set user, from authenticate
    const user = req.user;

    if (!brand || !price || !description) {
        throw new CustomError.BadRequestError("Please provide all required fields");
    }

    const car = await Car.create({
        brand,
        description,
        image,
        price,
        colors,
        user: user._id,
    });
    console.log(car);

    res.status(StatusCodes.OK).json("created Car");
};

// endpoint to delete car
const deleteCar = async (req, res) => {
    const { carId } = req.body;

    // const brand = await Product.findOne({ _id: productId });
    const car = await Car.findOne({ brandName: brandName });
    console.log(car);
    if (!car) {
        throw new CustomError.NotFoundError(`No Car found with name: ${car}`);
    }

    await Car.deleteOne();

    res.status(StatusCodes.OK).json({ msg: `Success! ${carId} removed.` });
};

// endpoint to add brand
const addBrand = async (req, res) => {
    const { brandName } = req.body;

    const brandAlreadyExists = await Brand.findOne({ brandName: brandName });
    if (brandAlreadyExists) {
        throw new CustomError.BadRequestError("Brand already exists");
    }

    const brand = await Brand.create({
        brandName,
    });

    // res.status(StatusCodes.OK).json(`brand ${brandName} created`);
    res.status(StatusCodes.CREATED).json({ brand: brand });
};

// endpoint to remove brand
const deleteBrand = async (req, res) => {
    const { brandName } = req.body;

    // const brand = await Product.findOne({ _id: productId });
    const brand = await Brand.findOne({ brandName: brandName });
    console.log(brand);
    if (!brand) {
        throw new CustomError.NotFoundError(`No Brand found with name: ${brandName}`);
    }

    await Brand.deleteOne();
    res.status(StatusCodes.OK).json({ msg: `Success! ${brandName} removed.` });
};

module.exports = {
    getCars,
    createCar,
    deleteCar,
    addBrand,
    deleteBrand,
};
