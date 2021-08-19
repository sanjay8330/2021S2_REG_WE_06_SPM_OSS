import React, { Component } from 'react'
import Header from '../header/header';
import Axios from 'axios';

const initialStates = {
  "menProducts": []
}

export default class displayProducts extends Component {
  constructor(props) {
    super(props);
    this.state = initialStates;
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/product/getAllMenProducts')
      .then(response => {
        this.setState({ menProducts: response.data.data });
      }).catch(error => {
        alert(error.message);
      })

  }
  render() {
    return (

      <div>
        <Header />
        <h1>MEN</h1>

        <div class="row1">
          {this.state.menProducts.length > 0 && this.state.menProducts.map((item, index) => {
            return (

              <div class="column1">
                <div class="card">
                  <img src={item.productImage} alt="Avatar" style={{ width: '250px', height: '260px' }} />
                  <div class="container"><br />
                    <h4><b>{item.productName}</b></h4>
                    <p style={{ color: "red" }}>{"Rs." + item.productPrice}</p>
                    <p style={{ fontSize: "20px" }}>{"Rs." + item.productDiscount + " %"}</p>
                    <i><p style={{ fontSize: "14px", color: "grey" }}>{item.productDescription}</p></i>
                    <button type="button" class="btn btn-primary" style={{ backgroundColor: "#0ba6ff" }}>Add To Cart</button>
                  </div><br />
                </div><br /><br />

              </div>

            )
          })}
        </div>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>

    )
  }
}
