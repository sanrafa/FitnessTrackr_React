import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createActivity } from "../api";
import { UserContext } from "../App";

const ActivitiesNew = () => {
  return <h1>Create new activity</h1>;
};

export default ActivitiesNew;
