import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import lodash from "lodash"

import { fetchTodosById } from "../../../store/actions/todoActions"
import { fetchMemberByGroup } from "../../../store/actions/groupActions"
import firebase from "../../../Utils/Config/firebase"
import Button from "../../../UI/Button/Button"
import * as _ from "../../../Utils/_"
import "./AddToDo.css"

// flowertaekk.dev
class AddToDo extends Component {
  // TODO need to do refactoring maybe later??
  constructor(props) {
    super(props)

    this.state = {}
  }

  // TODO it can be replaced with redux
  onSubmitHandler = e => {
    e.preventDefault()

    const {
      selectedDate,
      todo,
      completeRate,
      deadLine,
      priority,
      taskDetail,
      group,
      manager
    } = e.target

    if (
      !this._emptyInputValidator(
        selectedDate.value,
        todo.value,
        completeRate.value,
        deadLine.value
      )
    )
      return

    // TODO need to check whether or not its userId really exists???

    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    const key = todosRef.push().key
    const todoRef = todosRef.child(key)

    const updateTodo = {
      id: key,
      author: this.props.userId,
      date: selectedDate.value,
      todo: todo.value,
      completeRate: completeRate.value,
      deadLine: deadLine.value,
      priority: priority.value,
      details: taskDetail.value,
      group: group.value === "none" ? null : group.value,
      manager:
        manager.value === "defaultManager" ? this.props.userId : manager.value,
      subTodo: [] // TODO 未実装
    }

    todoRef.update(updateTodo)

    this._initializeInputs(e)
    this.props.history.replace("/todoList")
  }

  _initializeInputs = e => {
    const { selectedDate, todo, deadLine, priority, taskDetail } = e.target

    selectedDate.value = ""
    todo.value = ""
    deadLine.value = ""
    priority.value = "normal"
    taskDetail.value = ""
  }

  _emptyInputValidator = (selectedDate, todo, completeRate, deadLine) => {
    let result = true

    // other inputs are optional
    this.setState({
      dateMessage: selectedDate ? "" : "Enter Date",
      todoMessage: todo ? "" : "Enter Todo",
      deadLineMessage: deadLine ? "" : "Enter deadLine"
    })

    const getCompleteRate = parseInt(completeRate)
    if (
      !isNaN(getCompleteRate) &&
      (getCompleteRate < 0 || getCompleteRate > 100)
    ) {
      this.setState({
        completeMessage: "Please enter a number between 0 and 100"
      })
      result = false
    }

    if (!selectedDate || !todo || !deadLine) result = false

    return result
  }

  editSelectedDateHandler = e => {
    // when the event is from Group(select), fetches members' ID by group name
    if (e.target.name === "group") {
      this.props.fetchMemberByGroup(e.target.value)
    }

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  cancelHandler = e => {
    e.preventDefault()
    this.props.history.replace("/todoList")
  }

  render() {
    return (
      <div className="AddTodo">
        <div className="wrap">
          <form onSubmit={this.onSubmitHandler}>
            <div className="content">
              <h2>Add ToDo</h2>
            </div>
            <div className="content">
              <span className="title">Date</span>
              <span className="separator">|</span>
              <input
                type="date"
                id="date"
                name="selectedDate"
                value={this.props.selectedDate}
                onChange={this.editSelectedDateHandler}
              />
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">ToDo</span>
              <span className="separator">|</span>
              <input type="type" id="todo" name="todo" placeholder="TODO" />
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">Complete rate</span>
              <span className="separator">|</span>
              <select
                id="completeRate"
                name="completeRate"
                placeholder="Please input completeRate"
                required
              >
                {lodash.range(1, 101).map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">Deadline</span>
              <span className="separator">|</span>
              <input
                type="date"
                id="deadLine"
                name="deadLine"
                value={this.props.deadLine}
                onChange={this.editSelectedDateHandler}
              />
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">Priority</span>
              <span className="separator">|</span>
              <select defaultValue="normal" id="priority" name="priority">
                <option value="urgent">urgent</option>
                <option value="normal">normal</option>
                <option value="notHurry">not in a hurry</option>
              </select>
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">Detail</span>
              <span className="separator">|</span>
              <textarea name="taskDetail" />
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">Group</span>
              <span className="separator">|</span>
              <select name="group" onChange={this.editSelectedDateHandler}>
                <option key="none" value="none">
                  none
                </option>
                {_.map(this.props.groupNames, groupName => (
                  <option key={groupName} value={groupName}>
                    {groupName}
                  </option>
                ))}
              </select>
              {/* ERROR */}
            </div>

            <div className="content">
              <span className="title">Manager</span>
              <span className="separator">|</span>
              <select
                name="manager"
                disabled={!this.state.group || this.state.group === "none"}
              >
                <option key="defaultManager" value="defaultManager">
                  Select User
                </option>
                {_.map(this.props.membersByGroup, member => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
              {/* ERROR */}
            </div>

            <div className="btn">
              <Button buttonType="submit">Add</Button>
              <Button clicked={this.cancelHandler}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    groupNames: state.group.groupNames,
    membersByGroup: state.group.membersByGroup
  }
}

export default connect(
  mapStateToProps,
  { fetchTodosById, fetchMemberByGroup }
)(withRouter(AddToDo))
