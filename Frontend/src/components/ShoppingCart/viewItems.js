import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';

const initialStates = {
    "today": '',
    "itemlist": [],
    "totalamount": 0,
    "userId": '',
}

export default class ViewShoppingcart extends Component {
    constructor(props) {
        super(props);
        this.navigateToCheckOut = this.navigateToCheckOut.bind(this);
        this.navigateToPaymentHistory = this.navigateToPaymentHistory.bind(this);
        this.state = initialStates;
    }

    //Navigate to the Payment History Page
    navigateToPaymentHistory(e){
        window.location = `/payment-history/${this.props.match.params.userId}`;
    }
    navigateToCheckOut(e) {
        //window.location = `/checkout/${this.props.match.params.userId}`;
        window.location = `/delivery-details/${this.props.match.params.userId}/${this.props.match.params.totalamount}`;
    }

    componentDidMount(e) {

        //Set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });

        //Getting the current date
        this.state.today = new Date();
        var dd = String(this.state.today.getDate());
        var mm = String(this.state.today.getMonth() + 1); //January is 0!
        var yyyy = this.state.today.getFullYear();

        var date = mm + '-' + dd + '-' + yyyy;

        Axios.get(`http://localhost:3001/insertitem/readItemsForCustomer/${this.props.match.params.userId}/${date}`)
            .then(response => {
                this.setState({ itemlist: response.data.data });
            }).catch(error => {
                alert(error.message);
            })
    }

    render() {
        return (
            <div>
                <Header /><br/>
                <center><b><p style={{ fontSize: '50px' }}>Shopping Cart</p></b></center>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-dark" type="button" onClick={this.navigateToCheckOut} style={{ marginRight: '2%' }}>Checkout</button>
                    <button class="btn btn-dark" type="button" onClick={this.navigateToPaymentHistory} style={{ marginRight: '2%' }}>Payment History</button>
                </div><br />

                <table class="table border shadow">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">ITEM IMAGE</th>
                            <th scope="col">ITEM NAME</th>
                            <th scope="col">DESCRIPTION</th>
                            <th scope="col">ITEM COLOR</th>
                            <th scope="col">ITEM SIZE</th>
                            <th scope="col">ITEM PRICE</th>
                            <th scope="col">ITEM QUANTITY</th>
                            <th scope="col">ITEM TOTAL PRICE</th>
                            <th scope="col">EDIT</th>
                            <th scope="col">DELETE</th>
                            <th scope="col" style={{ display: "none" }}>TOTAL IN ROW</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.itemlist.length > 0 && this.state.itemlist.map((item, index) =>
                            <tr>
                                <td><img style={{ minWidth: '50px', width: '50px', height: '60px' }} src={item.productImage} /></td>
                                <td>{item.productName}</td>
                                <td>{item.productDescription}</td>
                                <td>{item.productColor}</td>
                                <td>{item.productSize}</td>
                                <td>{"Rs. " + item.productPrice + "/="}</td>
                                <td>{item.productQuantity}</td>
                                <td>{"Rs. " + item.productPrice * item.productQuantity + "/="}</td>
                                <td>
                                    <li class="list-inline-item">
                                        <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                                    </li>
                                </td>
                                <td>
                                    <li class="list-inline-item">
                                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                                    </li>
                                </td>
                                <td style={{ display: "none" }}>{this.state.totalamount = this.state.totalamount + (item.productPrice * item.productQuantity)}</td>
                            </tr>
                        )}
                    </tbody>
                </table><br />

                <b><h3 style={{ color: "red"}}>&nbsp; &nbsp;Total Amount : {"Rs. " + this.state.totalamount + " /="}</h3></b>
                            
                <br /><br /><br />

            </div>
        )
    }
}