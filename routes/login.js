const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const passport = require('passport')
const userModel = require('../models/users')


const router = express.Router()


router.get("/auth/login", (req,res) => {
    const token = req.cookies.token;
    if(!token) {
        res.json({status: false})
    }else{
        res.json({status: true})
    }
})

// with email and password

router.post("/auth/loginuser", async (req,res) => {
    const {email,password} = req.body;
    try {
    // Find user by email.
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Check your email or password!" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Check your email or password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,      // not accessible by JS
      secure: true,       // set true if using HTTPS
      sameSite: 'none'      // allows cross-origin on localhost
    });

    // Send response
    res.status(200).json({ message: "exits"});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})




// login with google 
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

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
      httpOnly: true,      // not accessible by JS
      secure: true,       // set true if using HTTPS
      sameSite: 'none'      // allows cross-origin on localhost
    });

    // redirect to frontend with token
    res.redirect(`http://localhost:5173/auth/login?token=${token}`);
  }
);


module.exports = router;