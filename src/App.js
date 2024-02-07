import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GetAll from "./components/GetAll";
import GetById from "./components/GetById";
import Create from "./components/Create";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  console.log(email, password);

  const handleLogin = () => {
    axios
      .post("https://child.care.selsla.net/api/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        alert("Successfully logged in");
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
        alert("Service Error");
      });
  };

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const renderLoginForm = () => {
    return (
      <div className="container py-5">
        <h1>Login page</h1>
        <label>
          Username:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </label>
        <br />
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  };

  const renderLogoutButton = () => {
    return (
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    );
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/getAll">GetAll</Link>
            </li>
            <li>
              <Link to="/getbyid/1">GetByID</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={loggedIn ? renderLogoutButton() : renderLoginForm()}
          />
          <Route path="/create" element={<Create />} />
          <Route path="/getall" element={<GetAll />} />
          <Route path="/getbyid/:id" element={<GetById />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
