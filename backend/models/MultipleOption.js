const mongoose = require("mongoose");



const multipleOption = new mongoose.Schema({
    options: {
        type: Array,
        require: true

    },
    question: {
        type: String,
        unique: true,
        require: true
    }

})

module.exports = mongoose.model("multipleOption", multipleOption);