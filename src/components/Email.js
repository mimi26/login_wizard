import React, { Component } from "react";

class Email extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            validEmail: true,
            errorMessage: "Please enter a valid email address."
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
            validEmail: true
        });
    }

    validateEmail(e) {
        e.preventDefault();
        const { email } = this.state;
        const emailTest = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g.test(email);
        //Check if email is valid.
        if (emailTest) {
            this.handleEmailSubmit();
        } else {
            this.setState({ validEmail: false });
        }
    }

    handleEmailSubmit() {
        localStorage.setItem("email", this.state.email);
        const completedPassword = localStorage.getItem("password");
        const completedTZ = localStorage.getItem("timezone");
        //check if password and timezone are already in local storage. If so, skip those fields.
        if (completedPassword && completedTZ) {
            this.props.history.push("/thanks");
        } else if (completedPassword) {
            this.props.history.push("/timezone");
        } else {
            this.props.history.push("/password");
        }
        //reset email form:
        this.setState({
            email: "",
            validEmail: true
        });
    }

    render() {
        const { email, validEmail, errorMessage } = this.state;
        return (
            <div className="container">
                <h1>Please enter your email address:</h1>
                <form onSubmit={this.validateEmail}>
                    <input
                        type="text"
                        onChange={this.handleEmailChange}
                        value={email}
                        placeholder="Email"
                    />
                    <input type="submit" value="Submit" />
                </form>
                {!validEmail ? (
                    <div className="error-message">{errorMessage}</div>
                ) : null}
            </div>
        );
    }
}

export default Email;
