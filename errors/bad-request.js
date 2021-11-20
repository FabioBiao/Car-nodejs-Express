const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

// Class used when the request from the API is missing something
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
