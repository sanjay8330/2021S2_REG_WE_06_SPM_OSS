import React, { Component } from 'react'
import '../../css/admin.css';



export default class viewProducts extends Component {
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
                            <li><a href="/createProduct" style={{ color: "white" }}>Add Product</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }} class="active">View Products</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>VIEW PRODUCT DETAILS</h1>
                    </main>
                </div>
            </div>
        )
    }
}
