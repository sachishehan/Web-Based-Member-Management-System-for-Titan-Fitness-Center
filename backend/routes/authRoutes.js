// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Login
router.post('/login', async (req, res) => {
  const { memberId, password } = req.body;

  try {
    const user = await User.findOne({ memberId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isApproved) {
      return res.status(403).json({ message: 'Your account is awaiting admin approval.' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Generate a temporary member ID and password
    const memberId = `MEMBER${(await User.countDocuments()) + 1}`;
    const tempPassword = 'temp123'; // In a real app, this would be randomly generated

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = new User({
      memberId,
      password: hashedPassword,
      isFirstLogin: true,
      isApproved: true, // Set to false if admin approval is required
      name,
      profileImage: null,
      stats: {
        workoutsThisMonth: 0,
        hoursSpent: 0,
        caloriesBurned: 0,
        streak: 0,
      },
      workoutSchedule: [],
    });

    await newUser.save();
    res.status(201).json({ memberId, tempPassword });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { memberId, newPassword } = req.body;

  try {
    const user = await User.findOne({ memberId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isFirstLogin = false;

    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Profile Image
router.put('/update-profile-image', async (req, res) => {
  const { memberId, imageUrl } = req.body;

  try {
    const user = await User.findOne({ memberId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profileImage = imageUrl;
    await user.save();
    res.status(200).json({ message: 'Profile image updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Profile
router.put('/update-profile', async (req, res) => {
  const { memberId, profileData } = req.body;

  try {
    const user = await User.findOne({ memberId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, profileData);
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout (handled on the client side)
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;