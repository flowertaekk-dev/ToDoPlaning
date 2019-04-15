import React, { Component } from 'react';
import Todo from './todo/todo';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <h2>It's ToDoPlanning!</h2>
        <Todo />
      </div>      
    );
  }
}

export default App;
