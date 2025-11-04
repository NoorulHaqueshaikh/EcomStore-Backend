const mongoose = require("mongoose");

const wishlistSchema =  mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // 👈 Use ObjectId type
      ref: "users", // 👈 Reference to your User model
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId, // 👈 Use ObjectId type
      ref: "Product", // 👈 Reference to your Product model
      required: true,
    },
  },
  { timestamps: true } // 👈 Optional: adds createdAt, updatedAt
);



module.exports = mongoose.model("Wishlist", wishlistSchema);
