const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  roles,
  botStatus,
  freeTierStatus,
  licenseStatus,
  licenseType,
} = require("../utils/enums");

const usersSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    nonce: {
      type: String,
      // required: true,
    },
    arbBalance: {
      type: Number,
      require: true,
      default: 0,
    },
    ethBalance: {
      type: Number,
      require: true,
      default: 0,
    },
    bscBalance: {
      type: Number,
      require: true,
      default: 0,
    },
    referralCode: {
      type: String,
      // require: true,
    },
    freeTierTime: {
      type: Date,
    },
    freeTierStatus: {
      type: String,
      // required: true,
      enum: Object.values(freeTierStatus),
    },
    licenseStatus: {
      type: String,
      enum: Object.values(licenseStatus),
    },
    licenseTime: {
      type: Date,
    },
    licenseType: {
      type: String,
      enum: Object.values(licenseType),
    },
  },
  { timestamps: true }
);

const UsersModel = mongoose.model("user", usersSchema);

module.exports = UsersModel;
