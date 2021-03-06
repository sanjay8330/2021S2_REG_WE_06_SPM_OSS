/**
 * SCOPE    -   PRODUCT OFFER MANAGEMENT
 * PAGE     -   ADD PRODUCT OFFER 
 * 
 * =====================================
 * CREATED BY           :   S.Sanjay
 * LAST MODIFIED DATE   :   19/09/2021
 */

import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

import Select from 'react-select';
import moment from 'moment';

const initialStates = {
    "products": [],
    "options": [],
    "selectedProduct": '',
    "productInfo": [],
    "offerAmount": '',
    "offerDiscount": '',
    "offerDescription": '',
    "offerEndDate": '',
    "offerStatus": 'Active',
    "existingOffer": []
}

export default class AddProductOffer extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSelectedOption = this.onSelectedOption.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    /**
     * DESCRIPTION      -       The function written to capture the user input and assign it the states
     * PARAMETER        -       event (e)
     * METHOD CALLS     -       setState()
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    /**
    * DESCRIPTION       -       The function written to validate the function change - Offer price should be less than product price
    * PARAMETER         -       event (e)
    * METHOD CALLS      -       setState()
    * VALIDATION        -       toFixed() - Round off to whole number
    */
    onPriceChange(e) {
        this.setState({ offerAmount: e.target.value });

        //Calculate the discount - TO BE SENT TO THE BACKEND
        let discount = (100 * (this.state.productInfo.productPrice - e.target.value)) / this.state.productInfo.productPrice;
        this.setState({ offerDiscount: discount.toFixed(0) });

    }

    /**
     * DESCRIPTION      -       The function written to get the product details once selected & enable the fields in offer form
     * PARAMETER        -       event (e)
     * METHOD CALLS     -       setState()
     * API CALL         -       GET PRODUCT BY ID
     */
    onSelectedOption(e) {
        this.setState({ selectedProduct: e.value });

        Axios.get(`http://localhost:3001/product/getProductById/${e.value}`)
            .then(response => {
                this.setState({ productInfo: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })

        document.getElementById("offerAmount").disabled = false;
        document.getElementById("offerDescription").disabled = false;
        document.getElementById("offerEndDate").disabled = false;

    }

    /**
     * DESCRIPTION      -       The function written to get all the product details
     * METHOD CALLS     -       setState()
     * API CALL         -       GET ALL PRODUCTS
     */
    componentDidMount() {
        Axios.get('http://localhost:3001/product/getAllProducts')
            .then(response => {
                this.setState({ products: response.data.data }, () => {
                    let data = [];
                    this.state.products.map((item, index) => {
                        let product = {
                            value: item._id,
                            label: item.productName
                        }
                        data.push(product)
                    });
                    this.setState({ options: data });
                })
            })
    }

    /**
    * DESCRIPTION       -       The function written to save the product offer details.
    * METHOD CALLS      -       setState()
    * API CALL          -       ADD PRODUCT OFFERS
    */
    onSubmit(e) {
        e.preventDefault();

        Axios.get(`http://localhost:3001/productOffer/getProductOfferByproductId/${this.state.selectedProduct}`)
            .then(response => {
                this.setState({ existingOffer: response.data.data });

                if (this.state.existingOffer.length === 1) {
                    alert('Product already has ongoing offer!!');
                    window.location = "/viewProductOffers";
                } else {

                    let productOffer = {
                        "product": this.state.selectedProduct,
                        "productName": this.state.productInfo.productName,
                        "productPrice": this.state.productInfo.productPrice,
                        "productDiscount": this.state.productInfo.productDiscount,
                        "offerPrice": this.state.offerAmount,
                        "offerDiscount": this.state.offerDiscount,
                        "offerDescription": this.state.offerDescription,
                        "offerEndDate": this.state.offerEndDate,
                        "offerStatus": this.state.offerStatus,
                        "productImage": this.state.productInfo.productImage,
                        "productDescription": this.state.productInfo.productDescription
                    }
                    Axios.post('http://localhost:3001/productOffer/addProductOffer', productOffer)
                        .then(response => {
                            alert('Product Offer Details Added Successfully');
                            window.location = "/viewProductOffers";
                        }).catch(error => {
                            alert(error.message);
                        })
                }
            }).catch(error => {
                alert(error.message);
            })
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
                        <h1>CREATE PRODUCT OFFER</h1>

                        <div class="container3">
                            <form onSubmit={this.onSubmit}>
                                <h3><b><i>Product Information</i></b></h3><br />
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <span style={{ color: "black" }}>Product</span>

                                        <Select
                                            options={this.state.options}
                                            onChange={this.onSelectedOption}
                                            required
                                        /><br />

                                        <span style={{ color: "black" }}>Product Price (Rs.)</span>
                                        <input
                                            class="form-control"
                                            type="text"
                                            value={this.state.productInfo.productPrice}
                                            disabled
                                            required
                                            style={{ border: "1px solid #c8cfcb " }} /><br />

                                        <span style={{ color: "black" }}>Current Product Discount %</span>
                                        <input
                                            class="form-control"
                                            type="text"
                                            value={this.state.productInfo.productDiscount}
                                            disabled
                                            required
                                            style={{ border: "1px solid #c8cfcb " }} /><br />

                                        <span style={{ color: "black" }}>Product Category</span>
                                        <input
                                            class="form-control"
                                            type="text"
                                            value={this.state.productInfo.categoryType}
                                            disabled
                                            required
                                            style={{ border: "1px solid #c8cfcb " }} /><br />
                                    </div>
                                    <img style={{ minWidth: '50px', width: '330px', height: '310px' }} src={this.state.productInfo.productImage} />
                                </div>

                                <h3><b><i>Add Product Offer Information</i></b></h3><br />

                                <span style={{ color: "black" }}>Product Offer Amount in (Rs.)<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="offerAmount"
                                    name="offerAmount"
                                    value={this.state.offerAmount}
                                    onChange={this.onPriceChange}
                                    max={this.state.productInfo.productPrice}
                                    min="0"
                                    title="Product offer price should be less than the original price"
                                    required
                                    style={{ border: "1px solid #c8cfcb " }}
                                    disabled
                                /><br />

                                <span style={{ color: "black" }}>Offer Description<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    name="offerDescription"
                                    id="offerDescription"
                                    value={this.state.offerDescription}
                                    onChange={this.onChange}
                                    required
                                    style={{ border: "1px solid #c8cfcb " }}
                                    disabled>
                                </textarea><br />

                                <span style={{ color: "black" }}>Offer Valid till<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="offerEndDate"
                                    name="offerEndDate"
                                    value={this.state.offerEndDate}
                                    onChange={this.onChange}
                                    required
                                    min={moment().format("YYYY-MM-DD")}
                                    style={{ border: "1px solid #c8cfcb " }}
                                    disabled
                                /><br />

                                <button type="submit" className="btn btn-dark" id="submitBtn">Submit</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}
