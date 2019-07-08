import React, { Component } from "react"
import { connect } from "react-redux"

import Message from "./Message/Message"
import * as _ from "../../Utils/_"
import "./Messages.css"

class Messages extends Component {
  componentDidMount() {
    this.hasMounted = true
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  // TODO need to update with redux
  updateMessageStatusHandler = id => {
    this.setState(prevState => {
      const updatedMessage = this.state.messages[id]
      updatedMessage.hasRead = true

      return { messages: { ...prevState.messages, updatedMessage } }
    })
  }

  render() {
    return (
      <div className="Messages">
        {_._map(this.props.messages, message => {
          if (message.hasRead === true) return null

          return (
            <Message
              key={message.id}
              {...message}
              // clicked={() => this.updateMessageStatusHandler(message.id)}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    messages: state.message.messages
  }
}

export default connect(mapStateToProps)(Messages)
