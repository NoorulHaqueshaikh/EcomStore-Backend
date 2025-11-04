const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const router = express.Router()

router.get("/check/admin", async (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // to get user userId from frontend
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId; 
    res.status(201).json({ userId })
  
  });
})


module.exports = router;