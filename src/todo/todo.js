import React, { Component, Fragment } from 'react';
import firebase from '../firebase';

// flowertaekk.dev
class todo extends Component {

    state = {}

    componentDidMount() {
        this._getData()
    }

    _getData = async() => {
        const data = await this._readData()
        this.setState({
            data
        })
    }

    _readData = () => {
        const rootRef = firebase.database().ref().child('todoList')
        const userRef = rootRef.child('user1') // userID
        userRef.on('value', snap => {
            this.setState({
            data: snap.val()
            })
        })
    }

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
                    {this.state.data ? this._renderData() : 'loading..'}
                </div>
            </Fragment>
        );
    }
}

export default todo;