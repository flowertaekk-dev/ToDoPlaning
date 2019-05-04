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
            selectedDate: '',
            addTodo: false
        }
    }

    componentDidMount() {
        this.hasMounted = true
        this._readData()
    }

    componentWillUnmount() {
        this.hasMounted = false
    }

    // reads data from firebase with user ID
    _readData = async () => {
        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child(this.props.userId)
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

    render() {
        return (
            <Fragment>
                <div>
                    <p><button onClick={this._onAddTodo}>ADD TODO</button></p>
                    { this.state.addTodo ? <AddTodo userId={this.props.userId} /> : '' }
                </div>
                <div>
                    <p>
                        <input type='date' name='selectedDate' onChange={this._onSelectDate} />
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
            </Fragment>
        );
    }
}

export default TodoList;