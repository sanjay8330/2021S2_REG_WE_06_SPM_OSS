import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    products: [],
    "productOffer": [],
    "productOfferID": ''
}

export default class deleteproduct extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigatetoViewPage = this.navigatetoViewPage.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/product/getProductById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ products: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })
        
        //Get the product offer for the product
        Axios.get(`http://localhost:3001/productOffer/getProductOfferByproductId/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ productOffer: response.data.data });
                console.log('RESPONSE>>>', this.state.productOffer);

                {this.state.productOffer.length > 0 && this.state.productOffer.map((item, index) => {
                    this.setState({ productOfferID: item._id });
                })}

                if(this.state.productOffer.length > 0){
                    alert('Product has an active product offer');
                    window.location = `/deleteProductWithOffer/${this.props.match.params.id}`;
                }
                
            }).catch(error => {
                console.log(error.message);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/product/deleteProduct/${this.props.match.params.id}`)
            .then(response => {
                alert('Product Item deleted Successfully');
                window.location = "/viewProducts";
            }).catch(error => {
                console.log(error.message);
            })
    }

    navigatetoViewPage(e) {
        window.location = "/viewProducts";
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
                        <h1>DELETE CONFIRMATION</h1>
                        <div class="content">
                            <div class="wrapper-1">
                                <div class="wrapper-2">

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Product Name:<b> {this.state.products.productName}</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Product Price: <b>Rs.{this.state.products.productPrice}.00</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Abril Fatface', cursive;" }}>Product Discount:<b> {this.state.products.productDiscount}%</b></span><br /><br />

                                    <div class="alert alert-danger" role="alert">
                                        <center><p>Are you sure you want to permanently remove this product?</p><hr />
                                            By deleting this product detail you can't undo this action.</center>
                                    </div>
                                    <button class="cancel" onClick={this.navigatetoViewPage} style={{ float: "left" }}>
                                        Cancel
                                    </button>
                                    <button class="delete" onClick={this.onSubmit} style={{ float: "right" }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div >
        )
    }
}
