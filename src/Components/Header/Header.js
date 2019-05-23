import React from 'react';

import './Header.css';

const Header = (props) => {
    return (
        <div className='Header'>

            <div className='title'>
                <h1>It's ToDoPlanning!</h1>
            </div>

            <div className='menu'>
                {   
                    // Code modifier - JuYoung Kang
                    props.signOut ?
                    <ul>
                        <li>
                            <label>{props.userId}</label>
                        </li>
                        <li className='cursor'>
                            <button onClick={props.signOut}>sign out</button>
                        </li>
                    </ul>
                    : null
                }
            </div>
            
        </div>
    )
 }

export default Header