import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import firebase from '../../Firebase/firebase';

const initialStates = {
    productName: '',
    productPrice: '',
    productDiscount: '',
    productDescription: '',
    categoryType: '',
    productImage: 'No-Image'
}

export default class createProduct extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onImageChange(e) {
        document.getElementById("submitBtn").disabled = true;
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        await fileRef.put(file).then(() => {
        }).catch(error => {
            alert(error.message);
        });

        const downloadImage = await fileRef.getDownloadURL();
        this.setState({ productImage: downloadImage });
        alert('Image Uploaded Successfully!!', file.name);
        document.getElementById("submitBtn").disabled = false;


    }

    onSubmit(e) {
        e.preventDefault();

        let product = {
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            productDiscount: this.state.productDiscount,
            productDescription: this.state.productDescription,
            categoryType: this.state.categoryType,
            productImage: this.state.productImage
        }
        Axios.post('http://localhost:3001/product/addProduct', product)
            .then(response => {
                alert('Product Details Added Successfully');
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
                            <li><a href="/addProductOffer" style={{ color: "white" }}>Add Product Offers</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }}>View Product Offers</a></li>
                            <li><a href="/adminUserRegister" style={{ color: "white" }}>Add Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>CREATE PRODUCT</h1>

                        <div class="container3">
                            <form onSubmit={this.onSubmit}>
                                <h3><b><i>Product Information</i></b></h3><br />
                                <span style={{ color: "black" }}>Product Name*</span>
                                <input
                                    class="form-control"
                                    type="text"
                                    value={this.state.productName}
                                    name="productName"
                                    onChange={this.onChange}
                                    required
                                    style={{ border: "1px solid #c8cfcb " }} /><br />

                                <span style={{ color: "black" }}>Product Price (Rs.)*</span>
                                <input
                                    class="form-control"
                                    type="number"
                                    value={this.state.productPrice}
                                    name="productPrice"
                                    onChange={this.onChange}
                                    required
                                    style={{ border: "1px solid #c8cfcb " }} /><br />

                                <span style={{ color: "black" }}>Product Discount (%)*</span>
                                <input
                                    class="form-control"
                                    type="number"
                                    value={this.state.productDiscount}
                                    name="productDiscount"
                                    onChange={this.onChange}
                                    required
                                    style={{ border: "1px solid #c8cfcb " }} /><br />

                                <span style={{ color: "black" }}>Product Description*</span>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    value={this.state.productDescription}
                                    name="productDescription"
                                    onChange={this.onChange}
                                    required
                                    style={{ border: "1px solid #c8cfcb " }}>
                                </textarea><br />

                                <span style={{ color: "black" }}>Product Category*</span>
                                <select name="categoryType" onChange={this.onChange} class="form-select" aria-label="Default select example">
                                    <option selected value="coconut" disabled>Select category</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Adults">Adults</option>
                                    <option value="Teenagers">Teenagers</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Babies">Babies</option>
                                </select><br />
                                <br />

                                <span style={{ color: "black" }}>Product Image</span>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="file"
                                    name="file"
                                    onChange={this.onImageChange}
                                /><br />

                                <button type="submit" className="btn btn-primary" id="submitBtn">Submit</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>


        )
    }
}
