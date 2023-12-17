const express = require("express");
const route = express.Router();
// Controllers
const {
    generateActivity, getUserActivity
} = require("../controllers/activityContoller");

// check validation middleware
const {
    checkValidationMiddleware,
} = require("../middleware/validationMiddleware.js");
const { protectRoute } = require("../middleware/authMiddleware");

// User Routes
route.post("/generate-activity", protectRoute, generateActivity);
route.post("/get-user-activity", protectRoute, getUserActivity)


module.exports = route;
