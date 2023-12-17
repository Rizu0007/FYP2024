const mongoose = require("mongoose");

const sandwichTransactionSchema = new mongoose.Schema(
    {
        network: {
            type: String,
        },
        time: {
            type: Date,
        },
    },
    { timestamps: true }
);

const SandwichTransactionModel = mongoose.model("sandwichTransaction", sandwichTransactionSchema);

module.exports = SandwichTransactionModel;