import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/restaurants/:restaurantId/categories"
          element={<Categories />}
        />
        <Route path="/categories/:categoryId/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
