import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { _filter, _mapWithKeys, _getCurrentDate } from "../../Utils/_";
import firebase from "../../Utils/Config/firebase";
import { Base64 } from "js-base64";
import "./UserUpdate.css";

// JuYoung Kang.dev
class UserUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      userEmail: "",
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
 
    const { userEmail, userPassword } = e.target;

    if (!this._emptyInputValidator(userEmail.value, userPassword.value)) return;

    const rootRef = firebase.database().ref();
    const usersRef = rootRef.child("users");
    const userRef = usersRef.child(this.state.userId);

    // update user data to firebase
    this._updateDataToDB(userRef, userEmail, userPassword);

    // after sign up, moves to "To Do List" page
    this.props.history.replace("/todoList", true);
  };

  componentDidMount() {
    this.readUserData();
  }

  readUserData = async () => {
  
    const rootRef = firebase.database().ref();

    // gets group list
    await this.setUserData(rootRef);
  };

  setUserData = async rootRef => {
    const getUserData = rootRef.child("users/" + localStorage.getItem("userId")).once("value");

    // gets group list
    await getUserData.then(res => {
      this.setState({ userId: localStorage.getItem("userId") });
      this.setState({ userEmail: res.val().email });
    });
  };

  render() {
    return (
      <Fragment>
        <div className="User-update">
          <form onSubmit={this._updateUser}>
            <div className="title">
              <h1>User update</h1>
            </div>

            <div className= "updateId">
              <p>{localStorage.userId}</p>
            </div>

            <div>
              <input type="email" name="userEmail" placeholder="e-mail" value={this.state.userEmail}/>
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
                  this.props.history.replace("/todoList", true);
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
