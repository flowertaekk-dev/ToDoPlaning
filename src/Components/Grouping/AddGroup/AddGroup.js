import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import firebase from "../../../Utils/Config/firebase"
import { addGroup } from "../../../store/actions/groupActions"
import Button from "../../../UI/Button/Button"
import "./AddGroup.css"

class AddGroup extends Component {
  state = {
    errMessage: null
  }

  submitHandler = async e => {
    e.preventDefault()

    // initializes error message
    this.setState({ errMessage: null })

    const groupName = e.target.groupName.value
    await this.validation(groupName)
    if (this.state.errMessage) {
    } else {
      this.props.addGroup(this.props.userId, groupName)
      this.props.history.replace("/")
    }
  }

  cancelHandler = e => {
    e.preventDefault()
    this.props.history.replace("/todoList")
  }

  validation = async groupName => {
    const rootRef = firebase.database().ref()
    const groupsRef = rootRef.child("group")
    const groupRef = groupsRef.child(groupName)
    await groupRef
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
    // let error = null
    // if (this.state.errMessage) {
    //   error = (
    //     <p>
    //       <strong>{this.state.errMessage}</strong>
    //     </p>
    //   )
    // }

    return (
      <div className="AddGroup">
        <div className="wrap">
          <form onSubmit={this.submitHandler}>
            <div className="content">
              <h2>Add group</h2>
            </div>

            <div className="content">
              <span className="title">Group name</span>
              <span className="separator">|</span>
              <input type="text" placeholder="Group name" name="groupName" />
              {/* ERROR */}
            </div>

            <div className="btn">
              <Button buttonType="submit">ADD GROUP</Button>
              <Button clicked={this.cancelHandler}>CANCEL</Button>
            </div>
          </form>
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
  { addGroup }
)(withRouter(AddGroup))
