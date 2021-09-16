import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import Header from '../header/header';



const initialStates = {
    itemColor: '',
    itemColorError: '',
    itemSize: '',
    itemSizeError: '',
    itemQuantity: '',
    itemQuantityError: '',
    itemdescription: '',
    itemprice: '',
    "iteminfo": [],
    "userID": ''
}

export default class updateItem extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    componentDidMount() {
        Axios.get(`http://localhost:3001/insertitem/getItemById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ iteminfo: response.data.data });
                this.setState({ itemdescription: this.state.iteminfo.productDescription });
                this.setState({ itemprice: this.state.iteminfo.productPrice });
                this.setState({ itemColor: this.state.iteminfo.productColor });
                this.setState({ itemSize: this.state.iteminfo.productSize });
                this.setState({ itemQuantity: this.state.iteminfo.productQuantity });
                this.setState({ userID: this.state.iteminfo.userID });
            }).catch(error => {
                console.log(error.message);
            })
    }


    onChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
    }

    //Validation Part
    validate() {
        let isError = false;
        const errors = {
            itemColorError: '',
            itemSizeError: '',
            itemQuantityError: ''
        };

        if (this.state.itemColor === '') {
            isError = true;
            alert('you need to select the Color of the item')
            //errors.itemColorError = "you need to select the Color of the item";
        }

        if (this.state.itemSize === '') {
            isError = true;
            alert('you need to select the Size of the item')
            //errors.itemSizeError = "you need to select the Size of the item";
        }

        if (this.state.itemQuantity === '') {
            isError = true;
            alert('you need to select the Quantity of the item')
            //errors.itemQuantityError = "you need to select the Quantity of the item";
        }

        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            });
        }

        return isError;
    }


    onSubmit(e) {
        e.preventDefault();

        //validate data before submitting to the db 
        const err = this.validate();
        if (!err) {

            let updateItem = { 
                itemQuantity: this.state.itemQuantity,
                itemColor: this.state.itemColor,
                itemSize: this.state.itemSize,
            }
            Axios.put(`http://localhost:3001/insertitem/updateitem/${this.props.match.params.id}`, updateItem)
                .then(response => {
                    alert('Item Details Updated Successfully');
                    window.location = `/viewItems/${this.state.userID}`;
                }).catch(error => {
                    alert(error.message);
                })
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div class="wrapper">
                    <main>
                    <h1>UPDATE ITEM</h1><br />
                        <div class="container border rounded" style={{ width: '950px' }}>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group"><br />

                                            <h2 style={{ color: '#8e9be6' }}>{this.state.iteminfo.productName}</h2><br />
                                            <span style={{ color: "black" }}>Item Description<span style={{ color: "red", fontSize: "24px" }}>*</span></span> &emsp; &emsp; &emsp; <h4>{this.state.iteminfo.productDescription}</h4>
                                            <span style={{ color: "black" }}>Item Price<span style={{ color: "red", fontSize: "24px" }}>*</span></span> &emsp; &emsp; &emsp; <h4> RS {this.state.iteminfo.productPrice} /=</h4>

                                        </div><br />


                                        <div className="form-group">

                                            <span style={{ color: "black" }}>Item Color</span>
                                            <select name="itemColor" id="itemColor" value={this.state.itemColor} onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_color" disabled>Select color</option>
                                                <option value="Black">Black</option>
                                                <option value="Grey">Grey</option>
                                                <option value="Blue">Blue</option>
                                                <option value="Red">red</option>
                                                <option value="Matt">Matt</option>
                                            </select><br />

                                            <span style={{ color: "black" }}>Item Size</span>
                                            <select name="itemSize" id="itemSize" value={this.state.itemSize} onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_size" disabled>Select size</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XLL">XLL</option>
                                            </select><br />

                                            <span style={{ color: "black" }}>Item Quantity</span>
                                            <select name="itemQuantity" id="itemQuantity" value={this.state.itemQuantity} onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_quantity" disabled>Select quantity</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="5">4</option>
                                                <option value="6">5</option>
                                            </select><br />

                                        </div>
                                        <br />

                                        <button type="submit" className="btn btn-dark" id="submitBtn">Update</button>
                                    </form>
                                </div>
                                <img style={{ width: '450px', height: '560px' }} src={this.state.iteminfo.productImage} class="zoom" />
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        )
    }
}
