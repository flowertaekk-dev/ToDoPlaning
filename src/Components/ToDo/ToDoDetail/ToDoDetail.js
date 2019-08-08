import React from "react"
import { connect } from "react-redux"

import { exitToDoDetail } from "../../../store/actions/todoActions"
import Aux from "../../../hoc/Auxiliary/Auxiliary"
import Button from "../../../UI/Button/Button"
import "./ToDoDetail.css"

const todoDetail = props => {
  return (
    <Aux styleName="ToDoDetail">
      <div className="wrap">
        <div className="contents">
          <h2>{props.todoInfo.todo}</h2>

          <div className="content">
            <span className="title">Author</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.author}</p>
          </div>

          <div className="content">
            <span className="title">Manager</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.manager}</p>
          </div>

          {props.todoInfo.group && (
            <div className="content">
              <span className="title">Group</span>
              <span className="seperator">|</span>
              <p>{props.todoInfo.group}</p>
            </div>
          )}

          {/* <div className="content">
            <span className="title">ID</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.id}</p>
          </div> */}

          <div className="content">
            <span className="title">Priority</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.priority}</p>
          </div>

          <div className="content">
            <span className="title">Completion</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.completeRate}</p>
          </div>

          <div className="content">
            <span className="title">Issue date</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.date}</p>
          </div>

          <div className="content">
            <span className="title">Deadline</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.deadLine}</p>
          </div>

          <div className="content">
            <span className="title">Details</span>
            <span className="seperator">|</span>
            <p>{props.todoInfo.details}</p>
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              quia officiis adipisci, harum necessitatibus earum, veritatis et
              nihil iusto deleniti eaque repudiandae. Voluptatibus cumque
              nesciunt neque fuga omnis nisi. Aliquam, consectetur rerum odio
              exercitationem quasi dolor tempore cupiditate explicabo aut
              dolores rem nam eos vitae quo quaerat quidem minus ad cumque,
              possimus harum, tenetur dignissimos. Sunt dolore saepe incidunt
              debitis natus maxime cum reiciendis labore enim quod, iste,
              quibusdam amet, odio provident temporibus rerum repellendus
              impedit voluptates tempore ut facere. Nam, quos. Ipsam atque
              facilis possimus quae neque consectetur aut nemo fuga sapiente
              adipisci voluptates vero quis, animi necessitatibus! Repudiandae.
            </p> */}
          </div>
        </div>
        <div className="btn">
          <Button clicked={props.exitToDoDetail}>Return</Button>
        </div>
      </div>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    todoInfo: state.todo.currentToDo
  }
}

export default connect(
  mapStateToProps,
  { exitToDoDetail }
)(todoDetail)
