
// import "./App.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import GetAll from "./components/GetAll";
// import GetById from "./components/GetById";
// import Create from "./components/Create";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if user is already authenticated
//     if (localStorage.getItem("token")) {
//       setLoggedIn(true);
//     }
//   }, []);

//   console.log(email, password);

//   const handleLogin = () => {
//     axios
//       .post("https://child.care.selsla.net/api/auth/login", {
//         email: email,
//         password: password,
//       })
//       .then((response) => {
//         console.log(response);
//         // Store token in localStorage
//         localStorage.setItem("token", response.data.token);
//         setLoggedIn(true);
//         alert("Successfully logged in");
//       })
//       .catch((error) => {
//         // Handle login error
//         console.error(error);
//         alert("Service Error");
//       });
//   };

//   const handleLogout = () => {
//     // Clear token from localStorage
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//   };

//   const renderLoginForm = () => {
//     return (
//       <div className="container py-5">
//         <h1>Login page</h1>
//         <label>
//           Username:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter Email"
//           />
//         </label>
//         <br />
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter password"
//           />
//         </label>
//         <br />
//         <button className="btn btn-primary" onClick={handleLogin}>
//           Login
//         </button>
//       </div>
//     );
//   };

//   const renderLogoutButton = () => {
//     return (
//       <button className="btn btn-primary" onClick={handleLogout}>
//         Logout
//       </button>
//     );
//   };

//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/create">Create</Link>
//             </li>
//             <li>
//               <Link to="/getAll">GetAll</Link>
//             </li>
//             <li>
//               <Link to="/getbyid/1">GetByID</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route
//             path="/"
//             element={loggedIn ? renderLogoutButton() : renderLoginForm()}
//           />
//           <Route path="/create" element={<Create />} />
//           <Route path="/getall" element={<GetAll />} />
//           <Route path="/getbyid/:id" element={<GetById />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import "./App.css";
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

const User_Types = {
  Public: "Public User",
  Normal_User: "Normal User",
  Admin_User: "Admin User",
};

const Current_User_Type = User_Types.Normal_User;
function App() {
  return (
    <Router>
      <div>
        <nav className="py-3">
          <ul
            className="container navbg py-3"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {Current_User_Type === User_Types.Normal_User ||
            Current_User_Type === User_Types.Admin_User ? (
              <>
                <li>
                  <Link to="/user">User</Link>
                </li>
                <li>
                  <Link to="/userprofile">UserProfile</Link>
                </li>
              </>
            ) : null}
            {Current_User_Type === User_Types.Admin_User ? (
              <>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              </>
            ) : null}
          </ul>
          <h3 className="text-danger text-center">
            you are logged in as:{Current_User_Type}
          </h3>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <Home />
              </PublicElement>
            }
          />
          <Route
            path="/user"
            element={
              <UserElement>
                <User />
              </UserElement>
            }
          />
          <Route
            path="/userprofile"
            element={
              <UserElement>
                <UserProfile />
              </UserElement>
            }
          />
          <Route
            path="/Admin"
            element={
              <AdminElement>
                <Admin />
              </AdminElement>
            }
          />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>home page</h1>;
}
function User() {
  return <h1>User page</h1>;
}
function UserProfile() {
  return <h1>UserProfile page</h1>;
}
function Admin() {
  return <h1>admin page</h1>;
}

function PublicElement({ children }) {
  return <>{children}</>;
}
function UserElement({ children }) {
  if (
    Current_User_Type === User_Types.Normal_User ||
    Current_User_Type === User_Types.Admin_User
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
    // return <div>You do not have access to this page</div>
  }
}
function AdminElement({ children }) {
  if (Current_User_Type === User_Types.Admin_User) {
    return <>{children}</>;
  } else {
    return <div>You do not have access to this page</div>;
  }
}
export default App;
