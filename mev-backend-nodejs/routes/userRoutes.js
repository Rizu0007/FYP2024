const express = require("express");
const route = express.Router();
// Controllers
const {
  loginUser,
  userRegister,
  generateNonce,
  signNonce,
  getUserFreeTierTime,
  updateUserBalance,
  getUserBalance,
  getUserBotStatus,
  userWithdrawBalance,
  userActiveBotSession,
  getUserLicenseStatus,
} = require("../controllers/userController");
//Validation
const {
  validateUserSignUp,
  validateLoginUser,
} = require("../validators/userValidators");

// check validation middleware
const {
  checkValidationMiddleware,
} = require("../middleware/validationMiddleware.js");
const { protectRoute } = require("../middleware/authMiddleware");

// User Routes
route.post("/get-nonce", generateNonce);
route.post("/sign-user", signNonce);
route.post("/get-user-freetier-time", protectRoute, getUserFreeTierTime);
route.post("/update-user-balance", protectRoute, updateUserBalance);
route.post("/get-user-balance", protectRoute, getUserBalance);
route.get("/get-bot-status", protectRoute, getUserBotStatus);
route.post("/withdraw-balance", protectRoute, userWithdrawBalance);
route.get("/user-bot-session", protectRoute, userActiveBotSession);
route.get("/user-license-status", protectRoute, getUserLicenseStatus);

module.exports = route;
