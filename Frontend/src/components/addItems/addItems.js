import React, { Component } from 'react';
import Axios from 'axios';

const initialStates = {
    itemColor: '',
    itemSize: '',
    itemQuantity: ''
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

    onSubmit(e) {
        e.preventDefault();

        let item = {
            itemColor: this.state.itemColor,
            itemSize: this.state.itemSize,
            itemQuantity: this.state.itemQuantity,
        }
        Axios.post('http://localhost:3001/item/addItem', item)
            .then(response => {
                alert('Item Details Added Successfully');
            }).catch(error => {
                alert(error.message);
            })
    }

    render() {
        return (
            <div>
                <div class="wrapper">
                    <nav>
                        <header><br />
                            &nbsp; &nbsp;  &nbsp; Item Name
                        </header><hr style={{ color: "white" }} />

                    </nav>
                    <main>
                        <div class="container border rounded" style={{ width: '950px' }}>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <form onSubmit={this.onSubmit}><br />
                                        <div className="form-group">
                                            <span style={{ color: "black" }}>Item Color</span>
                                            <select name="categoryType" onChange={this.onChange} value={this.state.itemColor} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option value="Black">Black</option>
                                                <option value="Grey">Grey</option>
                                                <option value="Blue">Blue</option>
                                                <option value="Red">red</option>
                                                <option value="Matt">Matt</option>
                                            </select><br />
                                            <br />

                                            <span style={{ color: "black" }}>Item Size</span>
                                            <select name="categoryType" onChange={this.onChange} value={this.state.itemSize} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option value="15 inch">Black</option>
                                                <option value="17 inch">Grey</option>
                                            </select><br />
                                            <br />

                                            <span style={{ color: "black" }}>Item Quantity</span>
                                            <select name="categoryType" onChange={this.onChange} value={this.state.itemQuantity} class="form-select" aria-label="Default select example" style={{ border: "1px solid #c8cfcb", backgroundColor: "#edf0eb" }}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="5">4</option>
                                                <option value="6">5</option>
                                            </select><br />
                                            <br />
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
