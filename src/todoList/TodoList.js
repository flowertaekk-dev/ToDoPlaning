import React, { Component, Fragment } from 'react';
import { _filter, _replaceHyphen } from '../_';
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
        this._getData()
    }

    // reads data from firebase with user ID
    _readData = () => {
        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child(this.props.userId)
        userRef.on('value', snap => {
            this.setState({
                data: _filter(
                        snap.val(),
                        (val) => { return val.date === this.state.selectedDate }
                    )
            })
        })
    }

    // sets data to this.state
    _getData = async() => {
        const data = await this._readData()
        this.setState({
            data
        })
    }

    // renders data to browser
    _renderData = () => {
        const _dailyList = this.state.data.filter(data => data.date === this.state.selectedDate);
        const result = _dailyList.map((todo, index) => {
            return <p key={index}> {todo.todo} </p>
        })

        return result
    }

    // saves the current selected date to retrieve certain data
    _onSelectDate = async(e) => {
        await this.setState({
            // replaces "-" with white space
            [e.target.name]: _replaceHyphen(e.target.value)
        })
        this._readData()
    }

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
                                    this.state.data.map((todo, index) => {
                                        return <Todo {...todo} key={index}/>
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