// -------------------------------------------
//     DELETE PRODUCTS WITH OFFERS - FRONTEND
// -------------------------------------------

//Function - Product management
//Student name - H.M. Kasuni Navodya
//Student ID - IT19144986

import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "products": [],
    "productOffer": [],
    "offerPrice": '',
    "offerDiscount": '',
    "offerDescription": '',
    "offervalidTill": '',
    "offerId": ''
}

export default class deleteproductWithOffer extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigatetoViewPage = this.navigatetoViewPage.bind(this);
        this.state = initialStates;
    }

    /**
     * The function written to get product details with offers by path param (id)
     * Uses - setState()
     * API CALL - GET PRODUCTS WITH OFFERS BY ID
     */
    componentDidMount() {
        Axios.get(`http://localhost:3001/product/getProductById/${this.props.match.params.productId}`)
            .then(response => {
                this.setState({ products: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })

        //Get the product offer for the product
        Axios.get(`http://localhost:3001/productOffer/getProductOfferByproductId/${this.props.match.params.productId}`)
            .then(response => {
                this.setState({ productOffer: response.data.data });

                {
                    this.state.productOffer.length > 0 && this.state.productOffer.map((item, index) => {
                        this.setState({ offerId: item._id });
                        this.setState({ offerPrice: item.offerPrice });
                        this.setState({ offerDiscount: item.offerDiscount });
                        this.setState({ offerDescription: item.offerDescription });
                        this.setState({ offervalidTill: item.offerEndDate });
                    })
                }


            }).catch(error => {
                console.log(error.message);
            })
    }

    /**
     * The function written to delete the product details with offers by path param (id).
     * API CALL - DELETE PRODUCT WITH OFFERS BY ID
     */
    onSubmit(e) {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/product/deleteProduct/${this.props.match.params.productId}`)
            .then(response => {
                Axios.delete(`http://localhost:3001/productOffer/deleteProductOffer/${this.state.offerId}`)
                    .then(response => {
                        alert('Product Offer & Product details deleted Successfully');
                        window.location = "/viewProducts";
                    }).catch(error => {
                        console.log(error.message);
                    })
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**
     * The function to navigate to the product list page
     */
    navigatetoViewPage(e) {
        window.location = "/viewProducts";
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
                            <li><a href="/viewProducts" style={{ color: "white" }} class="active">Manage Products</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }}>Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} >Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>DELETE CONFIRMATION</h1>
                        <div class="content">
                            <div class="wrapper-1">
                                <div class="wrapper-2">

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Product Name:<b> {this.state.products.productName}</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Product Price: <b>Rs.{this.state.products.productPrice}.00</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Product Discount:<b> {this.state.products.productDiscount}%</b></span><br /><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Offer Price:<b>Rs. {this.state.offerPrice}.00</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Offer Discount: <b>{this.state.offerDiscount}%</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Offer Description:<b> {this.state.offerDescription}</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>Offer Vaild Till:<b> {this.state.offervalidTill}</b></span><br /><br />

                                    <div class="alert alert-danger" role="alert">
                                        <center><p>Are you sure you want to permanently remove this product along with the product offer?</p><hr />
                                            By deleting this product detail you can't undo this action.</center>
                                    </div>
                                    <button class="cancel" onClick={this.navigatetoViewPage} style={{ float: "left" }}>
                                        Cancel
                                    </button>
                                    <button class="delete" onClick={this.onSubmit} style={{ float: "right" }}>
                                        Delete Anyway
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
