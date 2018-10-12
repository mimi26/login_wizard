import React, { Component } from 'react';

class Password extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            errors: false,
            lengthOfEightMessage: '',
            noSpacesMessage: '',
            noRepeatedMessage: '',
            capitalMessage: ''
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    handlePasswordChange(e) {
        /* Reset error messages on input change, so if errors from prev attempts
        are fixed by the user, the error won't show again. */
        this.setState({
            password: e.target.value,
            errors: false,
            lengthOfEightMessage: '',
            noSpacesMessage: '',
            noRepeatedMessage: '',
            capitalMessage: ''
        });
    }

    validatePassword(e) {
        e.preventDefault();
        const { password } = this.state;
        //Check if password has 8 characters.
        let lengthOfEight;
        password.length >= 8 ? lengthOfEight = true : lengthOfEight = false;
        //Check for spaces.
        let spaces;
        password.includes(' ') ? spaces = true : spaces = false;
        //Check if characters repeat more than twice in a row.
        const repeated = (/(.)\1{2,}/g).test(password);
        //Check for capital letter.
        const capital = (/[A-Z]/g).test(password);
        
        if (!lengthOfEight) {
            this.setState({
                lengthOfEightMessage: 'Passwords must be at least 8 characters in length.',
                errors: true
            });
        }
        if (spaces) {
            this.setState({ 
                noSpacesMessage: 'Password cannot contain spaces.',
                errors: true 
            });
        }
        if (repeated) {
            this.setState({
                noRepeatedMessage: 'Password cannot contain characters that repeat more than twice in a row.',
                errors: true
            });
        }
        if (!capital) {
            this.setState({ 
                capitalMessage: 'Password must contain at least one capital letter.',
                errors: true
            });
        }
        if(!spaces && capital && lengthOfEight && !repeated) {
            this.handlePasswordSubmit();
        }
    }

    handlePasswordSubmit() {
        localStorage.setItem('password', this.state.password);
        const completedEmail = localStorage.getItem('email');
        const completedTZ = localStorage.getItem('timezone');
        //Check if email and timezone are already in local storage. If so, skip those fields.
        if (completedEmail && completedTZ) {
            this.props.history.push('/thanks');
        } else if (completedTZ) {
            this.props.history.push('/email');
        } else {
            this.props.history.push('/timezone');
        }
        //Reset password form:
        this.setState({
            password: '',
            errors: false
        });
    }

    renderErrors() {
        const {
            errors,
            lengthOfEightMessage,
            noSpacesMessage,
            noRepeatedMessage,
            capitalMessage,
        } = this.state;
        // Show errors on the page. If an error doesn't apply, it remains and empty string.
        if (errors) {
            return (
                <div className="error-message">
                    <div>Please fix the following:</div>
                    <div>{lengthOfEightMessage}</div>
                    <div>{noSpacesMessage}</div>
                    <div>{noRepeatedMessage}</div>
                    <div>{capitalMessage}</div>
                </div>
            )
        }
    }

    render() {
        const { password } = this.state;
        return (
            <div className="container">
                <h1>Please enter a password:</h1>
                <form onSubmit={this.validatePassword} >
                    <input
                        type="password"
                        onChange={this.handlePasswordChange}
                        value={password}
                        placeholder="Password"
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="input"
                    />
                </form>
                {this.renderErrors()}
            </div>
        );
    }
}

export default Password;