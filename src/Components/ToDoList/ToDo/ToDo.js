import React, { Component, Fragment } from 'react';
import firebase from '../../../Utils/Config/firebase';

import './ToDo.css';

// flowertaekk.dev
class ToDo extends Component {

    constructor (props) {
        super(props)

        this.state = {
            isUpdate: false,
            deadLine: props.deadLine,
            taskDetails: props.details
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
            taskDetails: this.props.details
        })
    }

    _getTodoRef = () => {
        const rootRef = firebase.database().ref()
        const todosRef = rootRef.child('todos')
        const todoRef = todosRef.child(this.props.index)

        return todoRef
    }

    _onDelete = () => {
        const todoRef = this._getTodoRef()
        todoRef.remove()
    }

    _saveUpdatedData = () => {
        this.setState({
            isUpdate: !this.state.isUpdate
        })

        const todoRef = this._getTodoRef()
        todoRef.update({
            deadLine: this.state.deadLine,
            details: this.state.taskDetails
        })
    }

    _onChangeData = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <li className='ToDo'>
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
                            <td colSpan='2' className='btn-container'>
                                {
                                    this.state.isUpdate
                                    ? <Fragment>
                                        <button 
                                            onClick={this._saveUpdatedData}
                                            className='btn'>SAVE
                                        </button>
                                        <button 
                                            onClick={this._onCancelUpdate} 
                                            className='btn'>RETURN
                                        </button>
                                    </Fragment>
                                    : <Fragment>
                                        <button 
                                            onClick={this._onClickUpdateBtn} 
                                            className='btn'>UPDATE
                                        </button>
                                        <button
                                            onClick={this._onDelete}
                                            className='btn'>DELETE
                                        </button>
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

export default ToDo