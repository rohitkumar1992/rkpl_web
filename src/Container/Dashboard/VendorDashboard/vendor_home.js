import React from 'react';
import {USERID,TAG,SELLER_VENDOR_INFO,GETCOUNTRY} from '../../../url';
import './url.js'
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import axios from 'axios';
import Not_Found from '../../../Component/not_found/not_found';
import $ from 'jquery';
import Header from './vendor_header';
import Footer from '../../../Component/footer';
import VendorAuth from './vendor_auth';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import routes from './routes';
import LoadingGif from '../../../Component/Loader/loading_gif'
import { CSSTransition } from 'react-transition-group';
const VENDOR_HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class VendorHome extends React.Component{
  state={isLoading:false,not_found:false,profile_info:[],loading_msg:'Please Wait',country:[]}
  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.location.pathname !== prevProps.location.pathname
  //   ) {
  //     //window.scrollTo(0, 0);
  //   }
  // }
  componentDidMount()
  {
 this.getData();
 this.getCountry();
  }
  getCountry=()=>{
    axios.get(GETCOUNTRY)
  .then(response=>{
      if(response.data.success=='1'){
        this.setState({country:response.data.data});
      }
      else {

      }
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  getData=(page,tab_index)=>{
    axios.post(`${SELLER_VENDOR_INFO}`,{
      'user_id':localStorage.getItem('user_id'),
      'id':localStorage.getItem('vendor_id'),
      'tag':TAG,
      'login_type':'vendor',
    }, {
    headers: {
     'Content-Type': 'application/json;charset=UTF-8',
     'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({profile_info:res.data.data});
        setTimeout(()=>this.setState({isLoading:true}),1000)
      }
      else {
        this.setState({not_found:true})
      }
    }).catch((error)=>{

    });
  }
  render()
  {
    const {isLoading,not_found,loading_msg,profile_info}=this.state;
    if(!not_found)
    {
      if(isLoading)
      {
      return(<div class="top_div">
              <Header profile_info={profile_info} country={this.state.country}/>
                  <ToastContainer autoClose={1000}/>
                  <Switch>
                    {routes.map((route, idx) => {
                        return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                            <route.component {...props} profile_info={profile_info} country={this.state.country}/>
                          )} />)
                          : (null);
                      },
                    )}
                  </Switch>
                <Footer/>
              </div>)
      }
      else
      {
        return(<LoadingGif message={loading_msg}/>)
      }
    }
    else {
      return(<Not_Found/>)
    }
  }
}
export default VendorAuth(VendorHome);
