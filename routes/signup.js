const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userModel = require('../models/product')


const router = express.Router()

router.get("/auth/signup", (req,res) => {
    const token = req.cookies.token;
    if(!token) {
        res.json({status: false})
    }else{
        res.json({status: true})
    }
})

router.post("/auth/createuser", async (req,res) => {
    const {name,email,password} = req.body;

    try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Use async/await for bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({ name, email, password: hash });

    // Generate token
    // const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // // Set cookie before sending response
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,     // use true for HTTPS deployment
    //   sameSite: 'lax'  // needed for cross-origin requests
    // });

    // Send response AFTER cookie
    return res.status(201).json({ message: "User created successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
})


module.exports = router;