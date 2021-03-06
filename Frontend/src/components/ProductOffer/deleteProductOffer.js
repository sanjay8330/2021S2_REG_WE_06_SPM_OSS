/**
 * SCOPE    -   PRODUCT OFFER MANAGEMENT
 * PAGE     -   DELETE PRODUCT OFFER 
 * 
 * =====================================
 * CREATED BY           :   S.Sanjay
 * LAST MODIFIED DATE   :   19/09/2021
 */
import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "offerInfo": []
}

export default class DeleteProductOffer extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigatetoViewOffer = this.navigatetoViewOffer.bind(this);
        this.state = initialStates;
    }

    /**
     * DESCRIPTION      -       The function written to get product offer details by path param (id)
     * METHOD CALLS     -       setState()
     * API CALL         -       GET PRODUCT OFFER BY ID
     */
    componentDidMount() {
        Axios.get(`http://localhost:3001/productOffer/getProductOfferById/${this.props.match.params.id}`)
            .then(response => {
                //console.log('RESPONSE>>', response.data.data);
                this.setState({ offerInfo: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**
     * DESCRIPTION      -       The function written to delete the product offer details by path param (id).
     * API CALL         -       DELETE PRODUCT OFFER BY ID
     */
    onSubmit(e) {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/productOffer/deleteProductOffer/${this.props.match.params.id}`)
            .then(response => {
                alert('Product Offer deleted Successfully');
                window.location = "/viewProductOffers";
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**
     * DESCRIPTION      -       The function to navigate to the View all offer page
     */
    navigatetoViewOffer(e) {
        window.location = "/viewProductOffers";
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
                            <li><a href="/viewProductOffers" style={{ color: "white" }} class="active">Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} >Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>

                        <h1>DELETE CONFIRMATION</h1>
                        <div class="content">
                            <div class="wrapper-1">
                                <div class="wrapper-2">

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Product Name:<b> {this.state.offerInfo.productName}</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Product Price: <b>Rs.{this.state.offerInfo.productPrice}.00</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Product Discount:<b> {this.state.offerInfo.productDiscount}%</b></span><br /><br />

                                    <div class="alert alert-danger" role="alert">
                                        <center><p>Are you sure you want to permanently remove this product offer?</p><hr />
                                            By deleting this product offer detail you can't undo this action.</center>
                                    </div>
                                    <button class="cancel" onClick={this.navigatetoViewOffer} style={{ float: "left" }}>
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
