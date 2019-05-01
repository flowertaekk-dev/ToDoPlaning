import React, { Component, Fragment } from 'react';
import { ErrorMessage } from '../login/SignUp'; 
import { _replaceHyphen } from '../_';
import firebase from '../firebase';

// flowertaekk.dev
class AddTodo extends Component {

    _onSubmit = (e) => {
        e.preventDefault()

        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child(this.props.userId)
        const key = userRef.push().key
        const todoRef = userRef.child(key)

        const updateTodo = {
            date: _replaceHyphen(e.target.date.value),
            todo: e.target.todo.value,
            completeRate: '',
            deadLine: _replaceHyphen(e.target.deadLine.value),
            priority: e.target.priority.value,
            taskDetails: e.target.taskDetail.value
        }

        todoRef.update(updateTodo)

        this._initializeInputs(e)
    }

    _initializeInputs = (e) => {
        e.target.date.value = ''
        e.target.todo.value = ''
        e.target.deadLine.value = ''
        e.target.priority.value = 'normal'
        e.target.taskDetail.value = ''
    }

    render () {
        return (
            <Fragment>
                <form onSubmit={this._onSubmit}>
                    <table>
                        <caption>AddTodo</caption>
                        <thead>
                            <tr>
                                <th scope='col'>Information</th>
                                <th scope='col'>Inputs</th>
                                <th scope='col'>Error</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td><p>Date</p></td>
                                <td><p><input type='date' name='date' /></p></td>
                                <ErrorMessage />
                            </tr>

                            <tr>
                                <td><p>To do</p></td>
                                <td><p><input type='type' name='todo' /></p></td>
                                <ErrorMessage />
                            </tr>

                            <tr>
                                <td><p>Dead-line</p></td>
                                <td><p><input type='date' name='deadLine'/></p></td>
                                <ErrorMessage />
                            </tr>

                            <tr>
                                <td><p>Priority</p></td>
                                <td>
                                    <div>
                                        <select defaultValue='normal' name='priority' >
                                            <option value='urgent'>urgent</option>
                                            <option value='normal'>normal</option>
                                            <option value='notHUrry'>not in a hurry</option>
                                        </select>
                                    </div>
                                </td>
                                <ErrorMessage />
                            </tr>

                            <tr>
                                <td><p>Task detail</p></td>
                                <td>
                                    <textarea rows='10' cols='50' name='taskDetail' />
                                </td>
                                <ErrorMessage />
                            </tr>

                            <tr>
                                <td colSpan='2'>
                                    <button type='submit'>Add</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </form>              
            </Fragment>
        )
    }
}

export default AddTodo