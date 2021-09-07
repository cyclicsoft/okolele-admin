import React, { Component } from 'react'

//import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

import AdminLogin from "views/Signup-Login/AdminLogin";

const hist = createBrowserHistory();

//let loggedin = false


class App extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
           isLoggedin: false
        }    
      }
      
      LoginStatusHandler = (isLoggedinValue) =>{
        //alert(isLoggedinValue);
        this.setState({
          isLoggedin: isLoggedinValue
        })
        //loggedin = isLoggedinValue;
      }
    
      render() {
    
        const {isLoggedin} = this.state
    
        return (
          <div>
            {
              isLoggedin === false ? 
                <AdminLogin LoginStatusChange={this.LoginStatusHandler}/>
                :
                (<Router history={hist}>
                    <Switch>
                        {/* <Route path="/rtl" component={RtlLayout} />
                        <Route path="/auth" component={AuthLayout} /> */}
                        <Route path="/admin" component={AdminLayout} />
                        <Redirect from="/" to="/admin/dashboard" />
                    </Switch>
                </Router>)
            }       
        </div>
        )
      }
}

export default App
