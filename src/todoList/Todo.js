import React, { Component, Fragment } from 'react';
import firebase from '../firebase';
import '../App.css';

// flowertaekk.dev
class Todo extends Component {

    constructor (props) {
        super(props)

        this.state = {
            isUpdate: false,
            deadLine: props.deadLine,
            taskDetails: props.taskDetails
        }
    }

    // moves to Update mode
    _onClickUpdateBtn = () => {
        this.setState({
            isUpdate: !this.state.isUpdate
        })
    }

    _onCancelUpdate = () => {
        this.setState({
            isUpdate: !this.state.isUpdate,
            deadLine: this.props.deadLine,
            taskDetails: this.props.taskDetails
        })
    }

    _saveUpdatedData = () => {
        this.setState({
            isUpdate: !this.state.isUpdate
        })

        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child(localStorage.getItem('userId') + '/' + this.props.index)
        userRef.update({
            deadLine: this.state.deadLine,
            taskDetails: this.state.taskDetails
        })
    }

    _onChangeData = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // css
    _border = {
        border: '1px solid #E5E5E5',
        margin: '20px',
        padding: '10px',
        listStyle: 'none',
        borderRadius: '10px'
    }
    // css
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
                            {
                                this.state.isUpdate
                                ? <td>
                                    <input 
                                        type='date'
                                        name='deadLine'
                                        value={this.state.deadLine}
                                        onChange={this._onChangeData}
                                    />
                                </td>
                                : <td>{this.state.deadLine}</td>
                            }
                        </tr>
                        <tr>
                            <th scope='row'>Details</th>
                            {
                                this.state.isUpdate
                                ? <td>
                                    <textarea
                                        name='taskDetails'
                                        rows='10'
                                        cols='50'
                                        value={this.state.taskDetails}
                                        onChange={this._onChangeData}
                                    />
                                </td>
                                : <td>{this.state.taskDetails}</td>
                            }
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                {
                                    this.state.isUpdate
                                    ? <Fragment>
                                        <button onClick={this._saveUpdatedData}>SAVE</button>
                                        <button onClick={this._onCancelUpdate}>RETURN</button>
                                    </Fragment>
                                    : <Fragment>
                                        <button onClick={this._onClickUpdateBtn}>UPDATE</button>
                                        <button>DELETE</button>
                                    </Fragment>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
        )
    }
}

export default Todo