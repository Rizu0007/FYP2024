const jwt = require("jsonwebtoken");
const userdb = require("../models/authModel");
const keysecret = "tyhgfresbghjmnbgtresdfiknhgfrtyu";


const authenticate = async (req, res, next) => {
    try {
        const tokenWithBearer = req.headers.authorization || '';
        const token = tokenWithBearer.replace('Bearer ', ''); // Remove 'Bearer ' prefix
        const verifytoken = jwt.verify(token, keysecret);
        const rootUser = await userdb.findOne({ _id: verifytoken._id });

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ status: 401, message: "Unauthorized: No token provided" });
    }
};

module.exports = authenticate;