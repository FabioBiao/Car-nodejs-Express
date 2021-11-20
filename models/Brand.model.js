const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: [true, "Please provide Brand Name"],
    },
});

module.exports = mongoose.model("Brand", BrandSchema);