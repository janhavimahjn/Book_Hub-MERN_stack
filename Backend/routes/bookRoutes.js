import express from "express";
import axios from "axios";
import Book from "../Model/Book.js";

const router = express.Router();

// 📌 Global Search: MongoDB First, Then Open Library API
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    console.log(`🔍 Searching for: ${query}`);

    // 🔹 Step 1: Search MongoDB for Existing Books
    let books = await Book.find({ title: { $regex: query, $options: "i" } });

    console.log(`📚 Books found in MongoDB: ${books.length}`);

    // 🔹 Step 2: If Books Are Missing, Fetch from Open Library API
    if (books.length === 0) {
      console.log("📌 Fetching from Open Library API...");

      const response = await axios.get(`https://book-hub-mern-stack.onrender.com/https://openlibrary.org/search.json?q=${query}`);
      const openLibBooks = response.data.docs.slice(0, 5); // Limit results

      if (openLibBooks.length > 0) {
        books = openLibBooks.map((book) => ({
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown",
          coverImage: book.cover_i ? `https://book-hub-mern-stack.onrender.com/https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "",
          publishedYear: book.first_publish_year || null,
          genre: book.subject ? book.subject[0] : "Unknown",
          price: 10.99,
        }));

        // 🔹 Step 3: Insert New Books, Avoid Duplicates
        for (const book of books) {
          const exists = await Book.findOne({ title: book.title, author: book.author });
          if (!exists) {
            await Book.create(book);
            console.log(`✅ Book added: ${book.title}`);
          }
        }
      }
    }

    // 🔹 Step 4: Return Books (Either From MongoDB or API)
    books = await Book.find({ title: { $regex: query, $options: "i" } });
    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
