// ----------------------------
//     DELETE ITEM INTERFACE - FRONTEND
// ----------------------------

//Function - Shopping Cart management
//Student name - Ekanayake K.L.W
//Student ID - IT19150758

import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';

const initialStates = {
    iteminfo: [],
    userID: ''
}

export default class deleteproduct extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigateViewCart = this.navigateViewCart.bind(this);
        this.state = initialStates;
    }

    //Get items by a ID
    /**
         * The function written to get an item for a specific ID
         * Uses - setState()
         * API CALL - get an item for a specific ID
         */
    componentDidMount() {
        Axios.get(`http://localhost:3001/insertitem/getItemById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ iteminfo: response.data.data });
                this.setState({ userID: this.state.iteminfo.userID });
            }).catch(error => {
                console.log(error.message);
            })
    }

    //onsubmit method
    onSubmit(e) {
        e.preventDefault();
        //console.log(this.props.match.params.id);
        //Delete the Items
        /**
         * The function written to delete an item
         * Uses - setState()
         * API CALL - to delete an item
         */
        Axios.delete(`http://localhost:3001/insertitem/deleteItem/${this.props.match.params.id}`)
            .then(response => {
                alert('Product Item deleted Successfully');
                let userId = this.state.userID;
                window.location = `/viewItems/${userId}`;
            }).catch(error => {
                console.log(error.message);
            })
    }

    //Navigating to view items page
    navigateViewCart() {
        let userId = this.state.userID;
        window.location = `/viewItems/${userId}`;
    }

    render() {
        return (
            <div>
                <Header />
                <div class="wrapper">
                    <main>
                    <h1>DELETE CONFIRMATION</h1>
                        <div class="content">
                            <div class="wrapper-1">
                                <div class="wrapper-2">

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Item Name:<b> {this.state.iteminfo.productDescription}</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Item Price: <b>Rs.{this.state.iteminfo.productPrice}.00</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Item Color:<b> {this.state.iteminfo.productColor}</b></span><br /><br />

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Item Quantity:<b> {this.state.iteminfo.productQuantity}</b></span><br /><br />

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Item Size:<b> {this.state.iteminfo.productSize}</b></span><br /><br />

                                    <div class="alert alert-danger" role="alert">
                                        <center><p>Are you sure you want to permanently remove this product?</p><hr />
                                            By deleting this product detail you can't undo this action.</center>
                                    </div>
                                    <button class="cancel" onClick={this.navigateViewCart} style={{ float: "left" }}>
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
            </div >
        )
    }
}
