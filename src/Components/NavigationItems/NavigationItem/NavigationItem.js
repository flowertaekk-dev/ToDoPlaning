import React from 'react'

import './NavigationItem.css'

const navigationItem = props => (
    <li 
    className='NavigationItem'
    onClick={props.clicked ? props.clicked : null}>
        {props.children}
    </li>
)

export default navigationItem