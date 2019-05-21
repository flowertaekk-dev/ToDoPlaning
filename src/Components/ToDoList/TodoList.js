import React, { Component, Fragment } from 'react';
import { _filter, _mapWithKeys, _getCurrentDate } from '../../Utils/_';
import Todo from './ToDo/ToDo';
import AddToDo from './AddToDo/AddToDo';
import firebase from '../../Utils/Config/firebase';

import './TodoList.css';

// flowertaekk.dev
class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: _getCurrentDate(),
            addTodo: false
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
        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child(localStorage.getItem('userId') || this.props.userId)
        await userRef.on('value', snap => {
            if(this.hasMounted) {
                this.setState({
                    data: _filter(
                            _mapWithKeys(snap.val()),
                            (val) => { return val.date === this.state.selectedDate }
                        )
                })
            }
        })
    }

    // saves the current selected date to retrieve certain data
    _onSelectDate = async(e) => {
        await this.setState({
            [e.target.name]: e.target.value
        })
        this._readData()
    }

    _onAddTodo = () => {
        this.setState({
            addTodo: !this.state.addTodo
        })
    }

    render() {

        let dateBtn;
        if (!this.state.addTodo) {
            dateBtn = <p className='date'>
                <input 
                    type='date'
                    name='selectedDate'
                    value={this.state.selectedDate}
                    onChange={this._onSelectDate} />
            </p>
        }

        return (
            <Fragment>
                <div className='addToDo-btn'>
                    <p><button onClick={this._onAddTodo}>ADD TODO</button></p>
                    {
                        this.state.addTodo
                        ? <AddToDo 
                            userId={this.props.userId}
                            selectedDate={this.state.selectedDate} />
                        : '' 
                    }
                </div>
                {dateBtn}
                
                {
                    this.state.addTodo
                    ? ''
                    : <div className='todo-list'>
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
                }
            </Fragment>
        );
    }
}

export default TodoList;