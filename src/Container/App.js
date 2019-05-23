import React, { Component, Fragment } from 'react';
import Header from '../Components/Header/Header';
import Login from '../Components/Login/Login';
import TodoList from '../Components/ToDoList/ToDoList';
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
      <Fragment>
        {
          this.state.didSignIn
            ? <Header 
              userId = {this.state.userId}
              signOut={this._signOutHandler} />
            : <Header/>
        }

        <div className='App'>
          { 
            this.state.didSignIn
              ? <TodoList userId={this.state.userId} /> 
              : <Login logInSuccess={this._updateLoginHandler} />
          }
        </div>
      </Fragment>
    );
  }
}

export default App;
