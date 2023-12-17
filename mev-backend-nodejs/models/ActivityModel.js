const mongoose = require("mongoose");
const { activityType, transactionStatus, networkChain } = require("../utils/enums");

const activitySchema = new mongoose.Schema(
    {
        walletAddress: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(activityType),
        },
        activityMessage: {
            type: String,
            required: true,
        },
        network: {
            type: String,
            enum: Object.values(networkChain),
        },
        amount: {
            type: Number,
        },
        txHash: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(transactionStatus),
        }
    },
    { timestamps: true }
);

const ActivityModel = mongoose.model("activity", activitySchema);

module.exports = ActivityModel;
