/**
 * SCOPE    -   USER MANAGEMENT - ADMINISTRATOR
 * PAGE     -   VIEW ALL CUSTOMERS
 * 
 * =====================================
 * CREATED BY           :   S.Sanjay
 * LAST MODIFIED DATE   :   19/09/2021
 */

import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

const initialStates = {
    "userlist": [],
    "userInfo": [],
    "searchUser": '',
    "userreport": []
}

export default class ViewUsers extends Component {
    constructor(props) {
        super(props);
        this.navigateAddUsersPage = this.navigateAddUsersPage.bind(this);
        this.navigateViewAdminPage = this.navigateViewAdminPage.bind(this);
        this.navigateToUpdateUser = this.navigateToUpdateUser.bind(this);
        this.navigateToDeleteUser = this.navigateToDeleteUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = initialStates;
    }

    /**
     * DESCRIPTION      -   The function written to capture the user input and assign it the states
     * PARAMETERS       -   event
     * METHOD CALLS     -   setState()
     */
    onChange(e) {
        this.setState({ searchUser: e.target.value });
    }

    /**
     * DESCRIPTION      -       The function to navigate to add users page
     */
    navigateAddUsersPage(e) {
        window.location = '/adminUserRegister';
    }

    /**
     * DESCRIPTION      -       The function to navigate to view administrators
     */
    navigateViewAdminPage(e) {
        window.location = "/viewAdmin";
    }

    /**
    * DESCRIPTION      -       The function to navigate to update users page
    */
    navigateToUpdateUser(e, userId) {
        window.location = `/updateUser/${userId}`;
    }

    /**
    * DESCRIPTION      -       The function to navigate to delete users page
    */
    navigateToDeleteUser(e, userId) {
        window.location = `/deleteUser/${userId}`;
    }

    /**
     * DESCRIPTION      -       The function written to get all the customers
     * METHOD CALLS     -       setState()
     * API CALL         -       GET ALL CUSTOMERS
     */
    componentDidMount(e) {
        Axios.get('http://localhost:3001/user/getAllCustomers')
            .then(response => {
                this.setState({ userlist: response.data.data });
            }).catch(error => {
                alert(error.message);
            });

        Axios.get('http://localhost:3001/userreport/getAllUserReports')
            .then(response => {
                this.setState({ userreport: response.data.data });
            }).catch(error => {
                alert(error.message);
            });


    }

    /**
     * DESCRIPTION      -       The function written to generate reports for the users
     * METHOD CALLS     -       setState()
     * API CALL         -       GET ALL USER TRANSACTIONS
     */
     jsPdfGeneratorProductOffer() {
        var doc = new jsPDF('p', 'pt');
        doc.text(270, 20, 'SUMMARY OF USER LOGS', 'center')
        doc.setFont('courier')
        doc.autoTable({ html: '#reportTable' })

        //Name used to save the pdf when downloading
        doc.save('userlog-FASHIONZ.pdf')
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
                            <li><a href="/viewProductOffers" style={{ color: "white" }}>Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} class="active">Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>

                        <h1>VIEW USERS</h1><br />

                        <button onClick={this.navigateViewAdminPage} class="btn btn-dark" type="button">View Administrator</button> &nbsp;
                        <button onClick={this.navigateAddUsersPage} class="btn btn-dark" type="button">Add Users</button> &nbsp;
                        <button onClick={this.jsPdfGeneratorProductOffer} class="btn btn-dark" type="button">Generate Report</button>

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
                        </div><br /><br />

                        <div class="info" style={{ width: '16%' }}>
                            <b><h6>
                                Total Customers: {this.state.userlist.length}</h6></b>
                        </div>
                        <br />

                        <table class="table border shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">USER FULLNAME</th>
                                    <th scope="col">USER EMAIL</th>
                                    <th scope="col">USER CONTACT</th>
                                    <th scope="col">USER CATEGORY</th>
                                    <th scope="col">EDIT</th>
                                    <th scope="col">DELETE</th>

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
                                        <td>{"(+94)-" + item.userContact}</td>
                                        <td>{item.userCategory}</td>
                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-success btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={e => this.navigateToUpdateUser(e, item._id)}><i class="fa fa-edit"></i></button>
                                            </li>
                                        </td>
                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-danger btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeleteUser(e, item._id)}><i class="fa fa-trash"></i></button>
                                            </li>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <table class="table border shadow" style={{ display: 'none' }} id="reportTable">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">USER EMAIL</th>
                                    <th scope="col">USER CATEGORY</th>
                                    <th scope="col">DESCRIPTION</th>
                                    <th scope="col">ACTION</th>
                                    <th scope="col">DATE TIME</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.userreport.length > 0 && this.state.userreport.map((item, index) =>
                                    <tr>
                                        <td>{item.userEmail}</td>
                                        <td>{item.userCategory}</td>
                                        <td>{item.description}</td>
                                        <td>{item.action}</td>
                                        <td>{item.datetime}</td>
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