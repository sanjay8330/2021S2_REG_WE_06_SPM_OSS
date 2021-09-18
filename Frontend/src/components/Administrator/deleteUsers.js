import React, { Component } from 'react';
import '../../css/admin.css';
import Axios from 'axios';

const initialStates = {
    "userInfo": [],
    "userFullName": '',
    "userEmail": '',
    "userContact": '',
    "userImage": ''
}

export default class DeleteUsers extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/user/getUserById/${this.props.match.params.id}`)
            .then(response => {
                //console.log('RESPONSE>>', response.data.data);
                this.setState({ userInfo: response.data.data });

                this.setState({ userFullName: this.state.userInfo.userFullName });
                this.setState({ userEmail: this.state.userInfo.userEmail });
                this.setState({ userContact: this.state.userInfo.userContact });
                this.setState({ userImage: this.state.userInfo.imageURL });

            }).catch(error => {
                console.log(error.message);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/user/deleteUser/${this.props.match.params.id}`)
            .then(response => {
                alert('User deleted Successfully');
                window.location = "/viewUsers";
            }).catch(error => {
                console.log(error.message);
            })
    }

    navigatetoViewUsers(){
        window.location = "/viewUsers";
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
                            <li><a href="/viewProductOffers" style={{ color: "white" }} class="active">Manage Product Offers</a></li>
                            <li><a href="/viewUsers" style={{ color: "white" }} >Manage Users</a></li>
                            <li><a href="/" style={{ color: "white" }}>Logout</a></li>
                        </ul>
                    </nav>
                    <main>

                        <h1>DELETE CONFIRMATION</h1>
                        <div class="content">
                            <div class="wrapper-1">
                                <div class="wrapper-2">

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>User Fullname:<b> {this.state.userFullName}</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>User Email   : <b>Rs.{this.state.userEmail}.00</b></span><br />

                                    <span style={{ color: "black", fontFamily: "'Libre Baskerville', serif" }}>User Contact :<b> {this.state.userContact}%</b></span><br /><br />

                                    <img style={{ minWidth: '50px', width: '100px', height: '100px', marginTop: '-25%', marginLeft: '82%' }} src={this.state.userImage} alt="Profile Picture" />

                                    <div class="alert alert-danger" role="alert">
                                        <center><p>Are you sure you want to permanently remove this user?</p><hr />
                                            By deleting this user you can't undo this action.</center>
                                    </div>
                                    <button class="cancel" style={{ float: "left" }} onClick={this.navigatetoViewUsers}>
                                        Cancel
                                    </button>
                                    <button class="delete" onClick={this.onSubmit} style={{ float: "right" }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        )
    }
}
