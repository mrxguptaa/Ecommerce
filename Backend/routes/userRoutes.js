const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Login Api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Signup API
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️ Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // 2️ Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️ Create a new user with the hashed password
    user = new User({
      email,
      password: hashedPassword, // Store hashed password
    });

    // 4️ Save user to database
    await user.save();
    
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user details API
router.put("/update", async (req, res) => {
  try {
    const { email, fullName, phoneNumber, addressType, street, locality, city, state, country, postalCode } = req.body;

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Update user details
    user.fullName = fullName || user.fullName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = {
      addressType: addressType || user.address.addressType,
      street: street || user.address.street,
      locality: locality || user.address.locality,
      city: city || user.address.city,
      state: state || user.address.state,
      country: country || user.address.country,
      postalCode: postalCode || user.address.postalCode
    };

    await user.save();

    res.status(200).json({ message: "User details updated successfully", user });

  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;