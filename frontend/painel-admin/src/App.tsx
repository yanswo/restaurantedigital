import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";
import Categories from "./pages/Categories";
import Products from "./pages/Products";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route
        path="/restaurants"
        element={token ? <Restaurants /> : <Navigate to="/login" />}
      />
      <Route
        path="/categories"
        element={token ? <Categories /> : <Navigate to="/login" />}
      />
      <Route
        path="/products"
        element={token ? <Products /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
