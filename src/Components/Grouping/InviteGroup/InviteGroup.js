import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import firebase from "../../../Utils/Config/firebase"
import * as _ from "../../../Utils/_"
import "./InviteGroup.css"

class InviteGroup extends Component {
  state = {
    userIds: [],
    suggestedUserIds: [],
    checkedUsers: [],
    groupList: []
  }

  componentDidMount() {
    this.hasMounted = true
    this.readGroupListByUser()
    this.readUserId()
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  readGroupListByUser = async () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users/" + localStorage.getItem("userId"))
    const groupRef = usersRef.child("group").once("value")

    // gets group list
    await groupRef.then(res => {
      this.setState({ groupList: res.val() })
    })
  }

  // reads userIds
  readUserId = () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("/users").once("value")

    usersRef
      .then(res => {
        const users = Object.keys(res.val())
        if (this.hasMounted) this.setState({ userIds: users })
      })
      .catch(err => console.error(err))
  }

  // finds userIds which includes user's input
  searchUserIdWithHashHandler = e => {
    const input = e.target.value

    if (!input) {
      this.setState({ suggestedUserIds: [] })
      return
    }

    const suggestedUserIds = this.state.userIds.filter(userId => {
      // TODO string.includes() isn't supported for IE?
      return userId.includes(input)
    })
    this.setState({ suggestedUserIds: suggestedUserIds })
  }

  valueCheckedHandler = e => {
    const checkedUser = e.target.name
    const checkedUsers = [...this.state.checkedUsers]
    // when unchecks user
    if (checkedUsers.find(user => user === checkedUser)) {
      const updatedCheckedUsers = checkedUsers.filter(
        user => user !== checkedUser
      )

      this.setState({ checkedUsers: updatedCheckedUsers })
    } else {
      // when checks user
      this.setState(prevState => {
        return {
          checkedUsers: [...prevState.checkedUsers, checkedUser]
        }
      })
    }
  }

  submitHandler = e => {
    e.preventDefault()

    const { comment, selectedGroup } = e.target

    const rootRef = firebase.database().ref()

    const messageReceivers = this.state.checkedUsers
    messageReceivers.forEach(receiver => {
      const usersRef = rootRef.child("users/" + receiver)
      const messagesRef = usersRef.child("messages")
      const key = messagesRef.push().key

      const message = {
        id: key,
        groupName: selectedGroup.value,
        sender: localStorage.getItem("userId"),
        type: "inviteToGroup",
        comment: comment.value,
        hasRead: false
      }
      messagesRef.update({ [message.id]: message })
    })

    this.props.history.replace("/todoList")
  }

  render() {
    return (
      <div className="InviteGroup">
        <label htmlFor="searchUser">Search user</label>
        <input
          id="searchUser"
          type="text"
          onChange={this.searchUserIdWithHashHandler}
        />
        <form onSubmit={this.submitHandler}>
          <div>
            <select name="selectedGroup" required>
              {_._map(this.state.groupList, group => (
                <option key={group} name="groups">
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div>
            <strong>Suggested users</strong>
          </div>
          <div>
            {this.state.suggestedUserIds.map(suggestedUserId => {
              // ignore if suggestedUserId is current user's ID
              if (suggestedUserId === localStorage.getItem("userId"))
                return null

              return (
                <label key={`${suggestedUserId}_label`}>
                  {suggestedUserId}
                  <input
                    type="checkbox"
                    key={suggestedUserId}
                    name={suggestedUserId}
                    onChange={this.valueCheckedHandler}
                  />
                </label>
              )
            })}
          </div>
          <div>
            <textarea rows="20" cols="70" name="comment" />
          </div>
          <button type="submit" disabled={this.state.checkedUsers.length === 0}>
            INVITE TO GROUP
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(InviteGroup)
