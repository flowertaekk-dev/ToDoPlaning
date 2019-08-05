import React, { Component } from "react"
import { connect } from "react-redux"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
import NavigationItems from "../../Components/NavigationItems/NavigationItems"
import Calendar from "../../UI/Calendar/Calendar"
import "./Layout.css"

class Layout extends Component {
  render() {
    let mainDivStyle = {}
    if (!this.props.userId) mainDivStyle = { width: "100%" }

    return (
      <Aux styleName="Layout">
        {/* HEADER */}
        <Header />

        {/* BODY */}
        <main style={mainDivStyle}>{this.props.children}</main>

        {/* ASIDE */}

        {this.props.userId && (
          <aside>
            <Calendar />
          </aside>
        )}

        {/* MENU */}
        {this.props.isMenuOn && (
          <nav className="menu">
            <NavigationItems />
          </nav>
        )}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isMenuOn: state.common.menuClicked,
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(Layout)
