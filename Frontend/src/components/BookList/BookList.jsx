import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <h1>📚 Book List</h1>
      {books.length === 0 ? <p>No books found</p> : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>
                <img src={book.coverImage} alt={book.title} width="100" />
                <h3>{book.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BooksList;