const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 30,
    },
});

// RoleSchema.create({ size: "small" }, function (err, small) {
//     if (err) return handleError(err);
//     // saved!
// });

module.exports = mongoose.model("Role", RoleSchema);
