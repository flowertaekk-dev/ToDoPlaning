import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { getPassword } from "../../store/actions/userActions"

import firebase from "../../Utils/Config/firebase"
import Button from "../../UI/Button/Button"
import { Base64 } from "js-base64"
import "./UserUpdate.css"

// JuYoung Kang.dev
class UserUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: "",
      userEmail: "",
      emailMessage: "",
      passwordMessage: ""
    }
  }

  // validates inputs
  _emptyInputValidator = (email, password, changePW, confirmPW) => {
    let result = true

    this.setState({
      emailMessage: email ? "" : "Enter Email",
      passwordMessage: password ? "" : "Enter Password"
    })

    const originPassword = this.props.userInfo.password
    const encodingPassword = Base64.encode(password)

    if (
      !email ||
      !password ||
      !changePW ||
      !confirmPW ||
      originPassword !== encodingPassword ||
      changePW !== confirmPW
    ) {
      result = false
    }

    return result
  }

  _updateDataToDB = (userRef, email, password) => {
    userRef.update({
      email: email.value,
      password: Base64.encode(password.value)
    })
  }

  /**
   ********* JuYoung, it seems better to place it in Action(Redux) *********
   */
  _updateUser = async e => {
    // update user data to firebase
    e.preventDefault()

    const {
      userEmail,
      userPassword,
      changePassword,
      confirmPassword
    } = e.target

    if (
      !this._emptyInputValidator(
        userEmail.value,
        userPassword.value,
        changePassword.value,
        confirmPassword.value
      )
    )
      return

    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users")
    const userRef = usersRef.child(this.props.userId)

    // update user data to firebase
    this._updateDataToDB(userRef, userEmail, changePassword)

    // after sign up, moves to "To Do List" page
    this.props.history.replace("/todoList", true)
  }

  componentDidMount() {
    this.hasMounted = true
    this.readUserData()
    this.props.getPassword(this.props.userId)
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  readUserData = async () => {
    const rootRef = firebase.database().ref()

    // gets group list
    await this.setUserData(rootRef)
  }

  setUserData = async rootRef => {
    const getUserData = rootRef
      .child("users/" + this.props.userId)
      .once("value")

    // gets group list
    await getUserData.then(res => {
      if (this.hasMounted) {
        // this.setState({ userId: localStorage.getItem("userId") }) // what is this for..?
        this.setState({ userEmail: res.val().email })
      }
    })
  }

  // flowertaekk.dev added
  dataChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="User-update">
        <div className="wrap">
          <form onSubmit={this._updateUser}>
            <div className="content">
              <h2>User update</h2>
            </div>

            <div className="content">
              <span className="title">ID</span>
              <span className="separator">|</span>
              <p>{this.props.userId}</p>
            </div>

            <div className="content">
              <span className="title">e-mail</span>
              <span className="separator">|</span>
              <input
                type="email"
                name="userEmail"
                placeholder="e-mail"
                value={this.state.userEmail}
                onChange={this.dataChangeHandler}
              />
              {/* ERROR */}
            </div>

            {/* 
              JuYoung, please update code here as below.

              PW! 
              want to check
                1. current PW
                  1.1. If it is wrong, stop updaing user data.
                2. PW that will be set
                3. checks PW that will be set once more
                  3.1. If it is different from the PW from 'number 2', stop updaing.
            */}

            <div className="content">
              <span className="title">PW</span>
              <span className="separator">|</span>
              <input
                type="password"
                name="userPassword"
                placeholder="password"
              />
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">ChangePW</span>
              <span className="separator">|</span>
              <input
                type="password"
                name="changePassword"
                placeholder="changePassword"
              />
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">ChangePWConfirm</span>
              <span className="separator">|</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
              />
              {/* ERROR */}
            </div>

            <div className="btn">
              <Button buttonType="submit">Update</Button>
              <Button
                buttonType="button"
                clicked={() => {
                  this.props.history.replace("/todoList", true)
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    userInfo: state.user.password
  }
}

export default connect(
  mapStateToProps,
  { getPassword }
)(withRouter(UserUpdate))
