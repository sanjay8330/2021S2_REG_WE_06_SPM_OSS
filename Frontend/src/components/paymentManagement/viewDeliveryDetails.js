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


    componentDidMount() {
        this.setState({ userId: this.props.match.params.userId });
        this.setState({ amount: this.props.match.params.amount });

        Axios.get(`http://localhost:3001/delivery/viewDeliveryDetails/${this.props.match.params.userId}/${this.props.match.params.amount}`)
            .then(response => {
                this.setState({ deliveryDetails: response.data.data });

                console.log(this.state.deliveryDetails);

                if (this.state.deliveryDetails.length == 0){
                    window.location = `/delivery-details/${this.props.match.params.userId}/${this.state.totalamount}`;
                }

                else{
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

      //Navigate to the Update Page
      navigateToCheckout(e) {
        window.location = `/checkout/${this.props.match.params.userId}/${this.props.match.params.amount}`;
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <div class="container border rounded" style={{ width: '560px' }}>
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
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
                                                    <span style={{ color: "black" }}>{this.state.senderName}</span><br /><br />
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                    <span style={{ color: "black" }}>{this.state.senderMobile}</span><br /><br />
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
                                                    <span style={{ color: "black" }}>{this.state.receiverName}</span><br /><br />
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                    <span style={{ color: "black" }}>{this.state.receiverMobile}</span><br /><br />
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
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{ color: "black" }}>{this.state.streetAddress}</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>Street Address - 2 : </span>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{ color: "black" }}>{this.state.streetAddress2}</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>City : </span>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{ color: "black" }}>{this.state.city}</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>State/Province : </span>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;
                                            <td>
                                                <span style={{ color: "black" }}>{this.state.province}</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>
                                                <span style={{ color: "black" }}>Postal/Zip Code :  </span>
                                            </td>
                                            <br />
                                            <td>
                                                <span style={{ color: "black" }}>{this.state.postalCode}</span>
                                            </td>
                                        </tr>
                                    </table>
                                    <br />

                                    <table>
                                        <tr>
                                            <td>
                                                <button type="reset" className="btn btn-dark" onClick={ this.navigateToUpdatePage} id="resetBtn">Update</button>
                                            </td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <td>
                                                <button type="reset" className="btn btn-dark" onClick={ this.navigateToCheckout} id="resetBtn">Proceed to Checkout</button>
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

