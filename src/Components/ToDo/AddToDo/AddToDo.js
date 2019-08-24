import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import lodash from "lodash"
import { fetchTodosById, addToDo } from "../../../store/actions/todoActions"
import { fetchMemberByGroup } from "../../../store/actions/groupActions"
import Button from "../../../UI/Button/Button"
import Content from "../../../UI/Content/Content"
import SuperToDo from "./SuperToDo/SuperToDo"
import * as _ from "../../../Utils/_"
import firebase from "../../../Utils/Config/firebase"
import "./AddToDo.css"

// flowertaekk.dev
class AddToDo extends Component {
  // TODO need to do refactoring maybe later??
  state = {
    searchedTask: {},
    selectedSuperToDo: null,
    selectedDate: _.getCurrentDate(),
    deadLine: _.getCurrentDate()
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
      !this.emptyInputValidator(
        selectedDate.value,
        todo.value,
        completeRate.value,
        deadLine.value
      )
    ) {
      return
    }

    // TODO need to check whether or not its userId really exists???

    const updateTodo = {
      // id: key ( added in todoAction.js )
      author: this.props.userId,
      date: selectedDate.value,
      todo: todo.value,
      completeRate: completeRate.value,
      deadLine: deadLine.value,
      priority: priority.value,
      details: taskDetail.value,
      group: group.value === "none" ? null : group.value,
      manager: manager.value === "defaultManager" ? this.props.userId : manager.value,
      superToDo: _.requireNonNull(this.state.selectedSuperToDo)
    }

    this.props.addToDo(updateTodo)

    this.initializeInputs(e)
    this.props.history.replace("/todoList")
  }

  initializeInputs = e => {
    const { selectedDate, todo, deadLine, priority, taskDetail } = e.target

    selectedDate.value = ""
    todo.value = ""
    deadLine.value = ""
    priority.value = "normal"
    taskDetail.value = ""
  }

  emptyInputValidator = (selectedDate, todo, completeRate, deadLine) => {
    let result = true

    // other inputs are optional
    this.setState({
      dateMessage: selectedDate ? "" : "Enter Date",
      todoMessage: todo ? "" : "Enter Todo",
      deadLineMessage: deadLine ? "" : "Enter deadLine"
    })

    const getCompleteRate = parseInt(completeRate)
    if (!isNaN(getCompleteRate) && (getCompleteRate < 0 || getCompleteRate > 100)) {
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

  retrieveTasksByInput = e => {
    // when there is no input, no suggestion
    if (!e.target.value) {
      this.setState({ searchedTask: {} })
      return
    }

    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    todosRef
      .orderByChild("todo")
      .startAt(e.target.value)
      .endAt(e.target.value + "\uf8ff")
      .once("value", snap => {
        this.setState({ searchedTask: snap.val() })
      })
  }

  superToDoClicked = todoInfo => {
    this.setState({ selectedSuperToDo: todoInfo })
  }

  render() {
    return (
      <div className="AddTodo">
        <div className="wrap">
          <form onSubmit={this.onSubmitHandler}>
            <div className="content">
              <h2>Add ToDo</h2>
            </div>

            <Content title="Date">
              <input
                type="date"
                id="date"
                name="selectedDate"
                value={this.state.selectedDate}
                onChange={this.editSelectedDateHandler}
              />
              {/* ERROR */}
            </Content>

            <Content title="ToDo">
              <input type="type" id="todo" name="todo" placeholder="TODO" />
              {/* ERROR */}
            </Content>

            <Content title="Complete rate">
              <select
                id="completeRate"
                name="completeRate"
                placeholder="Please input completeRate"
                required
              >
                {lodash.range(1, 101).map(value => (
                  <option key={value} value={value}>
                    {value}%
                  </option>
                ))}
              </select>
              {/* ERROR */}
            </Content>

            <Content title="Deadline">
              <input
                type="date"
                id="deadLine"
                name="deadLine"
                value={this.state.deadLine}
                onChange={this.editSelectedDateHandler}
              />
              {/* ERROR */}
            </Content>

            <Content title="Priority">
              <select defaultValue="normal" id="priority" name="priority">
                <option value="urgent">urgent</option>
                <option value="normal">normal</option>
                <option value="notHurry">not in a hurry</option>
              </select>
              {/* ERROR */}
            </Content>

            <Content title="Detail">
              <textarea name="taskDetail" />
              {/* ERROR */}
            </Content>

            <Content title="Group">
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
            </Content>

            <Content title="Manager">
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
            </Content>

            <Content title="Parent task">
              <input
                className="search-super-task"
                type="text"
                name="searchTask"
                placeholder="Search task with task name"
                onChange={this.retrieveTasksByInput}
              />
              <div>
                {_.map(this.state.searchedTask, task => {
                  let superToDo = null
                  if (_.requireNonNull(this.state.selectedSuperToDo)) {
                    superToDo = Object.keys(this.state.selectedSuperToDo)[0]
                  }

                  return (
                    <SuperToDo
                      {...task}
                      key={task.id}
                      selected={superToDo === task.id}
                      clicked={() => this.superToDoClicked({ [task.id]: task.todo })}
                    />
                  )
                })}
              </div>
            </Content>

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
  { fetchTodosById, fetchMemberByGroup, addToDo }
)(withRouter(AddToDo))
