import React, { Component, Fragment } from 'react';
import SignUp, { ErrorMessage } from './SignUp';
import { Base64 } from 'js-base64';
import firebase from '../firebase';

// flowertaekk.dev
class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idMessage: '',
            passwordMessage: '',
            signUp: false
        }
    }

    _singIn = (e) => {
        // prevents browser from refreshing
        e.preventDefault()

        // stops process when the process is "Sign up"
        if(e.target.signUp) return

        const { id, password } = e.target;

        // checks if there is empty input
        if (!this._emptyInputValidator(id.value, password.value)) {
            return 
        }

        // checks id and validate password
        const rootRef = firebase.database().ref().child('todoList')
        const userInfoRef = rootRef.child('userInfo/' + id.value)
        userInfoRef.once('value').then(snap => {

            // when ID is wrong
            if(snap.val() === null) {
                this.setState({
                    idMessage: 'Cannot find ID'
                })
                return
            }

            // FIXME need to think about password.value more... How can it be null at this point?
            if (password.value && password.value === Base64.decode(snap.val().password)){
                this.props.logInSuccess(id.value)
            } else {
                // when Password wrong
                this.setState({
                    idMessage: '',
                    passwordMessage: 'Wrong password!'
                })
            }
        }).catch(err => console.log(err))
    }

    _emptyInputValidator = (id, password) => {
        let result = true;

        this.setState({
            idMessage: id ? '' : 'Enter ID',
            passwordMessage: password ? '' : 'Enter password'
        })

        if(!id || !password) {
            result = false
        }

        return result;
    }

    _onClickSignUp = () => {
        this.setState({
            signUp: !this.state.signUp
        })
    }

    render() {
        return (
            <Fragment>
                <div id='wrap' className='login-border'>
                    <form onSubmit={this._singIn}>
                        <table>
                            <caption>Login</caption>
                            <thead>
                                <tr>
                                    <th scope='col'>Explanation</th>
                                    <th scope='col'>Input</th>
                                    <th scope='col'>Error message</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td><input type='text' name='id' /></td>
                                    <ErrorMessage msg={this.state.idMessage} />
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td><input type='password' name='password' /></td>
                                    <ErrorMessage msg={this.state.passwordMessage} />
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='2'>
                                        <button type='submit' name='submit'>Sign in</button>
                                        <button type='button' name='signUpBtn' onClick={this._onClickSignUp}>Sign up</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </form>
                </div>
                {this.state.signUp ? <SignUp logInSuccess={this.props.logInSuccess} /> : ''}
            </Fragment>
        );
    }
}

export default Login;