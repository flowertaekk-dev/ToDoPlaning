import React, { Component, Fragment } from 'react';
import { _filter, _mapWithKeys } from '../_';
import Todo from './Todo';
import AddTodo from './AddTodo';
import firebase from '../firebase';

// flowertaekk.dev
class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: this._getCurrentDate(),
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

    // AddTodo.js
    _onAddTodo = () => {
        this.setState({
            addTodo: !this.state.addTodo
        })
    }

    _getCurrentDate = () => {
        const today = new Date()

        const year = today.getFullYear()
        const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1
        const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()

        return (year + '-' + month + '-' + date)
    }

    _marginTop = {
        marginTop: '10%'
    }

    render() {
        return (
            <Fragment>
                
                <div style={this._marginTop}>
                    <p><button onClick={this._onAddTodo} className='common-button'>ADD TODO</button></p>
                    {
                        this.state.addTodo
                        ? <AddTodo userId={this.props.userId} />
                        : '' 
                    }
                </div>
                
                {
                    this.state.addTodo
                    ? ''
                    : 
                    <div>
                        <p>
                            <input type='date' name='selectedDate' value={this.state.selectedDate} onChange={this._onSelectDate} />
                        </p>
                        {
                            this.state.data ? 
                                <ul>
                                    {
                                        this.state.data.map((todo) => {
                                            return <Todo {...todo} key={todo.index} />
                                        })
                                    }
                                </ul>
                            : 'nothing to show'
                        }
                    </div>
                }
            </Fragment>
        );
    }
}

export default TodoList;