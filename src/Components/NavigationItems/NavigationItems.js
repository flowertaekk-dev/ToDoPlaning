import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul>
        {/* Can use it with react-router? */}
        <NavigationItem
            link='/'
            active>UPDATE USER</NavigationItem>

        <NavigationItem
            link='/'
            clicked={props.signOutClicked}
            active>SIGN OUT</NavigationItem>

        <li>
            <strong>{props.userId}</strong>
        </li>
    </ul>
)

export default navigationItems