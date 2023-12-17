const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (id, walletAddress) => {
  const token = jwt.sign(
    { _id: id, address: walletAddress },
    process.env.JWT_SECRET,
    { expiresIn: "1y" }
  );
  return token;
};

module.exports = generateToken;
