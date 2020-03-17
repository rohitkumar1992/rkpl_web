import React from 'react';
import {Redirect} from 'react-router-dom';
import VendorRegistration from "./vendor_registration.js"
import {USERID,VENDORID,SELLER_VENDOR_STATUS,TAG} from '../../../url.js';
import axios from 'axios';
import LoadingGif from '../../../Component/Loader/loading_gif';
import UnderReview from './under_review'
const VendorAuth=(OldComponent)=>{
  class NewComponent extends React.Component{
    state={status:0,isLoading:false,loading_msg:'Please Wait'}
    componentDidMount()
    {
      this.getStatus();
    }
    getStatus=()=>{
      axios.post(SELLER_VENDOR_STATUS,{'user_id':localStorage.getItem('user_id'),'tag':TAG,'role':'vendor'}).then((res)=>{
        if(res.data.success==1)
        {
          this.setState({status:1,isLoading:true})
        }
        else if(res.data.success==2){
  this.setState({isLoading:true,status:2})
        }
        else {
            this.setState({isLoading:true})
        }
      }).catch((error)=>{

      })
    }
    render()
    {
      const {isLoading,status,loading_msg}=this.state;
      if(isLoading)
      {
        if(localStorage.getItem('user_id')!=0 && status)
        {
        return(<OldComponent {...this.props}/>)
        }
        else if(localStorage.getItem('user_id')!=0 && !status)
        {
        return(<VendorRegistration {...this.props}/>)
        }
        else if(localStorage.getItem('user_id')!=0 && status==2){
          return(<UnderReview {...this.props}/>)
        }
        else {
          return(<Redirect to="/login"/>)
        }
      }
      else {
        return(<LoadingGif message={loading_msg}/>)
      }
    }
  }
  return NewComponent;
}

export default VendorAuth;
