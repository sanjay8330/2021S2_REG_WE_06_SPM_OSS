import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Footer from './components/footer/footer';
import React, { Component }  from 'react';

//User Management - Routes
import Register from './components/userManagement/register';
import Login from './components/userManagement/login';
import ForgotPassword from './components/userManagement/forgotPassword';
import ResetPassword from './components/userManagement/resetPassword';
import AdminAddUser from './components/Administrator/registerUsers';
import ViewUsers from './components/Administrator/viewUsers';
import ViewAdministrators from './components/Administrator/viewAdmins';

//Product Offer Management - Routes
import AddProductOffer from './components/ProductOffer/addProductOffer';
import ViewProductOffer from './components/ProductOffer/viewProductOffer';
import UpdateProductOffer from './components/ProductOffer/updateProductOffer';
import DeleteProductOffer from './components/ProductOffer/deleteProductOffer';

import adminDashboard from '../src/adminDashboard';

//Product Management - Routes
import createProduct from './components/productManagement/createProduct';
import ViewProducts from './components/productManagement/viewProducts';
import UpdateProduct from './components/productManagement/updateProduct';
import DeleteProduct from './components/productManagement/deleteProduct';
import menProducts from './components/productManagement/menProducts';
import womenProducts from './components/productManagement/womenProducts';
import kidsProducts from './components/productManagement/kidsProducts';
import babiesProducts from './components/productManagement/babiesProducts';
import teenagersProducts from './components/productManagement/teenagersProducts';

//Payment Management
import Checkout from './components/paymentManagement/checkout';

//Insert Item
import insertItem from './components/addItems/addItems';

function App() {
  return (
    <div>
      <Router>
        <section>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/login" component={ Login } />
            <Route path="/forgotPassword" component={ ForgotPassword } />
            <Route path="/resetPassword/:id" component={ ResetPassword } />
            <Route path="/adminUserRegister" component={ AdminAddUser } />
            <Route path="/viewUsers" component={ ViewUsers } />
            <Route path="/viewAdmin" component={ ViewAdministrators } />

            <Route path="/addProductOffer" component={ AddProductOffer } />
            <Route path="/viewProductOffers" component={ ViewProductOffer } />
            <Route path="/updateProductOffer/:id" component={ UpdateProductOffer } />
            <Route path="/deleteProductOffer/:id" component={ DeleteProductOffer } />

            <Route path="/adminDashboard" component={ adminDashboard } />
            <Route path="/createProduct" component={ createProduct } />
            <Route path="/viewProducts" component={ ViewProducts } />
            <Route path="/updateProduct/:id" component={ UpdateProduct } />
            <Route path="/deleteProduct/:id" component={ DeleteProduct } />
            <Route path="/menProducts" component={menProducts}/>
            <Route path="/womenProducts" component={womenProducts}/>
            <Route path="/kidsProducts" component={kidsProducts}/>
            <Route path="/babiesProducts" component={babiesProducts}/>
            <Route path="/teenagersProducts" component={teenagersProducts}/>

            <Route path="/checkout" component={ Checkout } />

            <Route path="/insertItem" component={ insertItem } />
          </Switch>
        </section>
      </Router>
      <Footer />
    </div>
  );
}

export default App;