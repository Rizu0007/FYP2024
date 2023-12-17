const mongoose = require("mongoose");
const { networkChain } = require("../utils/enums");

const botSessionSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
    },
    botStarted: {
      type: Boolean,
      default: false,
    },
    network: {
      type: String,
      enum: Object.values(networkChain),
    },
    botStopped: {
      type: Boolean,
      default: false,
    },
    randomTime: {
      type: Date
    }
  },
  { timestamps: true }
);

const BotSessionModel = mongoose.model("botSession", botSessionSchema);

module.exports = BotSessionModel;
