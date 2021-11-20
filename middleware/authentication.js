const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors");
const UnauthenticatedError = require("../errors/unauthenticated");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
    // console.log("debug authenticateUser");
    // console.log(req.signedCookies);
    // console.log("Cookies: ");
    // console.log(req.cookies);
    // console.log("Header: ");
    // console.log(req.headers);
    let { refreshToken, accessToken, token } = req.signedCookies;
    console.log(refreshToken, accessToken, token);

    // let { refreshToken, accessToken } = req.headers;
    console.log("debug authenticateUser");
    console.log(req.signedCookies);
    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken);
            // console.log('inside access token');
            // console.log(payload);
            req.user = payload.user;
            return next();
        }

        req.user = payload.user;
        next();
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
};

module.exports = { authenticateUser };
