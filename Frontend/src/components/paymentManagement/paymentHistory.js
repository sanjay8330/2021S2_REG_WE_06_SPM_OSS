import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import firebase from '../../Firebase/firebase';

const initialStates = {
    "payment": [],
    "searchPayment": ''
}

export default class paymentHistory extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ searchProduct: e.target.value });
    }

    componentDidMount(e) {
        Axios.get('http://localhost:3001/checkout/payment-history')
            .then(response => {
                this.setState({ checkout: response.data.data });
            }).catch(error => {
                alert("Your payment history is empty");
            })
    }

    render() {
        return (
            <main>
                <div class="wrap">
                    <div class="search">
                        <input
                            type="text"
                            placeholder="Search"
                            name="searchProduct"
                            id="searchProduct"
                            onChange={this.onChange}
                            class="searchTerm" />
                        <button type="submit" class="searchButton">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <br /><br />
                <table class="table border shadow" id="casti_male">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Address</th>
                            <th scope="col">Receiver's name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.payment.length > 0 && this.state.payment.filter((values) => {
                            if (this.state.searchPayment == "") {
                                return values;
                            } else if (values.checkout.toLowerCase().includes(this.state.checkout.toLowerCase())) {
                                return values;
                            }
                        }).map((item, index) =>
                            <tr>



                                <td>
                                    <li class="list-inline-item">
                                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeletePage(e, item._id)}><i class="fa fa-trash"></i></button>
                                    </li>
                                </td>

                            </tr>
                        )}
                    </tbody>


                </table>



            </main>

        )
    }
}

