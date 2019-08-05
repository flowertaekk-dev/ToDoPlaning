import React, { Component } from "react"
import { connect } from "react-redux"

import * as _ from "../../Utils/_"
import { fetchTodosById } from "../../store/actions/todoActions"
import { fetchGroupList } from "../../store/actions/groupActions"
import Todo from "./ToDo/ToDo"
import firebase from "../../Utils/Config/firebase"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import "./TodoList.css"

// flowertaekk.dev
class TodoList extends Component {
  componentDidMount() {
    this.hasMounted = true
    this.props.fetchTodosById(this.props.userId)
    this.props.fetchGroupList(this.props.userId)
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  filterWithDate = deadLine => {
    return (
      deadLine <
      [
        this.props.year,
        _.withLeadingZero(this.props.month),
        _.withLeadingZero(this.props.date)
      ].join("-")
    )
  }

  sortByPriority = () => {
    let result = { ...this.props.todoList }

    // sort by deadLine
    return (
      Object.keys(result)
        // wrap literal with array
        .reduce((prev, key) => {
          if (prev.length === 0) return [result[key]]
          return [...prev, result[key]]
        }, [])
        // sort by priority
        .sort((a, b) => {
          if (
            this.calPriority(a.date, a.deadLine, a.completeRate, a.priority) <
            this.calPriority(b.date, b.deadLine, b.completeRate, b.priority)
          )
            return 1
          if (
            this.calPriority(a.date, a.deadLine, a.completeRate, a.priority) >
            this.calPriority(b.date, b.deadLine, b.completeRate, b.priority)
          )
            return -1
          return 0
        })
    )
  }

  calPriority = (insertTime, deadLine, completeRate, priority) => {
    let insertTimeT = this.getTimestamp(insertTime) / 1000
    let deadLineT = this.getTimestamp(deadLine) / 1000
    let priorityConstant = 0
    let result = 0

    if (priority === "urgent") {
      priorityConstant = 9999999999
    } else if (priority === "normal") {
      priorityConstant = 8888888888
    } else {
      priorityConstant = 7777777777
    }
    if (deadLineT === insertTimeT) {
      result = completeRate / 100 + priorityConstant
    } else {
      result =
        (deadLineT - insertTimeT) / (completeRate / 100) + priorityConstant
    }

    return result
  }

  getTimestamp(yearOrDateStr, month, date) {
    // when the number of arguments is 1, it is considered the argument is string with Date data
    if (arguments.length === 1) return new Date(yearOrDateStr).getTime()

    return new Date(yearOrDateStr, month - 1, date).getTime()
  }

  // deletes ToDo
  deleteToDoHandler = todoId => {
    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    const todoRef = todosRef.child(todoId)

    todoRef.remove()
  }

  render() {
    return (
      <Aux styleName="TodoList">
        {this.sortByPriority().map(todo => {
          if (this.filterWithDate(todo.deadLine)) {
            return null
          }

          return (
            <Todo
              key={todo.id}
              {...todo}
              deleteClicked={() => this.deleteToDoHandler(todo.id)}
              updateTodo={() => this.updateTodoHandler(todo.id)}
            />
          )
        })}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    todoList: state.todo.todoList,
    year: state.common.date.year,
    month: state.common.date.month + 1,
    date: state.common.date.date
  }
}

export default connect(
  mapStateToProps,
  { fetchTodosById, fetchGroupList }
)(TodoList)
