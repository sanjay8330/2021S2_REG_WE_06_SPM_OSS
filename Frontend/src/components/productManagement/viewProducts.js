import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';

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

                        <div class="wrap">
                            <div class="searchLabel">
                                <span style={{ color: "black" }}>Search Product</span>
                            </div>

                            <input
                                type="text"
                                placeholder="Search by product name"
                                name="searchProduct"
                                id="searchProduct"
                                onChange={this.onChange}
                                class="searchTerm" /><br />
                        </div><br /><br /><br />

                        <table class="table border shadow">
                            <thead class="thead-dark">
                                <tr>
                                `   <th scope="col">IMAGE</th>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">PRODUCT PRICE</th>
                                    <th scope="col">PRODUCT DISCOUNT</th>
                                    <th scope="col">PRODUCT DESCRIPTION</th>
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
                                        <td>
                                            <button type="button" onClick={e => this.navigateToUpdateOffer(e, item._id)} class="btn btn-primary">EDIT</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={e => this.navigateToDeleteOffer(e, item._id)} class="btn btn-primary">DELETE</button>
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
