import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';

const initialStates = {
    "Checkout": [],
    "userId": '',
    "searchHistory": '',
}

export default class viewDeliveryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = initialStates;
    }

    componentDidMount(e) {
        //Set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });

        Axios.get(`http://localhost:3001/delivery-details/deliveryForCustomer/${this.props.match.params.userId}`)
            .then(response => {
                this.setState({ Checkout: response.data.data });
                console.log('RESPONSE>>>', this,this.state.Checkout);
            }).catch(error => {
                alert(error.message);
            })
    }

    navigateToDeletePage(e, UserID) {
        window.location = `/deletePayment/${UserID}`;
    }

    render() {
        return (
            <div>
                <Header /><br />
                <center><b><p style={{ fontSize: '50px' }}>Payment History</p></b></center>
                <main>
                <div class="wrap">
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
                        </div>
                        <br/><br/>
                    <table class="table border shadow" id="casti_male">
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
                                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeletePage(e, this.state.userId )}><i class="fa fa-trash"></i></button>
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

