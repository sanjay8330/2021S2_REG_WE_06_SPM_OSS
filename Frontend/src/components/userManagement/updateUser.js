import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';
import firebase from '../../Firebase/firebase';
import Header from '../header/header';

const initialStates = {
    "userInfo": [],
    "userFullName": '',
    "userEmail": '',
    "userContact": '',
    "userCategory": '',
    "resetAnswer": '',
    "userImage": ''
}

export default class UpdateCustomerProfile extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigatetoResetPassword = this.navigatetoResetPassword.bind(this);
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

    onSubmit(e) {
        e.preventDefault();

        let updUser = {
            "userFullName": this.state.userFullName,
            "userEmail": this.state.userEmail,
            "userContact": this.state.userContact,
            "imageURL": this.state.userImage,
            "resetAnswer": this.state.resetAnswer
        }
        Axios.put(`http://localhost:3001/user/updateUser/${this.props.match.params.id}`, updUser)
            .then(response => {
                alert('User detials Updated Successfully!!');
                window.location = `/home/${this.props.match.params.id}`;
            }).catch(error => {
                alert(error.message);
            })

    }

    navigatetoResetPassword(e, userId){
        userId = this.props.match.params.id;
        window.location = `/resetUserProfilePassword/${userId}`;
    }

    onChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Header />
                <div class="wrapper">
                    <div className="container4">

                        <center><h2 class="log" style={{ color: "black" }}><b><i>Update User Details</i></b></h2></center><br />

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-primary" type="button" style={{ marginRight: '2%' }} onClick={this.navigatetoResetPassword}>Change Password</button>
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
                                    style={{ width: '40%', height: '20%', marginTop: '-4%', marginLeft: '55%' }}
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