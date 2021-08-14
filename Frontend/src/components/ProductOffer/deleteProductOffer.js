import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "offerInfo": []
}

export default class DeleteProductOffer extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigatetoViewOffer = this.navigatetoViewOffer.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/productOffer/getProductOfferById/${this.props.match.params.id}`)
            .then(response => {
                //console.log('RESPONSE>>', response.data.data);
                this.setState({ offerInfo: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/productOffer/deleteProductOffer/${this.props.match.params.id}`)
            .then(response => {
                alert('Product Offer deleted Successfully');
                window.location = "/viewProductOffers";
            }).catch(error => {
                console.log(error.message);
            })
    }

    navigatetoViewOffer(e) {
        window.location = "/viewProductOffers";
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
                        <h1>Delete Product Offer</h1>

                        <div>
                            <h4>Product Information</h4>

                            <span style={{ color: "black" }}>Product Name       :{this.state.offerInfo.productName}</span><br />

                            <span style={{ color: "black" }}>Product Price      :{this.state.offerInfo.productPrice}</span><br />

                            <span style={{ color: "black" }}>Product Discount % :{this.state.offerInfo.productDiscount}</span><br /><br />
                        </div>

                        <div>
                            <label>Are you sure you want to delete</label>

                            <button type="button" class="btn btn-danger" onClick={this.onSubmit}>YES</button>

                            <button type="button" class="btn btn-success" onClick={this.navigatetoViewOffer}>NO</button>

                        </div>

                        <div style={{ position: "center" }}>
                        <h3>Warning!!!</h3>
                        <h4>By deleting the product offer you will be unable to :</h4>
                        <h5>1. The product offer is no longer active to the customers.</h5>
                        <h5>2. The product offer which is active will be in-activated and deleted</h5>
                        <h5>3. By deleting the product offer you cant revert it back</h5>
                        </div>
                    </main>
            </div>
            </div >
        )
    }
}
