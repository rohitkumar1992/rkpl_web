import React from 'react';
import Authentication from '../Authentication/Authentication';
import {GETVIDEODATAANDPRICE,USERID,TAG,COUNTRYCODE,ADDADDRESS,GETADDRESS,VENDOR_ID} from '../../url';
import Not_Found from '../../Component/not_found/not_found';
import LoadingGif from '../../Component/Loader/loading_gif'
import $ from 'jquery';
import Player from '../../Component/player'
import axios from 'axios';
class Address extends React.Component
{
  state={err_result:[],request_id:'',service_name:'',country:[],not_found:false,video_data:[],isLoading:false,loading_msg:'Please Wait',address:{},btnDisable:false}
  componentDidMount()
  {
      this.setState({request_id:this.props.match.params.request_id,service_name:this.props.match.params.service_name},function()
        {
            this.getAddress();
            this.getVideoDetails();
          })
  }
  componentDidUpdate()
  {
    if(this.state.request_id!=this.props.match.params.request_id)
    {
      this.setState({request_id:this.props.match.params.request_id,isLoading:false,not_found:false},function()
        {
            this.getVideoDetails()
          })
    }
  }
  getAddress=()=>{
    axios.post(GETADDRESS,{user_id:localStorage.getItem('user_id'),tag:TAG,type:'one'},{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({address:response.address});
      }
      else
      {
        this.setState({address:{}});
      }
    }).catch((error)=>{
    })
  }
  getVideoDetails=()=>{
    axios.post(GETVIDEODATAANDPRICE,{user_id:localStorage.getItem('user_id'),request_id:this.state.request_id,tag:TAG,vendor_id:VENDOR_ID},{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({video_data:response.data[0],country:response.country})
        setTimeout(()=>this.setState({isLoading:true,not_found:false}),1000)
      }
      else {
        this.setState({not_found:true})
      }
    }).catch((error)=>{

    })
  }
  goToPayment=(e)=>{
    e.preventDefault();
    this.setState({btnDisable:true,isLoading:true,err_result:[]});
    var country=e.target.country.value.trim();
    var city=e.target.city.value.trim();
    var state=e.target.state.value.trim();
    var zipcode=e.target.zipcode.value.trim();
    var address_line_1=e.target.address_line1.value.trim();
    var address_line_2=e.target.address_line2.value.trim();
    axios.post(ADDADDRESS,{
      user_id:localStorage.getItem('user_id'),
      tag:TAG,
      country:country,
      city:city,
      state:state,
      zipcode:zipcode,
      address:address_line_1,
      address_line2:address_line_2,
      },{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    }).then((res)=>{
      var response=res.data;
      if(res.data.success==3)
      {
        this.setState({btnDisable:false,isLoading:true,err_result:response.error});
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      }
      else if(res.data.success==1)
      {
        localStorage.setItem('payment_status','1');
        localStorage.setItem('address_payment_status',null);
        // this.setState({btnDisable:false,isLoading:true});
        setTimeout(()=>this.props.history.push(`/payment/${this.state.pack_name}/${this.state.pack_id}`),1000);
      }
      else
      {
        this.setState({btnDisable:false,isLoading:true});
      }
    }).catch((error)=>{
      this.setState({btnDisable:false,isLoading:true});
    })
  }
  addClass=(value,id)=>{
    if(value!='')
    {
      $('#'+id).addClass('fill')
   }
   else {
       $('#'+id).removeClass('fill')
   }
  }
  render()
  {
    const {video_data,country,isLoading,loading_msg,address,btnDisable,err_result,not_found}=this.state;
    if(!not_found)
    {
    if(isLoading)
    {
    return(
      <section class="inner_cont checkout">
        <article class="checkout_p">
            <div class="container">
            {err_result.length >0 && <div class="error_box">
                    <ul>
                      {err_result.map((res,key)=>{
                        return(<li key={key}><p>{res}</p></li>)
                      })}
                    </ul>
                  </div>}
                <form class="check_form" onSubmit={this.goToPayment}>
                    <div class="main_cont">
                        <div class="box">
                            <h2>Billing address</h2>
                            <div class="pay_info">
                                <div class="selectbox">
                                    <label class="small">Country<sup>*</sup></label>
                                    <select name="country" required>
                                        {country.length>0 && country.map((res,key)=>{
                                          return(<option  value={res.id} key={key} selected={COUNTRYCODE==res.iso2}>{res.name}</option>)
                                        })}
                                    </select>
                                </div>
                                <div class="inputbox">
                                    <input type="text" alt="" class={address.address_line1!=''?"fill":""} name="address_line1" id="address_line1" Value={address.address_line1!=''?address.address_line1:""} onBlur={(e)=>{this.addClass(e.target.value,'address_line1')}} required/>
                                    <label>Address line 1<sup>*</sup></label>
                                    <span></span>
                                </div>
                                <div class="inputbox" >
                                    <input type="text" alt="" class={address.address_line2!=''?"fill":""} name="address_line2" id="address_line2" Value={address.address_line2!=''?address.address_line2:""} onBlur={(e)=>{this.addClass(e.target.value,'address_line2')}}  required/>
                                    <label>Address line 2<sup>*</sup></label>
                                    <span></span>
                                </div>
                                <div class="inputbox">
                                    <input type="text" alt=""  class={address.city!=''?"fill":""} name="city" id="city" Value={address.city!=''?address.city:""} onBlur={(e)=>{this.addClass(e.target.value,'city')}}  required/>
                                    <label>City<sup>*</sup></label>
                                    <span></span>
                                </div>
                                <div class="inputbox">
                                    <input type="text" alt=""  class={address.state!=''?"fill":""} name="state" id="state" Value={address.state!=''?address.state:""} onBlur={(e)=>{this.addClass(e.target.value,'state')}}  required/>
                                    <label>State/Province/Region</label>
                                    <span></span>
                                </div>
                                <div class="inputbox">
                                    <input type="text" alt="" class={address.zipcode!=''?"fill":""} name="zipcode" id="zipcode" Value={address.zipcode!=''?address.zipcode:""} onBlur={(e)=>{this.addClass(e.target.value,'zipcode')}}  required/>
                                    <label>Zip/Postal Code<sup>*</sup></label>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside class="sidebar_view sticky-top">
                        <h2>Order Summery</h2>
                        <div class="check_info">
                            <div class="img_info">
                                <div class="img">
                                    <Player url={video_data.get_video.host_url}/>
                                </div>
                            </div>
                            <div class="pack_info">
                                <div class="box l">
                                    <p>Subtotal</p>
                                </div>
                                <div class="box r">
                                    <p><b>INR<i class="fa fa-inr"></i> {video_data.price}</b></p>
                                </div>
                            </div>
                            {/*<div class="coupon">
                                <a href="javascript:" data-toggle="collapse" data-target="#coupon_code">Do you have a coupon code?</a>
                                <div id="coupon_code" class="apply_c collapse">
                                    <input type="text" alt="" />
                                    <label>Add a coupon code</label>
                                    <span></span>
                                    <button type="button" class="apply_btn">Apply</button>
                                </div>
                            </div>*/}
                            <div class="pack_info">
                                <div class="box l">
                                    <h3>Amount due today</h3>
                                </div>
                                <div class="box r">
                                    <p><b>INR<i class="fa fa-inr"></i> {video_data.price}</b></p>
                                </div>
                            </div>
                            <div class="buttons">
                                <button type="submit" class="btn btn_cart" disabled={btnDisable}>Complete Checkout</button>
                            </div>
                        </div>
                    </aside>
                </form>
            </div>
        </article>
        <div class="clearfix"></div>
    </section>
  )
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
export default Authentication(Address);
