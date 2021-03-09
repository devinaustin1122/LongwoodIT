import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions.js";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { store } from "react-notifications-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleUsernameInputChange = (event) => {
    event.preventDefault();
    this.setState({ username: event.target.value });
  };

  handlePasswordInputChange = (event) => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.login(this.state.username, this.state.password);
    this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    return (
      <div className="jumbotron jumbotron-login">
        <div className="d-flex justify-content-center">
          <div className="container fade-in login">
            <h1 className="display-4">Welcome!</h1>
            <p className="lead">
              If you have an account, please enter your username and password.
              Please contact Devin if you would like to create an account.
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  value={this.state.username}
                  onChange={this.handleUsernameInputChange}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordInputChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="submit">
                    Log In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-center border-top">
          <FontAwesomeIcon
            className="m-5"
            style={{ fontSize: "200px" }}
            icon={faClipboardCheck}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.users.active,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
