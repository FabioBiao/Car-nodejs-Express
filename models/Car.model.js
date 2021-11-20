const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({
    brand: {
        // type: mongoose.Schema.ObjectId,
        // ref: "Brand",
        // required: true,
        type: String,
        required: [true, "Please provide a Car Brand"],
        maxlength: [200, "Brand can not be more than 200 characters"],
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
    // category: {
    //     type: String,
    //     required: [true, "Please provide product category"],
    //     enum: ["office", "kitchen", "bedroom"],
    // },
    company: {
        type: String,
        required: [false, "Please provide company"],
        enum: {
            values: ["ikea", "liddy", "marcos"],
            message: "{VALUE} is not supported",
        },
    },
    colors: {
        type: [String],
        default: ["#222"],
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        //required: true,
        required: [true, "Please provide a user"],
    },
});

module.exports = mongoose.model("Car", CarsSchema);
