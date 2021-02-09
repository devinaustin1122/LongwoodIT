import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as listActions from "../../redux/actions/listActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import List from "../file/List.js";
import DropdownInput from "../common/DropdownInput.js";

class File extends React.Component {
  state = {
    list: {
      name: "",
    },
  };

  componentDidMount() {
    this.props.actions.loadLists(this.props.user);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createList(this.props.user, this.state.list.name);
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ list: { name: event.target.value } });
  };

  handleClick = (list) => {
    console.log(list);
    this.props.actions.selectList(list);
  };

  render() {
    return (
      <>
        <DropdownInput
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.list.name}
          placeholder="Enter a list"
          title="Task Lists"
          comment=""
        />

        <div className="gradient-h">
          <div className="d-flex justify-content-end">
            <Link to={"/ToDo"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                className="bi bi-x mt-2 mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </Link>
          </div>
          <div className="countainer-fluid p-5 text-light fade-in">
            <div className="d-flex justify-content-end"></div>{" "}
            {this.props.lists.map((list) => {
              return (
                <>
                  <List list={list} handleClick={this.handleClick} />
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

File.propTypes = {
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(File);
