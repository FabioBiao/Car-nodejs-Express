const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model("Job", JobsSchema);
