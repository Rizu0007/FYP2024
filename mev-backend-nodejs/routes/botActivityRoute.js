const express = require("express");
const route = express.Router();
// Controllers
const {
    generateBotActivity, getUserBotActivity
} = require("../controllers/botActivityController");

// check validation middleware
const {
    checkValidationMiddleware,
} = require("../middleware/validationMiddleware.js");
const { protectRoute } = require("../middleware/authMiddleware");

// User Routes
route.post("/generate-bot-activity", protectRoute, generateBotActivity);
route.post("/get-user-bot-activity", protectRoute, getUserBotActivity)


module.exports = route;
