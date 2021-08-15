import React, { Component } from 'react'

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
                            <li><a href="/adminDashboard" style={{ color: "white" }}>Dashboard</a></li>
                            <li><a href="/createProduct" style={{ color: "white" }} >Add Products</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }} >View Products</a></li>
                            <li><a href="/addProductOffer" style={{ color: "white" }} >Add Product Offers</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }} >View Product Offers</a></li>
                            <li><a href="/adminUserRegister" style={{ color: "white" }} class="active">Add Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>ADMIN DASHBOARD</h1>
                    </main>
                </div>
            </div>
        )
    }
}
