import express from "express";
import axios from "axios";
import Book from "../Model/Book";

const router = express.Router();

// Fetch books from Open Library API
router.get("/search", async (req, res) => {
  const { query } = req.query; // Get the search query from request
  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ message: "Error fetching books from Open Library" });
  }
  if (Book.length > 0) {
    try {
      const savedBooks = await Book.insertMany(Book);
      console.log("✅ Books saved to MongoDB:", savedBooks);
    } catch (error) {
      console.error("❌ MongoDB Save Error:", error.message);
    }
  }
  
});

export default router;
