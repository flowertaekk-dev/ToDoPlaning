import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Base64 } from "js-base64"

import SignUp, { ErrorMessage } from "../SignUp/SignUp"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import firebase from "../../Utils/Config/firebase"
import "./Login.css"

// flowertaekk.dev
class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idMessage: "",
      passwordMessage: "",
      signUp: false
    }
  }

  singInHandler = e => {
    // prevents browser from refreshing
    e.preventDefault()

    // stops process when the process is "Sign up"
    if (e.target.signUp) return

    const { id, password } = e.target

    // checks if there is empty input
    if (!this._emptyInputValidator(id.value, password.value)) {
      return
    }

    // checks id and validate password
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users/" + id.value)
    usersRef
      .once("value")
      .then(snap => {
        // when ID is wrong
        if (snap.val() === null) {
          this.setState({
            idMessage: "Cannot find ID"
          })
          return
        }

        // FIXME need to think about password.value more... How can it be null at this point?
        if (
          password.value &&
          password.value === Base64.decode(snap.val().password)
        ) {
          this.props.whenLoginSuccess(id.value)
          this.props.history.replace("/todoList")
        } else {
          // when Password wrong
          this.setState({
            idMessage: "",
            passwordMessage: "Wrong password!"
          })
        }
      })
      .catch(err => console.log(err))
  }

  _emptyInputValidator = (id, password) => {
    let result = true

    this.setState({
      idMessage: id ? "" : "Enter ID",
      passwordMessage: password ? "" : "Enter password"
    })

    if (!id || !password) {
      result = false
    }

    return result
  }

  render() {
    const signUpComponent = (
      <SignUp whenLoginSuccess={this.props.whenLoginSuccess} />
    )
    const loginComponent = (
      <div className="Login">
        <form onSubmit={this.singInHandler}>
          <div className="title">
            <h1>Log in</h1>
          </div>

          {/* I wonder if this below <div> can be also a Component */}
          <div>
            <input type="text" id="id" name="id" placeholder="ID" />
            <ErrorMessage msg={this.state.idMessage} />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
            <ErrorMessage msg={this.state.passwordMessage} />
          </div>

          <div className="btn-container">
            <button type="submit" name="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    )

    return <Aux>{this.state.signUp ? signUpComponent : loginComponent}</Aux>
  }
}

export default withRouter(Login)
