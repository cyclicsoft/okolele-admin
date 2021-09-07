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
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";

// import AuthLayout from "layouts/Auth.js";
// import RtlLayout from "layouts/RTL.js";
// import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

// import { Component } from 'react'
// import AdminLogin from "views/Signup-Login/AdminLogin";
import App from "App";



//const hist = createBrowserHistory();

ReactDOM.render(
  
  // <Router history={hist}>
  //   {console.log(loggedin)}
  //   {loggedin?
  //   <Switch>
  //     <Route path="/rtl" component={RtlLayout} />
  //     <Route path="/auth" component={AuthLayout} />
  //     <Route path="/admin" component={AdminLayout} />
  //     <Redirect from="/" to="/admin/dashboard" />
  //   </Switch> : <Index />}
  // </Router>,
  <App />,
  document.getElementById("root")
);
