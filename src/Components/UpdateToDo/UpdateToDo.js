import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { exitToDoUpdate, updateExecute } from "../../store/actions/todoActions"
import { fetchMemberByGroup } from "../../store/actions/groupActions"
import Button from "../../UI/Button/Button"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import * as _ from "../../Utils/_"
import Content from "../../UI/Content/Content"
import lodash from "lodash"
import "./UpdateToDo.css"

const updateToDo = props => {
  const [todoInfo, setTodoInfo] = useState({
    author: props.todoInfo.author,
    childToDo: props.todoInfo.childToDo,
    completeRate: props.todoInfo.completeRate,
    date: props.todoInfo.date,
    deadLine: props.todoInfo.deadLine,
    details: props.todoInfo.details,
    group: props.todoInfo.group,
    id: props.todoInfo.id,
    manager: props.todoInfo.manager,
    priority: props.todoInfo.priority,
    superToDo: props.todoInfo.superToDo,
    todo: props.todoInfo.todo
  })

  const [membersByGroup, setMembersByGroup] = useState({})

  useEffect(() => {
    props.fetchMemberByGroup(props.todoInfo.group)
  }, [])

  useEffect(() => {
    setMembersByGroup(props.membersByGroup)
  }, [props.membersByGroup])

  const exitToDoUpdate = () => {
    props.exitToDoUpdate(props.todoInfo.id)
    props.history.push("/")
  }

  const updateExecute = e => {
    e.preventDefault()

    props.updateExecute(todoInfo)
    props.history.push("/")
  }

  const updateInput = e => {
    setTodoInfo({ ...todoInfo, [e.target.name]: e.target.value })
  }

  return (
    <Aux styleName="UpdateToDo">
      <div className="wrap">
        <form onSubmit={updateExecute}>
          <Content title="Manager">
            <select name="manager" value={todoInfo.manager} onChange={updateInput}>
              {_.map(membersByGroup, member => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </Content>

          <Content title="Priority">
            <select defaultValue={todoInfo.priority} id="priority" name="priority">
              <option value="urgent">urgent</option>
              <option value="normal">normal</option>
              <option value="notHurry">not in a hurry</option>
            </select>
          </Content>

          <Content title="Complete rate">
            <select
              defaultValue={todoInfo.completeRate}
              id="completeRate"
              name="completeRate"
              onChange={updateInput}
            >
              {lodash.range(1, 101).map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </Content>

          <Content title="Deadline">
            <input
              type="date"
              name="deadLine"
              value={todoInfo.deadLine}
              onChange={updateInput}
            />
          </Content>

          <Content title="detail">
            <textarea
              name="details"
              rows="10"
              cols="50"
              value={todoInfo.details}
              onChange={updateInput}
            />
          </Content>

          <div className="btn">
            <Button buttonType="submit">Save</Button>
            <Button clicked={exitToDoUpdate}>Return</Button>
          </div>
        </form>
      </div>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    todoInfo: state.todo.currentToDo,
    membersByGroup: state.group.membersByGroup
  }
}

export default connect(
  mapStateToProps,
  { exitToDoUpdate, updateExecute, fetchMemberByGroup }
)(withRouter(updateToDo))
