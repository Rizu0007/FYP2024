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
const generateToken = require("../utils/token/generateToken.js");
const { getBalance } = require("../service/ethBalance.js");
const { generateUniqueCode } = require("../service/referralCode.js");
const { formatElapsedTime } = require("../service/index.js");
const {
  freeTierStatus,
  licenseStatus,
  transactionStatus,
  WithDrawMessage,
  activityType,
} = require("../utils/enums/index.js");
const ActivityModel = require("../models/ActivityModel.js");
const BotSessionModel = require("../models/BotSession.js");

// Request: POST
// Route: POST /api/users/register
// Access: Public
const generateNonce = asyncHandler(async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return useErrorResponse(res, "Required fields not provided", 429);
    }
    const userExists = await UserModel.findOne({ walletAddress });

    if (userExists) {
      return useSuccessResponse(res, "User Already Exists", userExists, 200);
    }
    const newNonce = Math.floor(Math.random() * 1000000);
    const referralCode = await generateUniqueCode(walletAddress);
    const user = await UserModel.create({
      walletAddress: walletAddress,
      nonce: newNonce,
      arbBalance: 0,
      ethBalance: 0,
      freeTierStatus: freeTierStatus.Active,
      referralCode: referralCode,
      freeTierTime: Date.now(),
    });

    return useSuccessResponse(res, "User Registed Successfully", user, 200);
  } catch (err) {
    console.log(err);
    return useErrorResponse(res, err.message, 429);
  }
});

const signNonce = asyncHandler(async (req, res) => {
  const { signature, walletAddress } = req.body;

  if (!walletAddress && !signature) {
    return useErrorResponse(res, "Required fields not provided", 429);
  }

  const user = await UserModel.findOne({ walletAddress });
  if (user) {
    const msg = `Nonce: ${user.nonce}`;

    const msghex = ethUtil.bufferToHex(Buffer.from(msg));

    const msgBuffer = ethUtil.toBuffer(msghex);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signature);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addressBuffer = ethUtil.pubToAddress(publicKey);
    const address = ethUtil.bufferToHex(addressBuffer);

    if (address === user.walletAddress) {
      user.nonce = Math.floor(Math.random() * 1000000);
      user.save();
    }

    const token = generateToken(user._id, user.walletAddress);

    const { _id, walletAddress, arbBalance, ethBalance, nonce, referralCode } =
      user;
    return useSuccessResponse(
      res,
      "User Logged In Successfully",
      {
        _id,
        walletAddress,
        token,
        ethBalance,
        arbBalance,
        nonce,
        referralCode,
      },
      200
    );
  } else {
    return useErrorResponse(res, "User Not Found", 429);
  }
});

const getUserFreeTierTime = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });
  if (!user) {
    return useErrorResponse(res, "User not found", 429);
  }

  const currentTime = new Date();

  if (user.freeTierStatus === "expired" && user.licenseStatus !== "active") {
    const days = "00";
    const hours = "00";
    const minutes = "00";
    return useSuccessResponse(
      res,
      "User remaining time fetched successfully",
      { days, hours, minutes },
      200
    );
  }

  let remainingTime = 0;
  let activeStatus = "";

  if (user.freeTierStatus === "active") {
    const freeTierTime = new Date(user.freeTierTime);
    const freeTierElapsed = currentTime - freeTierTime;
    const freeTierRemaining = 15 * 24 * 60 * 60 * 1000 - freeTierElapsed;
    remainingTime += freeTierRemaining;
    activeStatus = "freeTier";
  }

  if (user.licenseStatus === "active") {
    const licenseTime = new Date(user.licenseTime);
    const licenseElapsed = currentTime - licenseTime;
    const licenseRemaining = calculateLicenseRemainingTime(
      user.licenseType,
      licenseElapsed
    );
    remainingTime += licenseRemaining;
    activeStatus = activeStatus === "freeTier" ? "both" : "license";
  }

  // Calculate remaining days, hours, and minutes
  const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

  return useSuccessResponse(
    res,
    "User remaining time fetched successfully",
    { days, hours, minutes, activeStatus },
    200
  );
});

function calculateLicenseRemainingTime(licenseType, elapsed) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  if (licenseType === "6Month") {
    const licenseDuration = 6 * 30 * millisecondsPerDay;
    return licenseDuration - elapsed;
  } else if (licenseType === "Yearly") {
    const licenseDuration = 365 * millisecondsPerDay;
    return licenseDuration - elapsed;
  }

  return 0;
}

const updateUserBalance = asyncHandler(async (req, res) => {
  const { amount, network } = req.body;
  console.log(amount);

  if (!amount) {
    return useErrorResponse(res, "Required fields not provided", 429);
  }
  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });
  if (!user) {
    return useErrorResponse(res, "User not found", 429);
  }

  // Convert the amount to a number and handle parsing errors
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return useErrorResponse(res, "Invalid amount provided", 429);
  }

  if (network === "arbitrum") {
    user.arbBalance = user.arbBalance + parsedAmount;
    await user.save();
  }

  if (network === "ethereum") {
    user.ethBalance = user.ethBalance + parsedAmount;
    await user.save();
  }

  // Save the updated user to the database

  return useSuccessResponse(res, "Balance Updated Successfully", user, 200);
});

const getUserBalance = asyncHandler(async (req, res) => {
  const { network } = req.body;

  console.log(network);

  const walletAddress = req.user.walletAddress;
  const user = await UserModel.findOne({
    walletAddress: { $regex: new RegExp(`^${walletAddress}$`, "i") },
  }).sort({ createdAt: -1 });
  if (!user) {
    return useErrorResponse(res, "User not Found", 429);
  }

  if (network === "arbitrum") {
    return useSuccessResponse(
      res,
      "Balance Fetched Successfully",
      user.arbBalance,
      200
    );
  }

  if (network === "ethereum") {
    return useSuccessResponse(
      res,
      "Balance Fetched Successfully",
      user.ethBalance,
      200
    );
  }

  return useErrorResponse(res, "Failed to fetch balance", 429);
});

const getUserBotStatus = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });

  if (!user) {
    return useErrorResponse(res, "User not Found", 429);
  }

  if (
    user.licenseStatus === licenseStatus.Active ||
    user.freeTierStatus === freeTierStatus.Active
  ) {
    return useSuccessResponse(res, "Your License is still Active", user, 200);
  } else if (
    user.licenseStatus === licenseStatus.Expired &&
    user.freeTierStatus === freeTierStatus.Expired
  ) {
    return useErrorResponse(res, "Your License is expired", 429);
  }
  return useErrorResponse(res, "Error Buying license", 429);
});

const getUserLicenseStatus = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });

  if (!user) {
    return useErrorResponse(res, "User not Found", 429);
  }

  const { licenseStatus, freeTierStatus } = user;
  return useSuccessResponse(
    res,
    "User License Status Fetched",
    { licenseStatus, freeTierStatus },
    200
  );
});

const userWithdrawBalance = asyncHandler(async (req, res) => {
  const { amount, network } = req.body;
  const walletAddress = req.user.walletAddress;
  const user = await UserModel.findOne({ walletAddress: walletAddress });
  if (!user) {
    return useErrorResponse(res, "User Not Found", 429);
  }

  if (network === "arbitrum") {
    user.arbBalance -= amount;
    user.arbBalance = user.arbBalance.toFixed(2);
    await user.save();
  }

  if (network === "ethereum") {
    user.ethBalance -= amount;
    user.ethBalance = user.ethBalance.toFixed(2);
    await user.save();
  }
  const withdrawMessage = WithDrawMessage(amount);

  await ActivityModel.create({
    walletAddress: walletAddress,
    amount: amount,
    type: activityType.WithDraw,
    network: network,
    status: transactionStatus.Completed,
    activityMessage: withdrawMessage,
  });

  return useSuccessResponse(res, "Balance Updated Successfully", user, 200);
});

const userActiveBotSession = asyncHandler(async (req, res) => {
  const walletAddress = req.user.walletAddress;
  const user = await UserModel.findOne({
    walletAddress: walletAddress,
  });

  if (!user) {
    return useErrorResponse(res, "User Not Found", 404);
  }

  const botSession = await BotSessionModel.findOne({
    walletAddress: walletAddress,
    botStarted: true,
    botStopped: false,
  });

  let status = false; // Initialize the status as false

  if (botSession) {
    status = true; // Set the status to true if botSession exists
  }

  console.log(status);

  return useSuccessResponse(
    res,
    "Bot Session fetched Successfully",
    status,
    200
  );
});

module.exports = {
  generateNonce,
  signNonce,
  getUserFreeTierTime,
  updateUserBalance,
  getUserBalance,
  getUserBotStatus,
  userWithdrawBalance,
  userActiveBotSession,
  getUserLicenseStatus,
};
