const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users", 
      required: true 
    },

    fullName: { 
      type: String, 
      required: true 
    },

    phone: { 
      type: String, 
      required: true 
    },

    pincode: { 
      type: String, 
      required: true 
    },

    state: { 
      type: String, 
      required: true 
    },

    city: { 
      type: String, 
      required: true 
    },

    addressLine: { 
      type: String, 
      required: true 
    },

    landmark: { 
      type: String, 
      default: ""   // Not required
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("address", addressSchema);
