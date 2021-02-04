import React from "react";
import { connect } from "react-redux";
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

  render() {
    return (
      <>
        <DropdownInput
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.list.name}
          title="Manage Task Lists"
          comment=""
        />

        <div className="countainer-fluid p-5 text-light gradient-h fade-in">
          {" "}
          {this.props.lists.map((list) => {
            return (
              <>
                <hr />
                <List list={list} />
              </>
            );
          })}
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
    lists: state.lists,
    user: state.users.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(File);
