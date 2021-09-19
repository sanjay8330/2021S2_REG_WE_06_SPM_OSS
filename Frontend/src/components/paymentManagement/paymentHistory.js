// Function : Payment Management
// Name : D.P. Kavindi Gimshani
// Student Number : IT19150826

import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

const initialStates = {
    "Checkout": [],
    "userId": '',
    "searchHistory": '',
}

export default class paymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = initialStates;
        this.onChange = this.onChange.bind(this);
        this.navigateToHome = this.navigateToHome.bind(this);
    }

    //assign inputs to state
    onChange(e) {
        this.setState({ searchHistory: e.target.value });
    }

    //navigate to home page
    navigateToHome(e, userId) {
        userId = this.props.match.params.userId 
        window.location = `/home/${userId}`;
    }

    //reteive payment details according to user ID
    componentDidMount(e) {
        //Set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });

        Axios.get(`http://localhost:3001/checkout/readHistoryForCustomer/${this.props.match.params.userId}`)
            .then(response => {
                this.setState({ Checkout: response.data.data });
            }).catch(error => {
                alert(error.message);
            })
    }

    //navigate to delete page
    navigateToDeletePage(e, paymentID, UserID) {
        window.location = `/deletePayment/${paymentID}/${UserID}`;
    }

    //nagivate to delete history page
    navigateToDeleteHistory(e, UserID) {
        window.location = `/deletePaymentHistory/${UserID}`;
    }

    //generate payment Report
    jsPdfGeneratorPayment() {

        var doc = new jsPDF('p', 'pt');
        doc.text(300, 20, 'Report of Payment History', 'center')

        doc.setFont('courier')

        doc.autoTable({ html: '#paymentReportTable' })

        //save PDF
        doc.save('payment_history.pdf')
    }

    render() {
        return (
            <div>
                <Header /><br />
                <center><b><p style={{ fontSize: '50px' }}><i class="fa fa-home fa-lg" onClick={this.navigateToHome} style={{ marginRight: '2%', fontSize: '40px'}}></i>Payment History</p></b><hr /></center>
                <main>

                    <table width="100%">
                        <td>
                            <button type="button" class="btn btn-dark" onClick={this.jsPdfGeneratorPayment} style={{ marginRight: '2%' }}>Download Report</button>
                            <button type="button" class="btn btn-dark" onClick={this.navigateToDeleteHistory} style={{ marginRight: '2%' }}>Clear History</button>
                        </td>

                        <td align="right" width="30%">

                            <div class="search">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    name="searchHistory"
                                    id="searchHistory"
                                    onChange={this.onChange}
                                    class="searchTerm" />
                                <button type="submit" class="searchButton">
                                    <i class="fa fa-search"></i>
                                </button>

                            </div>
                        </td>
                        <td></td>
                    </table>


                    <br /><br /><br />
                    <table class="table border shadow" id="paymentTable" >
                        <thead class="thead-dark">
                            <tr>
                                {/* <th scope="col">AMOUNT</th> */}
                                <th scope="col">DATE</th>
                                <th scope="col">AMOUNT</th>
                                <th scope="col">PAYMENT METHOD</th>
                                <th scope="col">DELETE</th>
                            </tr>
                        </thead>

                        <tbody>

                            {this.state.Checkout.length > 0 && this.state.Checkout.filter((values) => {
                                if (this.state.searchHistory == "") {
                                    return values;
                                } else if (values.paymentMethod.toLowerCase().includes(this.state.searchHistory.toLowerCase())) {
                                    return values;
                                }
                            }).map((item, index) =>
                                <tr>
                                    <td>{item.date}</td>
                                    <td>{item.amount}</td>
                                    {/* <td>{item.amount}</td> */}
                                    <td>{item.paymentMethod}</td>

                                    <td>
                                        <li class="list-inline-item">
                                            <button class="btn btn-danger btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeletePage(e, item._id, this.state.userId)}><i class="fa fa-trash"></i></button>
                                        </li>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <table class="table border shadow" id="paymentReportTable" style={{ display: 'none' }}>
                        <thead class="thead-dark">
                            <tr>
                                {/* <th scope="col">AMOUNT</th> */}
                                <th scope="col">DATE</th>
                                <th scope="col">AMOUNT</th>
                                <th scope="col">PAYMENT METHOD</th>
                            </tr>
                        </thead>

                        <tbody>

                            {this.state.Checkout.length > 0 && this.state.Checkout.filter((values) => {
                                if (this.state.searchHistory == "") {
                                    return values;
                                } else if (values.date.includes(this.state.date)) {
                                    return values;
                                }
                            }).map((item, index) =>
                                <tr>
                                    <td>{item.date}</td>
                                    <td>{item.amount}</td>
                                    {/* <td>{item.amount}</td> */}
                                    <td>{item.paymentMethod}</td>

                                    <td>
                                        <li class="list-inline-item">
                                            <button class="btn btn-danger btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeletePage(e, item._id, this.state.userId)}><i class="fa fa-trash"></i></button>
                                        </li>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </main>
            </div>

        )
    }
}

