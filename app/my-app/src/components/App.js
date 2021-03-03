import React from "react";
import Navigation from "./common/Navigation.js";
import Login from "./login/Login.js";
import Home from "./home/Home.js";
import ToDo from "./todo/ToDo.js";
import File from "./file/File.js";
import Toolbar from "./common/Toolbar.js";
import FileNotFound from "./FileNotFound.js";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ReactNotifications from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const App = (props) => {
  return (
    <div className="container-fluid p-0">
      <ReactNotifications />
      {!props.user && <Login />}
      {props.user && (
        <>
          <div className="content">
            <Navigation />
            <Toolbar />
            <Switch>
              <Route exact path={["/", "/Home"]} component={Home} />
              {Object.keys(props.list).length === 0 &&
                props.list.constructor === Object && (
                  <>
                    <Route exact path="/ToDo" component={File} />
                    <Route exact path="/File" component={File} />
                  </>
                )}
              <Route exact path="/ToDo" component={ToDo} />
              <Route exact path="/File" component={File} />
              <Route path="*" component={FileNotFound} />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    user: state.users.active,
    users: state.users,
    list: state.lists.active,
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps, null)(App);
