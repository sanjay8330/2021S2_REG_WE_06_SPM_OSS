// ------------------------------
//     ADD PRODUCTS - FRONTEND
// ------------------------------

//Function - Product management
//Student name - H.M. Kasuni Navodya
//Student ID - IT19144986

import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import product from '../../images/product.jpg';
import firebase from '../../Firebase/firebase';

const initialStates = {
    productName: '',
    productNameError: '',
    productPrice: '',
    productDiscount: '',
    productDescription: '',
    productDescriptionError: '',
    categoryType: '',
    productImage: 'No-Image',
}

export default class createProduct extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.navigateViewProductPage = this.navigateViewProductPage.bind(this);
        this.state = initialStates;
    }

    /**
     * The function written to capture the user input and assign it the states
     * @param e - event
     * Uses - setState()
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //upload product image to firebase
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

    //form validations
    validate = () => {
        let isError = false;
        const errors = {
            productNameError: '',
            productDescriptionError: '',
            productImageError: ''
        };

        //check product name validation
        if (this.state.productName.length < 4) {
            isError = true;
            errors.productNameError = "Needs to be more than 3 characters long";
        }

        //check description validation
        if (this.state.productDescription.length < 6) {
            isError = true;
            errors.productDescriptionError = "Needs to be more than 5 characters long";
        }

        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            });
        }

        return isError;
    }

    /**
    * The function written to save the product details.
    * Uses - setState()
    * API CALL - ADD PRODUCTS
    */
    onSubmit(e) {
        e.preventDefault();

        //validate data before submitting to the db 
        const err = this.validate();
        if (!err) {

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
    }

    /**
    * The function to navigate to the product list page
    */
    navigateViewProductPage(e) {
        window.location = `/viewProducts`;
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
                            <li><a href="/viewProducts" style={{ color: "white" }} class="active">Manage Products</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }}>Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} >Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>
                        <h1>CREATE PRODUCT</h1>
                        <div class="container border rounded" style={{ width: '1000px' }}>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}><br />
                                        <div className="form-group">
                                            <span style={{ color: "black" }}>Product Name<span style={{ color: "red", fontSize: "24px" }}>*</span></span> &emsp; &emsp; &emsp; <font color="red" style={{ fontSize: '14px' }}>{this.state.productNameError}</font>
                                            <input
                                                class="form-control"
                                                type="text"
                                                value={this.state.productName}
                                                name="productName"
                                                onChange={this.onChange}
                                                id="productName"
                                                required
                                                style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }} />
                                        </div>

                                        <br />

                                        <span style={{ color: "black" }}>Product Price (Rs.)<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                        <span style={{ color: "grey", fontSize: "13px" }}> 
                                        &emsp; &emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp; 
                                        Allow only numbers</span>
                                        <input
                                            class="form-control"
                                            type="number"
                                            value={this.state.productPrice}
                                            name="productPrice"
                                            onChange={this.onChange}
                                            id="productPrice"
                                            required
                                            style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }} />
                                        <br />

                                        <span style={{ color: "black" }}>Product Discount (%)<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                        <span style={{ color: "grey", fontSize: "13px" }}> 
                                        &emsp; &emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  
                                        Allow only numbers</span>
                                        <input
                                            class="form-control"
                                            type="number"
                                            value={this.state.productDiscount}
                                            name="productDiscount"
                                            onChange={this.onChange}
                                            id="productDiscount"
                                            required
                                            style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }} />
                                        <br />

                                        <div className="form-group">
                                            <span style={{ color: "black" }}>Product Description<span style={{ color: "red", fontSize: "24px" }}>*</span></span>&emsp; &emsp;<font color="red" style={{ fontSize: '14px' }}>{this.state.productDescriptionError}</font>
                                            <textarea
                                                className="form-control"
                                                rows="2"
                                                value={this.state.productDescription}
                                                name="productDescription"
                                                onChange={this.onChange}
                                                id="productDescription"
                                                required
                                                style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                            </textarea></div><br />

                                        <span style={{ color: "black" }}>Product Category<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                        <select name="categoryType" id="categoryType" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                            <option selected value="coconut" disabled>Select category</option>
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
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

                                        <button type="submit" className="btn btn-secondary" id="cancelBtn" onClick={this.navigateViewProductPage}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button type="submit" className="btn btn-dark" id="submitBtn">Submit</button>
                                    </form>
                                </div>
                                <img src={product} alt="delivery" style={{ width: '50%', height: '60%;' }} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        )
    }
}


