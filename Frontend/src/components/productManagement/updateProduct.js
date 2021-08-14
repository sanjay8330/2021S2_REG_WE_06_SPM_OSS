import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    productName: '',
    productPrice: '',
    productDiscount: '',
    productDescription: '',
    categoryType: '',
    productImage: ''
}

export default class updateProduct extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/product/getProductById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ products: response.data.data });
                this.setState({ productName: this.state.products.productName });
                this.setState({ productPrice: this.state.products.productPrice });
                this.setState({ productDiscount: this.state.products.productDiscount });
                this.setState({ productDescription: this.state.products.productDescription });
                this.setState({ categoryType: this.state.products.categoryType });
                this.setState({ productImage: this.state.products.productImage });
            }).catch(error => {
                console.log(error.message);
            })
    }

    onChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        let updateProduct = {
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            productDiscount: this.state.productDiscount,
            productDescription: this.state.productDescription,
            categoryType: this.state.categoryType,
            productImage: this.state.productImage
        }
        Axios.put(`http://localhost:3001/product/updateProduct/${this.props.match.params.id}`, updateProduct)
            .then(response => {
                alert('Product Details Updated Successfully');
                window.location = "/viewProducts";
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
                            &nbsp; &nbsp;  &nbsp; ADMIN PANEL
                        </header><hr style={{ color: "white" }} />
                        <ul><br />
                            <li><a href="/adminDashboard" style={{ color: "white" }}>Dashboard</a></li>
                            <li><a href="/createProduct" style={{ color: "white" }} class="active">Add Products</a></li>
                            <li><a href="/viewProducts" style={{ color: "white" }}>View Products</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>UPDATE PRODUCT</h1>

                        <div class="container3">
                            <form onSubmit={this.onSubmit}>
                            <h3><b><i>Product Information</i></b></h3><br/>
                                <span style={{ color: "black" }}>Product Name*</span>
                                <input
                                    class="form-control"
                                    type="text"
                                    defaultValue={this.state.productName}
                                    name="productName"
                                    onChange={this.onChange}
                                    required 
                                    style={{ border: "1px solid #c8cfcb "}}/><br />

                                <span style={{ color: "black" }}>Product Price (Rs.)*</span>
                                <input
                                    class="form-control"
                                    type="number"
                                    defaultValue={this.state.productPrice}
                                    name="productPrice"
                                    onChange={this.onChange}
                                    required 
                                    style={{ border: "1px solid #c8cfcb "}}/><br />

                                <span style={{ color: "black" }}>Product Discount (%)*</span>
                                <input
                                    class="form-control"
                                    type="number"
                                    defaultValue={this.state.productDiscount}
                                    name="productDiscount"
                                    onChange={this.onChange}
                                    required 
                                    style={{ border: "1px solid #c8cfcb "}}/><br />

                                <span style={{ color: "black" }}>Product Description*</span>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    defaultValue={this.state.productDescription}
                                    name="productDescription"
                                    onChange={this.onChange}
                                    required
                                    style={{ border: "1px solid #c8cfcb "}}>
                                </textarea><br />

                                <span style={{ color: "black" }}>Product Category*</span>
                                <select name="categoryType" onChange={this.onChange} value={this.state.categoryType} class="form-select" aria-label="Default select example">
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Adults">Adults</option>
                                    <option value="Teenagers">Teenagers</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Babies">Babies</option>
                                </select><br />
                                <br />

                                <button type="submit" className="btn btn-primary" id="submitBtn">Update</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>


        )
    }
}
