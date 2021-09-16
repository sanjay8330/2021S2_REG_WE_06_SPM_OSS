import React, { Component } from 'react'
import ss from '../src/images/ww.jpg';
import Axios from 'axios';

const initialStates = {
    "activeProductOffers": [],
    "inactiveProductOffers": [],
    "allProductOffers": [],
    "allProducts": [],
    "mensProducts": [],
    "womensProducts": [],
    "teenagersProducts": [],
    "kidsProducts": [],
    "babiesProducts": [],
    "allUsers": [],
    "allCustomers": [],
    "allAdministrators": []
}
export default class adminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = initialStates;
    }

    componentDidMount() {
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

        /**Get all product offers using API - SANJAY */
        Axios.get('http://localhost:3001/productOffer/getAllProductOffers')
            .then(response => {
                this.setState({ allProductOffers: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all active product offers using API - SANJAY */
        Axios.get('http://localhost:3001/product/getAllProducts')
            .then(response => {
                this.setState({ allProducts: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all products using API - KASUNI */
        Axios.get('http://localhost:3001/product/getAllProducts')
            .then(response => {
                this.setState({ allProducts: response.data.data });
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

        /**Get all customers using API - SANJAY */
        Axios.get('http://localhost:3001/user/getAllCustomers')
            .then(response => {
                this.setState({ allCustomers: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all administrators using API - SANJAY */
        Axios.get('http://localhost:3001/user/getAllAdministrators')
            .then(response => {
                this.setState({ allAdministrators: response.data.data });
            }).catch(error => {
                alert(error.message);
            })

        /**Get all users using API - SANJAY */
        Axios.get('http://localhost:3001/user/getAllUsers')
            .then(response => {
                this.setState({ allUsers: response.data.data });
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
                            &nbsp; &nbsp; &nbsp; &nbsp; ADMIN PANEL
                        </header><hr style={{ color: "white" }} />
                        <ul><br />
                            <li><a href="/adminDashboard" style={{ color: "white" }} class="active">Dashboard</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }} >Manage Products</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }} >Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} >Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>ADMIN DASHBOARD</h1>

                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="row">
                                    <div class="col-xl-4 col-sm-6 mb-4"><br />
                                        <div class="card text-white bg-warning o-hidden h-100">
                                            <div class="card-body">
                                                <div class="mr-5"><center>Product Offers</center></div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left" style={{ color: "black" }}><b><h3>Total Product Offers: {this.state.allProductOffers.length}</h3></b></span><br />
                                                <span class="float-left" style={{ color: "black" }}>Active Product Offers: <h4>{this.state.activeProductOffers.length}</h4></span><br />
                                                <span class="float-left" style={{ color: "black" }}>In-active Product Offers: <h4>{this.state.inactiveProductOffers.length}</h4></span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col-xl-4 col-sm-6 mb-4"><br />
                                        <div class="card text-white bg-warning o-hidden h-100">
                                            <div class="card-body">
                                                <div class="mr-5"><center>Products</center></div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left" style={{ color: "black" }}><b><h3>Total Products: {this.state.allProducts.length}</h3></b></span><br />
                                                <span class="float-left" style={{ color: "black" }}>Mens Products: <h4>{this.state.mensProducts.length}</h4></span><br />
                                                <span class="float-left" style={{ color: "black" }}>Womens Products: <h4>{this.state.womensProducts.length}</h4></span><br />
                                                <span class="float-left" style={{ color: "black" }}>Tennagers Products: <h4>{this.state.teenagersProducts.length}</h4></span>
                                                <span class="float-left" style={{ color: "black" }}>Kids Products: <h4>{this.state.kidsProducts.length}</h4></span><br />
                                                <span class="float-left" style={{ color: "black" }}>Babies Products: <h4>{this.state.babiesProducts.length}</h4></span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col-xl-4 col-sm-6 mb-4"><br />
                                        <div class="card text-white bg-warning o-hidden h-100">
                                            <div class="card-body">
                                                <div class="mr-5"><center>Users</center></div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left" style={{ color: "black" }}><b><h3>Total Users: {this.state.allUsers.length}</h3></b></span><br />
                                                <span class="float-left" style={{ color: "black" }}>Customers: <h4>{this.state.allCustomers.length}</h4></span><br />
                                                <span class="float-left" style={{ color: "black" }}>Administrators: <h4>{this.state.allAdministrators.length}</h4></span>
                                            </a>
                                        </div>
                                    </div>

                                </div><br />

                                <img class="d-block w-100" src={ss} alt="First slide" /><br />
                                <div class="row">
                                    <div class="col-xl-4 col-sm-6 mb-3">
                                        <div class="card text-white bg-primary o-hidden h-100">
                                            <div class="card-body">
                                                <div class="card-body-icon">
                                                    <i class="fa fa-fw fa-comments"></i>
                                                </div>
                                                <div class="mr-5">Products</div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left">View Details</span>
                                                <span class="float-right">
                                                    <i class="fa fa-angle-right"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-sm-6 mb-3">
                                        <div class="card text-white bg-success o-hidden h-100">
                                            <div class="card-body">
                                                <div class="card-body-icon">
                                                    <i class="fa fa-fw fa-shopping-cart"></i>
                                                </div>
                                                <div class="mr-5">Cart Details</div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left">View Details</span>
                                                <span class="float-right">
                                                    <i class="fa fa-angle-right"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-sm-6 mb-3">
                                        <div class="card text-white bg-danger o-hidden h-100">
                                            <div class="card-body">
                                                <div class="card-body-icon">
                                                    <i class="fa fa-fw fa-support"></i>
                                                </div>
                                                <div class="mr-5">Users</div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left">View Details</span>
                                                <span class="float-right">
                                                    <i class="fa fa-angle-right"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-sm-6 mb-3">
                                        <div class="card text-white bg-danger o-hidden h-100">
                                            <div class="card-body">
                                                <div class="card-body-icon">
                                                    <i class="fa fa-fw fa-support"></i>
                                                </div>
                                                <div class="mr-5">Reports</div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left">Generate Reports</span>
                                                <span class="float-right">
                                                    <i class="fa fa-angle-right"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}





