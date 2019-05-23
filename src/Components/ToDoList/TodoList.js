import React, { Component, Fragment } from 'react';
import { _filter, _mapWithKeys, _getCurrentDate } from '../../Utils/_';
import Todo from './ToDo/ToDo';
import AddToDo from './AddToDo/AddToDo';
import firebase from '../../Utils/Config/firebase';

import './ToDoList.css';

// flowertaekk.dev
class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: _getCurrentDate(),
            addToDo: false
        }
    }

    componentDidMount() {
        this.hasMounted = true
        if (localStorage.getItem('userId') || this.props.userId) this._readData()
    }

    componentWillUnmount() {
        this.hasMounted = false
    }

    // reads data from firebase with user ID
    _readData = async () => {
        const rootRef = firebase.database().ref().child('todos')
        const todosRef = rootRef.orderByChild('author').equalTo(localStorage.getItem('userId') || this.props.userId)
        await todosRef.on('value', snap => {
            if(this.hasMounted) {

                const selectedDate = this.state.selectedDate
                this.setState({
                    data: _filter(
                            _mapWithKeys(snap.val()),
                            (val) => { 
                                return val.date === selectedDate || (val.date <= selectedDate && val.deadLine >= selectedDate)
                            }
                        )
                })
                
            }
        })
    }

    // saves the current selected date to retrieve certain data
    _selectDateHandler = async(e) => {
        await this.setState({
            [e.target.name]: e.target.value
        })
        this._readData()
    }

    _addTodoHandler = () => {
        this.setState({
            addToDo: !this.state.addToDo
        })
    }

    render() {

        let dateBtn = this.state.addToDo
            ? null
            : (
                <p className='date'>
                    <input 
                        type='date'
                        name='selectedDate'
                        value={this.state.selectedDate}
                        onChange={this._selectDateHandler} />
                </p>
            )

        const addToDo = (
            <div className='addToDo-btn'>
                <p><button onClick={this._addTodoHandler}>ADD TODO</button></p>
                {
                    this.state.addToDo
                    ? <AddToDo 
                        userId={this.props.userId}
                        selectedDate={this.state.selectedDate} />
                    : null
                }
            </div>
        )

        let toDoList = this.state.addToDo
            ? null
            : (
                <div className='todo-list'>
                    {
                        this.state.data ? 
                            <ul className='show-todo'>
                                {
                                    this.state.data.map((todo) => {
                                        return <Todo {...todo} key={todo.index} />
                                    })
                                }
                            </ul>
                        : null
                    }
                </div>
            )

        return (
            <Fragment>
                {addToDo}
                {dateBtn}
                {toDoList}
            </Fragment>
        );
    }
}

export default TodoList;