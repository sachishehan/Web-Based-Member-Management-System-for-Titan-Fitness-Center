// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  stats: {
    workoutsThisMonth: {
      type: Number,
      default: 0,
    },
    hoursSpent: {
      type: Number,
      default: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  workoutSchedule: [
    {
      day: String,
      workout: String,
      trainer: String,
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);