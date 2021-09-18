import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "userlist": [],
    "userInfo": [],
    "searchUser": ''
}

export default class ViewAdministrators extends Component {
    constructor(props) {
        super(props);
        this.navigateAddUsersPage = this.navigateAddUsersPage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ searchUser: e.target.value });
    }

    navigateAddUsersPage(e) {
        window.location = '/adminUserRegister';
    }

    navigateToUpdateUser(e, userId) {
        window.location = `/updateUser/${userId}`;
    }

    componentDidMount(e) {
        Axios.get('http://localhost:3001/user/getAllAdministrators')
            .then(response => {
                this.setState({ userlist: response.data.data });
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

                        <h1>VIEW USERS</h1><br />

                        <button onClick={this.navigateAddUsersPage} class="btn btn-dark" type="button">Add Users</button>

                        <div class="wrap">
                            <div class="search">
                                <input
                                    type="text"
                                    placeholder="Search by user name"
                                    name="searchUser"
                                    id="searchUser"
                                    onChange={this.onChange}
                                    class="searchTerm" />
                                <button type="submit" class="searchButton">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>


                        <br /><br /><br />


                        <table class="table border shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">USER FULLNAME</th>
                                    <th scope="col">USER EMAIL</th>
                                    <th scope="col">USER CONTACT</th>
                                    <th scope="col">USER CATEGORY</th>
                                    <th scope="col">EDIT</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.userlist.length > 0 && this.state.userlist.filter((values) => {
                                    if (this.state.searchUser == "") {
                                        return values;
                                    } else if (values.userFullName.toLowerCase().includes(this.state.searchUser.toLowerCase())) {
                                        return values;
                                    }
                                }).map((item, index) => 
                                    <tr>
                                        <td>{item.userFullName}</td>
                                        <td style={{ color: 'blue' }}><u><i>{item.userEmail}</i></u></td>
                                        <td>{"+94-" + item.userContact}</td>
                                        <td>{item.userCategory}</td>
                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-success btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={e => this.navigateToUpdateUser(e, item._id)}><i class="fa fa-edit"></i></button>
                                            </li>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </main>
                </div>
            </div>
        )
    }
}