import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';
import PasswordChecklist from "react-password-checklist";
import Header from "../header/header";

const initialStates = {
    "password": '',
    "confirmpassword": '',
    "user": []
}
export default class UpdateUserProfilePassword extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/user/getUserById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ user: response.data.data });
            }).catch(error => {
                alert(error.message);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.confirmpassword) {
            alert('Password Mismatch!!');
        } else {
            let updUser = {
                "newPassword": this.state.password
            }
            Axios.put(`http://localhost:3001/user/resetPassword/${this.props.match.params.id}`, updUser)
                .then(response => {
                    alert('User Password Updated Successfully');
                    window.location = `/home/${this.props.match.params.id}`;
                }).catch(error => {
                    alert(error.message);
                })
        }

    }

    render() {
        return (
            <div>
                <Header />
                <div class="wrapper">
                    <div className="container4">

                        <center><h2 class="log" style={{ color: "black" }}><b><i>Reset User Password</i></b></h2></center><br />

                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="email" style={{ color: "black" }}>New Password</label>
                                <input
                                    class="form-control"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required />
                            </div><br />

                            <div class="form-group">
                                <label for="password" style={{ color: "black" }}>Confirm New Password</label>
                                <input
                                    class="form-control"
                                    type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    value={this.state.confirmpassword}
                                    onChange={this.onChange}
                                    required />
                            </div><br />

                            <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital", "match"]}
                                minLength={5}
                                value={this.state.password}
                                valueAgain={this.state.confirmpassword}
                                onChange={(isValid) => { }}
                                className="passwordCheck"
                                style={{ color: "black" }}
                            /><br />

                            <div class="m-t-lg">
                                <ul class="list-inline">
                                    <li>
                                        <input class="btn btn--form" type="submit" value="Reset Password" />
                                    </li>
                                    <li><br />
                                        <a class="signup__link" href="/viewUsers">Cancel</a>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div><br />
                </div>
            </div>
        )
    }
}