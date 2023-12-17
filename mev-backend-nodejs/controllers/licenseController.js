const asyncHandler = require("express-async-handler");
const { userSuccessMessages } = require("../utils/responseMessages/success.js");
const { userErrorMessages } = require("../utils/responseMessages/error.js");
const {
  useErrorResponse,
  useSuccessResponse,
} = require("../utils/apiResponse/apiResponse.js");

// Import model
const UserModel = require("../models/UserModel.js");
const LicenseModel = require("../models/LicenseModel.js");
const {
  botActivityMessages,
  botActivityType,
  licenseType,
  licenseStatus,
} = require("../utils/enums/index.js");

const generateLicense = asyncHandler(async (req, res) => {
  const { type, txHash, networkChain } = req.body;

  console.log(type, txHash, networkChain)

  const user = await UserModel.findOne({
    walletAddress: req.user.walletAddress,
  });

  if (user.licenseStatus === licenseStatus.Active) {
    return useErrorResponse(res, "User already has an active license", 400);
  }

  let licenseTime;
  if (type === licenseType.SixMonth) {
    licenseTime = new Date();
    licenseTime.setMonth(licenseTime.getMonth() + 6);
  } else if (type === licenseType.Year) {
    licenseTime = new Date();
    licenseTime.setFullYear(licenseTime.getFullYear() + 1);
  }

  const license = await LicenseModel.create({
    walletAddress: user.walletAddress,
    type: type,
    licenseTime: user.freeTierTime, // Set licenseTime to the value of freeTierTime
    txHash: txHash,
    networkChain: networkChain,
    licenseStatus: licenseStatus.Active,
  });

  user.licenseStatus = licenseStatus.Active;
  user.licenseType = type;
  user.licenseTime = user.freeTierTime; // Set licenseTime to the value of freeTierTime
  await user.save();

  let message;
  if (type === licenseType.SixMonth) {
    message = "6 month License Purchased Successfully";
  } else if (type === licenseType.Year) {
    message = "Yearly License Purchased Successfully";
  }

  return useSuccessResponse(res, message, license, 200);
});

module.exports = {
  generateLicense,
};
