import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import Header from '../../components/header/header';

const initialState = {
    "fullName": '',
    "email": '',
    "password": '',
    "confirmPassword": '',
    "contactNo": '',
    "category": '',
    "resetAnswer": '',
    "options": []
}

export default class AdminAddUser extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectedOption = this.onSelectedOption.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        let data = [];
        let userType1 = {
            value: 'Customer',
            label: 'Customer'
        }
        let userType2 = {
            value: 'Administrator',
            label: 'Administrator'
        }
        data.push(userType1);
        data.push(userType2);
        this.setState({ options: data });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSelectedOption(e) {
        this.setState({ category: e.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('Password Mismatch!!');
        } else {
            let user = {
                "userFullName": this.state.fullName,
                "userEmail": this.state.email,
                "userPassword": this.state.password,
                "userContact": this.state.contactNo,
                "userCategory": this.state.category,
                "resetAnswer": this.state.resetAnswer
            }
            Axios.post('http://localhost:3001/user/addUser', user)
                .then(response => {
                    alert('User Registration Successfull!!');
                }).catch(error => {
                    alert(error.message);
                })
        }
    }

    render() {
        return (
            <div>
                <Header /><br /><br />
                <div className="container">
                    <center><h2 class="log" style={{ color: "black" }}>Add Application User Details</h2></center><br />
                    <form onSubmit={this.onSubmit} style={{ height: "100px;" }}>

                        <span style={{ color: "black" }}>User Type</span>
                        <Select
                            options={this.state.options}
                            onChange={this.onSelectedOption}
                        /><br />

                        <span style={{ color: "black" }}>Full Name</span>
                        <input
                            class="form-control"
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={this.state.fullName}
                            onChange={this.onChange}
                            required /><br />

                        <span style={{ color: "black" }}>Email Address</span>
                        <input
                            class="form-control"
                            type="text"
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            required /><br />

                        <span style={{ color: "black" }}>Password</span>
                        <input
                            class="form-control"
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            required /><br />

                        <span style={{ color: "black" }}>Confirm Password</span>
                        <input
                            class="form-control"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.onChange}
                            required /><br />

                        <span style={{ color: "black" }}>Contact Number</span>
                        <input
                            class="form-control"
                            type="tel"
                            pattern="[0-9]{10}"
                            name="contactNo"
                            id="contactNo"
                            value={this.state.contactNo}
                            onChange={this.onChange}
                            required /><br />

                        <span style={{ color: "black" }}>Enter last 4 digits of your NIC card</span>
                        <input
                            class="form-control"
                            type="number"
                            pattern="[0-9]{4}"
                            name="resetAnswer"
                            id="resetAnswer"
                            value={this.state.resetAnswer}
                            onChange={this.onChange}
                            required /><br />

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div><br />
            </div>

        )
    }
}
