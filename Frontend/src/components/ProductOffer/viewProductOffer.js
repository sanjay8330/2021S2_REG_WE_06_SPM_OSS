import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

const initialStates = {
    "productOffers": [],
    "productInfo": [],
    "searchProduct": '',
    "activeProductOffers": [],
    "inactiveProductOffers": []
}

export default class ViewProductOffer extends Component {
    constructor(props) {
        super(props);
        this.navigateAddProductOffer = this.navigateAddProductOffer.bind(this);
        this.navigateToUpdateOffer = this.navigateToUpdateOffer.bind(this);
        this.navigateToDeleteOffer = this.navigateToDeleteOffer.bind(this);
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

        /**Get all active product offers using API - SANJAY*/
        Axios.get('http://localhost:3001/productOffer/getAllActiveProductOffers')
            .then(response => {
                this.setState({ activeProductOffers: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all In-active product offers using API - SANJAY */
        Axios.get('http://localhost:3001/productOffer/getAllInActiveProductOffers')
            .then(response => {
                this.setState({ inactiveProductOffers: response.data.data });
            }).catch(error => {
                alert(error.message);
            })
    }

    jsPdfGeneratorProductOffer() {
        var doc = new jsPDF('p', 'pt');
        doc.text(270, 20, 'SUMMARY OF PRODUCT OFFER DETAILS', 'center')

        doc.setFont('courier')

        doc.autoTable({ html: '#reportTable' })

        //save PDF
        doc.save('productOfferReport.pdf')
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
                            <li><a href="/viewUsers" style={{ color: "white" }}>Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>

                        <h1>VIEW PRODUCT OFFERS</h1><br />

                        <button onClick={this.navigateAddProductOffer} class="btn btn-dark" type="button">Add Product Offers</button>
                        <button type="button" class="btn btn-dark" style={{ marginLeft: 20 }} onClick={this.jsPdfGeneratorProductOffer}>Download Report</button>

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
                        </div><br /><br />

                        <div class="info" style={{ width: '58%'}}>
                            <b><h6>
                            Active Product Offers: {this.state.activeProductOffers.length}  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;
                            In-active Product Offers: {this.state.inactiveProductOffers.length}  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;
                            Total Product Offers: {this.state.productOffers.length}</h6></b>
                        </div>

                        <br />

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
                                        <td><span class="highlight" style={{ backgroundColor: '#f0ec0e', padding: '0.4em 0.6em', color: 'red' }} ><b>{item.productDiscount + "%"}</b></span></td>
                                        <td>{"Rs." + item.offerPrice}</td>
                                        <td><span class="highlight" style={{ backgroundColor: '#f0ec0e', padding: '0.4em 0.6em', color: 'red' }} ><b>{item.offerDiscount + "%"}</b></span></td>
                                        <td>{item.offerEndDate}</td>
                                        <td>{item.offerDescription}</td>
                                        <td>{item.offerStatus}</td>
                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-success btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={e => this.navigateToUpdateOffer(e, item._id)}><i class="fa fa-edit"></i></button>
                                            </li>
                                        </td>
                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-danger btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeleteOffer(e, item._id)}><i class="fa fa-trash"></i></button>
                                            </li>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <table id="reportTable" style={{ display: 'none' }}>
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">DISCOUNT</th>
                                    <th scope="col">OFFER PRICE</th>
                                    <th scope="col">OFFER DISCOUNT</th>
                                    <th scope="col">OFFER VALID TILL</th>
                                    <th scope="col">OFFER DESCRIPTION</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">USERS PURCHASED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productOffers.length > 0 && this.state.productOffers.map((item, index) =>
                                    <tr>
                                        <td>{item.productName}</td>
                                        <td>{"Rs." + item.productPrice}</td>
                                        <td>{item.productDiscount + "%"}</td>
                                        <td>{"Rs." + item.offerPrice}</td>
                                        <td>{item.offerDiscount + "%"}</td>
                                        <td>{item.offerEndDate}</td>
                                        <td>{item.offerDescription}</td>
                                        <td>{item.offerStatus}</td>
                                        <td>{item.userCount}</td>
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