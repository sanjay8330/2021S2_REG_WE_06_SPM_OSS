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
    "offerStatus": 'Active'
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onPriceChange(e) {
        this.setState({ offerAmount: e.target.value });

        //Calculate the discount
        let discount = (100 * (this.state.productInfo.productPrice - e.target.value)) / this.state.productInfo.productPrice;
        this.setState({ offerDiscount: discount.toFixed(2) });

    }

    onSelectedOption(e) {
        this.setState({ selectedProduct: e.value });

        Axios.get(`http://localhost:3001/product/getProductById/${e.value}`)
            .then(response => {
                //console.log('RESPONSE>>', response.data.data);
                this.setState({ productInfo: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })
    }

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

    onSubmit(e) {
        e.preventDefault();

        let productOffer = {
            "product": this.state.selectedProduct,
            "productName": this.state.productInfo.productName,
            "productPrice": this.state.productInfo.productPrice,
            "productDiscount": this.state.productInfo.productDiscount,
            "offerPrice": this.state.offerAmount,
            "offerDiscount": this.state.offerDiscount,
            "offerDescription": this.state.offerDescription,
            "offerEndDate": this.state.offerEndDate,
            "offerStatus": this.state.offerStatus
        }
        Axios.post('http://localhost:3001/productOffer/addProductOffer', productOffer)
            .then(response => {
                alert('Product Offer Details Added Successfully');
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
                            <li><a href="/viewProducts" style={{ color: "white" }} >View Products</a></li>
                            <li><a href="/addProductOffer" style={{ color: "white" }} class="active">Add Product Offers</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }}>View Product Offers</a></li>
                            <li><a href="/adminUserRegister" style={{ color: "white" }}>Add Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>CREATE PRODUCT OFFER</h1>

                        <div class="container3">
                        <form onSubmit={this.onSubmit}>
                            <h3><b><i>Product Information</i></b></h3><br/>
                            <span style={{ color: "black" }}>Product</span>

                            <Select
                                options={this.state.options}
                                onChange={this.onSelectedOption}
                                required
                            /><br />

                            <span style={{ color: "black" }}>Product Price</span>
                            <input
                                class="form-control"
                                type="text"
                                value={this.state.productInfo.productPrice}
                                disabled
                                required 
                                style={{ border: "1px solid #c8cfcb "}}/><br />

                            <span style={{ color: "black" }}>Current Product Discount %</span>
                            <input
                                class="form-control"
                                type="text"
                                value={this.state.productInfo.productDiscount}
                                disabled
                                required 
                                style={{ border: "1px solid #c8cfcb "}}/><br />

                            <span style={{ color: "black" }}>Product Category</span>
                            <input
                                class="form-control"
                                type="text"
                                value={this.state.productInfo.categoryType}
                                disabled
                                required 
                                style={{ border: "1px solid #c8cfcb "}}/><br />

                            <h3><b><i>Add Product Offer Information</i></b></h3><br/>

                            <span style={{ color: "black" }}>Product Offer Amount in Rs.</span>
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
                                style={{ border: "1px solid #c8cfcb "}}
                            /><br />

                            <span style={{ color: "black" }}>Offer Description</span>
                            <textarea
                                className="form-control"
                                rows="2"
                                name="offerDescription"
                                value={this.state.offerDescription}
                                onChange={this.onChange}
                                required
                                style={{ border: "1px solid #c8cfcb "}}>
                            </textarea><br />

                            <span style={{ color: "black" }}>Offer Valid till</span>
                            <input
                                type="date"
                                className="form-control"
                                id="offerEndDate"
                                name="offerEndDate"
                                value={this.state.offerEndDate}
                                onChange={this.onChange}
                                required
                                min={moment().format("YYYY-MM-DD")}
                                style={{ border: "1px solid #c8cfcb "}}
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
