import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import SectionContainer from "views/SectionContainer/SectionContainer";
import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

import AdminLogin from "views/Admin/AdminLogin";
import ProductDetails from "views/ProductManagement/ProductDetails";

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
        {isLoggedin === false ? ( //To bypass login set it true
          <AdminLogin LoginStatusChange={this.LoginStatusHandler} />
        ) : (
          <Router history={hist}>
            <Switch>
              <Route path="/admin" component={SectionContainer} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
