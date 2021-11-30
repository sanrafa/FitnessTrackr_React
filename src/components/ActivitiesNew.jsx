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
      <h3 className="font-bold text-center">Create a new activity</h3>
      {Object.keys(newActivity).length > 0 ? (
        <div>
          <p className="italic">Your activity has been created.</p>
          <button
            type="button"
            className="text-blue-300 bg-blue-600 p-1"
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
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-red-800"
          >
            CANCEL
          </button>
          <form
            className="flex flex-col items-center space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              setName("");
              setDescription("");
            }}
          >
            <label className="font-medium">
              Name:
              <input
                type="text"
                required={true}
                size="60"
                value={name}
                placeholder="What is this activity called?"
                className="ml-4 border border-black p-0.5"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label className="font-medium">
              Description:
              <input
                type="text"
                className="ml-4 border border-black p-0.5"
                required={true}
                size="60"
                value={description}
                placeholder="How do you do it?"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </label>
            <button
              type="submit"
              className="font-bold text-white bg-blue-800 p-1"
            >
              SUBMIT
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ActivitiesNew;
