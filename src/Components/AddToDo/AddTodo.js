import React, { Component } from 'react';
import firebase from '../../Utils/Config/firebase';

// flowertaekk.dev
class AddTodo extends Component {

    constructor (props) {
        super(props)

        this.state = {
            selectedDate: this.props.selectedDate
        }
    }

    _onSubmit = (e) => {
        e.preventDefault()

        const { selectedDate, todo, deadLine, priority, taskDetail } = e.target

        if (!this._emptyInputValidator(selectedDate.value, todo.value, deadLine.value)) return
        
        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child(this.props.userId)
        const key = userRef.push().key
        const todoRef = userRef.child(key)

        const updateTodo = {
            date: selectedDate.value,
            todo: todo.value,
            completeRate: '',
            deadLine: deadLine.value,
            priority: priority.value,
            taskDetails: taskDetail.value
        }

        todoRef.update(updateTodo)

        this._initializeInputs(e)
    }

    _initializeInputs = (e) => {
        const { selectedDate, todo, deadLine, priority, taskDetail } = e.target

        selectedDate.value = ''
        todo.value = ''
        deadLine.value = ''
        priority.value = 'normal'
        taskDetail.value = ''
    }

    _emptyInputValidator = (selectedDate, todo, deadLine) => {
        let result = true

        // other inputs are optional
        this.setState({
            dateMessage: selectedDate ? '' : 'Enter Date',
            todoMessage: todo ? '' : 'Enter Todo',
            deadLineMessage: deadLine ? '' : 'Enter deadLine',
        })

        if (!selectedDate || !todo || !deadLine) result = false

        return result
    }

    _editSelectedDate = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _floatLeft = {
        float: 'left',
    }

    render () {
        return (
            <div className='AddTodo'>
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
                                <td><label htmlFor='date'>Date</label></td>
                                <td>
                                    <p style={this._floatLeft}>
                                        <input
                                            type='date'
                                            id='date'
                                            name='selectedDate'
                                            value={this.state.selectedDate}
                                            onChange={this._editSelectedDate}
                                        />
                                    </p>
                                </td>
                                <ErrorMessage msg={this.state.dateMessage} />
                            </tr>

                            <tr>
                                <td><label htmlFor='todo'>To do</label></td>
                                <td><p style={this._floatLeft}><input type='type' id='todo' name='todo' placeholder='TODO' /></p></td>
                                <ErrorMessage msg={this.state.todoMessage} />
                            </tr>

                            <tr>
                                <td><label htmlFor='deadLine'>Dead-line</label></td>
                                <td><p style={this._floatLeft}><input type='date' id='deadLine' name='deadLine'/></p></td>
                                <ErrorMessage msg={this.state.deadLineMessage} />
                            </tr>

                            <tr>
                                <td><label htmlFor='priority'>Priority</label></td>
                                <td>
                                    <div style={this._floatLeft} className='select-style'>
                                        <select defaultValue='normal' id='priority' name='priority' >
                                            <option value='urgent'>urgent</option>
                                            <option value='normal'>normal</option>
                                            <option value='notHUrry'>not in a hurry</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td><p>Task detail</p></td>
                                <td>
                                    <textarea name='taskDetail' />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan='2' className='td-button-center'>
                                    <button type='submit'>Add</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </form>              
            </div>
        )
    }
}

export const ErrorMessage = (props) => {

    const _errStyle = {
        color: 'red'
    }

    return (
        <td>
            <span style={_errStyle}>{props.msg}</span>
        </td>
    );
};

export default AddTodo