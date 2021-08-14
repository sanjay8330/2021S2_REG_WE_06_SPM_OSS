import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

const initialStates = {
    "products": [],
    "searchProduct": ''
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
        doc.text(210, 20, 'SUMMARY OF PRODUCT DETAILS')

        doc.setFont('courier')

        doc.autoTable({ html: 'table' })

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
                            <li><a href="/createProduct" style={{ color: "white" }}>Add Products</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }} class="active">View Products</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>VIEW PRODUCT DETAILS</h1>

                        <button onClick={this.jsPdfGeneratorProduct} type="button" class="btn btn-primary">Download Report</button>

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
                                        <th scope="col">PRODUCT DESCRIPTION</th>
                                        <th scope="col">CATEGORY TYPE</th>
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
                                            <td></td>
                                            <td>{item.productName}</td>
                                            <td>{"Rs." + item.productPrice}</td>
                                            <td>{item.productDiscount + "%"}</td>
                                            <td>{item.productDescription}</td>
                                            <td>{item.categoryType}</td>

                                            <td>
                                                <li class="list-inline-item">
                                                    <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={e => this.navigateToUpdatePage(e, item._id)}><i class="fa fa-edit"></i></button>
                                                </li>
                                            </td>

                                            <td>
                                                <li class="list-inline-item">
                                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e => this.navigateToDeletePage(e, item._id)}><i class="fa fa-trash"></i></button>
                                                </li>
                                            </td>
                                            
                                        </tr>
                                    )}
                                </tbody>
                            </table><br/><br/><br/><br/><br/><br/>
                    </main>
                </div>
                </div>
                )
    }
}
