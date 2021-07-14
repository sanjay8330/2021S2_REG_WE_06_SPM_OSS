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
                            <li><a href="/adminDashboard" class="active">Dashboard</a></li>
                            <li><a href="/createProduct" style={{ color: "white" }}>Add Product</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }}>View Products</a></li>
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
