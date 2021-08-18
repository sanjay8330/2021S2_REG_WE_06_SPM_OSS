import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import product from '../../images/product.jpg';
import firebase from '../../Firebase/firebase';

const initialStates = {
    amount: '',
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
        const err = this.validate();
        if (!err) {

            let checkout = {
                paymentMethod: this.state.paymentMethod,
                slip: this.state.slip,
                comments: this.state.comments,
            }
            
            Axios.post('http://localhost:3001/checkout/checkout', checkout)
                .then(response => {
                    alert('Checkout Details Added Successfully');
                    window.location = "/checkout";
                }).catch(error => {
                    alert(error.message);
                })

        }
    }

    render(){
        return(
            <main>
                <h1>Checkout</h1>
                <div class="container border rounded" style={{ width: '950px' }}>
                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}><br />
                                        <div className="form-group">
                                            <span style={{ color: "black" }}>Amount (Rs.) : xxx</span>                                            
                                        

                                        <br />

                                        <span style={{ color: "black" }}>Payment method : *</span>
                                        <input 
                                            class = "form-check-input"
                                            type = "checkbox"
                                            value = {this.state.paymentMethod}
                                            name = "cashOnDelivery"
                                            id = "cashOnDelivery"
                                        ></input>
                                        <label 
                                            class = "form-check-label" 
                                            for = "cashOnDelivery"
                                            style={{ color: "black" }}>Cash on Delivery </label>
                                        <br />

                                        <input 
                                            class = "form-check-input"
                                            type = "checkbox"
                                            value = {this.state.paymentMethod}
                                            name = "bankTransfer"
                                            id = "bankTransfer"
                                        ></input>
                                        <label 
                                            class = "form-check-label" 
                                            for = "bankTransfer"
                                            style={{ color: "black" }}>Bank Transfer </label>
                                        <br />

                                        <span style={{ color: "black" }}>If bank transfer upload the slip</span>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="file"
                                            name="file"
                                            onChange={this.onImageChange}
                                        /><br />

                                        <div className="form-group">
                                            <span style={{ color: "black" }}>Add comments/instructions : </span>
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
                                    </form>
                                </div>
                                <img src={product} alt="delivery" style={{ width: '50%', height: '60%;' }} />
                            </div>
                        </div>
            </main>
        )
    }

}
