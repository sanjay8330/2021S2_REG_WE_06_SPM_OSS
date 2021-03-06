// --------------------------------------------------
//     INSERT DELIVERY DETAILS INTERFACE - FRONTEND
// --------------------------------------------------

// Function : Payment Management
// Name : D.P. Kavindi Gimshani
// Student Number : IT19150826

import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';
import delivery from '../../images/ccc.png';

const initialStates = {
    "senderName": '',
    "senderMobile": '',
    "receiverName": '',
    "receiverMobile": '',
    "streetAddress": '',
    "streetAddress2": '',
    "city": '',
    "province": '',
    "postalCode": '',
    "userId": '',
    "amount": '',
    "deliveryDetails": [],
    "deliveryID": '',
    "amount": ''
}


export default class deliveryDetails extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
        this.navigateViewCart = this.navigateViewCart.bind(this);
    }


    onChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
    }


    componentDidMount() {
        this.setState({ userId: this.props.match.params.userId });

        Axios.get(`http://localhost:3001/delivery/deliveryForCustomer/${this.props.match.params.userId}`)
            .then(response => {
                this.setState({ deliveryDetails: response.data.data });

                console.log(this.state.deliveryDetails);

                this.state.deliveryDetails.length > 0 && this.state.deliveryDetails.map((item, index) => {
                    this.setState({ senderName: item.senderName });
                    this.setState({ senderMobile: item.senderMobile });
                    this.setState({ receiverName: item.receiverName });
                    this.setState({ receiverMobile: item.receiverMobile });
                    this.setState({ streetAddress: item.streetAddress });
                    this.setState({ streetAddress2: item.streetAddress2 });
                    this.setState({ city: item.city });
                    this.setState({ province: item.province });
                    this.setState({ postalCode: item.postalCode });
                    this.setState({ deliveryID: item._id });
                })

            }).catch(error => {
                console.log(error.message);
            });

    }
    

    navigateViewCart() {
        let userId = this.state.userID;
        window.location = `/viewItems/${this.props.match.params.userId }`;
    }


    onSubmit(e) {
        e.preventDefault();
        if (this.state.deliveryDetails.length == 0) {
            let deliveryDetails = {
                senderName: this.state.senderName,
                senderMobile: this.state.senderMobile,
                receiverName: this.state.receiverName,
                receiverMobile: this.state.receiverMobile,
                streetAddress: this.state.streetAddress,
                streetAddress2: this.state.streetAddress2,
                province: this.state.province,
                city: this.state.city,
                postalCode: this.state.postalCode,
                userId: this.state.userId
            }
            Axios.post(`http://localhost:3001/delivery/deliveryDetails/${this.props.match.params.userId}`, deliveryDetails)
                .then(response => {
                    alert('Delivery details added successfully!!!');
                    window.location = `/viewItems/${this.state.userId}`;
                }).catch(error => {
                    alert(error.message);
                })
        } else {
            alert('Server is down!!! Will be up in due time!!!');
        }

    }


    render() {
        return (
            <div>
                <Header />
                <main>
                    <div class="container border rounded delivery-form" style={{ width: '580px' }}>
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <form  onSubmit={this.onSubmit}><br />
                                    <img src={delivery} alt="delivery" style={{ width: '20%', height: '20%;' }} />
                                    <div class="centered">
                                        <b><p style={{ fontSize: '31px' }}>&nbsp;Delivery Details</p></b><br />
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
                                                        defaultValue={this.state.senderName}
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
                                                        defaultValue={this.state.senderMobile}
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
                                                        defaultValue={this.state.receiverName}
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
                                                        defaultValue={this.state.receiverMobile}
                                                        name="receiverMobile"
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

                                            <td style={{ paddingLeft: '70px' }}>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    defaultValue={this.state.streetAddress}
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

                                            <td style={{ paddingLeft: '70px' }}>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    defaultValue={this.state.streetAddress2}
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
                                            <td style={{ paddingLeft: '70px' }}>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    defaultValue={this.state.city}
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
                                            <td style={{ paddingLeft: '70px' }}>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    defaultValue={this.state.province}
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
                                            <td style={{ paddingLeft: '70px' }}>
                                                <input
                                                    class="form-control"
                                                    type="tel"
                                                    pattern="[0-9]{5}"
                                                    defaultValue={this.state.postalCode}
                                                    name="postalCode"
                                                    onChange={this.onChange}
                                                    required
                                                    style={{ border: "1px solid #c8cfcb",  width: '250px'}} />
                                            </td>
                                        </tr>
                                        <br />
                                    </table>

                                    <table>
                                        <tr>

                                            <td>
                                                <button type="reset" className="btn btn-secondary" id="cancelBtn" onClick={this.navigateViewCart} >Cancel</button>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <button type="submit" className="btn btn-dark" id="submitBtn">Insert</button>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;

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
