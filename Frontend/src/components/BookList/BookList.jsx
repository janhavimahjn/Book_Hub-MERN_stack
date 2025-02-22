import React, { useState } from "react";
import { API_URL } from "../../config";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");  // ✅ Define query state

  const searchBooks = async () => {
    if (!query.trim()) return;  // ✅ Ensure query is not empty
    
    try {
      const res = await fetch(`${API_URL}/search?query=${query}`);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("❌ Error fetching books:", error);
    }
  };

  return (
    <div>
      <h1>📚 Search Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // ✅ Ensure `query` updates
        placeholder="Search for books..."
      />
      <button onClick={searchBooks}>Search</button>

      {books.length === 0 ? <p>No books found</p> : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <img src={book.coverImage} alt={book.title} width="100" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BooksList;
