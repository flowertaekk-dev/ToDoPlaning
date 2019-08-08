import React from "react"
import { connect } from "react-redux"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
import NavigationItems from "../../Components/NavigationItems/NavigationItems"
import ToDoDetail from "../../Components/ToDo/ToDoDetail/ToDoDetail"
import Calendar from "../../UI/Calendar/Calendar"
import * as _ from "../../Utils/_"
import "./Layout.css"

const Layout = props => {
  return (
    <Aux styleName="Layout">
      {/* HEADER */}
      <Header />

      {/* BODY */}
      {/* もっといい方法があるかな…？ */}
      {props.showToDoDetail ? <ToDoDetail /> : <main>{props.children}</main>}

      {/* ASIDE */}

      {props.userId && !props.showToDoDetail && (
        <aside>
          <Calendar />
          <div className="groupNameList">
            <ul>
              {_.map(props.groupNames, groupName => (
                <li key={groupName} /** onClicked={fetchTodosByGroupName} */>
                  {groupName}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}

      {/* MENU */}
      {props.isMenuOn && (
        <nav className="menu">
          <NavigationItems />
        </nav>
      )}
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    isMenuOn: state.common.menuClicked,
    userId: state.user.userId,
    groupNames: state.group.groupNames,
    showToDoDetail: state.todo.showToDoDetail
  }
}

export default connect(mapStateToProps)(Layout)
