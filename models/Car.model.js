const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50,
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
        maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        default: 0,
    },
    image: {
        type: String,
        required: false,
        default: "/uploads/example.jpeg",
    },
    category: {
        type: String,
        required: [true, "Please provide product category"],
        enum: ["office", "kitchen", "bedroom"],
    },
    company: {
        type: String,
        required: [true, "Please provide company"],
        enum: {
            values: ["ikea", "liddy", "marcos"],
            message: "{VALUE} is not supported",
        },
    },
    colors: {
        type: [String],
        default: ["#222"],
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        //required: true,
        required: [true, "Please provide a user"],
    },
});

module.exports = mongoose.model("Car", CarsSchema);
