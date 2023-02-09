import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { PrivateRoute } from "./Components/PrivateRoute";
import axios from "axios";

axios.defaults.baseURL = "https://dashboard-backend-crr9.onrender.com";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
