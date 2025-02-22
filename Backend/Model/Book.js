import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  publishedYear: { type: Number },
  genre: { type: String },
  price: { type: Number },
});

bookSchema.index({ title: "text", author: "text" });

const Book = mongoose.model("Book", bookSchema);
export default Book;
