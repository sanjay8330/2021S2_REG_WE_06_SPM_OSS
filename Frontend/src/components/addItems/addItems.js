import React, { Component } from 'react';
import Axios from 'axios';

const initialStates = {
    itemColor: '',
    itemSize: '',
    itemSizeError: '',
    itemQuantity: '',
    itemQuantityError: ''
}

export default class addItem extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialStates;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    //Validation Part
    validate = () => {
        let isError = false;
        const errors = {
            itemSizeError: '',
            itemQuantityError: ''
        };

        if (this.state.itemSize == null) {
            isError = true;
            errors.itemSizeError = "you need to select the Size of the item";
        }

        if (this.state.itemQuantity == null) {
            isError = true;
            errors.itemQuantityError = "you need to select the Quantity of the item";
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

        //Validate the data
        const err = this.validate();
        if (!err) {

            let item = {
                itemColor: this.state.itemColor,
                itemSize: this.state.itemSize,
                itemQuantity: this.state.itemQuantity,
            }
            Axios.post('http://localhost:3001/insertItem', item)
                .then(response => {
                    alert('Item Details Added Successfully');
                }).catch(error => {
                    alert(error.message);
                })
        }
    }

    render() {
        return (
            <div>
                <div class="wrapper">
                    <nav>
                        <header><br />
                            &nbsp; &nbsp;  &nbsp;
                        </header><hr style={{ color: "white" }} />

                    </nav>
                    <main>
                        <div class="container border rounded" style={{ width: '950px' }}>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}><br />

                                        <h1> Item Name</h1>
                                        <img src="..." class="img-thumbnail" alt="..."></img>
                                        <div className="form-group">

                                            <span style={{ color: "black" }}>Item Color</span>
                                            <select name="itemColor" id="itemColor" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_color" disabled></option>
                                                <option value="Black">Black</option>
                                                <option value="Grey">Grey</option>
                                                <option value="Blue">Blue</option>
                                                <option value="Red">red</option>
                                                <option value="Matt">Matt</option>
                                            </select><br />
                                            <br />

                                            <span style={{ color: "black" }}>Item Size</span>
                                            <select name="itemSize" id="itemSize" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_size" disabled></option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XLL">XLL</option>
                                            </select><br />
                                            <br />

                                            <span style={{ color: "black" }}>Item Quantity</span>
                                            <select name="itemQuantity" id="itemQuantity" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_quantity" disabled></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="5">4</option>
                                                <option value="6">5</option>
                                            </select><br />
                                            <br />

                                            <button type="submit" className="btn btn-dark" id="submitBtn">Add to cart</button>
                                        </div>
                                        <br />
                                    </form>
                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </div>


        )
    }

}
