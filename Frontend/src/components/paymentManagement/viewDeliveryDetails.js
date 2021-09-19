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
    "deliveryID": ''
}

export default class viewDeliveryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = initialStates;
        this.navigateToUpdatePage = this.navigateToUpdatePage.bind(this);
        this.navigateToCheckout = this.navigateToCheckout.bind(this);
    }


    //retreive delivery details according to the user ID
    componentDidMount() {
        //get the global state for user ID
        this.setState({ userId: this.props.match.params.userId });
        //get the global state for amount
        this.setState({ amount: this.props.match.params.amount });

        Axios.get(`http://localhost:3001/delivery/viewDeliveryDetails/${this.props.match.params.userId}/${this.props.match.params.amount}`)
            .then(response => {
                this.setState({ deliveryDetails: response.data.data });

                console.log(this.state.deliveryDetails);

                if (this.state.deliveryDetails.length == 0) {
                    alert('Please insert delivery details');
                    window.location = `/delivery-details/${this.props.match.params.userId}/${this.state.totalamount}`;
                }

                else {
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
                }

            }).catch(error => {
                console.log(error.message);
            });

    }

    //Navigate to the Update Page
    navigateToUpdatePage(e) {
        window.location = `/deliveryForCustomer/${this.props.match.params.userId}`;
    }

    //Navigate to the Checkout Page
    navigateToCheckout(e) {
        window.location = `/checkout/${this.props.match.params.userId}/${this.props.match.params.amount}`;
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <div class="container border rounded" style={{ width: '560px', marginTop: '-35px' }}>
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <form onSubmit={this.onSubmit}><br />
                                    <div>
                                        <b><p style={{ fontSize: '31px', top: '-70px', marginBottom: '0', paddingBottom: '0' }}>&nbsp;Delivery Details</p></b><br />
                                    </div>
                                    <div style={{ top: '-30px' }}><br />

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
                                                    <span style={{
                                                        color: "black",
                                                        boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                        paddingRight: '12px',
                                                        paddingLeft: '15px'
                                                    }}>
                                                        {this.state.senderName}</span><br /><br />
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                    <span style={{
                                                        color: "black",
                                                        boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                        paddingRight: '12px',
                                                        paddingLeft: '15px'
                                                    }}>
                                                        {this.state.senderMobile}</span><br /><br />
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
                                                    <span style={{
                                                        color: "black",
                                                        boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                        paddingRight: '12px',
                                                        paddingLeft: '15px'
                                                    }}>
                                                        {this.state.receiverName}</span><br /><br />
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                    <span style={{
                                                        color: "black",
                                                        boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                        paddingRight: '12px',
                                                        paddingLeft: '15px'
                                                    }}>
                                                        {this.state.receiverMobile}</span><br /><br />
                                                </td>

                                            </tr>


                                        </table>


                                    </div>

                                    <span style={{ color: "black", fontSize: '18px' }}>Delivery Address </span>
                                    <br /><br />
                                    <table>
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }} >Street Address : </span>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{
                                                    color: "black",
                                                    boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                    paddingRight: '12px',
                                                    paddingLeft: '15px'
                                                }}>
                                                    {this.state.streetAddress}</span>
                                            </td>

                                            <td rowSpan="20" style={{ textAlign: 'end', marginRight: '10px' }}>
                                                <img src={delivery} alt="delivery" style={{ width: '80%', height: '80%' }} />
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td style={{ color: "black", width: '150px' }}>
                                                <span style={{ color: "black" }}>Street Address - 2 : </span>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{
                                                    color: "black",
                                                    boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                    paddingRight: '12px',
                                                    paddingLeft: '15px'
                                                }}>
                                                    {this.state.streetAddress2}</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>City : </span>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{
                                                    color: "black",
                                                    boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                    paddingRight: '12px',
                                                    paddingLeft: '15px'
                                                }}>
                                                    {this.state.city}</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>State/Province : </span>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{
                                                    color: "black",
                                                    boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                    paddingRight: '12px',
                                                    paddingLeft: '15px'
                                                }}>
                                                    {this.state.province}</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>Postal/Zip Code :  </span>
                                            </td>
                                            <br />
                                            <td>
                                                <span style={{
                                                    color: "black",
                                                    boxShadow: ' 0 4px 2px -2px #c8cfcb',
                                                    paddingRight: '12px',
                                                    paddingLeft: '15px'
                                                }}>
                                                    {this.state.postalCode}</span>
                                            </td>
                                        </tr>
                                    </table>
                                    <br />

                                    <table>
                                        <tr>
                                            <td>
                                                <button type="reset" className="btn btn-dark" onClick={this.navigateToUpdatePage} id="resetBtn">Update</button>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <td>
                                                <button type="reset" className="btn btn-dark" onClick={this.navigateToCheckout} id="resetBtn">Proceed to Checkout</button>
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

