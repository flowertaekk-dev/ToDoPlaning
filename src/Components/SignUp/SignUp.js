import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import * as actionTypes from "../../store/Actiontypes/actionTypes"
import { Base64 } from "js-base64"
import firebase from "../../Utils/Config/firebase"

import "./SignUp.css"

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idMessage: "",
      emailMessage: "",
      passwordMessage: ""
    }
  }

  // validates inputs
  _emptyInputValidator = (id, email, password) => {
    let result = true

    this.setState({
      idMessage: id ? "" : "Enter ID",
      emailMessage: email ? "" : "Enter Email",
      passwordMessage: password ? "" : "Enter Password"
    })

    if (!id || !email || !password) {
      result = false
    }

    return result
  }

  _duplicatedIDValidator = async userRef => {
    let result = false
    await userRef.once("value", snapshot => {
      if (snapshot.exists()) {
        result = true
      }
    })
    return result
  }

  // TODO need to think about variable name again..
  _setDataToDB = (userRef, userId, email, password) => {
    userRef.set({
      id: userId,
      email: email.value,
      password: Base64.encode(password.value)
    })
  }

  // inserts data to firebase
  signUpHandler = async e => {
    e.preventDefault()

    const { userId, userEmail, userPassword } = e.target

    if (
      !this._emptyInputValidator(
        userId.value,
        userEmail.value,
        userPassword.value
      )
    )
      return

    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users")
    const userRef = usersRef.child(userId.value)
    // checks if there is the same ID which user has entered
    if (await this._duplicatedIDValidator(userRef)) {
      this.setState({
        idMessage: "duplicated ID"
      })
      return
    }

    // sets user data to firebase
    this._setDataToDB(userRef, userId, userEmail, userPassword)

    // after sign up, moves to "To Do List" page
    this.props.saveUserId(userId.value)
    this.props.history.replace("/todoList")
  }

  render() {
    return (
      <Fragment>
        <div className="Sign-up">
          <form onSubmit={this.signUpHandler}>
            <div className="title">
              <h1>Sign up</h1>
            </div>

            <div>
              <input type="text" name="userId" placeholder="ID" />
              <ErrorMessage msg={this.state.idMessage} />
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
              <button type="submit">Register</button>
              <button onClick={this.props.history.goBack}>CANCEL</button>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}

export const ErrorMessage = props => {
  const _errStyle = {
    color: "red"
  }

  return (
    <p>
      <span style={_errStyle}>{props.msg}</span>
    </p>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    saveUserId: targetUserId =>
      dispatch({
        type: actionTypes.SAVE_USER_ID,
        payload: { userId: targetUserId }
      })
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SignUp))
