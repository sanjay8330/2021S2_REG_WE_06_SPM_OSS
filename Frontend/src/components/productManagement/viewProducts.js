import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

const initialStates = {
    "products": [],
    "searchProduct": '',
    "mensProducts": [],
    "womensProducts": [],
    "teenagersProducts": [],
    "kidsProducts": [],
    "babiesProducts": []
}

export default class viewProducts extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ searchProduct: e.target.value });
    }

    componentDidMount(e) {
        Axios.get('http://localhost:3001/product/getAllProducts')
            .then(response => {
                this.setState({ products: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all mens products using API - KASUNI */
        Axios.get('http://localhost:3001/product/getAllMenProducts')
            .then(response => {
                this.setState({ mensProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all womens products using API - KASUNI */
        Axios.get('http://localhost:3001/product/getAllWomenProducts')
            .then(response => {
                this.setState({ womensProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all teenagers products using API - KASUNI */
        Axios.get('http://localhost:3001/product/getAllTeenagersProducts')
            .then(response => {
                this.setState({ teenagersProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all kids products using API - KASUNI */
        Axios.get('http://localhost:3001/product/getAllKidsProducts')
            .then(response => {
                this.setState({ kidsProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all kids products using API - KASUNI */
        Axios.get('http://localhost:3001/product/getAllBabiesProducts')
            .then(response => {
                this.setState({ babiesProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })
    }

    navigateToUpdatePage(e, productId) {
        window.location = `/updateProduct/${productId}`;
    }

    navigateToDeletePage(e, productId) {
        window.location = `/deleteProduct/${productId}`;
    }

    //generate product Report
    jsPdfGeneratorProduct() {

        var doc = new jsPDF('p', 'pt');
        doc.text(300, 20, 'SUMMARY OF PRODUCT DETAILS', 'center')

        doc.setFont('courier')

        doc.autoTable({ html: '#productReportTable' })

        //save PDF
        doc.save('productReport.pdf')
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
                        <h1>VIEW PRODUCT DETAILS</h1><br />

                        <a href="/createProduct"><button type="button" class="btn btn-dark">Add Product</button></a> &nbsp;
                        <button onClick={this.jsPdfGeneratorProduct} type="button" class="btn btn-dark">Download Report</button>

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

                        <div class="info">
                            <b><h6>
                                Mens Products: {this.state.mensProducts.length}  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;  
                                Womens Products: {this.state.womensProducts.length}  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;   
                                Teenagers Products: {this.state.teenagersProducts.length}  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;   
                                Kids Products: {this.state.kidsProducts.length}  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;   
                                Babies Products: {this.state.babiesProducts.length} &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;  
                                Total Products: {this.state.products.length}</h6></b>
                        </div>

                        <br />

                        <table class="table border shadow" id="casti_male">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">IMAGE</th>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">PRODUCT DESCRIPTION</th>
                                    <th scope="col">CATEGORY TYPE</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">DISCOUNT</th>
                                    <th scope="col">EDIT</th>
                                    <th scope="col">DELETE</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.length > 0 && this.state.products.filter((values) => {
                                    if (this.state.searchProduct == "") {
                                        return values;
                                    } else if (values.productName.toLowerCase().includes(this.state.searchProduct.toLowerCase())) {
                                        return values;
                                    }
                                }).map((item, index) =>
                                    <tr>
                                        <td><img id="myImg" style={{ minWidth: '50px', width: '50px', height: '60px' }} src={item.productImage} /></td>
                                        <td>{item.productName}</td>
                                        <td>{item.productDescription}</td>
                                        <td>{item.categoryType}</td>
                                        <td>{"Rs." + item.productPrice}.00</td>
                                        <td><span class="highlight" style={{ backgroundColor: '#f0ec0e', padding: '0.4em 0.6em', color: 'red' }} ><b>{item.productDiscount + "%"}</b></span></td>

                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-success btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={e => this.navigateToUpdatePage(e, item._id)}><i class="fa fa-edit"></i></button>
                                            </li>
                                        </td>

                                        <td>
                                            <li class="list-inline-item">
                                                <button class="btn btn-danger btn-sm rounded-0" style={{ backgroundColor: 'black' }} type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeletePage(e, item._id)}><i class="fa fa-trash"></i></button>
                                            </li>
                                        </td>

                                    </tr>
                                )}
                            </tbody>
                        </table><br />

                        <table style={{ display: 'none' }} id="productReportTable">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">DISCOUNT</th>
                                    <th scope="col">PRODUCT DESCRIPTION</th>
                                    <th scope="col">CATEGORY TYPE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.length > 0 && this.state.products.filter((values) => {
                                    if (this.state.searchProduct == "") {
                                        return values;
                                    } else if (values.productName.toLowerCase().includes(this.state.searchProduct.toLowerCase())) {
                                        return values;
                                    }
                                }).map((item, index) =>
                                    <tr>
                                        <td>{item.productName}</td>
                                        <td>{"Rs." + item.productPrice}.00</td>
                                        <td>{item.productDiscount + "%"}</td>
                                        <td>{item.productDescription}</td>
                                        <td>{item.categoryType}</td>
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
