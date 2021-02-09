import React from "react";
import { connect } from "react-redux";
import * as listActions from "../../redux/actions/listActions.js";
import * as taskActions from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

class Sidebar extends React.Component {
  componentDidMount() {
    this.props.actions.loadLists(this.props.user);
  }

  async handleClick(list) {
    await this.props.actions.selectList(list);
    await this.props.actions.loadTasks(list.id);
    this.props.history.push("/ToDo");
  }

  render() {
    return (
      <div className="sidebar m-0">
        <ul className="list-group list-group-flush">
          {this.props.lists.map((list) => {
            return (
              <li
                key={list.id}
                onClick={() => this.handleClick(list)}
                className="list-group-item"
              >
                {list.name}
              </li>
            );
          })}
        </ul>
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
    actions: bindActionCreators({ ...listActions, ...taskActions }, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
