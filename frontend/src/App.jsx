import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Account from "./pages/Account.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
          }
        />

        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <Register setUser={setUser} />
          }
        />

        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="/account"
          element={user ? <Account user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
