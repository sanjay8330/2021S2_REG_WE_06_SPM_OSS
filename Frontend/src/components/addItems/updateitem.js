import React, { Component } from 'react'
import '../../css/admin.css';
import Axios from 'axios';
import product from '../../images/product.jpg';


const initialStates = {
    itemColor: '',
    itemColorError:'',
    itemSize: '',
    itemSizeError: '',
    itemQuantity: '',
    itemQuantityError: '',
    "productinfo": [],
    "userID": '',
    "today": '',
    "currentDate": ''
}

export default class updateItem extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/product/getItemById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ items: response.data.data });
                this.setState({ productQuantity: this.state.items.itemQuantity });
                this.setState({ productColor: this.state.items.itemColor });
                this.setState({ productSize: this.state.items.itemSize });
            }).catch(error => {
                console.log(error.message);
            })
    }

    onChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
    }

   //Validation Part
   validate () {
    let isError = false;
    const errors = {
        itemColorError:'',
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
                productQuantity: this.state.itemQuantity,
                productColor: this.state.itemColor,
                productSize: this.state.itemSize,
            }
            Axios.put(`http://localhost:3001/updateitem/updateitem/${this.props.match.params.id}`, updateItem)
                .then(response => {
                    alert('Product Details Updated Successfully');
                    window.location = "/viewProducts";
                }).catch(error => {
                    alert(error.message);
                })
        }
    }

    render() {
        return (
            <div>
                <div class="wrapper">
                    
                    <main>
                        <h1>UPDATE ITEM</h1>

                        <div class="container border rounded" style={{ width: '950px' }}>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group"><br />
                                            <span style={{ color: "black" }}>Item Name<span style={{ color: "red", fontSize: "24px" }}>*</span></span> &emsp; &emsp; &emsp; <h4>{this.state.productinfo.productDescription}</h4><br>
                                            
                                            </br>
                                            
                                           
                                            </div><br />

                                        <span style={{ color: "black" }}>Product Price (Rs.)<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                        <span style={{ color: "grey", fontSize: "13px" }}>
                                            &emsp; &emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp;&emsp; &emsp;&emsp;&emsp;
                                            Allow only numbers</span>
                                        <input
                                            class="form-control"
                                            type="number"
                                            defaultValue={this.state.productPrice}
                                            name="productPrice"
                                            onChange={this.onChange}
                                            required
                                            style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }} /><br />

                                        <span style={{ color: "black" }}>Product Discount (%)<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                        <span style={{ color: "grey", fontSize: "13px" }}>
                                            &emsp; &emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp;&emsp;&emsp;&emsp;
                                            Allow only numbers</span>
                                        <input
                                            class="form-control"
                                            type="number"
                                            defaultValue={this.state.productDiscount}
                                            name="productDiscount"
                                            onChange={this.onChange}
                                            required
                                            style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }} /><br />

                                        <div className="form-group">
                                            <span style={{ color: "black" }}>Product Description<span style={{ color: "red", fontSize: "24px" }}>*</span></span>&emsp; &emsp;<font color="red" style={{ fontSize: '14px' }}>{this.state.productDescriptionError}</font>
                                            <textarea
                                                className="form-control"
                                                rows="2"
                                                defaultValue={this.state.productDescription}
                                                name="productDescription"
                                                onChange={this.onChange}
                                                required
                                                style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                            </textarea></div><br />

                                        <span style={{ color: "black" }}>Product Category<span style={{ color: "red", fontSize: "24px" }}>*</span></span>
                                        <select name="categoryType" onChange={this.onChange} value={this.state.categoryType} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                            <option value="Teenagers">Teenagers</option>
                                            <option value="Kids">Kids</option>
                                            <option value="Babies">Babies</option>
                                        </select><br />

                                        <button type="submit" className="btn btn-dark" id="submitBtn">Update</button>
                                    </form>
                                </div>
                                <img style={{ width: '450px', height: '560px' }} src={this.state.productImage} class="zoom" />
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        )
    }
}
