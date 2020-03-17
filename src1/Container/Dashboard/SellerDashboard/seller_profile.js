import React from 'react';
import Moment from 'react-moment'
import LoadingGif from '../../../Component/Loader/loading_gif';
import {GETSTATE,GETCITY} from '../../../url.js';
import axios from 'axios';
import $ from 'jquery';
class Profile extends React.Component{
  state={loading:false,loading_msg:'Please Wait',edit_content_disable:true,edit_option:true,private_edit_content_disable:true,
state:[],city:[]}
  componentDidMount(){
        setTimeout(()=>this.setState({loading:true}),1000)
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
  render()
  {
    const {loading,loading_msg,edit_content_disable,private_edit_content_disable,state,city}=this.state;
    const {profile_info,country}=this.props;
    const country_name=(country.filter((data)=> data.id==profile_info.country));
    const State=(state.length>0 && state.map((res,key)=>{
      return(<option value={res.id} key={key}>{res.name}</option>);
    }));
    const City=(city.length>0 && city.map((res,key)=>{
      return(<option value={res.id} key={key}>{res.name}</option>);
    }));
    if(loading)
    {
    return(    <section class="dashb_cont top_div">
            <div class="container">
                <div class="content_dash usercont_dash">
                    <aside class="sidebar_dash">
                        <div class="perfrm_wrap usr_prof">
                            <div class="prof_prog">
                                <div class="prof_det">
                                   <span class="btn_online">{profile_info.status==1?"Active":"Inactive"}</span>
                                   <div class="img">
                                       <a href="javascript:;">
                                           <img src={profile_info.profile_pic==null?"images/dash_user.png":profile_info.profile_pic} alt="" />
                                       </a>
                                   </div>
                                   <div class="user_det">
                                       <a href="javascript:;" class="name">{profile_info.display_name}</a>
                                   </div>
                                   <div class="one_line">
                                       <p>what's your story in one line?<i class="fa fa-pencil"></i></p>
                                       <form action="javascript:;">
                                           <input type="text" maxlength="70" value="What's your story in one line?" />
                                           <div class="buttons">
                                               <button type="button" class="btndefault btn_cancel">Cancel</button>
                                               <button type="button" class="btndefault btn_update">Update</button>
                                           </div>
                                       </form>
                                   </div>
                                   <div class="prev_btn">
                                       <a href="javascript:;" class="btndefault">Preview Public Mode</a>
                                   </div>
                                </div>
                            </div>
                            <ul class="loc_info">
                                <li>
                                    <a href="javascript:;">
                                        <label><i class="fa fa-map-marker" aria-hidden="true"></i> From</label>
                                          <span class="grade">{country_name[0].name}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <label><i class="fa fa-user" aria-hidden="true"></i> Member Since</label>
                                        <span class="grade"><Moment format="DD/MM/YYYY">{profile_info.created_at}</Moment></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="perfrm_wrap usr_prof">
                            <ul class="desc_wrap">
                                <li>
                                    <h3 data-toggle="tooltip" data-direction="top" title="Tell us more about yourself. Buyers are also interested in learning about you as a person.">Description <a href="javascript:;">Edit Description</a></h3>
                                    <p>Boost your sales, by boosting your expertise.</p>
                                    <form action="javascript:;">
                                       <textarea type="text" minlength="150" maxlength="600" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."></textarea>
                                       <div class="buttons">
                                           <button type="button" class="btndefault btn_cancel">Cancel</button>
                                           <button type="button" class="btndefault btn_update">Update</button>
                                       </div>
                                   </form>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <article class="cont_right">
                    <div class="s_edit_prof">
                                          <div className={this.state.edit_option?"edit_btn":""}>
                                            {this.state.edit_option && <button type="button" class="btndefault" ><i class="fa fa-pencil"></i></button>}
                                            {!this.state.edit_option && <button type="button" class="btn-sm btndefault" >Save</button>}
                                          </div>
                                          <form class="form_control" action="javascript:;">
                                            <div class="fields">
                                              <div class="row">
                                                <div class="col-md-6">
                                                  <div class="field">
                                                    <label>Display Name</label>
                                                    <div class="inputbox">
                                                        <input type="text" name="first_name" placeholder="Display Name" Value={profile_info.display_name} disabled={edit_content_disable}/>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-6">
                                                  <div class="field">
                <label>Email</label>
                                                    <div class="inputbox">
                                                        <input type="text" name="email" placeholder="Email"  Value={localStorage.getItem('email')} disabled={private_edit_content_disable}/>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="fields">
                                              <div class="row">

                                                <div class="col-md-6">
                                                  <div class="field">
                <label>Mobile</label>
                                                    <div class="inputbox">
                                                        <input type="text" name="Phone number" placeholder="Phone number"  Value={profile_info.phone_number} disabled={private_edit_content_disable}/>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-6">
                                                  <div class="field">
                <label>Pincode</label>
                                                    <div class="inputbox">
                                                        <input type="text" name="pincode"  placeholder="Pincode"  Value={profile_info.pincode} disabled={edit_content_disable}/>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div class="fields">
                                              <div class="row">
                                                <div class="col-md-4">
                                                  <div class="field">
                                                  <label>Country</label>
                                                    <div class="inputbox">
                                                      <select disabled={edit_content_disable} id="country_list" onChange={()=>{this.getState()}}>
                                                          {country.map((res,key)=>{
                                                            return(<option selected={res.id==profile_info.country} >{res.name}</option>)
                                                          })}
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-4">
                                                  <div class="field">
                                                  <label>State</label>
                                                    <div class="inputbox">
                                                    <select disabled={edit_content_disable} id="state_list" onChange={()=>{this.getCity()}}>
                                                        {country.map((res,key)=>{
                                                          return(<option selected={res.id==profile_info.country} >{res.name}</option>)
                                                        })}
                                                    </select>
                                                  </div>
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                  <div class="field">
                                                  <label>City</label>
                                                    <div class="inputbox">
                                                    <select disabled={edit_content_disable} >
                                                        {country.map((res,key)=>{
                                                          return(<option selected={res.id==profile_info.country} >{res.name}</option>)
                                                        })}
                                                    </select>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="fields">
                                              <div class="row">
                                                <div class="col-md-12">
                                                  <div class="field">
                                                    <label>Company Info</label>
                                                    <div class="inputbox">
                                                        <textarea placeholder="Write company information here."  disabled={edit_content_disable}>{profile_info.company_info}</textarea>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="fields">
                                              <div class="row">
                                                <div class="col-md-12">
                                                  <div class="field">
                <label>Address</label>
                                                    <div class="inputbox">
                                                        <textarea placeholder="Write your company address here."  disabled={edit_content_disable}>{profile_info.address}</textarea>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div class="fields">
                                              <div class="row">
                                                <div class="col-md-12">
                                                  <div class="field">
                <label>Description</label>
                                                    <div class="inputbox">
                                                      <textarea minlength="150" maxlength="600" placeholder="Share a bit about your work experience, cool projects you’ve completed, and your area of expertise."></textarea>
                                                      <div class="inf">
                                                          <span>min. 150 characters</span>
                                                          <span class="char-count">0/600</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div class="fields">
                                              <div class="row">
                                                <div class="col-md-12">
                                                  <div class="field">
                                                    <label>Personal Website</label>
                                                    <div class="inputbox">
                                                        <input type="url" value="" placeholder="Provide a link to your own professional website" />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div class="buttons">
                                                <button type="submit" class="btndefault">Update</button>
                                            </div>
                                          </form>
                                        </div>

                    </article>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </section>)
      }
      else {
        return(<LoadingGif message={loading_msg}/>)
      }
  }
}
export default Profile;
