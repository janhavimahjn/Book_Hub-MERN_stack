import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User, { findOne } from "../models/User";

// Register (Signup)
export async function register(req, res) {
  try {
    console.log("🔍 Incoming Register Request:", req.body); // Debugging log

    const { name, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    let user = await findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create and save the new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Login
export async function login(req, res) {
  try {
    console.log("🔍 Incoming Login Request:", req.body); // Debugging log

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
