import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home";
import GuestHome from './guestHome'; 
import Footer from "./components/footer/footer";
import React, { Component } from "react";

//User Management - Routes
import Register from "./components/userManagement/register";
import Login from "./components/userManagement/login";
import ForgotPassword from "./components/userManagement/forgotPassword";
import ResetPassword from "./components/userManagement/resetPassword";
import AdminAddUser from "./components/Administrator/registerUsers";
import ViewUsers from "./components/Administrator/viewUsers";
import ViewAdministrators from "./components/Administrator/viewAdmins";
import UpdateUsers from "./components/Administrator/updateUsers";
import UpdateUserPassword from "./components/Administrator/updateUserPassword";
import UpdateCustomerProfile from './components/userManagement/updateUser';
import UpdateUserProfilePassword from './components/userManagement/updateUserProfilePassword';
import DeleteUsers from './components/Administrator/deleteUsers';


//Product Offer Management - Routes
import AddProductOffer from "./components/ProductOffer/addProductOffer";
import ViewProductOffer from "./components/ProductOffer/viewProductOffer";
import UpdateProductOffer from "./components/ProductOffer/updateProductOffer";
import DeleteProductOffer from "./components/ProductOffer/deleteProductOffer";

import adminDashboard from "../src/adminDashboard";

//Product Management - Routes
import createProduct from "./components/productManagement/createProduct";
import ViewProducts from "./components/productManagement/viewProducts";
import UpdateProduct from "./components/productManagement/updateProduct";
import DeleteProduct from "./components/productManagement/deleteProduct";
import menProducts from "./components/productManagement/menProducts";
import womenProducts from "./components/productManagement/womenProducts";
import kidsProducts from "./components/productManagement/kidsProducts";
import babiesProducts from "./components/productManagement/babiesProducts";
import teenagersProducts from "./components/productManagement/teenagersProducts";
import deleteproductWithOffer from "./components/productManagement/deleteProductWithOffer";

//Payment Management
import Checkout from './components/paymentManagement/checkout';
import History from './components/paymentManagement/paymentHistory';
import DeliveryDetails from './components/paymentManagement/deliveryDetails';
import DeletePayment from './components/paymentManagement/deletePayment';
import updateDeliveryDetails from "./components/paymentManagement/updateDeliveryDetails";
import viewDeliveryDetails from "./components/paymentManagement/viewDeliveryDetails";
import clearHistory from "./components/paymentManagement/clearHistory";

//Insert Item
import insertItem from "./components/addItems/addItems";
import addOfferItem from "./components/addItems/addOfferItems";

//Update Item
import UpdateItem from './components/addItems/updateitem';

//Delete Item 
import DeleteteItem from './components/addItems/deleteitem';

//Shopping - cart
import ViewShoppingcart from "./components/ShoppingCart/viewItems";

function App() {
  return (
    <div>
      <Router>
        <section>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} />
            <Route path="/home/:id" component={ Home } />
            <Route path="/forgotPassword" component={ ForgotPassword } />
            <Route path="/resetPassword/:id" component={ ResetPassword } />
            <Route path="/adminUserRegister" component={ AdminAddUser } />
            <Route path="/viewUsers" component={ ViewUsers } />
            <Route path="/viewAdmin" component={ ViewAdministrators } />
            <Route path="/updateUser/:id" component={ UpdateUsers } />
            <Route path="/resetUserPassword/:id" component={ UpdateUserPassword } />
            <Route path="/updateUserProfile/:id" component={ UpdateCustomerProfile } /> 
            <Route path="/resetUserProfilePassword/:id" component={ UpdateUserProfilePassword } />
            <Route path="/deleteUser/:id" component={ DeleteUsers } />
            <Route path="/guestHome" component={ GuestHome } />

            <Route path="/addProductOffer" component={ AddProductOffer } />
            <Route path="/viewProductOffers" component={ ViewProductOffer } />
            <Route path="/updateProductOffer/:id" component={ UpdateProductOffer } />
            <Route path="/deleteProductOffer/:id" component={ DeleteProductOffer } />

            <Route path="/adminDashboard" component={ adminDashboard } />
            <Route path="/createProduct" component={ createProduct } />
            <Route path="/viewProducts" component={ ViewProducts } />
            <Route path="/updateProduct/:id" component={ UpdateProduct } />
            <Route path="/deleteProduct/:id" component={ DeleteProduct } />
            <Route path="/menProducts/:userId" component={menProducts}/>
            <Route path="/womenProducts/:userId" component={womenProducts}/>
            <Route path="/kidsProducts/:userId" component={kidsProducts}/>
            <Route path="/babiesProducts/:userId" component={babiesProducts}/>
            <Route path="/teenagersProducts/:userId" component={teenagersProducts}/>
            <Route path="/deleteProductWithOffer/:productId" component={ deleteproductWithOffer } />

            <Route path="/checkout/:userId/:amount" component={ Checkout } />
            <Route path="/payment-history/:userId" component={ History } />
            <Route path="/delivery-details/:userId" component={ DeliveryDetails } />
            <Route path="/deletePayment/:id/:userId" component={ DeletePayment } />
            <Route path="/deliveryForCustomer/:userId" component={ updateDeliveryDetails } />
            <Route path="/updateDeliveryDetail/:userId" component={ updateDeliveryDetails } />
            <Route path="/deliveryForCustomer/:userId" component={ updateDeliveryDetails } />
            <Route path="/viewDeliveryDetails/:userId/:amount" component={ viewDeliveryDetails } />
            <Route path="/deletePaymentHistory/:userId" component={ clearHistory } />
            
            <Route path="/insertItem/:id/:userId" component={ insertItem } />
            <Route path="/addOfferItems/:id/:userId" component = { addOfferItem } />

            <Route path="/viewItems/:userId" component={ ViewShoppingcart } />
            <Route path="/updateitem/:id" component={ UpdateItem } />
            <Route path="/viewItems/:userId" component={ViewShoppingcart} />
            <Route path="/deleteitem/:id" component={DeleteteItem} />

          </Switch>
        </section>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
