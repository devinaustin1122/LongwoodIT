import React, { useState } from "react";
import Navigation from "./common/Navigation.js";
import Login from "./login/Login.js";
import Home from "./home/Home.js";
import ToDo from "./todo/ToDo.js";
import File from "./file/File.js";
import ManageTask from "./todo/ManageTask.js";
import FileNotFound from "./FileNotFound.js";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

function App(props) {
  if (props.user.length === 0) {
    return <Login />;
  } else {
    return (
      <div className="container-fluid p-0">
        <Navigation />
        <Switch>
          <Route exact path={["/", "/Home"]} component={Home} />
          <Route exact path="/File" component={File} />
          <Route path="/ToDo" component={ToDo} />
          <Route path="/ToDo/:list" component={ToDo} />
          <Route path="/Manage" component={ManageTask} />
          <Route path="*" component={FileNotFound} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.users.active,
  };
}

export default connect(mapStateToProps, null)(App);
