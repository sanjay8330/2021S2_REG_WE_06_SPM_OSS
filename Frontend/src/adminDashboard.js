import React, { Component } from 'react'
import ss from '../src/images/ww.jpg';


export default class adminDashboard extends Component {

    render() {
        return (
            <div>
                <div class="wrapper">
                    <nav>
                        <header><br />
                            &nbsp; &nbsp;  &nbsp; ADMIN PANEL
                        </header><hr style={{ color: "white" }} />
                        <ul><br />
                            <li><a href="/adminDashboard" style={{ color: "white" }} class="active">Dashboard</a></li>
                            <li><a href="/createProduct" style={{ color: "white" }} >Add Products</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }} >View Products</a></li>
                            <li><a href="/addProductOffer" style={{ color: "white" }} >Add Product Offers</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }} >View Product Offers</a></li>
                            <li><a href="/adminUserRegister" style={{ color: "white" }}>Add Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>ADMIN DASHBOARD</h1>

                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src={ss} alt="First slide" /><br/>
                                <div class="row">
                                    <div class="col-xl-3 col-sm-6 mb-3">
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
                                    <div class="col-xl-3 col-sm-6 mb-3">
                                        <div class="card text-white bg-warning o-hidden h-100">
                                            <div class="card-body">
                                                <div class="card-body-icon">
                                                    <i class="fa fa-fw fa-list"></i>
                                                </div>
                                                <div class="mr-5">Product Offers</div>
                                            </div>
                                            <a class="card-footer text-white clearfix small z-1" href="#">
                                                <span class="float-left">View Details</span>
                                                <span class="float-right">
                                                    <i class="fa fa-angle-right"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-sm-6 mb-3">
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
                                    <div class="col-xl-3 col-sm-6 mb-3">
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
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}





