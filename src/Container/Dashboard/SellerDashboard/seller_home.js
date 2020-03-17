import React from 'react';
import {VENDOR_GIG_INFO,USERID,TAG,SELLER_VENDOR_INFO,GETCOUNTRY} from '../../../url';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import axios from 'axios';
import Not_Found from '../../../Component/not_found/not_found';
import $ from 'jquery';
import Header from './seller_header';
import Footer from '../../../Component/footer';
import SellerAuth from './seller_auth'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import LoadingGif from '../../../Component/Loader/loading_gif'
import routes from './routes';
const SELLER_HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class SellerHome extends React.Component{
  state={isLoading:false,not_found:false,profile_info:[],loading_msg:'Please Wait',country:[]}
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
      'id':localStorage.getItem('seller_id'),
      'tag':TAG,
      'login_type':'seller',
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
              <Header profile_info={profile_info} {...this.props} country={this.state.country}/>
                  <ToastContainer autoClose={1000}/>
                  <Switch>
                    {routes.map((route, idx) => {
                        return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                            <route.component {...props}  profile_info={profile_info}  country={this.state.country}/>
                          )} />)
                          : (null);
                      },
                    )}
                  </Switch>
                <Footer/>
              </div>)
      }
      else {
        return(<LoadingGif message={loading_msg}/>)
      }
    }
    else {
      return(<Not_Found/>)
    }
  }
}
export default SellerAuth(SellerHome);
