import React, { Component } from "react"

import Message from "./Message/Message"
import firebase from "../../Utils/Config/firebase"
import * as _ from "../../Utils/_"
import "./Messages.css"

class Messages extends Component {
  state = {
    messages: {}
  }

  componentDidMount() {
    this.hasMounted = true
    this.readMessageById()
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  readMessageById = () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users/" + localStorage.getItem("userId"))
    // TODO think about the need of adding a flag to check its message has already been completed
    const messagesRef = usersRef.child("messages")

    let messages = {}
    // STUDY need to think about 'this' scope more carefully.
    messagesRef.on("value", snap => {
      messages = snap.val()
      if (this.hasMounted) this.setState({ messages: messages }) // we may need to change this using redux.
    })
  }

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
        {_._map(this.state.messages, message => {
          if (message.hasRead === true) return null

          return (
            <Message
              key={message.id}
              {...message}
              clicked={() => this.updateMessageStatusHandler(message.id)}
            />
          )
        })}
      </div>
    )
  }
}

export default Messages
