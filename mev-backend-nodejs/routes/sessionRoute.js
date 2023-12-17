const express = require("express");
const route = express.Router();
// Controllers
const {
    StartBotSession, StopBotSession
} = require("../controllers/botSessionController");

// check validation middleware
const {
    checkValidationMiddleware,
} = require("../middleware/validationMiddleware.js");
const { protectRoute } = require("../middleware/authMiddleware");

// User Routes
route.post("/start-bot", protectRoute, StartBotSession);
route.post("/stop-bot", protectRoute, StopBotSession)


module.exports = route;
