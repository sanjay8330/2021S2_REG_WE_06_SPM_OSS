import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "productOffers": [],
    "productInfo": []
}

export default class ViewProductOffer extends Component {
    constructor(props) {
        super(props);
        this.navigateAddProductOffer = this.navigateAddProductOffer.bind(this);
        this.state = initialStates;
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

                        <table class="table border shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">PRODUCT PRICE</th>
                                    <th scope="col">PRODUCT DISCOUNT</th>
                                    <th scope="col">OFFER PRICE</th>
                                    <th scope="col">OFFER DISCOUNT</th>
                                    <th scope="col">OFFER DESCRIPTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productOffers.length > 0 && this.state.productOffers.map((item, index) =>
                                    <tr>
                                        <td>{item.productName}</td>
                                        <td>{"Rs."+item.productPrice}</td>
                                        <td>{item.productDiscount+"%"}</td>
                                        <td>{"Rs."+item.offerPrice}</td>
                                        <td>{item.offerDiscount+"%"}</td>
                                        <td>{item.offerDescription}</td>
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