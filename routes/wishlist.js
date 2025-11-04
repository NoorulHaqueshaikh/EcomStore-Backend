const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const wishlistModel = require('../models/whishlist')


const router = express.Router()

router.get("/get/wishlist", async (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId;

    const wishlist = await wishlistModel.find({ userId }).populate("productId");
    res.status(200).json({ wishlist })
    
    });

})

router.get("/get/wishlistIds", async (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId;

    const wishlist = await wishlistModel.find({ userId })
    res.status(200).json({ wishlist })
    });
})



router.post("/wishlist/add", async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId;
    const productId = req.body._id;

    try {
      // ✅ Check if already exists
      const existing = await wishlistModel.findOne({ userId, productId });
      if (existing) {
        return res.status(200).json({ message: "Already in wishlist" });
      }

      const wishlistAdd = await wishlistModel.create({ userId, productId });
      console.log("added", wishlistAdd);
      res.status(201).json(wishlistAdd);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
});


router.post("/wishlist/remove", async (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // to get user userId from frontend
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId; 
    const wishlistDelete = await wishlistModel.findOneAndDelete({ userId: userId, productId: req.body._id });
    res.status(201).json(wishlistDelete);
    console.log("deleted:",wishlistDelete)
  });
})




module.exports = router;