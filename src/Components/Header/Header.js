import React, { Component } from 'react';

import './Header.css';

class Header extends Component {

    render () {
        return (
            <div className='Header'>
                <div className='title'>
                    <h1>It's ToDoPlanning!</h1>
                </div>
                <div className='menu'>
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