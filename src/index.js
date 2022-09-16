/*!
=========================================================
* Ghorwali Admin React - v1.0.0
=========================================================
* Product Page: https://www.cyclicsoft.com
* Copyright 2021 Cyclic Soft IT (https://www.cyclicsoft.com)
* Coded by CyclicSoft Team
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom";
import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";
import App from "App";

// Global Variable
import { store } from "state-pool";

// Creating new path variable
// store.setState("rootPathVariable", "https://api2.okolele.com");
store.setState("rootPathVariable", "http://localhost:8080"); 

ReactDOM.render(<App />, document.getElementById("root"));
