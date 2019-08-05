import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Base64 } from "js-base64"

import { ErrorMessage } from "../SignUp/SignUp"
import Button from "../../UI/Button/Button"
import firebase from "../../Utils/Config/firebase"
import { saveUserId } from "../../store/actions/userActions"
import "./Login.css"

// flowertaekk.dev
class Login extends Component {
  state = {
    idMessage: "",
    passwordMessage: ""
  }

  componentDidMount() {
    if (this.props.userId) this.props.history.replace("/todoList")
  }

  singInHandler = e => {
    // prevents browser from refreshing
    e.preventDefault()

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
          // login success
          this.props.saveUserId(id.value)
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
    let mainDivStyle = {}
    if (!this.props.userId) mainDivStyle = { width: "100%" }

    return (
      <div className="Login" style={mainDivStyle}>
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
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
  { saveUserId }
)(withRouter(Login))
