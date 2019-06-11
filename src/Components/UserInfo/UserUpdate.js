import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Aux from "../../hoc/Auxiliary/Auxiliary"
import { _filter, _mapWithKeys, _getCurrentDate } from "../../Utils/_";
import firebase from "../../Utils/Config/firebase";
import { Base64 } from "js-base64";
import "./UserUpdate.css";

// JuYoung Kang.dev
class UserUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailMessage: "",
      passwordMessage: ""
    };
  }

  // validates inputs
  _emptyInputValidator = (email, password) => {
    let result = true;

    this.setState({
      emailMessage: email ? "" : "Enter Email",
      passwordMessage: password ? "" : "Enter Password"
    });

    if (!email || !password) {
      result = false;
    }

    return result;
  };

  _updateDataToDB = (userRef, email, password) => {
    userRef.update({
      email: email.value,
      password: Base64.encode(password.value)
    });
  };

  // update user data to firebase
  _updateUser = async e => {
    e.preventDefault();

    const { userId, userEmail, userPassword } = e.target;

    if (!this._emptyInputValidator(userEmail.value, userPassword.value)) return;

    const rootRef = firebase.database().ref();
    const usersRef = rootRef.child("users");
    const userRef = usersRef.child(userId.value);

    // update user data to firebase
    this._updateDataToDB(userRef, userEmail, userPassword);

    // after sign up, moves to "To Do List" page
    this.props.history.goBack()
  };

  render() {
    return (
      <Fragment>
        <div className="User-update">
          <form onSubmit={this._updateUser}>
            <div className="title">
              <h1>User update</h1>
            </div>

            <div>
              <input
                type="text"
                name="userId"
                disabled="true"
                value={localStorage.userId}
              />
            </div>

            <div>
              <input type="email" name="userEmail" placeholder="e-mail" />
              <ErrorMessage msg={this.state.emailMessage} />
            </div>

            <div>
              <input
                type="password"
                name="userPassword"
                placeholder="password"
              />
              <ErrorMessage msg={this.state.passwordMessage} />
            </div>

            <div className="btn-container">
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export const ErrorMessage = props => {
  const _errStyle = {
    color: "red"
  };

  return (
    <p>
      <span style={_errStyle}>{props.msg}</span>
    </p>
  );
};

export default withRouter(UserUpdate)
