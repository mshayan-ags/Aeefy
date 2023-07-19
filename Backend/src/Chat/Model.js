const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    Person1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Person2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Chat_ID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    UnreadMessages: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
