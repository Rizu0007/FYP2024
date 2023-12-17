const asyncHandler = require("express-async-handler");
const { userSuccessMessages } = require("../utils/responseMessages/success.js");
const { userErrorMessages } = require("../utils/responseMessages/error.js");
const {
  useErrorResponse,
  useSuccessResponse,
} = require("../utils/apiResponse/apiResponse.js");
const ethUtil = require("ethereumjs-util");

// Import model
const UserModel = require("../models/UserModel.js");
const BotActivityModel = require("../models/BotActivityModel.js");
const {
  botActivityMessages,
  botActivityType,
} = require("../utils/enums/index.js");

const generateBotActivity = asyncHandler(async (req, res) => {
  const { type, network } = req.body;

  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });

  if (type === botActivityType.botStarted) {
    const activity = await BotActivityModel.create({
      walletAddress: user.walletAddress,
      type: botActivityType.botStarted,
      botActivityMessage: botActivityMessages.BotStarted,
      network: network
    });

    return useSuccessResponse(res, "Bot Started Successfully", activity, 200);
  } else if (type === botActivityType.sandwichTransaction) {
    const activity = await BotActivityModel.create({
      walletAddress: user.walletAddress,
      type: botActivityType.sandwichTransaction,
      botActivityMessage: botActivityMessages.SandwichTransaction,
      network: network
    });

    return useSuccessResponse(
      res,
      "Sandwich Transation Successfully",
      activity,
      200
    );
  } else if (type === botActivityType.scanningMempool) {
    const activity = await BotActivityModel.create({
      walletAddress: user.walletAddress,
      type: botActivityType.scanningMempool,
      botActivityMessage: botActivityMessages.ScanningMemePool,
      network: network
    });

    return useSuccessResponse(
      res,
      "Scanned Mempool Successfully",
      activity,
      200
    );
  } else if (type === botActivityType.botStopped) {
    const activity = await BotActivityModel.create({
      walletAddress: user.walletAddress,
      type: botActivityType.botStopped,
      botActivityMessage: botActivityMessages.BotStopped,
      network: network
    });

    return useSuccessResponse(res, "Bot Stopped Successfully", activity, 200);
  }

  return useErrorResponse(res, "Error Creating Activity", 429);
});

const getUserBotActivity = asyncHandler(async (req, res) => {

  const { network } = req.body

  const walletAddress = req.user.walletAddress;

  const activity = await BotActivityModel.find({
    walletAddress: { $regex: new RegExp(`^${walletAddress}$`, "i") },
    network: network
  }).sort({ createdAt: -1 });

  if (!activity) {
    return useErrorResponse(res, "No Activity Found", 404);
  }

  return useSuccessResponse(
    res,
    "Bot Activity Fetched Successfully",
    activity,
    200
  );
});

module.exports = {
  getUserBotActivity,
  generateBotActivity,
};
