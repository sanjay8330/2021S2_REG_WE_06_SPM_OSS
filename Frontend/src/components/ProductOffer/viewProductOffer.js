import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "productOffers": [],
    "productInfo": [],
    "searchProduct": ''
}

export default class ViewProductOffer extends Component {
    constructor(props) {
        super(props);
        this.navigateAddProductOffer = this.navigateAddProductOffer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ searchProduct: e.target.value });
    }

    navigateAddProductOffer(e) {
        window.location = '/addProductOffer';
    }

    componentDidMount(e) {
        Axios.get('http://localhost:3001/productOffer/getAllProductOffers')
            .then(response => {
                this.setState({ productOffers: response.data.data });
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
                            <li><a href="/createProduct" style={{ color: "white" }} class="active">Add Product</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }}>View Products</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>

                        <h1>View Product Offer</h1>

                        <div>
                            <a href="#" onClick={this.navigateAddProductOffer}>Add Product Offers</a>
                        </div>

                        <div>
                            <span style={{ color: "black" }}>Search :</span>
                            <input
                                type="text"
                                placeholder="Search by product name.."
                                name="searchProduct"
                                id="searchProduct"
                                onChange={this.onChange} /><br />
                        </div>


                        <table class="table border shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">PRODUCT PRICE</th>
                                    <th scope="col">PRODUCT DISCOUNT</th>
                                    <th scope="col">OFFER PRICE</th>
                                    <th scope="col">OFFER DISCOUNT</th>
                                    <th scope="col">OFFER DESCRIPTION</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">EDIT</th>
                                    <th scope="col">DELETE</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productOffers.length > 0 && this.state.productOffers.filter((values) => {
                                    if (this.state.searchProduct == "") {
                                        return values;
                                    } else if (values.productName.toLowerCase().includes(this.state.searchProduct.toLowerCase())) {
                                        return values;
                                    }
                                }).map((item, index) =>
                                    <tr>
                                        <td>{item.productName}</td>
                                        <td>{"Rs." + item.productPrice}</td>
                                        <td>{item.productDiscount + "%"}</td>
                                        <td>{"Rs." + item.offerPrice}</td>
                                        <td>{item.offerDiscount + "%"}</td>
                                        <td>{item.offerDescription}</td>
                                        <td>{item.offerStatus}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary">EDIT</button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-primary">DELETE</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </main>
                </div>
            </div>
        )
    }
}