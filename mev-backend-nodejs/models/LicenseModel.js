const mongoose = require("mongoose");
const { networkChain, licenseType, licenseStatus } = require("../utils/enums");

const licenseSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(licenseType),
    },
    licenseTime: {
      type: Date,
    },
    licenseStatus: {
      type: String,
      enum: Object.values(licenseStatus),
    },
    networkChain: {
      type: String,
      enum: Object.values(networkChain),
    },
    txHash: {
      type: String,
    },
  },
  { timestamps: true }
);

const LicenseModel = mongoose.model("license", licenseSchema);

module.exports = LicenseModel;
