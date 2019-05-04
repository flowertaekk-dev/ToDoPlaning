import React, { Component, Fragment } from 'react';

class Header extends Component {

    render () {
        return (
            <Fragment>
                <h2>It's ToDoPlanning!</h2>
                <span onClick={this.props.signOut}>sign out</span>
            </Fragment>
        )
    }
 }

export default Header