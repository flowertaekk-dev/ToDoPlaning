import React, { Component, Fragment } from 'react';
import firebase from '../firebase';
import { Base64 } from 'js-base64';
import './SignUp.css';

class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idMessage: '',
            emailMessage: '',
            passwordMessage: '',
        }
    }

    // validates inputs
    _emptyInputValidator = (id, email, password) => {
        let result = true

        if(!id) {
            this.setState({
                idMessage: 'Enter ID'
            })
            result = false
        } else {
            this.setState({
                idMessage: ''
            })
        }
            
        if(!email) {
            this.setState({
                emailMessage: 'Enter Email'
            })
            result = false
        } else {
            this.setState({
                emailMessage: ''
            })
        }

        if(!password) {
            this.setState({
                passwordMessage: 'Enter password'
            })
            result = false
        } else {
            this.setState({
                passwordMessage: ''
            })
        }

        return result
    }

    _duplicatedIDValidator = async(userInfoRef) => {
        let result = false
        await userInfoRef.once('value', (snapshot) => {
            if(snapshot.exists()) {
                result = true  
            }
        })
        return result
    }

    _setDataToDB = (userInfoRef, email, password) => {
        userInfoRef.set({
            email: email.value,
            password: Base64.encode(password.value)
        })
    }

    // inserts data to firebase
    _signUp = async(e) => {
        e.preventDefault()

        const { userId, userEmail, userPassword } = e.target;

        if(!this._emptyInputValidator(userId.value, userEmail.value, userPassword.value)) return
        
        const rootRef = firebase.database().ref().child('todoList')
        const userInfoRef = rootRef.child('userInfo/' + userId.value)
        // checks if there is the same ID which user has entered
        if(await this._duplicatedIDValidator(userInfoRef)) {
            this.setState({
                idMessage: 'duplicated ID'
            })
            return
        } 

        // sets user data to firebase
        this._setDataToDB(userInfoRef, userEmail, userPassword)

        // after sign up, moves to "To Do List" page
        this.props.logInSuccess()
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this._signUp}>
                    <table style={this.css}>
                        <caption>Sign up</caption>
                        <thead>
                            <tr>
                                <th scope='col'>Explanation</th>
                                <th scope='col'>Input</th>
                                <th scope='col'>Error Message</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <p>ID</p>
                                </td>
                                <td>
                                    <input type='text' name='userId' placeholder='ID' />
                                </td>
                                <ErrorMessage msg={this.state.idMessage} />
                            </tr>

                            <tr>
                                <td>
                                    <p>E-mail</p>
                                </td>
                                <td>
                                    <input type='email' name='userEmail' placeholder='e-mail' />
                                </td> 
                                <ErrorMessage msg={this.state.emailMessage} />
                            </tr>

                            <tr>
                                <td>
                                    <p>Password</p>
                                </td>
                                <td>
                                    <input type='password' name='userPassword' placeholder='password' />
                                </td>
                                <ErrorMessage msg={this.state.passwordMessage} />
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='2'>
                                    <button type='submit'>Register</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </form>
            </Fragment>
        );
    }
}

const ErrorMessage = (props) => {
    return (
        <td>
            <p>{props.msg}</p>
        </td>
    );
};

export default SignUp;