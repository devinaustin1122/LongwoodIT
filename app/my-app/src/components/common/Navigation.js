import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
      ToDo
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/Home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ToDo">
            ToDo
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
