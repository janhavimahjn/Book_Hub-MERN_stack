import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  publishedYear: { type: Number },
  genre: { type: String },
  price: { type: Number },
}, { timestamps: true });

bookSchema.index({ title: 1, author: 1 }, { unique: true }); // Prevent duplicate books

const Book = mongoose.model("Book", bookSchema);
export default Book;
