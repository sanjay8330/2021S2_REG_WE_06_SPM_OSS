import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import firebase from '../../Firebase/firebase';
import Header from '../header/header';

const initialStates = {
    amount: '500',
    paymentMethod: '',
    slip: 'No-Image',
    comments: '',
    date: ''
}

export default class checkout extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.state = initialStates;
        var today = new Date(),

            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            date: date
        }
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
            date: this.state.date
        }

        console.log("Data", checkout);
        Axios.post('http://localhost:3001/checkout/paymentDetails', checkout)
            .then(response => {
                alert('Checkout Details Added Successfully');
                //window.location = "/checkout";
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
        this.setState({ slip: downloadImage });
        alert('Image Uploaded Successfully!!', file.name);
        document.getElementById("submitBtn").disabled = false;
    }

    render() {
        return (
            <div>
                <Header />
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
                                    </div>

                                    <span style={{ color: "black" }}>Payment Method </span>  <br />
                                    <select name="paymentMethod" id="paymentMethod" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                        <option selected value="Cash on Delivery" disabled>Select Payment Method</option>
                                        <option value="Cash on Delivery">Cash on Delivery</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </select><br />

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

                                    <br />
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

}
