import React, { Component } from 'react';
import timezones from 'timezones.json';

class Timezone extends Component {
    constructor() {
        super();
        this.state = {
            timezone: '',
        }
        this.handleTZChange = this.handleTZChange.bind(this);
        this.handleTZSubmit = this.handleTZSubmit.bind(this);
    }

    handleTZChange(e) {
        this.setState({
            timezone: e.target.value
        }); 
    }

    handleTZSubmit(e) {
        e.preventDefault();
        localStorage.setItem('timezone', this.state.timezone);
        const completedEmail = localStorage.getItem('email');
        const completedPassword = localStorage.getItem('password');
        //Check if email and timezone are already in local storage. If so, skip those fields.
        if (completedEmail && completedPassword) {
            this.props.history.push('/thanks');
        } else if (completedEmail) {
            this.props.history.push('/password');
        } else {
            this.props.history.push('/email');
        }
        //reset tz:
        this.setState({
            timezone: ''
        });
    }

    renderSelectInput() {
        // sort timezones alphabetically before mapping for better ux.
        timezones.sort((a, b) => {
            //sort array of objects by values of 'value' properties. 
            if (a.value < b.value) {
                return -1;
            } else if (a.value > b.value) {
                return 1;
            } else {
                return 0;
            }
        });
        return timezones.map((tz, index) => {
            return (
                <option key={index}
                    value={tz.value}>
                    {tz.value}
                </option>
            );
        });
    }

    render() {
        return (
            <form onSubmit={this.handleTZSubmit} className="timezone-form container">
                <h1>Please choose your correct timezone from the following list:</h1>
                <div className="input-container">
                    <select value={this.state.timezone}
                        name="from"
                        onChange={this.handleTZChange}
                        className="timezone-select"
                    >
                        <option value="" disabled>Choose Your Timezone</option>
                        {this.renderSelectInput()}
                    </select>
                    <input 
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        );
    }

}

export default Timezone;