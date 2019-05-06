import React, { Component } from 'react';

class Header extends Component {

    render () {
        return (
            <div className='header-border'>
                <div className='header-title'>
                    <h1>It's ToDoPlanning!</h1>
                </div>
                <div className='header-menu'>
                    <ul>
                        <li>
                            <p onClick={this.props.signOut}>sign out</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
 }

export default Header