const jwt = require("jsonwebtoken");
const userdb = require("../models/authModel");
const keysecret = "tyhgfresbghjmnbgtresdfiknhgfrtyu";


const authenticate = (requiredEmail) => {
    return async (req, res, next) => {
        try {
        const token = req.headers.authorization;
        const verifytoken = jwt.verify(token,keysecret);
        const rootUser = await userdb.findOne({_id:verifytoken._id});
        
        if(!rootUser) {throw new Error("user not found")}
        if (requiredEmail && rootUser.email !== requiredEmail) {
            throw new Error("Access denied. Unauthorized email.");
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}
}


module.exports = authenticate