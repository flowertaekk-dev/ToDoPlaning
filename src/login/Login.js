import React, { Component, Fragment } from 'react';
import SignUp from './SignUp';
import { Base64 } from 'js-base64';
import firebase from '../firebase';
import './Login.css';

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

        const { id, password } = e.target;

        // checks if there is empty input
        if (!this._emptyInputValidator(id, password)) {
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
                this.props.logInSuccess()
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

        if (!id.value) {
            this.setState({
                idMessage: 'Enter ID'
            })
            result = false;
        } else {
            this.setState({
                idMessage: ''
            })
        }

        if(!password.value) {
            this.setState({
                passwordMessage: 'Enter password'
            })
            result = false;
        } else {
            this.setState({
                passwordMessage: ''
            })
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
                        <div id='user-info'>
                            <p>
                                <span>ID</span>
                                <input type='text' name='id' />
                                <span>{this.state.idMessage}</span>
                            </p>
                            <p>
                                <span>password</span>
                                <input type='password' name='password' />
                                <span>{this.state.passwordMessage}</span>
                            </p>
                        </div>
                        <div id='btn'>
                            <button>Sign in</button>
                        </div>
                    </form>
                    <button onClick={this._onClickSignUp}>Sign up</button>
                </div>
                {this.state.signUp ? <SignUp logInSuccess={this.props.logInSuccess} /> : ''}
            </Fragment>
        );
    }
}

export default Login;