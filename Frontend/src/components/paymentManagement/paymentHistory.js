import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';

const initialStates = {
    "Checkout": [],
    "userId": ''
}

export default class paymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = initialStates;
    }

    componentDidMount(e) {
        //Set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });

        Axios.get(`http://localhost:3001/checkout/readHistoryForCustomer/${this.props.match.params.userId}`)
            .then(response => {
                this.setState({ Checkout: response.data.data });
                console.log('RESPONSE>>>', this,this.state.Checkout);
            }).catch(error => {
                alert(error.message);
            })
    }

    render() {
        return (
            <div>
                <Header /><br />
                <center><b><p style={{ fontSize: '50px' }}>Payment History</p></b></center>
                <main>
                    <table class="table border shadow" id="casti_male">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">DATE</th>
                                <th scope="col">TOTAL AMOUNT</th>
                                <th scope="col">PAYMENT METHOD</th>
                                <th scope="col">DELETE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.Checkout.length > 0 && this.state.Checkout.map((item, index) => 
                                <tr>
                                <td>{item.date}</td>
                                <td></td>
                                <td>{item.paymentMethod}</td>
                                <td>
                                    <li class="list-inline-item">
                                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
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

