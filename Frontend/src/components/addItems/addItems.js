import React, { Component } from 'react';
import Axios from 'axios';

const initialStates = {
    itemColor: '',
    itemSize: '',
    itemSizeError: '',
    itemQuantity: '',
    itemQuantityError: '',
    "productinfo": [],
    "userID": ''
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


    componentDidMount() {
        Axios.get(`http://localhost:3001/product/getProductById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ productinfo: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })

        this.setState({ userID: this.props.match.params.userId })
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
                "userID": this.state.userID, 
                "productName": this.state.productinfo.productName,
                "productImage": this.state.productinfo.productImage,
                "productDescription": this.state.productinfo.productDescription,
                "productPrice": this.state.productinfo.productPrice,
                "productColor": this.state.itemColor,
                "productSize": this.state.itemSize,
                "productQuantity": this.state.itemQuantity
            }
            Axios.post('http://localhost:3001/insertitem/addItem', item)
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

                                        <h1>{this.state.productinfo.productName}</h1>

                                        <span style={{ color: "grey", fontSize: "14px" }}>Product Image</span><br />
                                        <img src={this.state.productinfo.productImage} class="img-thumbnail" alt="..." style={{ width: '300px', height: '320px' }}></img><br /><br />

                                        <span style={{ color: "grey", fontSize: "14px" }}>Product Description</span><br />
                                        <h4>{this.state.productinfo.productDescription}</h4>

                                        <span style={{ color: "grey", fontSize: "14px" }}>Product Price</span><br />
                                        <h4>{"Rs. " + this.state.productinfo.productPrice + " /="}</h4>



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
