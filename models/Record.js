const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["completed", "in progress", "future"],
      required: [true, "Please provide status"],
    },
    orderNumber: {
      type: Number,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", RecordSchema);
