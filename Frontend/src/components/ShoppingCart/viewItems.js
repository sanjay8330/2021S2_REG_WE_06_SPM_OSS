// ----------------------------
//     VIEWITEMS INTERFACE - FRONTEND
// ----------------------------

//Function - Shopping Cart management
//Student name - Ekanayake K.L.W
//Student ID - IT19150758

import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

const initialStates = {
    "today": '',
    "itemlist": [],
    "totalamount": 0,
    "userId": '',
    "itemtotalamount": 0,
}

export default class ViewShoppingcart extends Component {
    constructor(props) {
        super(props);
        this.navigateToCheckOut = this.navigateToCheckOut.bind(this);
        this.navigateToPaymentHistory = this.navigateToPaymentHistory.bind(this);
        this.navigateToHome = this.navigateToHome.bind(this);
        this.state = initialStates;
    }

    //Navigate to the Payment History Page
    navigateToPaymentHistory(e) {
        window.location = `/payment-history/${this.props.match.params.userId}`;
    }

    //Navigate to the Checkout Page
    navigateToCheckOut(e) {
        this.state.itemtotalamount = this.state.totalamount / 2;
        window.location = `/viewDeliveryDetails/${this.props.match.params.userId}/${this.state.itemtotalamount}`;
    }

    //Navigate to the update Page
    navigateToUpdatePage(e, productId) {
        window.location = `/updateitem/${productId}`;
    }

    //Navigate to the delete Page
    navigateToDeletePage(e, productId) {
        window.location = `/deleteitem/${productId}`;
    }

    //Navigate to the home Page
    navigateToHome(e, userId) {
        userId = this.props.match.params.userId 
        window.location = `/home/${userId}`;
    }

    componentDidMount(e) {

        document.getElementById("checkoutBtn").disabled = true;
        document.getElementById("downloadReportBtn").disabled = true;

        //Set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });

        //Getting the current date
        this.state.today = new Date();
        var dd = String(this.state.today.getDate());
        var mm = String(this.state.today.getMonth() + 1); //January is 0!
        var yyyy = this.state.today.getFullYear();

        var date = mm + '-' + dd + '-' + yyyy;

            /**
         * The function written to get all items that relavent to a particular user
         * Uses - setState()
         * API CALL - GET ALL ITEMS FOR A USER
         */

        Axios.get(`http://localhost:3001/insertitem/readItemsForCustomer/${this.props.match.params.userId}/${date}`)
            .then(response => {
                this.setState({ itemlist: response.data.data });
                
                //Used to auto enable the button when there are items in the cart - SANJAY
                if(this.state.itemlist.length > 0){
                    document.getElementById("checkoutBtn").disabled = false;
                    document.getElementById("downloadReportBtn").disabled = false;
                }
                
            }).catch(error => {
                alert(error.message);
            })
        
        
        
    }

    //generate item Report
    jsPdfGeneratorProduct() {

        var doc = new jsPDF('p', 'pt');
        doc.text(300, 20, 'SUMMARY OF ITEM DETAILS', 'center')

        doc.setFont('courier')

        doc.autoTable({ html: '#itemReportTable' })

        //save PDF
        doc.save('itemreport.pdf')
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <center><b><p style={{ fontSize: '50px' }}><i class="fa fa-home fa-lg" onClick={this.navigateToHome} style={{ marginRight: '2%', fontSize: '40px'}}></i>Shopping Cart</p></b></center><hr /><br />
                    <button type="button" class="btn btn-dark" id="downloadReportBtn" onClick={this.jsPdfGeneratorProduct} style={{ marginRight: '2%' }}>Download Report</button>
                    <button class="btn btn-dark" type="button" id="checkoutBtn" onClick={this.navigateToCheckOut} style={{ marginRight: '2%' }}>Checkout</button>
                    <button class="btn btn-dark" type="button" onClick={this.navigateToPaymentHistory} style={{ marginRight: '2%' }}>Payment History</button>

                    <br /><br />

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
                                            <button class="btn btn-success btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={e => this.navigateToUpdatePage(e, item._id)} ><i class="fa fa-edit"></i></button>
                                        </li>
                                    </td>
                                    <td>
                                        <li class="list-inline-item">
                                            <button class="btn btn-danger btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeletePage(e, item._id)} ><i class="fa fa-trash"></i></button>
                                        </li>
                                    </td>
                                    <td style={{ display: "none" }}>{this.state.totalamount = this.state.totalamount + (item.productPrice * item.productQuantity)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table><br />

                    <b><h3 style={{ color: "white", backgroundColor: "#050978", width: "340px", padding: '1.2em 0.6em' }}>&nbsp; &nbsp;Total Amount: {"Rs. " + this.state.totalamount + " /="}</h3></b>

                    <br />

                    <table class="table border shadow" id="itemReportTable" style={{ display: 'none'}}>
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">ITEM NAME</th>
                                <th scope="col">DESCRIPTION</th>
                                <th scope="col">ITEM COLOR</th>
                                <th scope="col">ITEM SIZE</th>
                                <th scope="col">ITEM PRICE</th>
                                <th scope="col">ITEM QUANTITY</th>
                                <th scope="col">ITEM TOTAL PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.itemlist.length > 0 && this.state.itemlist.map((item, index) =>
                                <tr>
                                    
                                    <td>{item.productName}</td>
                                    <td>{item.productDescription}</td>
                                    <td>{item.productColor}</td>
                                    <td>{item.productSize}</td>
                                    <td>{"Rs. " + item.productPrice + "/="}</td>
                                    <td>{item.productQuantity}</td>
                                    <td>{"Rs. " + item.productPrice * item.productQuantity + "/="}</td>
                                </tr>
                            )}
                        </tbody>
                    </table><br />
                </main>
            </div>
        )
    }
}