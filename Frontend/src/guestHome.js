// ------------------
//     HOME PAGE
// ------------------

import React, { Component } from 'react'
import Header from './components/header/header';
import ss from '../src/images/aaa.jpg';
import home1 from '../src/images/womenNew.jpg';
import home2 from '../src/images/womenNew4.jpg';
import home3 from '../src/images/womenNew5.jpg';
import home4 from '../src/images/womenNew2.jpg';

import Axios from 'axios';

const initialStates = {
    "productOffers": [],
    "products": [],
    "menProducts": [],
    "womenProducts": []
}

export default class GuestHome extends Component {
    constructor(props) {
        super(props);
        this.navigateToSignUp = this.navigateToSignUp.bind(this);
        this.state = initialStates;
    }

    /**
     * The function written to get all the product offer and user details
     * Uses - setState()
     * API CALL - GET ALL PRODUCTS OFFER & USER DETAILS
     */
    componentDidMount() {
        Axios.get('http://localhost:3001/productOffer/getAllActiveProductOffers')
            .then(response => {
                this.setState({ productOffers: response.data.data });
                console.log(this.state.productOffers);
            }).catch(error => {
                alert(error.message);
            })

        Axios.get('http://localhost:3001/product/getAllMenProducts')
            .then(response => {
                this.setState({ menProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        Axios.get('http://localhost:3001/product/getAllWomenProducts')
            .then(response => {
                this.setState({ womenProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })
    }

    navigateToSignUp(){
        window.location = "/register"
    }

    render() {
        return (
            <div>
                <Header />

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={ss} alt="First slide" style={{ filter: 'blur(1px)' }} />
                    </div>

                    <div class="carousel-item active" style={{ backgroundColor: 'transparent' }}>
                        <a style={{ marginLeft: '90%', color: 'hotpink', textDecorationLine: 'underline', fontSize: '14px'}}>Logged In as a guest</a>
                    </div>

                    <div class="bg-text">
                        <h2>Online Shopping Store</h2>
                        <h1>FASHIONZ</h1>
                        <p>Shop Now</p>
                    </div>
                </div><br /><br /><br />

                <div class="titleNew"><br />
                    <center><h1>NEW ARRIVALS</h1></center><br />
                </div><br /><br />

                <div class="row1">
                    <div class="column1">
                        <div class="card">
                            <img src={home1} alt="Avatar" />
                            <div class="container"><br />
                                <h4><b>Black Mock Dress</b></h4>
                                <p>Rs. 3,190.00</p>
                            </div>
                        </div>
                    </div>

                    <div class="column1">
                        <div class="card">
                            <img src={home2} alt="Avatar" />
                            <div class="container"><br />
                                <h4><b>Believe T-shirt</b></h4>
                                <p>Rs.1,690.00</p>
                            </div>
                        </div>
                    </div>

                    <div class="column1">
                        <div class="card">
                            <img src={home3} alt="Avatar" />
                            <div class="container"><br />
                                <h4><b>Be Strong T-shirt</b></h4>
                                <p>Rs.1,690.00</p>
                            </div>
                        </div>
                    </div>

                    <div class="column1">
                        <div class="card">
                            <img src={home4} alt="Avatar" />
                            <div class="container"><br />
                                <h4><b>Two Toned Dress</b></h4>
                                <p>Rs. 3,190.00</p>
                            </div>
                        </div>
                    </div>

                </div><br /><br /><br />

                <div class="titleNew"><br />
                    <center><h1>PRODUCTS ON OFFERS</h1></center><br />
                </div><br /><br />

                <div class="row1">
                    {this.state.productOffers.length > 0 && this.state.productOffers.map((item, index) => {
                        return (

                            <div class="column1">
                                <div class="card">
                                    <img src={item.productImage} alt="Avatar" style={{ width: '250px', height: '320px' }} />
                                    <div class="container"><br />
                                        <h4><b>{item.productName}</b></h4>
                                        <p style={{ color: "red" }}><strike>{"Rs." + item.productPrice}</strike></p>
                                        <p style={{ fontSize: "20px" }}>{"Rs." + item.offerPrice}</p>
                                        <h6>Discount : <p style={{ fontSize: "20px" }}>{item.offerDiscount + "%"}</p></h6>
                                        <i><p style={{ fontSize: "14px", color: "grey" }}>{item.offerDescription}</p></i>
                                    </div><br />
                                </div><br /><br />

                            </div>

                        )
                    })}
                </div>

                <div class="titleNew"><br />
                    <center><h1>MEN'S PRODUCTS</h1></center><br />
                </div><br /><br />

                <div class="row1">
                    {this.state.menProducts.length > 0 && this.state.menProducts.map((item, index) => {
                        return (

                            <div class="column1">
                                <div class="card">
                                    <img src={item.productImage} alt="Avatar" style={{ width: '250px', height: '320px' }} />
                                    <div class="container"><br />
                                        <h4><b>{item.productName}</b></h4>
                                        <p style={{ color: "red" }}>{"Rs." + item.productPrice}.00</p>
                                        <p style={{ fontSize: "20px" }}>{item.productDiscount + "%"}</p>
                                        <i><p style={{ fontSize: "14px", color: "grey" }}>{item.productDescription}</p></i>
                                    </div><br />
                                </div><br /><br />

                            </div>

                        )
                    })}
                </div>

                <div class="titleNew"><br />
                    <center><h1>WOMEN'S PRODUCTS</h1></center><br />
                </div><br /><br />

                <div class="row1">
                    {this.state.womenProducts.length > 0 && this.state.womenProducts.map((item, index) => {
                        return (

                            <div class="column1">
                                <div class="card">
                                    <img src={item.productImage} alt="Avatar" style={{ width: '250px', height: '320px' }} />
                                    <div class="container"><br />
                                        <h4><b>{item.productName}</b></h4>
                                        <p style={{ color: "red" }}>{"Rs." + item.productPrice}.00</p>
                                        <p style={{ fontSize: "20px" }}>{item.productDiscount + "%"}</p>
                                        <i><p style={{ fontSize: "14px", color: "grey" }}>{item.productDescription}</p></i>
                                    </div><br />
                                </div><br /><br />

                            </div>

                        )
                    })}
                </div>

                <div class="titleNew"><br />
                    <center><h1>SIGN IN TO VIEW OTHER CATEGORIES</h1></center><br />
                    <center><button onClick={this.navigateToSignUp}>SIGN UP</button></center><br />
                </div><br /><br />


            </div>
        )
    }
}
