import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import product from '../../images/product.jpg';
import firebase from '../../Firebase/firebase';

const initialStates = {
    amount: '500',
    paymentMethod: '',
    slip: 'cash-on-delivery',
    comments: '',
}

export default class checkout extends Component {

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

    onSubmit(e) {
        e.preventDefault();

        //validate data before submitting to the db 
        //const err = this.validate();
        //if (!err) {

            let checkout = {
                amount: this.state.amount,
                paymentMethod: this.state.paymentMethod,
                slip: this.state.slip,
                comments: this.state.comments,
            }
            
            Axios.post('http://localhost:3001/checkout', checkout)
                .then(response => {
                    alert('Checkout Details Added Successfully');
                    window.location = "/checkout";
                }).catch(error => {
                    alert(error.message);
                })

        //}
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

    render(){
        return(
            <main>
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;Checkout</h1>
                <div class="container border rounded" style={{ width: '950px' }}>
                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}><br />
                                        <div className="form-group">

                                        <span style={{ color: "black" }}>Amount (Rs.) : &nbsp; xxx </span>                                            

                                        <br />
                                        <br />
                                        <span style={{ color: "black" }}>Payment method : *</span>
                                        <br />
                                        
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <input 
                                            class = "form-check-input"
                                            type = "radio"
                                            value = {this.state.paymentMethod}
                                            name = "paymentMethodRadio"
                                            id = "cashOnDelivery"
                                        ></input>
                                        <label 
                                            class = "form-check-label" 
                                            for = "cashOnDelivery"
                                            style={{ color: "black" }}>&nbsp;&nbsp; Cash on Delivery </label>
                                        <br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <input 
                                            class = "form-check-input"
                                            type = "radio"
                                            value = {this.state.paymentMethod}
                                            name = "paymentMethodRadio"
                                            id = "bankTransfer"
                                        ></input>
                                        <label 
                                            class = "form-check-label" 
                                            for = "bankTransfer"
                                            style={{ color: "black" }}>&nbsp;&nbsp; Bank Transfer </label>
                                        <br />
                                        <br />
                                        <span style={{ color: "black" }}>If bank transfer upload the slip</span>
                                        <br />
                                        
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="file"
                                            name="file"
                                            onChange={this.onImageChange}
                                        /><br />

                                        <div className="form-group">
                                            <span style={{ color: "black" }}>Add comments/instructions : </span>
                                            <br />
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={this.state.productDescription}
                                                name="comments"
                                                onChange={this.onChange}
                                                id="comments"
                                                required
                                                style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                            </textarea></div><br />

                                        <button type="submit" className="btn btn-dark" id="submitBtn">Submit</button>
                                        </div>
                                        <br />
                                    </form>
                                </div>
                            </div>
                        </div>
            </main>
        )
    }

}
