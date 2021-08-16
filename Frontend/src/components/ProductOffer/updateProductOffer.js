import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

import moment from 'moment';

const initialStates = {
    "offerInfo": [],
    "offerAmount": '',
    "offerDiscount": '',
    "offerDescription": '',
    "offerEndDate": '',
    "offerStatus": '',
    "buttonlabel": 'Activate Offer'
    
}

export default class UpdateProductOffer extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeOfferStatus = this.changeOfferStatus.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/productOffer/getProductOfferById/${this.props.match.params.id}`)
            .then(response => {
                //console.log('RESPONSE>>', response.data.data);
                this.setState({ offerInfo: response.data.data });

                this.setState({ offerAmount: this.state.offerInfo.offerPrice });
                this.setState({ offerDiscount: this.state.offerInfo.offerDiscount });
                this.setState({ offerDescription: this.state.offerInfo.offerDescription });
                this.setState({ offerStatus: this.state.offerInfo.offerStatus });
                this.setState({ offerEndDate: this.state.offerInfo.offerEndDate });
                this.setState({ productId: this.state.offerInfo.product });

                if (this.state.offerStatus === 'Active') {
                    this.setState({ buttonlabel: 'Deactivate Offer' })
                }

            }).catch(error => {
                console.log(error.message);
            })
    }

    onChange(e) {
        e.persist();

        this.setState({ [e.target.name]: e.target.value });
    }

    onPriceChange(e) {
        this.setState({ offerAmount: e.target.value });

        //Calculate the discount
        let discount = (100 * (this.state.offerInfo.productPrice - e.target.value)) / this.state.offerInfo.productPrice;
        this.setState({ offerDiscount: discount.toFixed(2) });

    }

    onSubmit(e) {
        e.preventDefault();

        let updProductOffer = {
            "offerPrice": this.state.offerAmount,
            "offerDiscount": this.state.offerDiscount,
            "offerDescription": this.state.offerDescription,
            "offerEndDate": this.state.offerEndDate,
            "offerStatus": this.state.offerInfo.offerStatus
        }
        Axios.put(`http://localhost:3001/productOffer/updateProductOffer/${this.props.match.params.id}`, updProductOffer)
            .then(response => {
                alert('Offer details Updated Successfully!!');
                window.location = "/viewProductOffers";
            }).catch(error => {
                alert(error.message);
            })

    }

    changeOfferStatus(e) {
        e.preventDefault();

        let currentOfferStatus = this.state.offerInfo.offerStatus;
        let newOfferState = null;

        if (currentOfferStatus === 'In-Active') {
            newOfferState = 'Active';
        } else {
            newOfferState = 'In-Active';
        }

        let updOffer = {
            "offerStatus": newOfferState
        }

        Axios.put(`http://localhost:3001/productOffer/changeProductOfferStatus/${this.props.match.params.id}`, updOffer)
            .then(response => {
                alert(`Offer ${this.state.newOfferStatus} Updated Successfully!!`);
                window.location = "/viewProductOffers";
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
                            <li><a href="/createProduct" style={{ color: "white" }} >Add Products</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }}>View Products</a></li>
                            <li><a href="/addProductOffer" style={{ color: "white" }}>Add Product Offers</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }}>View Product Offers</a></li>
                            <li><a href="/adminUserRegister" style={{ color: "white" }}>Add Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>UPDATE PRODUCT OFFER</h1>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-primary" type="button" onClick={this.changeOfferStatus}>{this.state.buttonlabel}</button>
                        </div><br />

                        <div class="container3">
                            <form onSubmit={this.onSubmit}>
                                <h3><b><i>Product Information</i></b></h3>
                                <span style={{ color: "black" }}>Product Name       :{this.state.offerInfo.productName}</span><br />

                                <span style={{ color: "black" }}>Product Price      :{this.state.offerInfo.productPrice}</span><br />

                                <span style={{ color: "black" }}>Product Discount % :{this.state.offerInfo.productDiscount}</span><br /><br />

                                <img style={{ minWidth: '50px', width: '50px', height: '60px' }} src={this.state.offerInfo.productImage} />

                                <h3><b><i>Edit Product Offer Information</i></b></h3>

                                <span style={{ color: "black" }}>Offer Status : {this.state.offerInfo.offerStatus}</span><br />

                                <span style={{ color: "black" }}>Product Offer Amount in Rs.</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="offerAmount"
                                    name="offerAmount"
                                    defaultValue={this.state.offerAmount}
                                    onChange={this.onPriceChange}
                                    max={this.state.offerInfo.productPrice}
                                    min="0"
                                    title="Product offer price should be less than the original price"
                                /><br />

                                <span style={{ color: "black" }}>Offer Description</span>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    name="offerDescription"
                                    defaultValue={this.state.offerDescription}
                                    onChange={this.onChange}>
                                </textarea><br />

                                <span style={{ color: "black" }}>Offer Valid till</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="offerEndDate"
                                    name="offerEndDate"
                                    defaultValue={this.state.offerEndDate}
                                    onChange={this.onChange}
                                    min={moment().format("YYYY-MM-DD")}
                                /><br />

                                <button type="submit" className="btn btn-dark" id="submitBtn">Update</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}