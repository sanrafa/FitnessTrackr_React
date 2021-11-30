import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser, getUser } from "../api";
import { UserContext } from "../App";

const Login = () => {
  let { user, setUser, setToken, token } = useContext(UserContext);
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveToken, setSaveToken] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && error === null) {
      setTimeout(() => {
        navigate("/profile");
      }, 100);
    } // prevent memory leak when setting user?
  }, [error, user]);

  const loginAccount = async () => {
    try {
      const login = await loginUser({ username, password }); // returns {message, token}
      const newToken = login.token;
      setToken(newToken);
      const thisUser = await getUser(newToken);
      if (thisUser) setError(null);
      setUser(thisUser);
      if (saveToken) {
        localStorage.setItem("token", newToken);
      } else {
        sessionStorage.setItem("token", newToken);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const handleSubmit = async () => {
    await loginAccount();
    if (user && token) {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <main className="text-center p-4">
      <h1 className="text-4xl font-bold">Login</h1>
      <Link to="/register" className="font-semibold text-blue-600">
        New user?
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="p-6 flex flex-col space-y-4"
      >
        <label className="font-medium">
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
            className="ml-4 border-solid border-2 border-gray-400"
          ></input>
        </label>
        <label className="font-medium">
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
            className="ml-4 border-solid border-2 border-gray-400"
          ></input>
        </label>
        <label className="mr-2">
          Remember this browser:
          <input
            type="checkbox"
            value={saveToken}
            onChange={(e) => {
              setSaveToken(!saveToken);
            }}
            className="ml-2"
          ></input>
        </label>

        <button type="submit" className="bg-blue-300 text-white">
          LOGIN
        </button>
      </form>
      {error ? <p>{error}</p> : null}
    </main>
  );
};

export default Login;
