import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import {
  updateMessageStatus,
  joinGroup
} from "../../../store/actions/messageActions"
import "./Message.css"

class Message extends Component {
  acceptInvitationHandler = () => {
    this.props.joinGroup(this.props.userId, this.props.id, this.props.groupName)
  }

  cancelHandler = () => {
    this.props.updateMessageStatus(this.props.userId, this.props.id)
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

export default connect(
  mapStateToProps,
  { updateMessageStatus, joinGroup }
)(withRouter(Message))
