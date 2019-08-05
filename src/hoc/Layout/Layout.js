import React from "react"
import { connect } from "react-redux"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
import NavigationItems from "../../Components/NavigationItems/NavigationItems"
import Calendar from "../../UI/Calendar/Calendar"
import * as _ from "../../Utils/_"
import "./Layout.css"

const Layout = props => {
  return (
    <Aux styleName="Layout">
      {/* HEADER */}
      <Header />

      {/* BODY */}
      <main>{props.children}</main>

      {/* ASIDE */}

      {props.userId && (
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
    groupNames: state.group.groupNames
  }
}

export default connect(mapStateToProps)(Layout)
