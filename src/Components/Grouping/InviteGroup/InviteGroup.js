import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import Aux from "../../../hoc/Auxiliary/Auxiliary"
import firebase from "../../../Utils/Config/firebase"
import Button from "../../../UI/Button/Button"
import * as _ from "../../../Utils/_"
import "./InviteGroup.css"

class InviteGroup extends Component {
  state = {
    users: {},
    suggestedUserIds: [],
    checkedUsers: [],
    selectedGroup: "none"
  }

  componentDidMount() {
    this.hasMounted = true
    this.readUsers()
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  // reads users
  readUsers = () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("/users").once("value")

    usersRef
      .then(res => {
        if (this.hasMounted) this.setState({ users: res.val() })
      })
      .catch(err => console.error(err))
  }

  // finds userIds which includes user's input
  searchUserIdWithHashHandler = e => {
    const input = e.target.value

    // initializes if input is empty
    if (!input) {
      this.setState({ suggestedUserIds: [] })
      return
    }

    // checks if certain group has been selected
    if (this.state.selectedGroup === "none") {
      this.setState({ suggestedUserIds: [] })
      return
    }

    // finds proposable ID
    const suggestedUserIds = _.filter(
      this.state.users,
      users =>
        !users.group ||
        Object.values(users.group).indexOf(this.state.selectedGroup) === -1
    ) // filters users who is not in selected group
      .map(user => user.id) // maps only userId
      .filter(userId => userId.includes(input)) // filters userIds whose contain 'input' string

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

    if (this.state.selectedGroup === "none") {
      this.setState({ errMessage: "ERROR: Select group" })
      return
    }
    const { comment, selectedGroup } = e.target

    const rootRef = firebase.database().ref()

    /**
     * sends messages to selected users
     */
    const messageReceivers = this.state.checkedUsers
    messageReceivers.forEach(receiver => {
      const usersRef = rootRef.child("users/" + receiver)
      const messagesRef = usersRef.child("messages")
      const key = messagesRef.push().key

      const message = {
        id: key,
        groupName: selectedGroup.value,
        sender: this.props.userId,
        type: "inviteToGroup",
        comment: comment.value,
        hasRead: false
      }
      messagesRef.update({ [message.id]: message })
    })

    this.props.history.replace("/todoList")
  }

  onChangeHandler = e => {
    this.setState({
      checkedUsers: [],
      suggestedUserIds: [],
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Aux styleName="InviteGroup">
        <div className="wrap">
          <form onSubmit={this.submitHandler}>
            <div className="content">
              <span className="title">Target group</span>
              <span className="separator">|</span>
              <select
                name="selectedGroup"
                onChange={this.onChangeHandler}
                required
              >
                <option>none</option>
                {_.map(this.props.groupNames, group => (
                  <option key={group} name="groups">
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="content">
              <span className="title">Target user</span>
              <span className="separator">|</span>
              <input
                id="searchUser"
                type="text"
                onChange={this.searchUserIdWithHashHandler}
              />
            </div>

            <div className="content">
              <span className="title">Searched Users</span>
              <span className="separator">|</span>
              <div>
                {this.state.suggestedUserIds.map(suggestedUserId => {
                  // TODO is this enough?
                  if (suggestedUserId === this.props.userId) return null

                  return (
                    <div key={`${suggestedUserId}_label`} className="ck-button">
                      <label>
                        <input
                          type="checkbox"
                          key={suggestedUserId}
                          name={suggestedUserId}
                          onChange={this.valueCheckedHandler}
                        />
                        <span>{suggestedUserId}</span>
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="content">
              <span className="title">Message</span>
              <span className="separator">|</span>
              <div className="comment-wrap">
                <textarea name="comment" />
              </div>
            </div>

            <div className="btn">
              <Button
                buttonType="submit"
                buttonDisabled={this.state.checkedUsers.length === 0}
              >
                INVITE TO GROUP
              </Button>
            </div>
          </form>
        </div>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    groupNames: state.group.groupNames
  }
}

export default connect(mapStateToProps)(withRouter(InviteGroup))
