import React, { Fragment } from "react"

import "./UpdateToDo.css"

const updateToDo = props => {
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
            name="taskDetails"
            rows="10"
            cols="50"
            value={props.taskDetails}
            onChange={props.updateTodoContents}
          />
        </td>
      </tr>
      <tr>
        <td colSpan="2" className="btn-container">
          <button className="btn" onClick={props.saveClicked}>
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
