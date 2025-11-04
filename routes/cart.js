const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cartModel = require('../models/cart')
const product = require('../models/product')


const router = express.Router()

router.post("/add/cart", async (req,res) => {
    const {id,selectedSize,quantity} = req.body;

    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // to get user userId from frontend
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId; 

    const exits = await cartModel.findOne({userId,productId: id});
    if(exits){
      return  res.status(200).json({ message: "cart is already exits"})
    }
    
    const cart = await cartModel.create({userId, productId: id, size: selectedSize, quantity})
    res.status(200).json({ cart , message: "cart created successfully"})
    console.log(cart)
  });
})

router.get("/get/cart", async (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // to get user userId from frontend
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId; 

    const carts = await cartModel.find({userId}).populate("productId");
    res.status(200).json({ carts })
  });
})

router.post("/cart/update", async (req,res) => {
    const {cartItemId,quantity} = req.body;
    const updatedcart = await cartModel.findOneAndUpdate({_id: cartItemId},{quantity});
    res.status(200).json({ updatedcart })
})

router.post("/cart/remove", async (req,res) => {
    const {cartItemId} = req.body;
    const deletedcart = await cartModel.findOneAndDelete({_id: cartItemId});
    res.status(200).json({ deletedcart })
})


module.exports = router;