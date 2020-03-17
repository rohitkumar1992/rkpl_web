import React from 'react';
import {VENDOR_GIG_TAB_CONTENT,USERID,TAG,HEADER,VENDORID,VENDORSERVICECHANGESTATUS} from '../../../../url';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import axios from 'axios';
import Not_Found from '../../../../Component/not_found/not_found';
import $ from 'jquery';
import Tabs from '../tabs/tabs';
import Pagination from "react-js-pagination";
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import More from '../more_dots/more_dots';
import LoadingGif from '../../../../Component/Loader/loading_gif'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const responsive={
  320:{items:1},
  480:{items:1},
  600:{items:1},
  960:{items:1},
  1200:{items:1}
  }
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
class DashboardLandingPage extends React.Component{
  state={isLoading:false,loading_msg:'Please Wait',not_found:false,tab_index:1,tab_count:[],tab_data:[],itemsCountPerPage:5,current_page:1,total_pages:1,pageRangeDisplayed:3}
  componentDidMount()
  {
//  this.getData(this.state.current_page,this.state.tab_index);
    setTimeout(()=>this.setState({isLoading:true}),1000)
  }
  getData=(page,tab_index)=>{
    axios.post(`${VENDOR_GIG_TAB_CONTENT}?page=${page}`,{
      'user_id':localStorage.getItem('user_id'),
      'vendor_id':localStorage.getItem('vendor_id'),
      'tag':TAG,
      'limit':this.state.itemsCountPerPage,
      'tab_index':tab_index
    },VENDOR_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({current_page:response.tab_data.current_page,tab_count:response.tabs,tab_data:response.tab_data.data,total_pages:response.tab_data.total});
        setTimeout(()=>this.setState({isLoading:true}),1000)
      }
      else {

      }
    }).catch((error)=>{

    });
  }
  render()
  {
    const {isLoading,not_found,tab_data,loading_msg}=this.state;
    const {profile_info}=this.props;
    if(!not_found)
    {
      if(isLoading)
      {
      return( <section class="dashb_cont top_div">
              <div class="container">
                  <div class="content_dash">
                      <aside class="sidebar_dash">
                          <div class="perfrm_wrap">
                              <div class="prof_prog">
                                  <div class="prof_det">
                                     <span class="btn_online">{profile_info.status==1?"Active":"Inactive"}</span>
                                     <div class="img">
                                         <a href="javascript:">
                                             <img src={profile_info.profile_pic==null?"images/dash_user.png":profile_info.profile_pic} alt="" />
                                         </a>
                                     </div>
                                     <div class="user_det">
                                         <a href="javascript:" class="name">{profile_info.display_name}</a>
                                         <div class="rating" >
                                             <i class="fa fa-star"></i>
                                             <span class="star_val">N/A</span>
                                         </div>
                                     </div>
                                  </div>
                                  <div class="sell_prof_btns">
                                      <Link to="/dashboard/seller/bidding/create_bid" class=""><i class="fa fa-gift" aria-hidden="true"></i> Create Offer</Link>
                                      <Link to="/dashboard/seller/add_asset/image" class=""><i class="fa fa-upload" aria-hidden="true"></i> Add Image</Link>
                                      <Link to="/dashboard/seller/add_asset/video" class=""><i class="fa fa-video-camera" aria-hidden="true"></i> Add Video</Link>
                                  </div>
                                  {/*<ul class="progres">
                                      <li>
                                          <a href="javascript:;">
                                              <label>Response Rate</label>
                                              <div class="prog_bar" data-toggle="tooltip" data-direction="top" title="Respond to 90% of the inquiries you received in the last 60 days">
                                                  <div class="bar">
                                                      <span class="fill" style={{width:"100%"}}></span>
                                                  </div>
                                                  <div class="bar_val">100%</div>
                                              </div>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="javascript:;">
                                              <label>Delivered on Time</label>
                                              <div class="prog_bar" data-toggle="tooltip" data-direction="top" title="Delivered 90% of the inquiries you received in the last 60 days">
                                                  <div class="bar">
                                                      <span class="fill" style={{width:"100%"}}></span>
                                                  </div>
                                                  <div class="bar_val">100%</div>
                                              </div>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="javascript:;">
                                              <label>Order Completion</label>
                                              <div class="prog_bar" data-toggle="tooltip" data-direction="top" title="Complete 90% of the inquiries you received in the last 60 days">
                                                  <div class="bar">
                                                      <span class="fill" style={{width:"100%"}}></span>
                                                  </div>
                                                  <div class="bar_val">100%</div>
                                              </div>
                                          </a>
                                      </li>
                                  </ul>*/}
                              </div>
                              {/*<ul class="txt_wrap">
                                  <li title="Total earnings and pending clearance in December" data-toggle="tooltip" data-direction="top">
                                      <a href="javascript:;">
                                          <label>Earned in December</label>
                                          <span class="grade"><i class="fa fa-inr"></i>0</span>
                                      </a>
                                  </li>
                                  <li title="Your average response time to first messages, over the course of the last 60 days" data-toggle="tooltip" data-direction="top">
                                      <a href="javascript:;">
                                          <label>Response Time</label>
                                          <span class="grade">N/A</span>
                                      </a>
                                  </li>
                              </ul>*/}
                          </div>
                          <div class="perfrm_wrap inbox">
                              <ul class="inbox_wrap">
                                  <li>
                                      <label>Inbox</label>
                                      <Link to="/dashboard/seller/message" class="">View All</Link>
                                  </li>
                              </ul>
                          </div>
                      </aside>
                      <article class="cont_right">
                          <h3><span>Upgrade your Business</span></h3>
                          {/*<div class="ttl_cards">
                            <div class="row">
                              <div class="col-xl-4 col-lg-4 col-sm-6">
                                <div class="card clr1">
                                  <div class="icon">
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                  </div>
                                  <div class="number">
                                    <span>Image</span>
                                  </div>
                                  <div class="ttl">
                                    <p>30</p>
                                  </div>
                                  <a>Total Views</a>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-sm-6">
                                <div class="card clr2">
                                  <div class="icon">
                                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                                  </div>
                                  <div class="number">
                                    <span>Video</span>
                                  </div>
                                  <div class="ttl">
                                    <p>10</p>
                                  </div>
                                  <a>Total Views</a>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-sm-6">
                                <div class="card clr3">
                                  <div class="icon">
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                  </div>
                                  <div class="number">
                                    <span>Image</span>
                                  </div>
                                  <div class="ttl">
                                    <p>10</p>
                                  </div>
                                  <a>Total Downloads</a>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-sm-6">
                                <div class="card clr4">
                                  <div class="icon">
                                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                                  </div>
                                  <div class="number">
                                    <span>Video</span>
                                  </div>
                                  <div class="ttl">
                                    <p>10</p>
                                  </div>
                                  <a>Total Downloads</a>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-sm-6">
                                <div class="card clr5">
                                  <div class="icon">
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                  </div>
                                  <div class="number">
                                    <span>Revenue</span>
                                  </div>
                                  <div class="ttl">
                                    <p>0</p>
                                  </div>
                                  <a>Total Revenue</a>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-sm-6">
                                <div class="card clr6">
                                  <div class="icon">
                                    <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
                                  </div>
                                  <div class="number">
                                    <span>Negotiation</span>
                                  </div>
                                  <div class="ttl">
                                    <p>20</p>
                                  </div>
                                  <a>Total No. of Negotiations</a>
                                </div>
                              </div>
                            </div>
                            <div class="clearfix"></div>
                          </div>*/}

                          <div class="dash_cards">
                            <div class="row">
                              <div class="col-xl-2 col-lg-3 col-sm-4">
                                <div class="d_card clr1">
                                  <div class="icon">
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                    <span class="num"><b>Views:</b> 30</span>
                                  </div>
                                  <div class="title">Image</div>
                                </div>
                              </div>
                              <div class="col-xl-2 col-lg-3 col-sm-4">
                                <div class="d_card clr2">
                                  <div class="icon">
                                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                                    <span class="num"><b>Views:</b> 10</span>
                                  </div>
                                  <div class="title">Video</div>
                                </div>
                              </div>
                              <div class="col-xl-2 col-lg-3 col-sm-4">
                                <div class="d_card clr3">
                                  <div class="icon">
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                    <span class="num"><b>Downloads:</b> 10</span>
                                  </div>
                                  <div class="title">Image</div>
                                </div>
                              </div>
                              <div class="col-xl-2 col-lg-3 col-sm-4">
                                <div class="d_card clr4">
                                  <div class="icon">
                                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                                    <span class="num"><b>Downloads:</b> 10</span>
                                  </div>
                                  <div class="title">Video</div>
                                </div>
                              </div>
                              <div class="col-xl-2 col-lg-3 col-sm-4">
                                <div class="d_card clr5">
                                  <div class="icon">
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                    <span class="num"><b>Revenue:</b> 0</span>
                                  </div>
                                  <div class="title">Revenue</div>
                                </div>
                              </div>
                              <div class="col-xl-2 col-lg-3 col-sm-4">
                                <div class="d_card clr6">
                                  <div class="icon">
                                    <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
                                    <span class="num"><b>Negotiation:</b> 20</span>
                                  </div>
                                  <div class="title">Negotiation</div>
                                </div>
                              </div>
                            </div>
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
    else {
      return(<Not_Found/>)
    }
  }
}
export default DashboardLandingPage;
