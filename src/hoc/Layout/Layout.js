import React, { Component } from 'react'

import Aux from '../Auxiliary/Auxiliary'
import Login from '../../Components/Login/Login';
import Header from '../../Components/Header/Header'
import TodoList from '../../Components/ToDoList/ToDoList'

class Layout extends Component {

    state = {
        userId: '',
        // needless to store userPassword?
        didSignIn: false,
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        if (userId) {
            this.setState({
                userId: userId,
                didSignIn: true
            })
        }
    }

    // saves login information
    _updateLoginHandler = async (id) => {
        this.setState({
            userId: id,
            didSignIn: true
        })
        // saves userId to session
        localStorage.setItem('userId', id)
    }

    _signOutHandler = () => {
        this.setState({
            userId: '',
            didSignIn: false
        })
        localStorage.setItem('userId', '')
    }


    render() {
        return (
            <Aux>
                {/* HEADER */}
                <Header
                    userId={this.state.userId}
                    didSignin={this.state.didSignIn}
                    signOutClicked={this._signOutHandler} />

                {/* BODY */}
                {
                    this.state.didSignIn
                        ? <TodoList
                            userId={this.state.userId} />
                        : <Login
                            whenLoginSuccess={this._updateLoginHandler} />
                }


            </Aux>
        )
    }
}

export default Layout