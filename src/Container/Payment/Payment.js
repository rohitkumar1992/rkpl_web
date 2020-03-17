import React from 'react';
import Razorpay from 'razorpay';
import axios from 'axios';
import  {Redirect} from 'react-router-dom';
import {PAYMENT,INITIATEORDER,GETPACKPRICE,USERID,TAG} from '../../url'
import Authentication from '../Authentication/Authentication'
import { withLastLocation } from 'react-router-last-location';
import LoadingGif from '../../Component/Loader/loading_gif'
import $ from 'jquery';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const HEADER = {
headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class Checkout extends React.Component{
  state = {
    payment_id:'',
    order_id:'',amount:0,pack_name:'',
    id:'',lastlocation:'',not_found:false,loading:true,loading_msg:'Please Wait',
  };

  constructor(props) {
    super(props)
    this.changeAmount = this.changeAmount.bind(this);
    this.openCheckout = this.openCheckout.bind(this);
    this.getdetails = this.getdetails.bind(this);
  }
  componentDidMount()
  {
    var data=this.props.location.data;
    if(this.props.lastLocation==null)
    {
      this.props.history.push('/web');
      return false;
    }
    else {
    if(localStorage.getItem('payment_status')==1)
    {
      this.setState({pack_id:this.props.match.params.pack_id,pack_name:this.props.match.params.pack_name},function()
        {
            this.getPrice()
          })
    }
    else {
      localStorage.setItem('payment_status',null);
      this.props.history.push('/web')
    }
  }
  }
  // componentDidUpdate()
  // {
  //   if(this.props.match.params.pack_id!=this.state.pack_id)
  //   {
  //     if(localStorage.getItem('payment_status')==1)
  //     {
  //       this.setState({pack_id:this.props.match.params.pack_id,loading:false},function()
  //         {
  //             this.getPrice()
  //           })
  //     }
  //   }
  // }
  getPrice=()=>{
    axios.post(GETPACKPRICE,{user_id:localStorage.getItem('user_id'),pack_id:this.state.pack_id,pack_type:this.state.pack_name,tag:TAG},{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        if(response.price==0 || response.price==null)
        {
          this.props.history.push('/web')
        }
        else {
          this.initiateOrder(response.price);
        }
      }
      else {
        alert('You Already Bought A Pack');
        localStorage.setItem('payment_status',null);
        this.props.history.push('/web')
      }
    }).catch((error)=>{
      localStorage.setItem('payment_status',null);
      this.props.history.push('/web')
    })
  }
  initiateOrder=(price)=>{
    axios.post(INITIATEORDER,{user_id:localStorage.getItem('user_id'),tag:TAG,pack_id:this.state.pack_id,pack_type:this.state.pack_name},{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    }).then((res)=>{
      if(res.data.success==1)
      {
        var order_id=res.data.order_id;
        if(order_id=='')
        {
          localStorage.setItem('payment_status',null);
          setTimeout(()=>{this.setState({loading:false});this.props.history.push('/web')},1000);
        }
        else {
          setTimeout(()=>{this.setState({loading:false});this.openCheckout(price,this.state.pack_id,order_id,localStorage.getItem('lastLocation'))},1000);
        }
      }
      else if(res.data.success==2)
      {
        toast(res.data.data.msg,{ transition: Zoom,});
        localStorage.setItem('payment_status',null);
      setTimeout(()=>{this.setState({loading:false});this.props.history.push('/web')},1000);
      }
    }).catch((error)=>{
      localStorage.setItem('payment_status',null);
    })
  }
  getdetails=(id)=>
  {
    axios.post(`https://api.razorpay.com/v1/payments/:${id}`,{
    })
  .then(response=>{
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  changeAmount(e) {
    this.setState({amount: e.target.value})
  }
  sendPaymentId=(paymentId)=>{
    alert(paymentId);
  }
  openCheckout=(amount,pack_id,order_id,redirect_url)=>{
    // var amounts=Math.round(amount)*100;
    // alert(amounts);
  var x=this.state.amount;
  let _this=this;
    let options = {
      "key": "rzp_test_hgYa6e7RNnPSJf",
      "amount": Math.round(amount*100), // 2000 paise = INR 20, amount in paisa
      "currency": "INR",
      "name": localStorage.getItem('name'),
      "description": "Purchase Description",
      "image": "images/favicon.png",
      "handler": function(response,_this){
          $('#loader_cont').show();
          axios.post(PAYMENT,
        {user_id:localStorage.getItem('user_id'),order_id:order_id,tag:TAG,payment_id:response.razorpay_payment_id,pack_id:pack_id},{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
        }
        })
        .then(response=>{
          if(response.data.success==1)
          {
            localStorage.setItem('payment_status',null);
            localStorage.setItem('lastLocation',null);
            localStorage.setItem('address_payment_status',null);
          //  setTimeout(()=>{_this.props.history.push(redirect_url)},2000);
            setTimeout(()=>{window.location.href='#'+redirect_url+''},2000);
          }
          else {
            localStorage.setItem('payment_status',null);
            localStorage.setItem('lastLocation',null);
            localStorage.setItem('address_payment_status',null);
            window.location.href='#'+redirect_url+'';
          }
        })
        .catch(function (error) {
          console.log(error);
        })

        // let data = {
        //   "key": "rzp_test_hgYa6e7RNnPSJf",
        //   "amount":"500", // 2000 paise = INR 20, amount in paisa
        //   "hostUrl":`https://api.razorpay.com/v1/payments/${response.razorpay_payment_id}/capture`
        // }
      //   axios.post(`https://api.razorpay.com/v1/payments/${response.razorpay_payment_id}/capture`,
      // {key_id:'rzp_test_hgYa6e7RNnPSJf',amount:x,checkcookie:1})
      // .then(response=>{
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
            },
            "modal": {
              "ondismiss": function(){
                  window.location.href='#'+redirect_url+'';
               }
          },
      "prefill": {
        "name": "Shantanu Gupta",
        "email": "shantanug.sw@planetc.net",
        "contact":"9654636775"
      },
      "notes": {
        "address": "Thanks"
      },
      "theme": {
        "color": "#3583D2"
      }
    };

    let rzp =new window.Razorpay(options); rzp.open();
  }

  render () {
    const {loading,loading_msg}=this.state;
    if(!loading)
    {
      return (
        <div id="loader_cont" style={{display:'none'}}><LoadingGif message={loading_msg}/>
           </div>
      )
    }
    else {
      return(<LoadingGif message={loading_msg}/>)
    }
  }
}

export default withLastLocation(Authentication(Checkout));
// <input type='text' onChange={
//    this.changeAmount
//   } />
