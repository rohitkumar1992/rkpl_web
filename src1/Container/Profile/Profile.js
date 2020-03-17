import React from 'react';
import axios from 'axios';
import  {Redirect} from 'react-router-dom';
import {BUYERPROFILE,USERID,TAG,EDITPROFILE} from '../../url'
import LoadingGif from '../../Component/Loader/loading_gif'
import Authentication from '../Authentication/Authentication';
import $ from 'jquery';
import Portal from './ProfilePortal';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import cogoToast from 'cogo-toast';
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
class Profile extends React.Component
{
  state={update_btn_enable:false,modal_type:'',not_found:false,loading:false,loading_msg:'Please Wait',user_info:{},email:'',name:'',auth_err:'',profile_portal:false,profile_loader:false}
  componentDidMount()
  {
    this.getData();
  }
  getData=()=>{
    axios.post(BUYERPROFILE,{user_id:localStorage.getItem('user_id'),tag:TAG},HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({user_info:response.data,name:response.data.name,email:response.data.email})
        setTimeout(()=>this.setState({loading:true}),1000)
      }
      else
      {

      }
    }).catch((error)=>{
      this.props.history.push('/web')
    })
  }
  openPortal=(tag)=>{
    if(tag=="name")
    {
      this.setState({profile_portal:true,modal_type:'name'});
      $("#portal_modal").addClass("show")
    }
    else if(tag=="email")
    {
      this.setState({profile_portal:true,modal_type:'email'});
      $("#portal_modal").addClass("show")
    }
    else if(tag=="password")
    {
      this.setState({profile_portal:true,modal_type:'password'});
      $("#portal_modal").addClass("show")
    }
  }
  onFormSubmit=(e)=>{
    e.preventDefault();
    this.setState({update_btn_enable:true,profile_loader:true,error_msg:''})
    var formData={};
    if(this.state.modal_type=="name")
    {
      var name=e.target.name.value.trim();
      if(name=="")
      {
        cogoToast.error('All Fields Must Be Filled',{position:'bottom-center'});
        this.setState({update_btn_enable:false,profile_loader:false,error_msg:''});
        return false
      }
      formData={user_id:localStorage.getItem('user_id'),tag:TAG,edit_type:this.state.modal_type,name:name}
    }
    else if(this.state.modal_type=="email")
    {
      var email=e.target.email.value.trim();
      if(email=="")
      {
        cogoToast.error('All Fields Must Be Filled',{position:'bottom-center'});
        this.setState({update_btn_enable:false,profile_loader:false,error_msg:''});
        return false
      }
      formData={user_id:localStorage.getItem('user_id'),tag:TAG,edit_type:this.state.modal_type,email:email}
    }
    else {
      var old_pass=e.target.old_pass.value.trim();
      var new_pass=e.target.new_pass.value.trim();
      var newc_pass=e.target.newc_pass.value.trim();
      if(old_pass=="" || new_pass=="" || newc_pass=="")
      {
        cogoToast.error('All Fields Must Be Filled',{position:'bottom-center'});
        this.setState({update_btn_enable:false,profile_loader:false,error_msg:''});
        return false
      }
      if(newc_pass!=new_pass)
      {
        this.setState({update_btn_enable:false,profile_loader:false,error_msg:'New & Confirm Password Must Be Same'});
        return false;
      }
      formData={user_id:localStorage.getItem('user_id'),tag:TAG,edit_type:this.state.modal_type,new_pass:new_pass,old_pass:old_pass,email:localStorage.getItem('email')}
    }
    axios.post(EDITPROFILE,formData,HEADER).then((res)=>{
      if(res.data.success=="1")
      {
          if(this.state.modal_type=="email")
          {
            localStorage.setItem('email',email);
          }
          else if(this.state.modal_type=="name")
          {
            localStorage.setItem('name',name);
          }
          else {

          }
          setTimeout(()=>{
            this.setState({profile_portal:false,error_msg:'',modal_type:'',profile_loader:false,loading:false},function()
          {
                this.getData();
                $("#portal_modal").removeClass("show")
          });
        },1000);
      }
      else if(res.data.success=="0")
      {
        var response=res.data;
        setTimeout(()=>this.setState({update_btn_enable:false,profile_loader:false,error_msg:response.msg}),1000);
      }
      else {

      }
    }).catch((error)=>{
      this.setState({update_btn_enable:false,error_msg:'',profile_loader:false});
      cogoToast.error('Something Went Wrong',{position:'bottom-center'});
    //  $("#portal_modal").removeClass("show")
    })
  }
  render()
  {
    const {loading,loading_msg,user_info}=this.state;
    if(loading)
    {
    return( <section class="edit_user_prof">
        <div class="container">
            <div class="edit_prof">
                <div class="side_links sticky-top">
                    <h3>My Account</h3>
                    {(this.state.profile_portal) &&<Portal error_msg={this.state.error_msg} profile_loader={this.state.profile_loader} modalType={this.state.modal_type} onChange={()=>this.setState({error_msg:'',profile_portal:false,modal_type:''})} onFormSubmit={this.onFormSubmit}/>}
                    <ul class="p_links">
                        <li>
                            <a href="javascript:;"><i class="fa fa-user"></i> Profile</a>
                        </li>
                        {/*<li>
                            <a href="javascript:;"><i class="fa fa-list-alt" aria-hidden="true"></i> Plans</a>
                        </li>
                        <li>
                            <a href="javascript:;"><i class="fa fa-credit-card-alt" aria-hidden="true"></i> Billing</a>
                        </li>
                        <li>
                            <a href="javascript:;"><i class="fa fa-history" aria-hidden="true"></i> Purhchase history</a>
                        </li>*/}
                    </ul>
                </div>
                <div class="prof_cont">
                    <h2>Profile</h2>
                    <div class="u_box">
                        <ul class="pers_info_list">
                            <li>
                                <div class="ttl">Name</div>
                                <div class="val">{user_info.name}</div>
                                <div class="buttons" onClick={()=>this.openPortal('name')}>
                                <i class="fa fa-pencil"></i>
                                </div>
                            </li>
                            <li>
                                <div class="ttl">User ID</div>
                                <div class="val">{user_info.Accountid}</div>
                                <div class="buttons"></div>
                            </li>
                            <li>
                                <div class="ttl">Password</div>
                                <div class="val">*********</div>
                                <div class="buttons" onClick={()=>this.openPortal('password')}>
                                <i class="fa fa-pencil"></i>
                                </div>
                            </li>
                            <li>
                                <div class="ttl">Email</div>
                                <div class="val">{user_info.email}</div>
                                <div class="buttons" onClick={()=>this.openPortal('email')}>
                                <i class="fa fa-pencil"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <h3>Preferences</h3>
                    <div class="u_box">
                        <h4>Email Preferences</h4>
                        <p>What types of communication would you like to receive from Planetshare?</p>
                        <ul class="epref_list">
                            <li>
                                <div class="ttl">Design inspiration, tutorials, and professionally curated content.</div>
                                <div class="togle">
                                    <label class="switch">
                                        <input type="checkbox" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="ttl">Special offers and amazing deals.</div>
                                <div class="togle">
                                    <label class="switch">
                                        <input type="checkbox" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="ttl">Product education and updates.</div>
                                <div class="togle">
                                    <label class="switch">
                                        <input type="checkbox" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="u_box">
                        <h4>Language Preference</h4>
                        <p>Select your language. This language will be used for e-mails you receive from us and browsing our site</p>
                        <div class="selectbox">
                            <i class="fa fa-globe" aria-hidden="true"></i>
                            <select>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>French</option>
                                <option>Tamil</option>
                            </select>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="u_box">
                        <h4>Display Preferences</h4>
                        <p>Select the units for image size measurements</p>
                        <ul class="epref_list">
                            <li>
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="centimeters" name="preferences" class="custom-control-input" checked="checked" />
                                  <label class="custom-control-label" for="centimeters">Centimeters</label>
                                </div>
                            </li>
                            <li>
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="inches" name="preferences" class="custom-control-input" />
                                  <label class="custom-control-label" for="inches">Inches</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <h3>Delete Account</h3>
                    <div class="u_box delacc">
                        <p>This will remove all of your personal data forever.</p>
                        <a href="javascript:;" class="del_acc" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>Delete my account</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </section> )
  }
  else {
    return(<LoadingGif message={loading_msg}/>)
  }
  }
}
export default Authentication(Profile);
