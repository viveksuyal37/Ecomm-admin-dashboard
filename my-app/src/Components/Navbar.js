import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  
   const loggedUser = localStorage.getItem("user");
  const navigate = useNavigate();

   const logoutHandler = ()=>{
     navigate('/Register');
    localStorage.removeItem("user");
    localStorage.removeItem("token");
   }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            { (loggedUser) ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/AddProduct">
                    AddProduct
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">
                    Profile
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link"  to="/Login" onClick={logoutHandler} >
                    {`Logout (${JSON.parse(loggedUser).name})`}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
