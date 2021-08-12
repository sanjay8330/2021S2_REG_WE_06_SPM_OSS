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
    "offerStatus": ''
}

export default class UpdateProductOffer extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    componentDidMount(){
        Axios.get(`http://localhost:3001/productOffer/getProductOfferById/${this.props.match.params.id}`)
        .then(response => {
            //console.log('RESPONSE>>', response.data.data);
            this.setState({ offerInfo: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onPriceChange(e) {
        this.setState({ offerAmount: e.target.value });

        //Calculate the discount
        let discount = (100 * (this.state.productInfo.productPrice - e.target.value)) / this.state.productInfo.productPrice;
        this.setState({ offerDiscount: discount.toFixed(2) });

    }

    onSubmit(e){
        e.preventDefault()
        alert('Button clicked');
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
                            <li><a href="/createProduct" style={{ color: "white" }} class="active">Add Product</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }}>View Products</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>Update Product Offer</h1>

                        <form onSubmit={this.onSubmit}>
                            <h3>Product Information</h3>
                            <span style={{ color: "black" }}>Product Name       :{this.state.offerInfo.productName}</span><br />

                            <span style={{ color: "black" }}>Product Price      :{this.state.offerInfo.productPrice}</span><br />
                    
                            <span style={{ color: "black" }}>Product Discount % :{this.state.offerInfo.productDiscount}</span><br /><br />

                            <h3>Edit Product Offer Information</h3>

                            <span style={{ color: "black" }}>Product Offer Amount in Rs.</span>
                            <input
                                type="number"
                                className="form-control"
                                id="offerAmount"
                                name="offerAmount"
                                value={this.state.offerInfo.offerPrice}
                                onChange={this.onPriceChange}
                                max={this.state.offerInfo.productPrice}
                                min="0"
                                title="Product offer price should be less than the original price"
                                required
                            /><br />

                            <span style={{ color: "black" }}>Offer Description</span>
                            <textarea
                                className="form-control"
                                rows="2"
                                name="offerDescription"
                                value={this.state.offerInfo.offerDescription}
                                onChange={this.onChange}
                                required>
                            </textarea><br />

                            <span style={{ color: "black" }}>Offer Valid till</span>
                            <input
                                type="date"
                                className="form-control"
                                id="offerEndDate"
                                name="offerEndDate"
                                value={this.state.offerInfo.offerEndDate}
                                onChange={this.onChange}
                                required
                                min={moment().format("YYYY-MM-DD")}
                            /><br />

                            <button type="submit" className="btn btn-primary" id="submitBtn">Update</button>
                        </form>
                    </main>
                </div>
            </div>
        )
    }
}