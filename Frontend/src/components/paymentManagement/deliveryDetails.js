import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import firebase from '../../Firebase/firebase';

const initialStates = {
    senderName: '',
    senderMobile: '',
    receiverName: '',
    receiverMobie: '',
}


export default class deliveryDetails extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

            let deliveryDetails = {
                senderName: this.state.senderName,
                senderMobile: this.state.senderMobile,
                receiverName: this.state.receiverName,
                receiverMobie: this.state.receiverMobie,
            }
            
            console.log("Data", deliveryDetails);
            Axios.post('http://localhost:3001/checkout/deliverydetails/insert', deliveryDetails)
                .then(response => {
                    alert('Checkout Details Added Successfully');
                    //window.location = "/checkout";
                }).catch(error => {
                    alert(error.message);
                })

        //}
    }

    render(){
        return(
            <main>
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;Delivery Details</h1>
                <div class="container border rounded" style={{ width: '950px' }}>
                <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <form onSubmit={this.onSubmit}><br />
                                        <div className="form-group">

                                        <table>
                                            <tr>
                                                <td>
                                                <span style={{ color: "black" }}>Sender's Name</span>
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                                disabled
                                                required
                                                style={{ border: "1px solid #c8cfcb " }} /><br />  
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                
                                                <input
                                                class="form-control"
                                                type="text"
                                                value={this.state.senderMobile}
                                                disabled
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
                                                disabled
                                                required
                                                style={{ border: "1px solid #c8cfcb " }} /><br />  
                                                </td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <td>
                                                <input
                                                class="form-control"
                                                type="text"
                                                value={this.state.receiverMobie}
                                                disabled
                                                required
                                                style={{ border: "1px solid #c8cfcb " }} /><br />  
                                                </td>

                                            </tr>
                                            

                                        </table>
                                        
                                                                                 
                                        </div>
                                    </form>
                                    <span style={{ color: "black" }}>Delivery Address </span>
                                    <br/><br/>
                                    <table>
                                        <tr>
                                            <td>
                                            <span style={{ color: "black", }} >Street Address : </span>
                                            </td>
                                
                                            <td>
                                            <span style={{ color: "black" , border: "1px solid #c8cfcb ", margin : 40 , padding : 5}} >xxxx </span>
                                            </td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>
                                            <span style={{ color: "black" }}>Street Address - 2 : </span>
                                            </td>

                                            <td>
                                            <span style={{ color: "black" , border: "1px solid #c8cfcb ", margin : 40 , padding : 5}} >xxxx </span>
                                            </td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>
                                            <span style={{ color: "black" }}>City : </span>
                                            </td>

                                            <td>
                                            <span style={{ color: "black" , border: "1px solid #c8cfcb ", margin : 40 , padding : 5}} >xxxx </span>
                                            </td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>
                                            <span style={{ color: "black" }}>State/Province : </span>
                                            </td>

                                            <td>
                                            <span style={{ color: "black" , border: "1px solid #c8cfcb ", margin : 40 , padding : 5}} >xxxx </span>
                                            </td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>
                                            <span style={{ color: "black" }}>Postal/Zip Code :  </span>
                                            </td>

                                            <td>
                                            <span style={{ color: "black" , border: "1px solid #c8cfcb ", margin : 40 , padding : 5}} >xxxx </span>
                                            </td>
                                        </tr>
                                    </table>                                    
                                                                     
                                    <br/><br/>
                                </div>

                </div>
                </div>
            </main>
        )
    }
}
