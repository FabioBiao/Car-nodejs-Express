const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
// const { BadRequestError, UnauthenticatedError } = require("../errors");
const crypto = require("crypto");

const { createJWT, isTokenValid } = require("../utils");

const register = async (req, res) => {
    const { email, password } = req.body;

    // console.log(User);

    const emailAlreadyExists = await User.findOne({ email });
    console.log(emailAlreadyExists);
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError("Email already exists");
    }

    const role = "user";

    // first registered user is an admin
    // const isFirstAccount = (await User.countDocuments({})) === 0;
    // const role = isFirstAccount ? "admin" : "user";

    const verificationToken = crypto.randomBytes(40).toString("hex");

    const user = await User.create({
        email,
        password,
        role,
        verificationToken,
    });

    // const token = user.createJWT();
    const token = await createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.email, role: user.role }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    // compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    // create token
    // const token = user.createJWT();
    const token = await createJWT({ payload: { user } });

    // set header if decide to use headers
    res.header("x-access-token", "" + token); // token=

    const oneDay = 1000 * 60 * 60 * 24;
    // set cookie
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // process.env.NODE_ENV === "production"
        signed: true,
        expires: new Date(Date.now() + oneDay),
    });

    console.log(user);
    // res.header('Access-Control-Expose-Headers', 'token')
    res.status(StatusCodes.OK).json({ user: { email: user.email }, token });
};

const logout = async (req, res) => {
    // await Token.findOneAndDelete({ user: req.user.userId });

    res.cookie("accessToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    // res.cookie("refreshToken", "logout", {
    //     httpOnly: true,
    //     expires: new Date(Date.now()),
    // });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
    register,
    login,
    logout,
};
