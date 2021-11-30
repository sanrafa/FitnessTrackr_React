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
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } // prevent memory leak?
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
    <main className="text-center p-4">
      <h1 className="text-4xl font-bold">Create a new account</h1>
      <Link to="/login" className="font-semibold text-blue-600">
        Existing user?
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

        <button type="submit" className="bg-blue-300 text-white">
          REGISTER
        </button>
      </form>
      {error ? <p>{error}</p> : null}
    </main>
  );
};

export default Register;
