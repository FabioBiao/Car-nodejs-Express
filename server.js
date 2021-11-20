require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();


["log", "warn", "error"].forEach((methodName) => {
    const originalMethod = console[methodName];
    console[methodName] = (...args) => {
        let initiator = "unknown place";
        try {
            throw new Error();
        } catch (e) {
            if (typeof e.stack === "string") {
                let isFirst = true;
                for (const line of e.stack.split("\n")) {
                    const matches = line.match(/^\s+at\s+(.*)/);
                    if (matches) {
                        if (!isFirst) {
                            // first line - current function
                            // second line - caller (what we are looking for)
                            initiator = matches[1];
                            break;
                        }
                        isFirst = false;
                    }
                }
            }
        }
        originalMethod.apply(console, [...args, "\n", `  at ${initiator}`]);
    };
});

// rest of the packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

// DB setup
const connectDB = require("./config/db.config.js");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const carsRouter = require("./routes/cars");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Security stuff
app.use(cookieParser(process.env.JWT_SECRET));
var corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
};
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());
app.use(mongoSanitize());

app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()); // parse requests of content-type - application/json

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware); // if route not found
app.use(errorHandlerMiddleware); // catch all errors

// set port, listen for requests
const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.info(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
