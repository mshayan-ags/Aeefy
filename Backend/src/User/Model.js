const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    default: 0,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  socketId: {
    type: String
  },
}, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;