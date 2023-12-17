const asyncHandler = require("express-async-handler");
const { userSuccessMessages } = require("../utils/responseMessages/success.js");
const { userErrorMessages } = require("../utils/responseMessages/error.js");
const {
  useErrorResponse,
  useSuccessResponse,
} = require("../utils/apiResponse/apiResponse");
const ethUtil = require("ethereumjs-util");

// Import model
const UserModel = require("../models/UserModel.js");
const BotSessionModel = require("../models/BotSession.js");
const ActivityModel = require("../models/ActivityModel.js");
const BotActivityModel = require("../models/BotActivityModel.js");
const {
  botActivityType,
  activityType,
  botActivityMessages,
  botActivityMessage,
} = require("../utils/enums/index.js");

const StartBotSession = asyncHandler(async (req, res) => {
  const { network } = req.body;

  const walletAddress = req.user.walletAddress;
  const randomTime = generateRandomTime();

  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });

  if (user.freeTierStatus === "expired" && user.licenseStatus == "expired") {
    return useErrorResponse(res, "license is expired", 429);
  }

  const activeSession = await BotSessionModel.findOne({
    walletAddress: walletAddress,
    botStarted: true,
    botStopped: false,
    network: network,
  });

  if (activeSession) {
    return useErrorResponse(res, "Bot is already active", 429);
  }

  const botSession = await BotSessionModel.create({
    walletAddress: walletAddress,
    botStarted: true,
    botStopped: false,
    network: network,
    randomTime: randomTime,
  });

  await BotActivityModel.create({
    walletAddress: walletAddress,
    type: botActivityType.botStarted,
    botActivityMessage: botActivityMessages.BotStarted,
    network: network
  });

  await ActivityModel.create({
    walletAddress: walletAddress,
    type: activityType.StartBot,
    activityMessage: botActivityMessage.Started,
    network: network
  });

  await BotActivityModel.create({
    walletAddress: walletAddress,
    type: botActivityType.scanningMempool,
    botActivityMessage: botActivityMessages.ScanningMemePool,
    network: network
  });

  return useSuccessResponse(
    res,
    "Bot session started successfully",
    botSession,
    200
  );
});

function generateRandomTime() {
  const randomMinutes = Math.floor(Math.random() * (240 - 120 + 1)) + 120;
  const currentTime = new Date();
  const randomTime = new Date(currentTime.getTime() + randomMinutes * 60000);
  return randomTime;
}


const StopBotSession = asyncHandler(async (req, res) => {
  const { network } = req.body;
  const walletAddress = req.user.walletAddress;
  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });

  if (user.freeTierStatus === "expired" && user.licenseStatus == "expired") {
    return useErrorResponse(res, "Free tier has expired", 429);
  }

  const activeSession = await BotSessionModel.findOne({
    walletAddress: walletAddress,
    botStarted: true,
    botStopped: false,
    network: network
  });

  if (!activeSession) {
    return useErrorResponse(res, "Bot is Already Stopped", 429);
  }

  activeSession.botStopped = true;
  activeSession.save();

  await BotActivityModel.create({
    walletAddress: walletAddress,
    type: botActivityType.botStopped,
    botActivityMessage: botActivityMessages.BotStopped,
    network: network
  });

  await ActivityModel.create({
    walletAddress: walletAddress,
    type: activityType.StopBot,
    activityMessage: botActivityMessage.Stopped,
    network: network
  });

  return useSuccessResponse(
    res,
    "Bot session stopped successfully",
    activeSession,
    200
  );
});

module.exports = {
  StartBotSession,
  StopBotSession,
};
