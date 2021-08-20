import React, { Component } from 'react'
import Header from './components/header/header';
import ss from '../src/images/aaa.jpg';
import men from '../src/images/men.jpg';
import women from '../src/images/women.jpg';
import kids from '../src/images/kids.jpg';
import babies from '../src/images/babies.jpg';
import teens from '../src/images/teens.png';
import home1 from '../src/images/womenNew.jpg';
import home2 from '../src/images/womenNew4.jpg';
import home3 from '../src/images/womenNew5.jpg';
import home4 from '../src/images/womenNew2.jpg';

import Axios from 'axios';

const initialStates = {
    "productOffers": [],
    "products": []
}

export default class home extends Component {
    constructor(props) {
        super(props);
        this.navigateToAdditempage = this.navigateToAdditempage.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/productOffer/getAllActiveProductOffers')
            .then(response => {
                this.setState({ productOffers: response.data.data });
                console.log(this.state.productOffers);
            }).catch(error => {
                alert(error.message);
            })

    }

    navigateToAdditempage(e, productID){
        window.location = `/insertItem/${productID}`;
    }

    render() {
        return (
            <div>
                <Header />

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={ss} alt="First slide" style={{ filter: 'blur(1px)' }} />
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
                                        <i><p style={{ fontSize: "14px", color: "grey" }}>{item.offerDescription}</p></i>
                                        <button onClick={e => this.navigateToAdditempage(e, item.product._id)} type="button" class="btn btn-dark">Add To Cart</button>
                                    </div><br />
                                </div><br /><br />

                            </div>

                        )
                    })}
                </div>

                    <div class="row1">
                        <div>
                            <div><center><a href = "/menProducts"><img src={men} class="img-fluid" alt="Responsive image" style={{ width: "1000px" }}></img></a></center></div> <br /><br />
                            <div><center><a href = "/womenProducts"><img src={women} class="img-fluid" alt="Responsive image" style={{ width: "1000px" }}></img></a></center></div> <br /><br />
                            <div><center><a href = "/kidsProducts"><img src={kids} class="img-fluid" alt="Responsive image" style={{ width: "1000px" }}></img></a></center></div> <br /><br />
                            <div><center><a href = "/babiesProducts"><img src={babies} class="img-fluid" alt="Responsive image" style={{ width: "1000px" }}></img></a></center></div> <br /><br />
                            <div><center><a href = "/teenagersProducts"><img src={teens} class="img-fluid" alt="Responsive image" style={{ width: "1000px" }}></img></a></center></div> <br /><br />
                        </div>
                    </div>

            </div>
        )
    }
}
