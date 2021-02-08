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
  if (!props.user) {
    return <Login />;
  } else {
    return (
      <div className="container-fluid p-0">
        <Navigation />
        <Switch>
          <Route exact path={["/", "/Home"]} component={Home} />
          {Object.keys(props.list).length === 0 &&
            props.list.constructor === Object && (
              <Route exact path="/ToDo" component={File} />
            )}
          <Route exact path="/ToDo" component={ToDo} />
          <Route exact path="/File" component={File} />
          <Route path="/Manage/" component={ManageTask} />
          <Route path="*" component={FileNotFound} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.users.active,
    list: state.lists.active,
  };
}

export default connect(mapStateToProps, null)(App);
