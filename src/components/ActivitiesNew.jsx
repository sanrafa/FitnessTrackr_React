import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createActivity } from "../api";
import { UserContext } from "../App";

const ActivitiesNew = () => {
  let navigate = useNavigate();
  return (
    <section>
      <h3>Create a new activity</h3>
      <button type="button" onClick={() => navigate(-1)}>
        CANCEL
      </button>
      <form>
        <label>
          Name:
          <input type="text"></input>
        </label>
        <label>
          Description:
          <input type="text"></input>
        </label>
        <button type="submit">SUBMIT</button>
      </form>
    </section>
  );
};

export default ActivitiesNew;
