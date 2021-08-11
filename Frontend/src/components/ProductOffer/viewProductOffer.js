import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "productOffers": [],
    "products": []
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
                console.log('RESPONSE ', this.state.productOffers);
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

                    </main>
                </div>
            </div>
        )
    }
}