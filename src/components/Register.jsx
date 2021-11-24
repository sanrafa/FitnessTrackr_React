import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api";
import { UserContext } from "../App";

const Register = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    if (user && error === null) {
      navigate("/profile");
    }
  }, [error, user]);

  const createAccount = async () => {
    try {
      const newUser = await registerUser({ username, password });
      setUser(newUser);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleSubmit = async () => {
    await createAccount();
  };

  return (
    /* 
        CREATE FORM WITH USERNAME, PASSWORD FIELDS
        ON CHANGE, UPDATE STATE
        ON SUBMIT, CALL registerUser
        IF SUCCESS:
          SAVE USER TO GLOBAL CONTEXT
          REDIRECT TO /PROFILE
      */
    <main>
      <h1>Create a new account</h1>
      <Link to="/login">Existing user?</Link>
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

        <button type="submit">REGISTER</button>
      </form>
      {error ? <p>{error}</p> : null}
    </main>
  );
};

export default Register;
