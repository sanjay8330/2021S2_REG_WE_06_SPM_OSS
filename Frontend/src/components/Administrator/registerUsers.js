import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import Header from '../../components/header/header';
import PasswordChecklist from "react-password-checklist";

const initialState = {
    "fullName": '',
    "email": '',
    "password": '',
    "confirmPassword": '',
    "contactNo": '',
    "category": '',
    "resetAnswer": '',
    "options": [],
    "existingUser": [],
    "currentDateTime": Date().toLocaleString()
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

        Axios.get(`http://localhost:3001/user/getUserByEmailID/${this.state.email}`)
            .then(response => {
                this.setState({ existingUser: response.data.data });
                console.log('LENGTH', this.state.existingUser.length);

                if (this.state.existingUser.length === 1) {
                    this.state.checkUser = false;
                    alert('User already exists');
                    window.location = '/adminDashboard';

                } else if (this.state.password !== this.state.confirmPassword) {
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

                            let userReport = {
                                "userEmail": this.state.email,
                                "userCategory": 'Administrator',
                                "description": 'Registration of User',
                                "action": 'INSERT',
                                "datetime": this.state.currentDateTime
                            }
                            Axios.post('http://localhost:3001/userreport/addUserReport', userReport)
                                .then(response => {
                                    alert('User Registration Successfull!!');
                                }).catch(error => {
                                    alert(error.message);
                                })
                        }).catch(error => {
                            alert(error.message);
                        })
                }
            }).catch(error => {
                alert(error.message);
            })
    }

    render() {
        return (
            <div>
                <div class="wrapper">
                    <nav>
                        <header><br />
                            &nbsp; &nbsp;  &nbsp; ADMIN PANEL
                        </header><hr style={{ color: "white" }} />
                        <ul><br />
                            <li><a href="/adminDashboard" style={{ color: "white" }}>Dashboard</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }} >Manage Products</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }} >Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} class="active">Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>REGISTER USERS</h1>
                    <div className="container3">
                        <center><h2 class="log" style={{ color: "black" }}><b><i>Add Application User Details</i></b></h2></center><br />
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
                                required
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" /><br />

                            <span style={{ color: "black" }}>Confirm Password</span>
                            <input
                                class="form-control"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                                required /><br />

                            <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital", "match"]}
                                minLength={5}
                                value={this.state.password}
                                valueAgain={this.state.confirmPassword}
                                onChange={(isValid) => { }}
                            /><br />

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
                                required
                                title="Enter only the last 4 digits of you NIC card" /><br />

                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                    </main>
                </div>
            </div>
        )
    }
}
