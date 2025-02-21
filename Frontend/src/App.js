import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";  
import { useGlobalContext } from "./context";  // Assuming context hook is used
import Auth from "./components/Auth/Auth";
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import ContactUs from "./pages/ContactUs/ContactUs";
import Header from "./components/Header/Header"; 
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <div>
      {/* Navbar for all pages */}
      <Navbar />

      <Routes>
        {/* Authentication Route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Header />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contactUs"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
