const mongoose = require("mongoose");





const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // reference to User model
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // reference to Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    size: {
      type: String, // optional if product has sizes (like "M", "L", etc.)
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("cart", cartSchema);
