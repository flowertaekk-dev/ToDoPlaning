import React, { Component } from 'react';

class Todo extends Component {

    _css = {
        border: '5px solid black',
        margin: '20px',
        padding: '10px',
        listStyle: 'none'
    }

    render() {
        return(
            <li style={this._css}>
                <p>{this.props.date}</p>
                <p>{this.props.todo}</p>
            </li>
        )
    }
}

export default Todo