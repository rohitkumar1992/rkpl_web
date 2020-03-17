import React, { Component } from 'react';
import Header from './Component/header';
import StickyHeader from './Component/stickyheader';
import Footer from './Component/footer';
import Authentication from './Container/Authentication/Authentication';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import HomeBanner from './Component/homebanner';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withLastLocation } from 'react-router-last-location';
import routes from './routes';
import './App.css';
import $ from 'jquery';
import {USERID,TAG} from './url.js';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
const HEADER = {
headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
export default class App extends Component {
  state={count:0}
  // componentDidMount()
  // {
  //   this.getCartInfo();
  // }
  // getCartInfo=()=>{
  //   axios.post(GETCARTCOUNTER,{'user_id':localStorage.getItem('user_id'),'tag':TAG,'cart_type':'cart'},HEADER).then((res)=>{
  //     if(res.data.success==1)
  //     {
  //       localStorage.setItem('cart_count',res.data.data)
  //     //  this.setState({count:res.data.data});
  //     }
  //   }).catch((error)=>{
  //
  //   })
  // }
  // componentDidMount()
  // {
  //   if(localStorage.getItem('version')==null)
  //   {
  //     localStorage.clear();
  //     localStorage.setItem('version',1)
  //   }
  // }
  componentDidUpdate()
  {
    // var result=this.props.location.pathname.split('/');
    // console.log(result);
    // if(result[2]=="search" && result[3]=="keyword" && (result[4]!=this.state.searchType || result[5]!=this.state.searchValue))
    // {
    //   this.setState({searchValue:result[5],searchType:result[4]})
    // }
  }
  render() {
    const searchResult=this.props.location.pathname.split('/');
    return (
        <div class="top_div">
          <ToastContainer autoClose={1000}/>
        <Header {...this.props} keyword={(searchResult.length==6 && searchResult[2]=="search")?searchResult[5]:''} type={(searchResult.length==6 && searchResult[2]=="search")?searchResult[4]:'all'}/>
        <StickyHeader {...this.props} keyword={(searchResult.length==6 && searchResult[2]=="search")?searchResult[5]:''} type={(searchResult.length==6 && searchResult[2]=="search")?searchResult[4]:'all'}/>
        <Switch>
          {routes.map((route, idx) => {
              return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                  <route.component {...props} />
                )} />)
                : (null);
            },
          )}
        </Switch>
          <Footer/>
        </div>
    );
  }
}
