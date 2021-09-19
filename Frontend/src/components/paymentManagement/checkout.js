// Function : Payment Management
// Name : D.P. Kavindi Gimshani
// Student Number : IT19150826

import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import firebase from '../../Firebase/firebase';
import Header from '../header/header';
import check from '../../images/check.jpg';

const initialStates = {
    paymentMethod: '',
    slip: 'No-Image',
    comments: '',
    date: '',
    "userId": '',
    "amount": ''
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

    //assign input to state
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //set global states
    componentDidMount(){
        //set the global state for user ID
        this.setState({ userId: this.props.match.params.userId });
        //set the global state for amount
        this.setState({ amount: this.props.match.params.amount });
    }
    
    //insert payment details
    onSubmit(e) {
        e.preventDefault();

        let checkout = {
            amount: this.state.amount,
            paymentMethod: this.state.paymentMethod,
            slip: this.state.slip,
            comments: this.state.comments,
            date: this.state.date,
            userId: this.state.userId,
        }

        console.log("Data", checkout);
        Axios.post(`http://localhost:3001/checkout/paymentDetails/${this.props.match.params.userId}/${this.props.match.params.amount}`, checkout)
            .then(response => {
                alert('Checkout Details Added Successfully');
                window.location = `/viewItems/${this.state.userId}`;
            }).catch(error => {
                alert(error.message);
            })

    }

    //upload inserted image to database
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
                <center><b><p style={{ fontSize: '50px' }}>Checkout</p></b><br/></center>
                    <div class="container border rounded" style={{ width: '1000px' }}>
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <form onSubmit={this.onSubmit}><br />
                                    <div className="form-group">
                                        <span style={{ color: "black" }}>Amount: &nbsp;<span style={{ color: "red" }}> Rs. {this.state.amount}.00 </span></span>
                                        <br />
                                        <br />
                                    </div>

                                    <span style={{ color: "black" }}>Payment Method </span>  <br />
                                    <select name="paymentMethod" id="paymentMethod" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                        <option selected value="Cash on Delivery" disabled>Select Payment Method</option>
                                        <option value="Cash on Delivery">Cash on Delivery</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </select><br />

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
                                        <span style={{ color: "black" }}>Add comments/instructions</span>
                                        <br />
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={this.state.productDescription}
                                            name="comments"
                                            onChange={this.onChange}
                                            id="comments"
                                            placeholder = "Enter your comment here.."
                                            required
                                            style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                        </textarea></div><br />

                                    <button type="submit" className="btn btn-dark" id="submitBtn">Submit</button><br/>

                                    <br />
                                </form>
                            </div>
                            <img src={check} alt="delivery" style={{ width: '50%', height: '40%;' }} />
                        </div>
                    </div>
                </main>
            </div>
        )
    }

}
