import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import AdminLayout from "layouts/Admin.js";
// Admin.js replaced by SectionContainer.js
import SectionContainer from "views/SectionContainer/SectionContainer";
import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

import CreateProducts from "views/ProductManagement/CreateProducts";
import CreatePhone from "views/ProductManagement/Phone/CreatePhone";
import AdminLogin from "views/Admin/AdminLogin";

const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedin: false,
    };
  }

  LoginStatusHandler = (isLoggedinValue) => {
    this.setState({
      isLoggedin: isLoggedinValue,
    });
  };

  render() {
    const { isLoggedin } = this.state;

    return (
      <div>
        {isLoggedin === false ? (
          <AdminLogin LoginStatusChange={this.LoginStatusHandler} />
        ) : (
          <Router history={hist}>
            <Switch>
              {/* <Route path="/admin" component={AdminLayout} /> */}
              <Route path="/admin" component={SectionContainer} />
              <Route path="/create-phone" component={CreatePhone} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
