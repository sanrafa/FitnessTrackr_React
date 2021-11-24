// This file will hold the main app component and router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext, Fragment } from "react";

// API here

// components here
import {
  Header,
  Home,
  User,
  Routines,
  Activities,
  MyRoutines,
} from "./components";

// Global context
export const UserContext = createContext("");

export const App = () => {
  // Global state
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <Fragment>
        <Router>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<User />} />
            <Route path="/login" element={<User />} />
            <Route path="/routines" element={<Routines />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/profile" element={<MyRoutines />} />
          </Routes>
        </Router>
      </Fragment>
    </UserContext.Provider>
  );
};
