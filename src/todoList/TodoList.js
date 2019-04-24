import React, { Component, Fragment } from 'react';
import firebase from '../firebase';

// flowertaekk.dev
class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this._getData()
    }

    // reads data from firebase with user_id
    _readData = () => {
        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child(this.props.userId) // userID
        userRef.on('value', snap => {
            this.setState({
            data: snap.val()
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
        const _dailyList = this.state.data.filter(data => data.date === '20190414');
        const result = _dailyList.map((todo, index) => {
            return <p key={index}> {todo.todo} </p>
        })

        return result
    }

    render() {
        return (
            <Fragment>
                <div>
                    {this.state.data ? this._renderData() : 'nothing to show'}
                </div>
            </Fragment>
        );
    }
}

export default TodoList;