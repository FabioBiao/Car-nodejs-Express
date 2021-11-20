const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connect to MongoDB.");
            initial();
        })
        .catch((err) => {
            console.error("Connection error", err);
            process.exit();
        });
};

module.exports = connectDB;

// SET DB tables
function initial() {
    console.log("initial");
    
    // set roles on DB
    setRoles();
}

// set Roles
function setRoles() {
    const db = {
        mongoose: mongoose,
        user: require("../models/User.model"),
        role: require("../models/Role.model"),
        ROLES: ["user", "admin", "moderator"]
    };
    // db.mongoose = mongoose;
    // db.user = require("../models/User.model");
    // db.role = require("../models/Role.model");
    // db.ROLES = ["user", "admin", "moderator"];

    const Role = db.role;
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}