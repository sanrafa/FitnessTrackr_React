// This file will hold the main app component and router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext, Fragment } from "react";

// API here
import { getUser } from "./api";

// components here
import {
  Header,
  Home,
  Register,
  Login,
  Routines,
  Activities,
  MyRoutines,
  Logout,
} from "./components";

// Global context
export const UserContext = createContext("");

export const App = () => {
  // Global state
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    async function recognizeUser() {
      if (localStorage.getItem("token")) {
        const myJWT = localStorage.getItem("token");
        setToken(myJWT);
        const me = await getUser(myJWT);
        setUser(me);
      } else if (sessionStorage.getItem("token")) {
        const myJWT = sessionStorage.getItem("token");
        setToken(myJWT);
        const me = await getUser(myJWT);
        setUser(me);
      }
    }

    recognizeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <Fragment>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/routines" element={<Routines />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/profile" element={<MyRoutines />} />
          </Routes>
        </Router>
      </Fragment>
    </UserContext.Provider>
  );
};
