import React, { Component } from "react"
import { connect } from "react-redux"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
import NavigationItems from "../../Components/NavigationItems/NavigationItems"
import "./Layout.css"

class Layout extends Component {
  render() {
    return (
      <Aux styleName="Layout">
        {/* HEADER */}
        <Header />

        {/* BODY */}
        <main>{this.props.children}</main>

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
    isMenuOn: state.common.menuClicked
  }
}

export default connect(mapStateToProps)(Layout)
