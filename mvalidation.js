const mongoose = require("mongoose");
const nameSchema = new mongoose.Schema({
    fName: {
        type: String,
        require: true,
        uppercase: true,
    },
    mName: {
        type: String,
        require: true,
        uppercase: true,
    },
    lName: {
        type: String,
        require: true,
        uppercase: true,
    },
    mailId: {
        type: String,
        require: true,
        lowercase: true,
    },
    num: {
        type: Number,
        require: true,
    },
    dob: {
        type: Date,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    univ: {
        type: String,
        require: true,

    },
    stfl: {
        type: String,
        enum: ["A", "D"],
        default: "A"
    }
});
module.exports = mongoose.model("formdetail", nameSchema);
