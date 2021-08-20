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

    navigateToUpdateOffer(e, offerId) {
        window.location = `/updateProductOffer/${offerId}`;
    }

    navigateToDeleteOffer(e, offerId) {
        window.location = `/deleteProductOffer/${offerId}`;
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
                            <li><a href="/createProduct" style={{ color: "white" }} >Add Products</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }} >View Products</a></li>
                            <li><a href="/addProductOffer" style={{ color: "white" }} >Add Product Offers</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }} class="active">View Product Offers</a></li>
                            <li><a href="/adminUserRegister" style={{ color: "white" }}>Add Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>

                        <h1>VIEW PRODUCT OFFERS</h1>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button onClick={this.navigateAddProductOffer} class="btn btn-dark" type="button">Add Product Offers</button>
                        </div><br />

                        <div class="wrap">
                            <div class="search">
                                <input
                                    type="text"
                                    placeholder="Search by product name"
                                    name="searchProduct"
                                    id="searchProduct"
                                    onChange={this.onChange}
                                    class="searchTerm" />
                                <button type="submit" class="searchButton">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>


                        <br /><br /><br />


                        <table class="table border shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">IMAGE</th>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">DISCOUNT</th>
                                    <th scope="col">OFFER PRICE</th>
                                    <th scope="col">OFFER DISCOUNT</th>
                                    <th scope="col">OFFER VALID TILL</th>
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
                                         <td><img style={{ minWidth: '50px', width: '50px', height: '60px' }} src={item.productImage} /></td>
                                        <td>{item.productName}</td>
                                        <td>{"Rs." + item.productPrice}</td>
                                        <td>{item.productDiscount + "%"}</td>
                                        <td>{"Rs." + item.offerPrice}</td>
                                        <td>{item.offerDiscount + "%"}</td>
                                        <td>{item.offerEndDate}</td>
                                        <td>{item.offerDescription}</td>
                                        <td>{item.offerStatus}</td>
                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={e => this.navigateToUpdateOffer(e, item._id)}><i class="fa fa-edit"></i></button>
                                            </li>
                                        </td>
                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeleteOffer(e, item._id)}><i class="fa fa-trash"></i></button>
                                            </li>
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