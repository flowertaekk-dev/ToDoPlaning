import React, { Component } from 'react';
import '../App.css';

// flowertaekk.dev
class Todo extends Component {

    constructor (props) {
        super(props)

        this.state = {}
    }

    _border = {
        border: '1px solid #E5E5E5',
        margin: '20px',
        padding: '10px',
        listStyle: 'none',
        borderRadius: '10px'
    }

    _table = {
        border:  '1px solid #E5E5E5',
        margin: '10px',
        padding: '5px'
    }

    render() {
        return(
            <li style={this._border}>

                <table>
                    <caption>ToDo</caption>
                    <tbody>
                        <tr>
                            <th scope='row'>TODO</th>
                            <td>{this.props.todo}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Dead-line</th>
                            <td>{this.props.deadLine}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Details</th>
                            <td>{this.props.taskDetails}</td>
                        </tr>
                    </tbody>
                </table>
            </li>
        )
    }
}

export default Todo