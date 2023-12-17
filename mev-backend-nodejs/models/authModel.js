const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "tyhgfresbghjmnbgtresdfiknhgfrtyu";


const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  pin: {
    type: String,
    required: true,
    minlength: 6, // Assuming a 4-digit PIN
  },
  confirmPin: {
    type: String,
    required: true,
    minlength: 6,
  },
  seedPhrase: {
    type: String,
    trim: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    this.cpassword = await bcryptjs.hash(this.cpassword, 12);
  }
 
  next();
});

// Token generate method

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("auth", userSchema);

module.exports = User;
