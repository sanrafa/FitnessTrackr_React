import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createActivity } from "../api";
import { UserContext } from "../App";

const ActivitiesNew = () => {
  let navigate = useNavigate();
  const { user, token } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newActivity, setNewActivity] = useState({}); // store return activity object
  const [error, setError] = useState("");

  useEffect(() => {
    setName("");
    setDescription("");
  }, [error]);

  const handleSubmit = async () => {
    const constrainedName = name.toLowerCase(); // set names to lowercase to prevent duplicates
    try {
      if (user && token) {
        const activity = await createActivity(
          token,
          constrainedName,
          description
        );
        setNewActivity(activity);
        if (!newActivity) {
          throw Error(
            "There was an error adding your activity. Note: duplicates are not permitted."
          );
        }
      } else {
        throw Error(
          "You are not authorized to perform this action; please log in."
        );
      }
    } catch (err) {
      console.error(err);
      if (typeof err === "object") {
        err = err.message;
        setError(err);
        return;
      }
      setError(err);
    }
  };

  return (
    <section>
      <h3>Create a new activity</h3>
      {Object.keys(newActivity).length > 0 ? (
        <div>
          <p>Your activity has been created.</p>
          <button
            type="button"
            onClick={() => navigate(`/activities/${newActivity.id}`)}
          >
            VIEW
          </button>
        </div>
      ) : error && user && token ? (
        <div>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => {
              setError(null);
            }}
          >
            Try again
          </button>
        </div>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={() => navigate(-1)}>
            CANCEL
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              setName("");
              setDescription("");
            }}
          >
            <label>
              Name:
              <input
                type="text"
                required={true}
                size="60"
                value={name}
                placeholder="What is this activity called?"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label>
              Description:
              <input
                type="text"
                required={true}
                size="60"
                value={description}
                placeholder="How do you do it?"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </label>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ActivitiesNew;
