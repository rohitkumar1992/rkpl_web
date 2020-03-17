import React from 'react';
import Moment from 'react-moment'
class Profile extends React.Component
{
  render()
  {
    const {profile_info,country}=this.props;
    const country_name=(country.filter((data)=> data.id==profile_info.country));
    return(    <section class="dashb_cont">
            <div class="container">
                <div class="content_dash usercont_dash">
                    <aside class="sidebar_dash">
                        <div class="perfrm_wrap usr_prof">
                            <div class="prof_prog">
                                <div class="prof_det">
                                   <span class="btn_online">{profile_info.status==1?"Active":"Inactive"}</span>
                                   <div class="img">
                                       <a href="javascript:;">
                                           <img src={profile_info.profile_pic} alt="" />
                                       </a>
                                   </div>
                                   <div class="user_det">
                                       <a href="javascript:;" class="name">{profile_info.fname+" "+profile_info.lname}</a>
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
                                    <p>{profile_info.description}</p>
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
                        {/*<div class="user_prof_gigs">
                            <ul class="nav nav-tabs">
                              <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#activegigs">Active Gigs</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#drafts">Drafts</a>
                              </li>
                            </ul>
                            <div class="tab-content">
                                <div id="activegigs" class="tab-pane active">
                                    <div class="cat_gal">
                                        <div class="cat_item">
                                            <div class="box">
                                                <ul class="g_menu">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                                            preview
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pause" aria-hidden="true"></i>
                                                            Pause
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pie-chart" aria-hidden="true"></i>
                                                            Statistics
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-cog" aria-hidden="true"></i>
                                                            Advanced
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div class="img">
                                                    <a href="javascript:">
                                                        <img src="images/dubbing1.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a href="javascript:">I will record any female voice over in german or english</a>
                                                </div>
                                                <div class="price_info">
                                                    <a class="wish gig_ac" href="javascript:;" data-hint="Gig Actions"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                                                    <a class="price" href="javascript:"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>6,340</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cat_item">
                                            <div class="box">
                                                <ul class="g_menu">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                                            preview1
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pause" aria-hidden="true"></i>
                                                            Pause
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pie-chart" aria-hidden="true"></i>
                                                            Statistics
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-cog" aria-hidden="true"></i>
                                                            Advanced
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div class="img">
                                                    <a href="javascript:">
                                                        <img src="images/dubbing2.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a href="javascript:">I will record any female voice over in german or english</a>
                                                </div>
                                                <div class="price_info">
                                                    <a class="wish gig_ac" href="javascript:;" data-hint="Gig Actions"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                                                    <a class="price" href="javascript:"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>6,340</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cat_gal creat_gig">
                                        <div class="cat_item">
                                            <div class="box">
                                                <a href="javascript:;" class="add_gig">
                                                    <span class="plus">+</span>
                                                    <span>Create A New Gig</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="drafts" class="tab-pane">
                                    <div class="cat_gal">
                                        <div class="cat_item">
                                            <div class="box">
                                                <ul class="g_menu">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                                            preview
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pause" aria-hidden="true"></i>
                                                            Pause
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pie-chart" aria-hidden="true"></i>
                                                            Statistics
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-cog" aria-hidden="true"></i>
                                                            Advanced
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div class="img">
                                                    <a href="javascript:">
                                                        <img src="images/dubbing1.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a href="javascript:">I will record any female voice over in german or english</a>
                                                </div>
                                                <div class="price_info">
                                                    <a class="wish gig_ac" href="javascript:;" data-hint="Gig Actions"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                                                    <a class="price" href="javascript:"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>6,340</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cat_gal creat_gig">
                                        <div class="cat_item">
                                            <div class="box">
                                                <a href="javascript:;" class="add_gig">
                                                    <span class="plus">+</span>
                                                    <span>Create A New Gig</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </article>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </section>)
  }
}
export default Profile;
