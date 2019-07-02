import React, { Fragment } from "react"

import firebase from "../../../Utils/Config/firebase"
import "./UpdateToDo.css"

const updateToDo = props => {
  const updateClickHandler = () => {
    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    const todoRef = todosRef.child(props.id)

    todoRef
      .update({
        deadLine: props.deadLine,
        details: props.taskDetails
      })
      .then(res => {
        props.saveClicked()
      })
      .catch(err => console.error(err))
  }

  return (
    <Fragment>
      <tr>
        <th scope="row">Dead-line</th>
        <td>
          <input
            type="date"
            name="deadLine"
            value={props.deadLine}
            onChange={props.updateTodoContents}
          />
        </td>
      </tr>
      <tr>
        <th scope="row">Details</th>
        <td>
          <textarea
            name="details"
            rows="10"
            cols="50"
            value={props.taskDetails}
            onChange={props.updateTodoContents}
          />
        </td>
      </tr>
      <tr>
        <td colSpan="2" className="btn-container">
          <button className="btn" onClick={updateClickHandler}>
            SAVE
          </button>
          <button className="btn" onClick={props.cancelClicked}>
            RETURN
          </button>
        </td>
      </tr>
    </Fragment>
  )
}

export default updateToDo
