import React from "react";
import Navigation from "./common/Navigation.js";
import Home from "./home/Home.js";
import ToDo from "./todo/ToDo.js";
import File from "./file/File.js";
import ManageTask from "./todo/ManageTask.js";
import FileNotFound from "./FileNotFound.js";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid p-0">
      <Navigation />
      <Switch>
        <Route exact path={["/", "/Home"]} component={Home} />
        <Route exact path="/ToDo" component={ToDo} />
        <Route exact path="/File" component={File} />
        <Route path="/Manage/:id" component={ManageTask} />
        <Route path="*" component={FileNotFound} />
      </Switch>
    </div>
  );
}

export default App;
