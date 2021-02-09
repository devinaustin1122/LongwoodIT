import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions.js";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { store } from "react-notifications-component";

class Sidebar extends React.Component {
  render() {
    return <div className="sidebar"></div>;
  }
}

export default Sidebar;
