import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import firebase from "../../../Utils/Config/firebase"
import * as actionTypes from "../../../store/Actiontypes/actionTypes"
import "./Message.css"

class Message extends Component {
  acceptInvitationHandler = () => {
    // TODO need to be replaced with redux-thunk
    const rootRef = firebase.database().ref()
    // users/id/group[]
    const usersRef = rootRef.child("users/" + this.props.userId)
    const userGroupRef = usersRef.child("group")
    userGroupRef.push(this.props.groupName)

    // group/groupName/member[]
    const groupRef = rootRef.child("group/" + this.props.groupName + "/member")
    groupRef.push(this.props.userId)

    const messagesRef = usersRef.child("messages/" + this.props.id)
    messagesRef.update({ hasRead: true })

    // this.props.clicked()
    // this.props.updateMessageStatus(this.props.userId, this.props.id)
  }

  cancelHandler = () => {
    // TODO need to be replaced with redux-thunk
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users/" + this.props.userId)
    const messagesRef = usersRef.child("messages/" + this.props.id)
    messagesRef.update({ hasRead: true })

    // this.props.clicked()
    // this.props.updateMessageStatus(this.props.userId, this.props.id)
  }

  render() {
    let acceptHandler = null
    if (this.props.type === "inviteToGroup")
      acceptHandler = this.acceptInvitationHandler

    return (
      <div className="Message">
        <div>
          <aside>
            <label htmlFor="sender">Sender</label>
          </aside>
          <div>
            <p>{this.props.sender}</p>
          </div>
        </div>

        <div>
          <aside>
            <label htmlFor="message">Message</label>
          </aside>
          <div>
            <p>{this.props.comment}</p>
          </div>
        </div>

        <div className="btn">
          <button onClick={acceptHandler}>Join</button>
          <button onClick={this.cancelHandler}>Skip</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMessageStatus: (userId, messageId) => {
      dispatch({
        type: actionTypes.UPDATE_MESSAGE_STATUS,
        payload: { userId: userId, messageId: messageId }
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Message))
