const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const userModel = require('../models/users')

const router = express.Router()

// ✅ Check if token exists
router.get("/auth/login", (req,res) => {
  const token = req.cookies.token;
  if(!token) {
    res.json({status: false})
  }else{
    res.json({status: true})
  }
});

// ✅ Login with email/password
router.post("/auth/loginuser", async (req,res) => {
  const {email,password} = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Check your email or password!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Check your email or password!" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    res.status(200).json({ message: "exits"});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Google Login Start
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    // ✅ Correct redirect for React
    res.redirect(`https://ecom-store-sandy.vercel.app/auth/login?success=true`);
  }
);

module.exports = router;
