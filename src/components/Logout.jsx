import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

const Logout = () => {
  const { setUser, setToken } = useContext(UserContext);

  useEffect(() => {
    setUser("");
    setToken("");
  }, []);

  return (
    <div>
      <h1>You are now logged out</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
};

export default Logout;
