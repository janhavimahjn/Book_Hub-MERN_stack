import express from "express";
import axios from "axios";
import Book from "../Model/Book.js";

const router = express.Router();

// 📌 Get All Books from MongoDB
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Get a Single Book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("❌ Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Search Books: MongoDB First, Then Open Library API
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    let books = await Book.find({ $text: { $search: query } });

    if (books.length === 0) {
      console.log("📌 Fetching from Open Library API...");

      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      const openLibBooks = response.data.docs.slice(0, 5); // Limit to 5 books

      if (openLibBooks.length > 0) {
        books = openLibBooks.map((book) => ({
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown",
          description: "Description not available",
          coverImage: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "",
          publishedYear: book.first_publish_year || null,
          genre: "Unknown",
          price: 10.99,
        }));

        await Book.insertMany(books);
        console.log("✅ Books saved to MongoDB:", books);
      }
    }

    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error.message);
    res.status(500).json({ message: "Error fetching books from Open Library" });
  }
});

export default router;
