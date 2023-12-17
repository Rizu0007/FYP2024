const express = require("express");
const route = express.Router();
// Controllers
const {
    generateLicense
} = require("../controllers/licenseController");

// check validation middleware
const {
    checkValidationMiddleware,
} = require("../middleware/validationMiddleware.js");
const { protectRoute } = require("../middleware/authMiddleware");

// User Routes
route.post("/generate-license", protectRoute, generateLicense);



module.exports = route;
