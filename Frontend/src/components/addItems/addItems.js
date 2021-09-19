import React, { Component } from 'react';
import Axios from 'axios';
import Header from '../header/header';

//variables
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

export default class addItem extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.state = initialStates;
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Get the products
    componentDidMount() {
        Axios.get(`http://localhost:3001/product/getProductById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ productinfo: response.data.data });
            }).catch(error => {
                console.log(error.message);
            })

        this.setState({ userID: this.props.match.params.userId })

        //Getting the current date
        this.state.today = new Date();
        var dd = String(this.state.today.getDate());
        var mm = String(this.state.today.getMonth() + 1); //January is 0!
        var yyyy = this.state.today.getFullYear();

        var date = mm + '-' + dd + '-' + yyyy;

        this.setState({ currentDate: date});       

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

        //console.log(this.state.currentDate);

        //Validate the data
        const err = this.validate();
        console.log('Error>>>', err);
        if (!err) {

            let item = {
                "userID": this.state.userID,
                "productName": this.state.productinfo.productName,
                "productImage": this.state.productinfo.productImage,
                "productDescription": this.state.productinfo.productDescription,
                "productPrice": this.state.productinfo.productPrice,
                "productColor": this.state.itemColor,
                "productSize": this.state.itemSize,
                "productQuantity": this.state.itemQuantity,
                "date": this.state.currentDate
            }
            Axios.post('http://localhost:3001/insertitem/addItem', item)
                .then(response => {
                    alert('Item Details Added Successfully');
                    window.location =`/home/${this.state.userID}`;
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
                        <div class="container border rounded" style={{ width: '800px' }}>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}><br />

                                        <h2 style={{ color: '#8e9be6' }}>{this.state.productinfo.productName}</h2><br />
                                        <span style={{ color: "grey", fontSize: "14px" }}>Product Description</span><br />
                                        <h4>{this.state.productinfo.productDescription}</h4>

                                        <span style={{ color: "grey", fontSize: "14px" }}>Product Price</span><br />
                                        <h4>{"Rs. " + this.state.productinfo.productPrice + " /="}</h4>

                                        <div className="form-group">

                                            <span style={{ color: "black" }}>Item Color</span>
                                            <select name="itemColor" id="itemColor" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_color" disabled>Select color</option>
                                                <option value="Black">Black</option>
                                                <option value="Grey">Grey</option>
                                                <option value="Blue">Blue</option>
                                                <option value="Red">red</option>
                                                <option value="Matt">Matt</option>
                                            </select><br />

                                            <span style={{ color: "black" }}>Item Size</span>
                                            <select name="itemSize" id="itemSize" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_size" disabled>Select size</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XLL">XLL</option>
                                            </select><br />

                                            <span style={{ color: "black" }}>Item Quantity</span>
                                            <select name="itemQuantity" id="itemQuantity" onChange={this.onChange} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option selected value="item_quantity" disabled>Select quantity</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="5">4</option>
                                                <option value="6">5</option>
                                            </select><br />

                                            <button type="submit" className="btn btn-dark" id="submitBtn">Add to cart</button>
                                        </div>
                                        <br />
                                    </form>
                                </div>
                                <img src={this.state.productinfo.productImage} class="img-thumbnail" alt="..." style={{ width: '390px', height: '480px' }}></img><br /><br />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

}
