import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';
import delivery from '../../images/ccc.png';

const initialStates = {
    senderName: '',
    senderMobile: '',
    receiverName: '',
    receiverMobiie: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    province: '',
    postalCode: '',
    "userId": '',
    "amount": ''
}


export default class updateDeliveryDetails extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigateToView = this.navigateToView.bind(this);
        this.state = initialStates;
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.setState({ userId: this.props.match.params.userId });

        Axios.get(`http://localhost:3001/checkout/deliveryForCustomer/${this.props.match.params.userId}`)
            .then(response => {
                this.setState({ Checkout: response.data.data });
                this.setState({ senderName: this.state.Checkout.senderName });
                this.setState({ senderMobile: this.state.Checkout.senderMobile });
                this.setState({ receiverName: this.state.Checkout.receiverName });
                this.setState({ receiverMobiie: this.state.Checkout.receiverMobiie });
                this.setState({ streetAddress: this.state.Checkout.streetAddress });
                this.setState({ streetAddress2: this.state.Checkout.streetAddress2 });
                this.setState({ city: this.state.Checkout.city });
                this.setState({ province: this.state.Checkout.province });
                this.setState({ postalCode: this.state.Checkout.postalCode });

            }).catch(error => {
                console.log(error.message);
            })
    }


    
    navigateToView(e) {
        window.location = `/viewDeliveryDetails/${this.props.match.params.userId}`; 
    }


    onSubmit(e) {
        e.preventDefault();

        let deliveryDetails = {
            senderName: this.state.senderName,
            senderMobile: this.state.senderMobile,
            receiverName: this.state.receiverName,
            receiverMobile: this.state.receiverMobiie,
            streetAddress: this.state.streetAddress,
            streetAddress2: this.state.streetAddress2,
            province: this.state.province,
            city: this.state.city,
            postalCode: this.state.postalCode,
            userId: this.state.userId,
            amount: this.state.amount,
        }

        Axios.post('http://localhost:3001/delivery/deliveryDetails', deliveryDetails)
            .then(response => {
                alert('Delivery Details Added Successfully');
                window.location = `/checkout/${this.state.userId}/${this.state.amount}`;
            }).catch(error => {
                alert(error.message);
            })

    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <div class="container border rounded" style={{ width: '560px' }}>
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-dark" type="button" onClick={ this.navigateToView} style={{ marginRight: '2%' }}>View</button>
                            </div><br />
                                <form onSubmit={this.onSubmit}><br />
                                    <img src={delivery} alt="delivery" style={{ width: '30%', height: '40%;' }} />
                                    <div class="centered">
                                        <b><p style={{ fontSize: '31px', top: '-30px' }}>&nbsp;Delivery Details</p></b><br />
                                    </div>
                                    <div className="form-group"><br />

                                        <table>
                                            <tr>
                                                <td>
                                                    <span style={{ color: "black" }}>Sender's Name</span>
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                    <span style={{ color: "black" }}>Sender's Phone Number</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <input
                                                        class="form-control"
                                                        type="text"
                                                        value={this.state.senderName}
                                                        name="senderName"
                                                        onChange={this.onChange}
                                                        required
                                                        style={{ border: "1px solid #c8cfcb " }} /><br />
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>

                                                    <input
                                                        class="form-control"
                                                        type="tel"
                                                        pattern="[0-9]{10}"
                                                        value={this.state.senderMobile}
                                                        name="senderMobile"
                                                        onChange={this.onChange}
                                                        required
                                                        style={{ border: "1px solid #c8cfcb " }} /><br />
                                                </td>

                                            </tr>


                                            <tr>
                                                <td>
                                                    <span style={{ color: "black" }}>Receiver's Name</span>
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                    <span style={{ color: "black" }}>Receiver's Phone Number</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <input
                                                        class="form-control"
                                                        type="text"
                                                        value={this.state.receiverName}
                                                        name="receiverName"
                                                        onChange={this.onChange}
                                                        required
                                                        style={{ border: "1px solid #c8cfcb " }} /><br />
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                    <input
                                                        class="form-control"
                                                        type="tel"
                                                        pattern="[0-9]{10}"
                                                        value={this.state.receiverMobiie}
                                                        name="receiverMobiie"
                                                        onChange={this.onChange}
                                                        required
                                                        style={{ border: "1px solid #c8cfcb " }} /><br />
                                                </td>

                                            </tr>


                                        </table>


                                    </div>

                                    <span style={{ color: "black" }}>Delivery Address </span>
                                    <br /><br />
                                    <table>
                                        <tr>
                                            <td>
                                                <span style={{ color: "black", }} >Street Address : </span>
                                            </td>

                                            <td>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    value={this.state.streetAddress}
                                                    name="streetAddress"
                                                    onChange={this.onChange}
                                                    required
                                                    style={{ border: "1px solid #c8cfcb " }} />
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>Street Address - 2 : </span>
                                            </td>

                                            <td>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    value={this.state.streetAddress2}
                                                    name="streetAddress2"
                                                    onChange={this.onChange}
                                                    required
                                                    style={{ border: "1px solid #c8cfcb " }} />
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>City : </span>
                                            </td>

                                            <td>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    value={this.state.city}
                                                    name="city"
                                                    onChange={this.onChange}
                                                    required
                                                    style={{ border: "1px solid #c8cfcb " }} />
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>State/Province : </span>
                                            </td>

                                            <td>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    value={this.state.province}
                                                    name="province"
                                                    onChange={this.onChange}
                                                    required
                                                    style={{ border: "1px solid #c8cfcb " }} />
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>Postal/Zip Code :  </span>
                                            </td>

                                            <td>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    value={this.state.postalCode}
                                                    name="postalCode"
                                                    onChange={this.onChange}
                                                    required
                                                    style={{ border: "1px solid #c8cfcb " }} />
                                            </td>
                                        </tr>
                                    </table>
                                    <br />

                                    <table>
                                        <tr>

                                            <td>
                                                <button type="reset" className="btn btn-dark" id="resetBtn">Cancel</button>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <button type="submit" className="btn btn-dark" id="submitBtn">Checkout</button>
                                            </td>
                                        </tr>
                                    </table>
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
