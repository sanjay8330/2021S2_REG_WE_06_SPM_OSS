import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';
import firebase from '../../Firebase/firebase';

const initialStates = {
    "userInfo": [],
    "userFullName": '',
    "userEmail": '',
    "userContact": '',
    "userCategory": '',
    "resetAnswer": '',
    "userImage": ''
}

export default class UpdateUsers extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.state = initialStates;
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
        this.setState({ userImage: downloadImage });
        alert('Image Uploaded Successfully!!', file.name);
        document.getElementById("submitBtn").disabled = false;


    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/user/getUserById/${this.props.match.params.id}`)
            .then(response => {
                //console.log('RESPONSE>>', response.data.data);
                this.setState({ userInfo: response.data.data });

                this.setState({ userFullName: this.state.userInfo.userFullName });
                this.setState({ userEmail: this.state.userInfo.userEmail });
                this.setState({ userContact: this.state.userInfo.userContact });
                this.setState({ userCategory: this.state.userInfo.userCategory });
                this.setState({ resetAnswer: this.state.userInfo.resetAnswer });
                this.setState({ userImage: this.state.userInfo.imageURL });

            }).catch(error => {
                console.log(error.message);
            })
    }

    onChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
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
                            <li><a href="/viewProducts" style={{ color: "white" }} >Manage Products</a></li>
                            <li><a href="/viewProductOffers" style={{ color: "white" }} >Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} class="active">Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <div className="container4">

                        <center><h2 class="log" style={{ color: "black" }}><b><i>Update User Details</i></b></h2></center><br />

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-primary" type="button" style={{ marginRight: '2%' }}>Change Password</button>
                        </div><br />

                        <form onSubmit={this.onSubmit}>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <span style={{ color: "black" }}>User Type</span>
                                    <input
                                        class="form-control"
                                        type="text"
                                        name="userCategory"
                                        id="userCategory"
                                        defaultValue={this.state.userCategory}
                                        onChange={this.onChange}
                                        required
                                        disabled /><br />


                                    <span style={{ color: "black" }}>Full Name</span>
                                    <input
                                        class="form-control"
                                        type="text"
                                        name="userFullName"
                                        id="userFullName"
                                        defaultValue={this.state.userFullName}
                                        onChange={this.onChange}
                                        required /><br />

                                    <span style={{ color: "black" }}>Email Address</span>
                                    <input
                                        class="form-control"
                                        type="text"
                                        name="userEmail"
                                        id="userEmail"
                                        defaultValue={this.state.userEmail}
                                        onChange={this.onChange}
                                        required /><br />

                                    <span style={{ color: "black" }}>Contact Number</span>
                                    <input
                                        class="form-control"
                                        type="tel"
                                        pattern="[0-9]{10}"
                                        name="userContact"
                                        id="userContact"
                                        defaultValue={this.state.userContact}
                                        onChange={this.onChange}
                                        required /><br />

                                    <span style={{ color: "black" }}>Enter last 4 digits of your NIC card</span>
                                    <input
                                        class="form-control"
                                        type="number"
                                        pattern="[0-9]{4}"
                                        name="resetAnswer"
                                        id="resetAnswer"
                                        defaultValue={this.state.resetAnswer}
                                        onChange={this.onChange}
                                        required
                                        disabled /><br />

                                </div>
                                <img style={{ minWidth: '50px', width: '300px', height: '310px', marginTop: '6%', marginLeft: '5%' }} src={this.state.userImage} alt="Profile Picture" />
                                <input
                                    type="file"
                                    className="form-control"
                                    id="file"
                                    name="file"
                                    onChange={this.onImageChange}
                                    style={{ width: '40%', height: '20%', marginTop: '-4%', marginLeft: '55%'}}
                                /><br />

                            </div>
                            <button type="submit" className="btn btn-dark" id="submitBtn">Update</button>
                        </form>
                    </div><br />
                </div>
            </div>
        )
    }
}