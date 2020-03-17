import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import Login from './Container/Login/login';
import Vendor_Registration from './Container/Dashboard/VendorDashboard/vendor_registration';
import Vendor from './Container/Dashboard/VendorDashboard/vendor_home';
import Seller from './Container/Dashboard/SellerDashboard/seller_home';
import PAYMENT from './Container/Payment/Payment';
import ADDRESS from './Container/Payment/Address';
import { LastLocationProvider } from 'react-router-last-location';
import Editor from './Container/Editor/Editor';
import ScrollToTop from './scrolltotop';
import Packs from './Container/Packs/Packs';
import AUTH from './Container/Dashboard/2fa'
class MainContainer extends React.Component{
  componentDidMount()
  {
    this.setStorage();
  }
  setStorage=()=>{
    if(localStorage.getItem('user_id')==null || localStorage.getItem('seller_id')==null || localStorage.getItem('vendor_id')==null )
    {
      localStorage.setItem('user_id',0)
      localStorage.setItem('seller_id',0)
      localStorage.setItem('vendor_id',0)
      localStorage.setItem('planetshare_web_token',0)
    }
  }
  componentDidUpdate()
  {
    this.setStorage()
  }
  render()
  {
  return(
    <HashRouter>
    <LastLocationProvider>
      <ScrollToTop />
    <Switch >
    <Route path="/web"  component={App}/>
    <Route path="/" exact={true} component={App}>
    <Redirect from="/" to="/web"/>
    </Route>
    <Route path="/login"  component={Login}/>
    <Route path="/planetshare_editor/:image_name/:image_id"  component={Editor}/>
    <Route path="/payment/:pack_name/:pack_id"  component={PAYMENT}/>
    <Route path="/address/:pack_name/:pack_id"  component={ADDRESS}/>
    <Route path="/2fa"  component={AUTH}/>
    <Route path="/dashboard/vendor"  component={Vendor}/>
    <Route path="/dashboard/seller"  component={Seller}/>
    </Switch>
    </LastLocationProvider>
    </HashRouter>)
}
}
ReactDOM.render(
  <MainContainer />,
  document.getElementById('root')
);
    // <Route path="/packs"  component={Packs}/>
