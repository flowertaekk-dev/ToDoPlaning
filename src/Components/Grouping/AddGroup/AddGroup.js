import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import firebase from "../../../Utils/Config/firebase"
import "./AddGroup.css"

class AddGroup extends Component {
  state = {
    errMessage: null
  }

  getGroupRef = groupName => {
    const rootRef = firebase.database().ref()
    const groupRef = rootRef.child("group")
    return groupRef.child(groupName)
  }

  getUserRef = () => {
    const rootRef = firebase.database().ref()
    const userRef = rootRef.child("users")
    return userRef.child(localStorage.getItem("userId"))
  }

  setDataToDB = async groupName => {
    // set group
    const newGroup = {
      leader: [localStorage.getItem("userId")],
      member: [localStorage.getItem("userId")]
    }
    this.getGroupRef(groupName).set(newGroup)

    // reads users
    let userData = null
    await this.getUserRef()
      .once("value")
      .then(res => {
        if (res.exists) {
          userData = res.val()
        }
      })
      .catch(err => console.error(err))

    if (userData) {
      this.getUserRef().update({ group: [groupName, ...userData.group] })
    } else {
      this.getUserRef().update({ group: [groupName] })
    }
  }

  submitHandler = async e => {
    e.preventDefault()

    // initializes error message
    this.setState({ errMessage: null })

    const groupName = e.target.groupName.value
    await this.validation(groupName)
    if (this.state.errMessage) {
    } else {
      this.setDataToDB(groupName)
      this.props.history.goBack()
    }
  }

  cancelHandler = e => {
    e.preventDefault()
    this.props.history.replace("/todoList")
  }

  validation = async groupName => {
    const groupNameRef = this.getGroupRef(groupName)
    await groupNameRef
      .once("value")
      .then(res => {
        if (res.val()) {
          this.setState({ errMessage: "duplicated Group name" })
        }
      })
      .catch(err => {
        this.setState({ errMessage: "Unexpected Error" })
      })
  }

  render() {
    let error = null
    if (this.state.errMessage) {
      error = (
        <p>
          <strong>{this.state.errMessage}</strong>
        </p>
      )
    }

    return (
      <div className="AddGroup">
        <form onSubmit={this.submitHandler}>
          <input type="text" placeholder="Group name" name="groupName" />
          <div>
            <button type="submit">ADD GROUP</button>
            <button onClick={this.cancelHandler}>CANCEL</button>
          </div>
          {error}
        </form>
      </div>
    )
  }
}

export default withRouter(AddGroup)
