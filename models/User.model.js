const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(re.test(email));

    return re.test(email);
};

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [false, "Please provide name"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide email"],
        validate: [validateEmail, "Please fill a valid email address"],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    verified: Date,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
});

UserSchema.pre("save", async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// UserSchema.methods.createJWT = function () {
//     return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_LIFETIME,
//     });
// };

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

// log timings
UserSchema.pre("find", function () {
    this._startTime = Date.now();
});

// log timings
UserSchema.post("find", function () {
    if (this._startTime != null) {
        console.log("Runtime in MS: ", Date.now() - this._startTime);
    }
});

// log timings
UserSchema.pre("findOne", function () {
    this._startTime = Date.now();
});

// log timings
UserSchema.post("findOne", function () {
    if (this._startTime != null) {
        console.log("findOne Runtime in MS: ", Date.now() - this._startTime);
    }
});

module.exports = mongoose.model("User", UserSchema);
