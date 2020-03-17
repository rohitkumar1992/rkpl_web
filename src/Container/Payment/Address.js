import React from 'react';
import Authentication from '../Authentication/Authentication';
import {GETPACKPRICE,USERID,TAG,COUNTRYCODE,ADDADDRESS,GETADDRESS} from '../../url';
import LoadingGif from '../../Component/Loader/loading_gif'
import $ from 'jquery';
import axios from 'axios';
class Address extends React.Component
{
  state={err_result:[],pack_id:'',pack_desc:{},pack_name:'',country:[],isLoading:false,loading_msg:'Please Wait',address:{},btnDisable:false}
  componentDidMount()
  {
    // localStorage.setItem('payment_status','1');
    // this.props.history.push(`/payment/image/${this.state.image_pack_id}`)
    if(localStorage.getItem('address_payment_status')==1)
    {
      this.setState({pack_id:this.props.match.params.pack_id,pack_name:this.props.match.params.pack_name},function()
        {
            this.getAddress();
            this.getPrice();
          })
    }
    else {
      localStorage.setItem('address_payment_status',null);
      this.props.history.push('/web')
    }
  }
  componentDidUpdate()
  {
    if(this.state.pack_id!=this.props.match.params.pack_id || this.state.pack_name!=this.props.match.params.pack_name)
    {
      this.setState({pack_id:this.props.match.params.pack_id,pack_name:this.props.match.params.pack_name},function()
        {
            this.getPrice()
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
  getPrice=()=>{
    axios.post(GETPACKPRICE,{user_id:localStorage.getItem('user_id'),pack_id:this.state.pack_id,tag:TAG,pack_type:this.state.pack_name},{
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
          this.props.history.push(localStorage.getItem('lastLocation'))
        }
        else {
          this.setState({pack_desc:response.pack_desc,country:response.country});
          setTimeout(()=>{this.setState({isLoading:true})},1000)
        }
      }
      else {
        alert('You Already Bought A Pack');
        localStorage.setItem('address_payment_status',null);
        this.props.history.push(localStorage.getItem('lastLocation'))
      }
    }).catch((error)=>{
      localStorage.setItem('address_payment_status',null);
      this.props.history.push(localStorage.getItem('lastLocation'))
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
    const {pack_desc,country,isLoading,loading_msg,address,btnDisable,err_result}=this.state;
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
                                    <img src="images/animation_ser2.jpg" alt="" />
                                </div>
                            </div>
                            <div class="pack_info">
                                <div class="box l">
                                    <h3>{pack_desc.pack_expire_time} day Subscription, Standard License with {pack_desc.pack_count}  Downloads </h3>
                                    <p>Standard License</p>
                                </div>
                                <div class="box r">
                                    <p><b>INR<i class="fa fa-inr"></i> {pack_desc.pack_price}</b>&nbsp;({pack_desc.pack_expire_time} days)</p>
                                </div>
                            </div>
                            <div class="pack_info">
                                <div class="box l">
                                    <h3>Planetshare Editor Pro</h3>
                                </div>
                                <div class="box r">
                                    <p><b>Free</b></p>
                                </div>
                            </div>
                            <div class="pack_info">
                                <div class="box l">
                                    <p>Subtotal</p>
                                </div>
                                <div class="box r">
                                    <p><b>INR<i class="fa fa-inr"></i> {pack_desc.pack_price}</b></p>
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
                            <p class="small">We will bill you monthly for 1 year. After that, your plan will be renewed for another 1 year commitment.</p>
                            <div class="pack_info">
                                <div class="box l">
                                    <h3>Amount due today</h3>
                                </div>
                                <div class="box r">
                                    <p><b>INR<i class="fa fa-inr"></i> {pack_desc.pack_price}</b></p>
                                </div>
                            </div>
                            <div class="buttons">
                                <button type="submit" class="btn btn_cart" disabled={btnDisable}>Complete checkout</button>
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
}
export default Authentication(Address);
