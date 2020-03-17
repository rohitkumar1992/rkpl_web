import React from 'react';
import {Redirect} from 'react-router-dom';
import SellerRegistration from "./seller_registration.js"
import {USERID,SELLERID,SELLER_VENDOR_STATUS,TAG} from '../../../url.js';
import LoadingGif from '../../../Component/Loader/loading_gif';
import UnderReview from './under_review'
import axios from 'axios';
const SellerAuth=(OldComponent)=>{
  class NewComponent extends React.Component{
    state={status:0,isLoading:false,loading_msg:'Please Wait'}
    componentDidMount()
    {
      this.getStatus();
    }
    getStatus=()=>{
      axios.post(SELLER_VENDOR_STATUS,{'user_id':localStorage.getItem('user_id'),'tag':TAG,'role':'seller'}).then((res)=>{
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
        if(localStorage.getItem('user_id')!=0 && status==1)
        {
        return(<OldComponent {...this.props}/>)
        }
        else if(localStorage.getItem('user_id')!=0 && status==0)
        {
        return(<SellerRegistration {...this.props}/>)
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

export default SellerAuth;
