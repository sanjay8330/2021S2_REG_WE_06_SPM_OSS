import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';

const initialStates = {
    Checkout: [],
    "userId": '',
}

export default class deletePayment extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigatetoViewPage = this.navigatetoViewPage.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        //Set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });

        Axios.get(`http://localhost:3001/checkout/getPaymentByID/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ Checkout: response.data.data });
                console.log(this.state.Checkout);
            }).catch(error => {
                console.log(error.message);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/checkout/deletePayment/${this.props.match.params.id}`)
            .then(response => {
                alert('Payment Record deleted Successfully');
                window.location = "/payment-history";
            }).catch(error => {
                console.log(error.message);
            })
    }

    navigatetoViewPage(e) {
        window.location = `/payment-history/${this.state.userId}`;
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <h1>DELETE CONFIRMATION</h1>
                    <div class="content">
                        <div class="wrapper-1">
                            <div class="wrapper-2">

                                <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Date:<b> {this.state.Checkout.date}</b></span><br />

                                <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Amount: <b>Rs.{this.state.Checkout.amount}.00</b></span><br />

                                <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Payment Method:<b> {this.state.Checkout.paymentMethod}</b></span><br /><br />

                                <div class="alert alert-danger" role="alert">
                                    <center><p>Are you sure you want to permanently remove this payment?</p><hr />
                                        By deleting this payment detail you can't undo this action.</center>
                                </div>
                                <button class="cancel" onClick={this.navigatetoViewPage} style={{ float: "left" }}>
                                    Cancel
                                </button>
                                <button class="delete" onClick={this.onSubmit} style={{ float: "right" }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        )
    }
}
