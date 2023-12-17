const mongoose = require("mongoose");
const { networkChain, botActivityType } = require("../utils/enums");

const botActivitySchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(botActivityType),
    },
    botActivityMessage: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      enum: Object.values(networkChain),
    },
  },
  { timestamps: true }
);

const BotActivityModel = mongoose.model("botActivity", botActivitySchema);

module.exports = BotActivityModel;
