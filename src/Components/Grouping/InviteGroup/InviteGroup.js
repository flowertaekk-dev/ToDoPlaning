import React, { Component } from "react"

import firebase from "../../../Utils/Config/firebase"
import "./InviteGroup.css"

class InviteGroup extends Component {
  state = {
    userIds: [],
    suggestedUserIds: [],
    checkedUsers: []
  }

  componentDidMount() {
    this.hasMounted = true
    this.readUserId()
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  // reads userIds
  readUserId = () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("/users").once("value")

    usersRef
      .then(res => {
        const users = Object.keys(res.val())
        // console.log("[KEY]", users)
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

      this.setState({
        checkedUsers: updatedCheckedUsers
      })
    } else {
      // when checks user
      this.setState(prevState => {
        return {
          checkedUsers: [...prevState.checkedUsers, checkedUser]
        }
      })
    }

    console.log("[TEST]", this.state.checkedUsers)
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(e.target.selectedUsers)
    // TODO sends mail or message to selected users
    // To do so, we need message box functionality?
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
        <div>
          <strong>Suggested users</strong>
        </div>
        <form onSubmit={this.submitHandler}>
          <div>
            {this.state.suggestedUserIds.map(suggestedUserId => {
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
          <button type="submit">INVITE TO GROUP</button>
        </form>
      </div>
    )
  }
}

export default InviteGroup
