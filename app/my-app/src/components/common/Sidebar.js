import React from "react";
import { connect } from "react-redux";
import * as listActions from "../../redux/actions/listActions.js";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { store } from "react-notifications-component";

class Sidebar extends React.Component {
  onComponentDidMount() {
    this.props.actions.loadLists(this.props.user);
  }

  render() {
    return (
      <div className="sidebar">
        {/* {this.props.lists.map((list) => (
          <p key={list.name}>{list.name}</p>
        ))} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists.all,
    user: state.users.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
