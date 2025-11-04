const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const productModel = require('../models/product')


const router = express.Router()

router.get("/product", (req,res) => {
    const token = req.cookies.token;
    if(!token) {
        res.json({status: false})
    }else{
        res.json({status: true})
    }
})

router.post('/create/product', async (req,res) => {
   
  const {imagesState,sizesState,isFeaturedState,numReviewsState,ratingsState,stockState,brandState,categoryState,priceState,descriptionState,nameState} = req.body; 

  const createdProdcut = await productModel.create({ 
    name:nameState,
    description:descriptionState,
    price:priceState,
    category:categoryState,
    brand:brandState,
    stock:stockState,
    sizes:sizesState,
    images:imagesState,
    ratings:ratingsState,
    numReviews:numReviewsState,
    isFeatured:isFeaturedState
    });
  res.status(201).json(createdProdcut);
  console.log(createdProdcut)
})

router.get("/find/products", async (req, res) => {
  try {
    // ✅ Use MongoDB aggregation with $sample to randomize order
    const products = await productModel.aggregate([{ $sample: { size: 50 } }]);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching random products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/product/:id", async (req,res) => {
    try {
        const response = await productModel.findById(req.params.id);
        res.status(200).json({response})
        console.log(res)
    } catch (error) {
        res.status(500).json({message: "something wrong in Database"})
    }
})

router.get("/product/search/:id", async (req,res) => {
    try {
    const products = await productModel.find({
    $or: [
      { name: { $regex: req.params.id, $options: "i" } },
      { brand: { $regex: req.params.id, $options: "i" } },
      { category: { $regex: req.params.id, $options: "i" } },
      { description: { $regex: req.params.id, $options: "i" } },
    ],
    });
    res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({message: "something wrong in Database"})
    }
})

router.get("/find/products/men", async (req,res) => {
    try {
    const products = await productModel.find({
    $or: [
      { name: { $regex: "men", $options: "i" } },
      // { brand: { $regex: "men", $options: "i" } },
      { category: { $regex: "men", $options: "i" } },
      // { description: { $regex: "men", $options: "i" } },
    ],
    });
    res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({message: "something wrong in Database"})
    }
})

router.get("/find/products/women", async (req,res) => {
    try {
    const products = await productModel.find({
    $or: [
      { name: { $regex: "women", $options: "i" } },
      // { brand: { $regex: "men", $options: "i" } },
      { category: { $regex: "women", $options: "i" } },
      // { description: { $regex: "men", $options: "i" } },
    ],
    });
    res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({message: "something wrong in Database"})
    }
})

router.get("/find/products/kids", async (req,res) => {
    try {
    const products = await productModel.find({
    $or: [
      { name: { $regex: "kids", $options: "i" } },
      // { brand: { $regex: "men", $options: "i" } },
      { category: { $regex: "kids", $options: "i" } },
      // { description: { $regex: "men", $options: "i" } },
    ],
    });
    res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({message: "something wrong in Database"})
    }
})

module.exports = router;