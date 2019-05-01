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
  _updateLoginState = (id) => {
    this.setState({
      userId: id,
      didSignIn: true
    })
  }

  render() {
    return (
      <Fragment>
        <div className="App-header">
          <h2>It's ToDoPlanning!</h2>
        </div>

        <hr />

        <div className='App'>
          { this.state.didSignIn ? <TodoList userId={this.state.userId} /> : <Login logInSuccess={this._updateLoginState} /> }
        </div>
      </Fragment>
    );
  }
}

export default App;
