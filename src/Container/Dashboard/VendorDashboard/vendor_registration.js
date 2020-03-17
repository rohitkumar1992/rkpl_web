import React from 'react';
import {USERID,VENDORREGISTRATION,TOKEN,GETCOUNTRY,GETSTATE,GETCITY,HEADER,TAG,EMAIL_OTP_SENT,EMAIL_OTP_VERIFY,GET2FA,
VERIFY2FA,VERIFICATION_CHECK} from '../../../url.js'
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';
import LoadingGif from '../../../Component/Loader/loading_gif'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import OtpInput from "react-otp-input";
import Portal from '../../../Component/Portal/portal';
import cogoToast from 'cogo-toast';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const VENDOR_HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class VendorRegistration extends React.Component
{
  state={auth_err:'',auth_portal:false,two_fact:false,warning_msg:'',err_result:[],country:[],state:[],city:[],loading:false,loading_msg:'',portal:false,imgs:[],OTP:'',otp_enable:true,email_verify:false,otp_loader:true,modal_loading_msg:'',img_2fa:''}
  componentDidMount()
  {
    this.get2Fa();
    this.verificationCheck();
    this.getCountry();
  }
  verificationCheck=()=>{
    axios.post(VERIFICATION_CHECK,{user_id:localStorage.getItem('user_id'),tag:TAG},{
    headers: {
     'Content-Type': 'application/json;charset=UTF-8',
     'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    })
  .then(response=>{
      if(response.data.success=='1'){
        this.setState({email_verify:response.data.email_check,two_fact:response.data.two_fact})
      }
      else {

      }
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  get2Fa=()=>{
    axios.post(GET2FA,{
      user_id:localStorage.getItem('user_id'),
    })
  .then(response=>{
    this.setState({img_2fa:response.data.data})
  })
  .catch(function (error) {
    console.log(error);
  });
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
onSubmitForm=(e)=>{
      e.preventDefault();
        this.setState({btn_disable:true,err_result:[]})
        //console.log(this.state.imgs[0]);
        // if(this.state.imgs[0]==null)
        // {
        //   toast('Please Upload Profile Picture',{ transition: Zoom,});
        //  this.setState({btn_disable:false})
        //   return false;
        // }
      if(!this.state.email_verify)
      {
        toast('Verify Your Email',{ transition: Zoom,});
        this.setState({btn_disable:false})
        return false;
      }
      if(!this.state.two_fact)
      {
        toast('Verify Two factor Authentication',{ transition: Zoom,});
        this.setState({btn_disable:false});
      return false;
      }
     var image = this.state.imgs[0];
     var company_info=e.target.company_info.value.trim();
     var first_name=e.target.first_name.value.trim();
     var last_name=e.target.last_name.value.trim();
    var description=e.target.description.value.trim();
    var address=e.target.address.value.trim();
    var city=e.target.city.value.trim();
    var state=e.target.state.value.trim();
    var country=e.target.country.value.trim();
    var pincode=e.target.pincode.value.trim();
    var website_url=e.target.website_url.value.trim();
    // console.log(company_info+"--"+
    // first_name+"---"+
    // last_name+"---"+description+"--"+
    // address+"--"+
    // city+"--"+
    // state+"--"+
    // country+"--"+
    // pincode+"--"+
    // website_url);
    if( country=="" || state=="" || city=="" || address=='' )
    {
      cogoToast.error('Please Fill Your Address Details');
      //  alert('Please Fill Your Address Details');
        this.setState({btn_disable:false});
        return false;
    }
    //
    // if(pincode.length==6)
    // {
    //         var pin_match=/^[0-9]+$/;
    //         if(!pincode.match(pin_match))
    //         {
    //           toast('Pincode format is not valid',{ transition: Zoom,});
    //           return false;
    //         }
    // }
    // else {
    //     toast('Pincode must be of 6 digit',{ transition: Zoom,});
    //     return false
    // }
    var formData=new FormData();
    formData.append('user_id',localStorage.getItem('user_id'));
    formData.append('tag',TAG);
    formData.append('file',image);
    formData.append('fname',first_name);
    formData.append('lname',last_name);
    formData.append('description',description);
    formData.append('personal_website',website_url);
    formData.append('terms_condition',1);
    formData.append('company_info',company_info);
    formData.append('address',address);
    formData.append('country',country);
    formData.append('city',city);
    formData.append('state',state);
    formData.append('pincode',pincode);
    axios.post(VENDORREGISTRATION,formData,{
    headers: {
     'Content-Type': 'application/json;charset=UTF-8',
     'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    })
    .then(response=>{
      if(response.data.success==3)
      {
        var err_result=response.data.data;
        this.setState({btn_disable:false,err_result:response.data.error});
            $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      }
      if(response.data.success=='1'){
          this.setState({btn_disable:false});
        localStorage.setItem('vendor_id',response.data.vendor_id);
          this.setState({loading:true,loading_msg:'Please Wait While We Are Creating Your Dashboard'});
          setTimeout(()=>{
            this.props.history.push('/');
            this.props.history.replace('/dashboard/vendor');},2000);
              // this.props.history.push('/dashboard/vendor/home')}
        //  setTimeout(()=>window.location.href="/dashboard/vendor",2000);
      }
      else {
        this.setState({btn_disable:false});
          toast('Something Went Wrong',{ transition: Zoom,});
      }
    })
    .catch((error)=> {
      this.setState({btn_disable:false});
    toast('Something Went Wrong Please Try After Some Time',{ transition: Zoom,});
    });
}
getState=()=>{
  var country_id=$('#country_list').val();
  axios.post(GETSTATE,{
    'country_id':country_id
  })
.then(response=>{
    if(response.data.success=='1'){
      this.setState({state:response.data.data});
    }
    else {

    }
})
.catch(function (error) {
  console.log(error);
});
}
getCity=()=>{
  var state_id=$('#state_list').val();
  axios.post(GETCITY,{
    'state_id':state_id
  })
.then(response=>{
    if(response.data.success=='1'){
      this.setState({city:response.data.data});
    }
    else {

    }
})
.catch(function (error) {
  console.log(error);
});
}
_onChange= (event)=>{
  if(event.target.files.length>1)
  {
            toast('Maximum one file is allowed',{ transition: Zoom,});
    return false;
  }
  this.setState({
      imgs: event.target.files
  })
}
handleChange=(otp)=>{
   if (otp.toString().length<=6)
   {
    this.setState({OTP:otp.toString(),otp_enable:true})
  }
    if(otp.toString().length==6) {
    this.setState({otp_enable:false})
  }
   }
   emailOtpSent=()=>{
     axios.post(EMAIL_OTP_SENT,{user_id:localStorage.getItem('user_id'),tag:TAG},{
     headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
     }
     })
   .then(response=>{
       if(response.data.success=='1'){
         setTimeout(()=>{this.setState({otp_loader:false,})},1000)
         toast('Otp has been sent to your registered email address',{ transition: Zoom,});
         return false;
       }
       else {
         this.setState({email_verify:false,otp_loader:false,modal_loading_msg:'',portal:false,OTP:''});
         $("#portal_modal").removeClass("show")
          toast(response.data.msg,{ transition: Zoom,});
          return false;
       }
   })
   .catch(function (error) {
     console.log(error);
   });
   }
   emailOtpVerify=()=>{
     this.setState({otp_enable:true})
     axios.post(EMAIL_OTP_VERIFY,{user_id:localStorage.getItem('user_id'),tag:TAG,otp:this.state.OTP},{
     headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
     }
     })
   .then(response=>{
       if(response.data.success==1){
         this.setState({email_verify:true,otp_loader:true,modal_loading_msg:'Verifying Otp',OTP:''});
         setTimeout(()=>{this.setState({portal:false,otp_loader:false});$("#portal_modal").removeClass("show")},2000);
         return false;
        // toast(response.data.msg,{ transition: Zoom,});
       }
       else {
          this.setState({warning_msg:response.data.msg,email_verify:false,otp_loader:false,modal_loading_msg:'',portal:true});
          //$("#portal_modal").removeClass("show")
          //toast(response.data.msg,{ transition: Zoom,});
          return false;
       }
   })
   .catch(function (error) {
     console.log(error);
   });
   }
   TwoFactorAuth=(e)=>{
     e.preventDefault();
     var otp=$('#two_auth').val().trim();
     if(otp=='')
     {
       toast('Enter Two Factor Authentication Code',{ transition: Zoom,});
     return false;
     }
     axios.post(VERIFY2FA,{
      code:otp,
      user_id:localStorage.getItem('user_id'),
     })
   .then(response=>{
     if(response.data.success==1)
     {
       $("#portal_modal").removeClass("show")
        this.setState({two_fact:response.data.data,auth_err:''})
     }
     else {
        this.setState({auth_err:'Incorrect Code'})
       toast('Incorrect Two Factor Authentication Code',{ transition: Zoom,});
     return false;
     }
   })
   .catch(function (error) {
     console.log(error);
   });
   }
render()
{
  const {auth_portal,two_fact,warning_msg,country,state,city,loading_msg,loading,email_verify,OTP,otp_loader,modal_loading_msg,otp_enable,err_result}=this.state;
  const Country=(country.length>0 && country.map((res,key)=>{
    return(<option value={res.id} key={key} >{res.name}</option>);
  }));
  const State=(state.length>0 && state.map((res,key)=>{
    return(<option value={res.id} key={key}>{res.name}</option>);
  }));
  const City=(city.length>0 && city.map((res,key)=>{
    return(<option value={res.id} key={key}>{res.name}</option>);
  }));
  if(!loading)
  {
return(
  <div>
  <div class="vend_header">
      <div class="container">
          <div class="logo">
              <Link to="/web"><img src="images/logo.png" alt="" /></Link>
          </div>
      </div>
  </div>
            <ToastContainer autoClose={1000}/>
            {(this.state.portal) && <Portal modalType="email"  closeModal={()=>this.setState({warning_msg:'',otp_enable:true,portal:false,OTP:'',modal_loading_msg:'',otp_loader:true})} emailOtpVerify={this.emailOtpVerify} otp_enable={otp_enable} loader={otp_loader} warning_msg={warning_msg} loading_msg={modal_loading_msg}>
            <OtpInput
              onChange={(otp) =>this.handleChange(otp)}
              numInputs={6}
              isInputNum={true}
              value={this.state.OTP}
              separator={<span>-</span>}
              shouldAutoFocus={true}
              inputStyle={{width:'45px',color:'black'}}
            />
            </Portal>}
   <section class="inner_cont vendor_p">
        <article class="vendor_profile">
            <div class="container">
                <div class="vend_cont">
                {err_result.length >0 && <div class="error_box">
                        <ul>
                          {err_result.map((res,key)=>{
                            return(<li key={key}><p>{res}</p></li>)
                          })}
                        </ul>
                      </div>}
                    <div class="step_head">
                        <h2>Personal Info</h2>
                        <p>Tell us a bit about yourself. This information will appear on your public profile, so that potential service buyers can get to know you better.</p>
                        <p class="small">* Mandatory fields</p>
                    </div>
                    <form class="form_control"  onSubmit={this.onSubmitForm} enctype="multipart/form-data">
                        <div class="fields name">
                            <div class="label req">
                                <label>
                                    <span>Full Name</span>
                                    <small>Private</small>
                                </label>
                                <p class="txt">Ex. John Smith</p>
                            </div>
                            <div class="inputbox">
                                <input type="text" name="first_name" class="first-name"  placeholder="First Name" required/>
                                <input type="text" name="last_name" class="last-name" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div class="fields u_prof">
                            <div class="label req">
                                <label>
                                    <span>Profile Picture</span>
                                    <small></small>
                                </label>
                                <p class="txt">Add a profile picture of yourself so customers will know exactly who they’ll be working with.</p>
                            </div>
                            <div class="inputbox">
                                <div class="prof_photo">
                                    <label for="profile_image">
                                    <input
                                        ref="file"
                                        type="file"
                                        name="user[image]"
                                        accept="image/png,image/jpeg"
                                        id="profile_image"

                                        onChange={this._onChange}/>
                                        <input type="file"  />
                                        {this.state.imgs && [...this.state.imgs].map((file)=>(
                                                      <img src="" id="upload_img"  src={URL.createObjectURL(file)} alt="" />   ))}


                                        {/*<input type="file" accept="image/png,image/jpeg" class="hidden" id="profile_image" name="profile_image" required/>
                                        <img src="" id="user_prof_img" alt="" />*/}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="fields compi">
                            <div class="label req">
                                <label>
                                    <span>Company Info</span>
                                    <small></small>
                                </label>
                                <p class="txt"></p>
                            </div>
                            <div class="inputbox">
                                <textarea placeholder="Write company information here." name="company_info" required></textarea>
                            </div>
                        </div>
                        <div class="fields name compl">
                            <div class="label req">
                                <label>
                                    <span>Company Location</span>
                                    <small></small>
                                </label>
                                <p class="txt"></p>
                            </div>
                            <div class="inputbox">
                                <select name="country" onChange={()=>this.getState()} id="country_list" required>
                                    <option selected disabled value="">Select Country</option>
                                    {Country}
                                </select>
                                <select  name="state" onChange={()=>this.getCity()} id="state_list" required >
                                    <option selected disabled value="">Select State</option>
                                    {State}
                                </select>
                                <select name="city" required>
                                    <option selected disabled value="">Select City</option>
                                    {City}
                                </select>
                                <input type="text"   placeholder="Pincode" name="pincode"  required/>
                            </div>
                        </div>
                        <div class="fields">
                            <div class="label req">
                                <label>
                                    <span>Address</span>
                                    <small></small>
                                </label>
                                <p class="txt"></p>
                            </div>
                            <div class="inputbox">
                                <textarea placeholder="Write your company address here." name="address" required></textarea>
                            </div>
                        </div>
                        <div class="fields">
                            <div class="label req">
                                <label>
                                    <span>Description</span>
                                    <small></small>
                                </label>
                                <p class="txt"></p>
                            </div>
                            <div class="inputbox">
                                <textarea minlength="150" maxlength="600" name="description" placeholder="Share a bit about your work experience, cool projects you’ve completed, and your area of expertise." required></textarea>
                                <div class="inf">
                                    <span>min. 150 characters</span>
                                    <span class="char-count">0/600</span>
                                </div>
                            </div>
                        </div>
                        <div class="fields">
                            <div class="label">
                                <label>
                                    <span>Personal Website</span>
                                    <small>Private</small>
                                </label>
                                <p class="txt">Include a link to your personal website or portfolio with your work samples.</p>
                            </div>
                            <div class="inputbox">
                                <input type="url"   name="website_url" placeholder="Provide a link to your own professional website"/>
                            </div>
                        </div>
                      <div class="fields cont">
                            <div class="label">
                                <label>
                                    <span><i class="fa fa-envelope" aria-hidden="true"></i> Email</span>
                                    <small>Private</small>
                                </label>
                                <p class="txt"></p>
                            </div>
                            <div class="inputbox">
                                {!email_verify && <button type="button" class="btndefault" onClick={()=>{this.setState({portal:true,modal_loading_msg:'Sending Verification Code'});$("#portal_modal").addClass("show");this.emailOtpSent();}}>Verify</button>}
                                {email_verify && <button type="button" class="btndefault vrfy " >Verified</button>}
                            </div>

                        </div>
                        {/*  <div class="fields cont">
                            <div class="label">
                                <label>
                                    <span><i class="fa fa-phone" aria-hidden="true"></i> Phone Number</span>
                                    <small>Private</small>
                                </label>
                                <p class="txt">We'll never share your phone number.</p>
                            </div>
                            <div class="inputbox">
                                <button type="button" class="btndefault">Add Phone Number</button>
                            </div>
                        </div>
                        <div class="fields cont">
                            <div class="label">
                                <label>
                                    <span><i class="fa fa-phone" aria-hidden="true"></i>Two factor Authentication</span>
                                    <small>Private</small>
                                </label>
                                <p class="txt">We'll never share your phone number.</p>
                            </div>
                            <div class="inputbox">
                                <button type="button" class="btndefault">{two_fact?"Verified":"Verify"}</button>
                            </div>
                            <img src={this.state.img_2fa}/>
                        </div>
                        <div class="fields cont">
                            <div class="label">
                                <label>
                                    <span><i class="fa fa-envelope" aria-hidden="true"></i> Email</span>
                                    <small>Private</small>
                                </label>
                                <p class="txt"></p>
                            </div>
                            <div class="inputbox">
                            {!email_verify && <button type="button" class="btndefault" onClick={()=>{this.setState({portal:true,modal_loading_msg:'Sending Verification Code'});$("#portal_modal").addClass("show");this.emailOtpSent();}}>Verify</button>}
                            {email_verify && <button type="button" class="btndefault" >Verified</button>}
                            </div>
                        </div>*/}
                        <div class="fields cont">
                            <div class="label">
                                <label>
                                    <span><i class="fa fa-phone" aria-hidden="true"></i>Two factor Authentication</span>
                                    <small>Private</small>
                                </label>
                                {!two_fact && <p class="txt">Scan The QRcode mention below</p>}
                            </div>
                            <div class="inputbox">
                                {!two_fact && <button type="button" class="btndefault" onClick={()=>{this.setState({auth_portal:true});$("#portal_modal").addClass("show")}}>{two_fact?"Verified":"Verify"}</button>}
                                {two_fact && <button type="button" class="btndefault vrfy" >Verified</button>}
                            </div>
                            {(this.state.auth_portal) &&<Portal auth_err={this.state.auth_err} loader={false} modalType="two_auth" img_2fa={this.state.img_2fa} get2Fa={this.get2Fa} TwoFactorAuth={this.TwoFactorAuth} onChange={()=>this.setState({auth_err:'',auth_portal:false})}/>}
                        </div>
                        <div class="buttons">
                            <button type="submit" class="btndefault">Finish</button>
                        </div>
                    </form>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="clearfix"></div>
        </article>
        <div class="clearfix"></div>
    </section></div>)
  }
  else {
    return(<LoadingGif message={loading_msg}/>)
  }
}
}



export default VendorRegistration;
