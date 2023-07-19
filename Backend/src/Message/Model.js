const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    SentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    Text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
