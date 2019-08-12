import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
import NavigationItems from "../../Components/NavigationItems/NavigationItems"
import ToDoDetail from "../../Components/ToDo/ToDoDetail/ToDoDetail"
import Calendar from "../../UI/Calendar/Calendar"
import * as _ from "../../Utils/_"
import "./Layout.css"

const Layout = props => {
  // useEffect(() => {
  //   console.log(props.location.pathname)
  // }, [props.location.pathname])

  /**
   * checks current path is '/todoList'
   */
  const isCurrentPath_todoList = () => {
    return props.history.location.pathname === "/todoList"
  }

  return (
    <Aux styleName="Layout">
      {/* HEADER */}
      <Header />

      {/* BODY */}
      {/* もっといい方法があるかな…？ */}
      {props.showToDoDetail && isCurrentPath_todoList() ? (
        <ToDoDetail />
      ) : (
        <main
          style={
            !isCurrentPath_todoList()
              ? {
                  width: "100%"
                }
              : null
          }
        >
          {props.children}
        </main>
      )}

      {/* ASIDE */}
      {/* if we are able to redirect to '/Login' when user has not logged in, this code might be simplier */}
      {props.userId && !props.showToDoDetail && isCurrentPath_todoList() && (
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

export default connect(mapStateToProps)(withRouter(Layout))
