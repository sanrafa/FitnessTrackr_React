// mount ReactDOM.render in this file
// add this index.js as script tag (module) in html file

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const app = document.getElementById("app");

ReactDOM.render(<App />, app);
