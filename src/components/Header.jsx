import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

const Header = () => {
  const { user, token } = useContext(UserContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user && token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user, token]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/routines">Routines</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/profile">My Routines</Link>
          </li>
        ) : null}
        <li>
          <Link to="/activities">Activities</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
      </ul>
      {isLoggedIn ? (
        <p>
          Hello, <Link to="/profile">{user.username}</Link>
        </p>
      ) : null}
    </nav>
  );
};

export default Header;
