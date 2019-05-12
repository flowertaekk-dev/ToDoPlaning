import React, { Component, Fragment } from 'react';
import Header from './common/Header';
import Login from './login/Login';
import TodoList from './todoList/TodoList';
import './App.css';

// flowertaekk.dev
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      // needless to store userPassword?
      didSignIn: false,
    }
  }

  componentDidMount () {
    const userId = localStorage.getItem('userId')
    if (userId) {
      this.setState({
        userId: userId,
        didSignIn: true
      })
    }
  }

  // saves login information
  _updateLoginState = async (id) => {
    this.setState({
      userId: id,
      didSignIn: true
    })
    // saves userId to session
    localStorage.setItem('userId', id)
  }

  _signOut = () => {
    this.setState({
      userId: '',
      didSignIn: false
    })
    localStorage.setItem('userId', '')
  }

  render() {
    return (
      <Fragment>
        <Header signOut={this._signOut}/>

        <div className='App'>
          { this.state.didSignIn ? <TodoList userId={this.state.userId} /> : <Login logInSuccess={this._updateLoginState} /> }
        </div>
      </Fragment>
    );
  }
}

export default App;
