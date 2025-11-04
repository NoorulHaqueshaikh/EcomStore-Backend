const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const router = express.Router()

router.post('/ecomstore/logout', (req, res) => {
  if (req.body.data) {
    // Match cookie options exactly like when you set it
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // true if using HTTPS
      sameSite: 'none'
    });
    return res.status(200).json({ message: "Logged out successfully" });
  }
  res.status(400).json({ message: "Invalid request" });
});


module.exports = router;