const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide item name"],
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 100,
      required: [true, "Please enter item description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
      maxlength: 5,
      default: 0.0,
    },
    type: {
      type: String,
      enum: [
        "trees",
        "shrubs",
        "herbs",
        "annuals",
        "perennials",
        "succulents",
        "ferns",
        "vines",
        "others",
      ],
      default: "others",
    },
    orderNumber: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
