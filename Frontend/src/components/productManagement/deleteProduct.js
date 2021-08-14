import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    products: []
}

export default class deleteproduct extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/product/getProductById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ products: response.data.data });
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
                <h1>Delete Confirmation</h1>

                <br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>

                
            </main>
    </div>
    </div >
    )
  }
}
