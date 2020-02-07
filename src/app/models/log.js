const mongoose = require("../database");

const LogSchema = new mongoose.Schema(
    {
        error: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;

