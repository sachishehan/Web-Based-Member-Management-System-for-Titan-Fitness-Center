const mongoose = require("mongoose");

const TitantFitnessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Invalid email format"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  workoutType: {
    type: String,
    required: [true, "Workout type is required"],
    enum: ["Cardio", "Strength Training", "Yoga", "CrossFit", "Bodybuilding", "Pilates", "Other"], 
  },
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const TitantFitnessModel = mongoose.model("members", TitantFitnessSchema);

module.exports = TitantFitnessModel;
