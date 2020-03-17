import React, { Component } from 'react';
import './login.css';
import $ from 'jquery';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {LOGIN,TAG,REGISTER} from '../../url.js';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoadingGif from '../../Component/Loader/loading_gif'
import 'react-toastify/dist/ReactToastify.css';
import { withLastLocation } from 'react-router-last-location';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import cogoToast from 'cogo-toast';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
class Login extends Component {
  state={err_result:[],isLoading:false,sigin:true,signup:false,loading:false,loading_msg:'',url:'',submitDisabled:false,lpswdvisible:false}
  componentDidMount()
  {
    if(localStorage.getItem('user_id')!=0)
    {
      this.props.history.push(this.props.lastLocation.pathname);
      return false;
    //return (<Redirect to={this.props.lastLocation.pathname}/>);
    }
    if(this.props.lastLocation!=null)
    {
      localStorage.setItem('url',this.props.lastLocation.pathname)
      //    this.setState({url:this.props.lastLocation.pathname})
    }
  }
loginFormSubmit=(e)=>
{
    e.preventDefault();
    $('#err_msg_effect').removeClass('err_slide');
    $('#login_err_msg').html('');
    this.setState({submitDisabled:true,err_result:[]})
      var emailid=e.target.lemail.value.trim();
      var password=e.target.lpassword.value.trim();
      axios.post(LOGIN, {
      email:emailid,
      password:password,
      tag:TAG
    })
    .then(response=>{
        if(response.data.success==3)
        {
          this.setState({submitDisabled:false,err_result:response.data.error});
          $('#err_msg_effect').addClass('err_slide');
          $("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
        }
        if(response.data.success=='1'){
          localStorage.setItem('status','Y');
          localStorage.setItem('name',response.data.name);
          localStorage.setItem('planetshare_web_token',response.data.token);
          localStorage.setItem('vendor_id',response.data.vendor_id);
          localStorage.setItem('email',response.data.email);
          localStorage.setItem('seller_id',response.data.seller_id);
          localStorage.setItem('user_id',response.data.user_id);
          localStorage.setItem('account_id',response.data.account_id);
            this.setState({loading:true,loading_msg:'Logging In Please Wait',submitDisabled:false});
                  //    setTimeout(()=>this.props.history.push('/dashboard/ve')),1500);
                //    setTimeout(()=>window.location.href='/',1000);
         setTimeout(()=>{setTimeout(()=>this.props.history.push(localStorage.getItem('url')),200)},1500);

        }
        else {
          this.setState({submitDisabled:false})
          $('#login_err_msg').html('Invalid Credentials');
        }
    })
    .catch((error)=> {
      this.setState({submitDisabled:false})
    });
}
normalLogin=(emailid,password)=>
{
    $('#login_err_msg').html('');
      axios.post(LOGIN, {
      email:emailid,
      password:password,
      tag:TAG
    })
    .then(response=>{
        if(response.data.success=='1'){
          localStorage.setItem('status','Y');
          localStorage.setItem('name',response.data.name);
          localStorage.setItem('planetshare_web_token',response.data.token);
          localStorage.setItem('email',response.data.email);
          localStorage.setItem('seller_id',response.data.seller_id);
          localStorage.setItem('vendor_id',response.data.vendor_id);
          localStorage.setItem('account_id',response.data.account_id);
          localStorage.setItem('user_id',response.data.user_id);

          //setTimeout(()=>this.props.history.push('/'),1500);
          this.setState({loading:true,loading_msg:'Logging In Please Wait',submitDisabled:false});
          setTimeout(()=>window.location.href='/',1000);

        }
        else {
          this.setState({submitDisabled:false})
          $('#login_err_msg').html('Invalid Credentials');
        }
    })
    .catch( (error)=> {
      this.setState({submitDisabled:false})
      console.log(error);
    });
}
registerFormSubmit=(e)=>
{
    e.preventDefault();
    $('#register_err_msg').html('');
    $('#err_msg_effect').removeClass('err_slide');
    this.setState({submitDisabled:true,err_result:[]})
      var name=e.target.pname.value.trim();
      var emailid=e.target.pemail.value.trim();
      var password=e.target.ppass.value.trim();
      var cpassword=e.target.pcpass.value.trim();
      // if(name=='' || emailid=='' || password=='' || cpassword=='')
      // {
      //   toast('All Fields Must Be Filled',{ transition: Zoom,});
      //   this.setState({submitDisabled:false})
      //   return false;
      // }
      if(password!=cpassword)
      {
        cogoToast.error('Password must be same');
        this.setState({submitDisabled:false})
        return false;
      }
      axios.post(REGISTER, {
      name:name,
      email:emailid,
      password:password,
      tag:TAG
    })
    .then(response=>{
      if(response.data.success==3)
      {
          this.setState({submitDisabled:false,err_result:response.data.error});
          $('#err_msg_effect').addClass('err_slide');
              $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      }
        if(response.data.success=='1'){
          //setTimeout(()=>this.props.history.push('/'),1500);
          this.setState({submitDisabled:false,loading:true,loading_msg:`Registering ${name} Please Wait`});
          setTimeout(()=>this.normalLogin(emailid,password),1000);
          //setTimeout(()=>window.location.href='/',1000);

        }
        else if(response.data.success=='2')
        {
          toast(response.data.msg,{ transition: Zoom,});
          this.setState({submitDisabled:false})
          $('#register_err_msg').html(response.data.msg);
        }
        else {
          toast('Something Went Wrong Please try again',{ transition: Zoom,});
          this.setState({submitDisabled:false})
          $('#register_err_msg').html('Invalid Credentials');
        }
    })
    .catch((error)=>{
      this.setState({submitDisabled:false})
      console.log(error);
    });
}
togglePass=(id,id2)=>{
var x = document.getElementById(id);
if (x.type === "password") {
 $('#'+id2).removeClass('fa fa-eye-slash');
 $('#'+id2).addClass('fa fa-eye');
 x.type = "text";
} else {
  $('#'+id2).removeClass('fa fa-eye');
  $('#'+id2).addClass('fa fa-eye-slash');
 x.type = "password";
}
}

  render() {
    const {signup,sigin,isLoading,loading,loading_msg,submitDisabled,err_result}=this.state;
    if(!isLoading)
    {
      if(!loading)
      {
    return (
      <section class="login_page">
      {err_result.length >0 && <div class="error_box" id="err_msg_effect">
              <ul>
                {err_result.map((res,key)=>{
                  return(<li key={key}><p>{res}</p></li>)
                })}
              </ul>
            </div>}
          <ToastContainer autoClose={1000}/>
          {sigin && <article class="login">
              <form onSubmit={this.loginFormSubmit} id="login_form" >
                  <div class="logo">
                      <a href="javascript:">
                          <img src="images/logo.png" alt="" />
                      </a>
                  </div>
                  <h2>Log In</h2>
                  <div class="fields">
                      <div class="inputbox">
                          <label>Email</label>
                          <input type="email" placeholder="email" name="lemail" id="lemail" required/>
                      </div>
                      <div class="inputbox">
                          <label>Password</label>
                          <input type="password" placeholder="password" name="lpassword" id="lpassword" required/>
                          <span onClick={()=>this.togglePass('lpassword','leyepass')}><i id="leyepass" class="fa fa-eye-slash"></i></span>
                      </div>
                  </div>
                      <span id="login_err_msg"></span>
                  <a href="javascript:;" class="register" onClick={()=>this.setState({sigin:false,signup:true,err_result:[]})}>Create An Account</a>
                  <div class="buttons">
                      <button type="submit" class="btn btn_submit" disabled={this.state.submitDisabled}>{submitDisabled?"Loading...":"Login"}</button>
                  </div>
              </form>
          </article>}

          {signup && <article class="login" >
              <form onSubmit={this.registerFormSubmit}>
                  <div class="logo">
                      <a href="javascript:">
                          <img src="images/logo.png" alt="" />
                      </a>
                  </div>
                  {/*<h2>Register</h2>*/}
                  <div class="fields">
                      <div class="inputbox">
                          <label>Name</label>
                          <input type="text" placeholder="Full Name" name="pname" required/>
                      </div>
                      <div class="inputbox">
                          <label>Email</label>
                          <input type="email" placeholder="email" name="pemail" required/>
                      </div>
                      <div class="inputbox">
                          <label>Password</label>
                          <input type="password" placeholder="password" name="ppass" id="ppass" required/>
                          <span onClick={()=>this.togglePass('ppass','reyepass')}><i id="reyepass" class="fa fa-eye-slash"></i></span>
                      </div>
                      <div class="inputbox">
                          <label>Confirm Password</label>
                          <input type="password" placeholder="confirm password" name="pcpass" id="pcpass" required/>
                          <span onClick={()=>this.togglePass('pcpass','reyecpass')}><i id="reyecpass" class="fa fa-eye-slash"></i></span>
                      </div>
                  </div>
                    <span id="register_err_msg"></span>
                  <a href="javascript:;" class="register" onClick={()=>this.setState({sigin:true,signup:false,err_result:[]})}>Already a member</a>
                  <div class="buttons">
                      <button type="submit" class="btn btn_submit" disabled={this.state.submitDisabled}>{submitDisabled?"Loading...":"Register"}</button>
                  </div>
              </form>
          </article>}
          <div class="clearfix"></div>
      </section>
)
}
else {
  return(<LoadingGif message={loading_msg}/>)
}
}
else {
  return(<LoadingGif message={loading_msg}/>)
}
}
}
export default withLastLocation(Login);
