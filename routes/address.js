const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const addressModel = require('../models/address')


const router = express.Router()

router.post("/address/add", async (req, res) => {
  const { fullName, phone, landmark, addressLine, city, state, pincode } = req.body;
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const userId = decoded.userId;

    try {
      const existingAddress = await addressModel.findOne({ userId });

      if (existingAddress) {
        const updated = await addressModel.findOneAndUpdate(
          { userId },
          {
            fullName,
            phone,
            landmark,
            addressLine,
            city,
            state,
            pincode,
          },
          { new: true }    // ✅ return updated address
        );

        return res.status(200).json({ message: "Address updated", address: updated });
      }

      const created = await addressModel.create({
        userId,
        fullName,
        phone,
        landmark,
        addressLine,
        city,
        state,
        pincode,
      });

      return res.status(201).json({ message: "Address added", address: created });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  });
});



router.get("/address/get", async (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // to get user userId from frontend
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userId = decoded.userId; 

    try {
        const address = await addressModel.findOne({ userId })
        res.status(200).json({ address })
    } catch (error) {
        res.status(500).json({message: "server error"})
    }

});
})





module.exports = router;