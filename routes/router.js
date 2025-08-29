const express = require('express');
const router = express.Router();
const users = require("../models/userSchema");

// ✅ Create user (Register)
router.post("/register", async (req, res) => {
    const { username, password, email, age, mobile, post, address } = req.body;

    if (!username || !password || !email || !age || !mobile || !post || !address) {
        return res.status(400).json({ error: "Please fill all required fields" });
    }

    try {
        const preuser = await users.findOne({ email: email });

        if (preuser) {
            return res.status(400).json({ error: "User already exists" });
        } else {
            const adduser = new users({ username, password, email, age, mobile, post, address });
            await adduser.save();
            return res.status(201).json(adduser);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// ✅ Get all users
router.get("/users", async (req, res) => {
    try {
        const allUsers = await users.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get single user by ID
router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update user by ID
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await users.findByIdAndUpdate(id, req.body, {
            new: true, // return updated document
            runValidators: true
        });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete user by ID
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await users.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
