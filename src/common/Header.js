import React, { Component } from 'react';

class Header extends Component {

    render () {
        return (
            <div className='header-border'>
                <div className='header-title'>
                    <h1>It's ToDoPlanning!</h1>
                </div>
                <div className='header-menu'>
                    {   
                        // Code modifier - JuYoung Kang
                        this.props.signOut ?
                        <ul>
                            <li>
                                <label>{this.props.userId}</label>
                            </li>
                            <li>
                                <p onClick={this.props.signOut}>sign out</p>
                            </li>
                        </ul>
                        : null
                    }
                </div>
            </div>
        )
    }
 }

export default Header