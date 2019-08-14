import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

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
  _emptyInputValidator = (email, password) => {
    let result = true

    this.setState({
      emailMessage: email ? "" : "Enter Email",
      passwordMessage: password ? "" : "Enter Password"
    })

    if (!email || !password) {
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

  // update user data to firebase
  _updateUser = async e => {
    e.preventDefault()

    const { userEmail, userPassword } = e.target

    if (!this._emptyInputValidator(userEmail.value, userPassword.value)) return

    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users")
    const userRef = usersRef.child(this.props.userId)

    // update user data to firebase
    this._updateDataToDB(userRef, userEmail, userPassword)

    // after sign up, moves to "To Do List" page
    this.props.history.replace("/todoList", true)
  }

  componentDidMount() {
    this.hasMounted = true
    this.readUserData()
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

            {/* 
              JuYoung, please update code here as below.
              would like to add some more data to be upated.
              1. Manager
              2. Group
              3. Priority
              4. Completion rate
              5. Deadline
              6. Detail
            */}

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

// it should be component.. I guess it is copied from somewhere??
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

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(withRouter(UserUpdate))
