import React, { Component, Fragment } from 'react';
import { Base64 } from 'js-base64';

import firebase from '../../Utils/Config/firebase';

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

        this.setState({
            idMessage: id ? '' : 'Enter ID',
            emailMessage: email ? '' : 'Enter Email',
            passwordMessage: password ? '' : 'Enter Password'
        })

        if(!id || !email || !password) {
            result = false
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
        this.props.logInSuccess(userId.value)
    }

    render() {
        return (
            <Fragment>
                <div id='signUp-wrap' className='common-border'>
                    <form onSubmit={this._signUp}>

                        <div>
                            <h1>Sign up</h1>
                        </div>

                        <div>
                            <input type='text' name='userId' placeholder='ID' />
                            <ErrorMessage msg={this.state.idMessage} />
                        </div>

                        <div>
                            <input type='email' name='userEmail' placeholder='e-mail' />
                            <ErrorMessage msg={this.state.emailMessage} />
                        </div>

                        <div>
                            <input type='password' name='userPassword' placeholder='password' />
                            <ErrorMessage msg={this.state.passwordMessage} />
                        </div>

                        <div>
                            <button type='submit' className='common-button'>Register</button>
                        </div>

                    </form>
                </div>
            </Fragment>
        );
    }
}

export const ErrorMessage = (props) => {

    const _errStyle = {
        color: 'red'
    }

    return (
        <p>
            <span style={_errStyle}>{props.msg}</span>
        </p>
    );
};

export default SignUp;