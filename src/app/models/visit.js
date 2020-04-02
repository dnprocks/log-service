const mongoose = require("../database");

const VisitSchema = new mongoose.Schema(
{
        date: {
            type: Date,
            require: true
        },
        serviceOrder: {
            type: String,
            require: true
        },
        place: {
            type: String,
            require: true
        },
        situation: {
            type: String,
            require: true
        },
        brand: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);


const Visit = mongoose.model("Visit", VisitSchema);

module.exports = Visit;
