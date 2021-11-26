import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser, getUser } from "../api";
import { UserContext } from "../App";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser, setToken } = useContext(UserContext);

  useEffect(() => {
    if (user && error === null) {
      navigate("/profile");
    }
  }, [error, user]);

  const loginAccount = async () => {
    try {
      const login = await loginUser({ username, password }); // returns {message, token}
      const newToken = login.token;
      setToken(newToken);
      const thisUser = await getUser(newToken);
      if (thisUser) setError(null);
      setUser(thisUser);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleSubmit = async () => {
    await loginAccount();
  };

  return (
    <main>
      <h1>Login</h1>
      <Link to="/register">New user?</Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            required={true}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            minLength="5"
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required={true}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            minLength="8"
          ></input>
        </label>

        <button type="submit">LOGIN</button>
      </form>
      {error ? <p>{error}</p> : null}
    </main>
  );
};

export default Login;
