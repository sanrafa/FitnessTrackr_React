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
      <ul className="flex justify-evenly">
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
        <p className="text-center">
          Hello,{" "}
          <Link to="/profile" className="text-blue-600">
            {user.username}
          </Link>
        </p>
      ) : null}
    </nav>
  );
};

export default Header;
