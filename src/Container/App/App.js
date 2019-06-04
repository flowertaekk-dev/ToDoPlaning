import React, { Component } from 'react';

// import Header from '../../Components/Header/Header';
import Layout from '../../hoc/Layout/Layout';
// import Login from '../../Components/Login/Login';
// import TodoList from '../../Components/ToDoList/ToDoList';
import './App.css';

// import Aux from '../../hoc/Auxiliary/Auxiliary';

// flowertaekk.dev
class App extends Component {

  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     userId: '',
  //     // needless to store userPassword?
  //     didSignIn: false,
  //   }
  // }

  // componentDidMount() {
  //   const userId = localStorage.getItem('userId')
  //   if (userId) {
  //     this.setState({
  //       userId: userId,
  //       didSignIn: true
  //     })
  //   }
  // }

  // // saves login information
  // _updateLoginHandler = async (id) => {
  //   this.setState({
  //     userId: id,
  //     didSignIn: true
  //   })
  //   // saves userId to session
  //   localStorage.setItem('userId', id)
  // }

  // _signOutHandler = () => {
  //   this.setState({
  //     userId: '',
  //     didSignIn: false
  //   })
  //   localStorage.setItem('userId', '')
  // }

  render() {
    return (
      <Layout />
      // <Aux>
      //   {
      //     this.state.didSignIn
      //       ? <Header 
      //         userId = {this.state.userId}
      //         signOut={this._signOutHandler} />
      //       : <Header/>
      //   }

      //   <div className='App'>
      //     { 
      //       this.state.didSignIn
      //         ? <TodoList userId={this.state.userId} /> 
      //         : <Login logInSuccess={this._updateLoginHandler} />
      //     }
      //   </div>
      // </Aux>
    );
  }
}

export default App;
