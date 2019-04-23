import React, { Component, Fragment } from 'react';
import TodoList from './todoList/TodoList';
import Login from './login/Login';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      // needless to store userPassword?
      didSignIn: false,
    }
  }

  // saves login information
  _updateLoginState = () => {
    this.setState({
      didSignIn: true
    })
  }

  render() {
    return (
      <Fragment>
        <div className="App">
          <h1>Hello World!</h1>
          <h2>It's ToDoPlanning!</h2>
        </div>
        <div className='App'>
          { this.state.didSignIn ? <TodoList /> : <Login logInSuccess={this._updateLoginState} /> }
        </div>
      </Fragment>
    );
  }
}

export default App;
