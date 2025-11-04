const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const orderModel = require('../models/order')
const cartModel = require('../models/cart')


const router = express.Router()

router.post("/orders/cod", async (req, res) => {
  try {
    const { items, address, paymentMethod, totalAmount } = req.body;
    const token = req.cookies.token;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      const userId = decoded.userId;

      // ✅ Create Order
      const orderRes = await orderModel.create({
        userId,
        items,
        totalAmount,
        address,
        paymentMethod
      });

      // ✅ Delete Cart Items
      if (orderRes) {
        await cartModel.deleteMany({ userId });
      }

      // ✅ Send Response
      return res.status(200).json({
        status: "success",
        message: "Order placed and cart cleared"
      });

    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/get/orders", async (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // to get user userId from frontend
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId; 
    
    const orders = await orderModel.find({userId}).sort({ createdAt: -1 });
    res.status(200).json({orders})
    
  });
})


router.post("/get/order", async (req,res) => {
    const {id} = req.body;
    const order = await orderModel.findOne({_id: id}).populate("items.productId")

    res.status(200).json({ order })
})
module.exports = router;