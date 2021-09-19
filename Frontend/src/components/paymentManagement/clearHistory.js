// Function : Payment Management
// Name : D.P. Kavindi Gimshani
// Student Number : IT19150826

import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';

const initialStates = {
    Checkout: [],
    "userId": '',
}

export default class clearHistory extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigatetoViewPage = this.navigatetoViewPage.bind(this);
        this.state = initialStates;
    }

    //get the userID
    componentDidMount() {
        //Set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });
    }

    onSubmit(e) {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/checkout/deletePaymentHistory/${this.props.match.params.id}`)
            .then(response => {
                alert('Payment Record deleted Successfully');
                window.location = `/payment-history/${this.state.userId}`;
            }).catch(error => {
                console.log(error.message);
            })
    }

    //nagivate to view items page
    navigatetoViewPage(e) {
        window.location = `/payment-history/${this.props.match.params.id}`;
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

                                <div class="alert alert-danger" role="alert">
                                    <center><p>Are you sure you want to permanently remove your whole payment history?</p><hr />
                                        By deleting this payment history you can't undo this action.</center>
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
