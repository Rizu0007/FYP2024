const express = require("express");
const router = new express.Router();
const User = require("../models/authModel.js");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate.js");

// Register a new user
router.post("/register", async (req, res) => {
  const { fname, email, password, cpassword, pin, confirmPin, seedPhrase } =
    req.body;

  if (
    !fname ||
    !email ||
    !password ||
    !cpassword ||
    !pin ||
    !confirmPin ||
    !seedPhrase
  ) {
    res.status(422).json({ error: "Fill in all the details" });
    return;
  }
  if (pin !== confirmPin) {
    res.status(422).json({ error: "PIN and Confirm PIN Not Match" });
    return;
  }

  try {
    const preuser = await User.findOne({ email: email });
    const unique_username = await User.findOne({ fname: fname });
    if (unique_username) {
      res.status(422).json({ error: "This Username is Already Exist" });
    } else if (preuser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Match" });
    } else {
      const user = new User({
        fname,
        email,
        password,
        cpassword,
        pin,
        confirmPin,
        seedPhrase,

      });
      const storeData = await user.save();
      const token = await storeData.generateAuthToken();
      const result = {
        token,
      };

      res.status(201).json({ status: 201, result });
    }
  } catch (error) {
    res.status(422).json(error);
    console.error(error);
  }
})

// Login route
router.post("/login", async (req, res) => {
  const { fname, password } = req.body;

  if (!fname || !password) {
    res.status(422).json({ error: "Fill in all the details" });
  }

  try {
    const userValid = await User.findOne({ fname: fname });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "Invalid details" });
      } else {
        // Token generation and response
        const token = await userValid.generateAuthToken();

        // res.cookie("usercookie", token, {
        //   expires: new Date(Date.now() + 9000000),
        //   httpOnly: true,
        // });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.error("Error in login:", error);
  }
});

// Get user details (requires authentication)
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const ValidUserOne = await User.findOne({ _id: req.userId });
    const { password, pin ,fname} = ValidUserOne; 
    res.status(201).json({ status: 201, ValidUserOne, password, pin  , fname});
  } catch (error) {
    res.status(401).json({ status: 401, error });
    console.error("Error in retrieving user details:", error);
  }
});



// Logout route
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("usercookie", { path: "/" });

    await req.rootUser.save();

    res.status(201).json({ status: 201, message: "Logout successful" });
  } catch (error) {
    res.status(401).json({ status: 401, error });
    console.error("Error in logout:", error);
  }
});

router.get("/userData", authenticate, async (req, res) => {
  const id = req.userId;
  console.log(req.userId);
  try {
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json({ status: 200, data: user });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error saving seed phrase" });
    console.error("Error in storing seed phrase:", error);
  }
});


// Verify PIN code (POST request)
router.post("/verify-pin-code", authenticate, async (req, res) => {
  const { pin } = req.body;
  
  try {
    const isMatch = await bcrypt.compare(pin, req.rootUser.pin); // Comparing hashed PINs
    if (isMatch) {
      res.status(201).json({ status: 201, message: "PIN code verified successfully" });
    } else {
      res.status(401).json({ status: 401, message: "Invalid PIN code" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error verifying PIN code" });
    console.error("Error in verifying PIN code:", error);
  }
});

// Retrieve Seed Phrase (GET request)
router.get("/retrieve-seed-phrase", authenticate, async (req, res) => {
  try {
    const seedPhrase = req.rootUser.seedPhrase;
    res.status(200).json({ status: 200, data: { seedPhrase } });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error retrieving seed phrase" });
    console.error("Error in retrieving seed phrase:", error);
  }
});

router.post("/change-pin", authenticate, async (req, res) => {
  console.log("Change PIN request received");

  const { newPin } = req.body;
  if (!newPin || newPin.length < 6) {
    return res.status(400).json({ error: "Invalid PIN format" });
  }

  try {
    const hashedNewPin = await bcrypt.hash(newPin, 12);
    req.rootUser.pin = hashedNewPin;
    await req.rootUser.save();
    console.log("PIN changed successfully for user:", req.rootUser._id);
    res.status(200).json({ message: "PIN updated successfully" });
  } catch (error) {
    console.error("Error updating PIN:", error);
    res.status(500).json({ error: "Error updating PIN" });
  }
});


router.post("/change-password", authenticate, async (req, res) => {
  console.log("Change PIN request ss");

  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: "Invalid password format" });
  }

  try {
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    req.rootUser.password = hashedNewPassword;
    await req.rootUser.save();
    console.log("Password changed successfully for user:", req.rootUser._id);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Error updating password" });
  }
});



module.exports = router;
