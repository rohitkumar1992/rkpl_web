import React from 'react';
import {LOGOUT,TAG,TOKEN,USERLIST,USERID} from '../url.js';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import cogoToast from 'cogo-toast';
 import 'react-toastify/dist/ReactToastify.css';
 import { ToastContainer, toast,cssTransition} from 'react-toastify';
 const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
class Header extends React.Component
{
  state={searchValue:'',searchType:'all'}
  componentDidMount()
  {
    $('.planet_nav > ul > li.user_infodet > a').on('click', function(){
      $('body').addClass('bfix');
    });
    $('.planet_nav > ul > li.user_infodet .closebtn, .planet_nav > ul > li.user_infodet .overlay , .close_side').on('click', function(){
      $('body').removeClass('bfix');
    });
    this.setState({searchValue:this.props.keyword,searchType:this.props.type})
  }
  logOut=()=>{
   const HEADER = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    };
    axios.post(LOGOUT,{
      'tag':'web'
    },HEADER).then((res)=>{
      if(res.data.success==1)
      {
        // localStorage.setItem('user_id',0);
        // localStorage.setItem('seller_id',0);
        // localStorage.setItem('vendor_id',0);
        // localStorage.setItem('planetshare_web_token',null);
        localStorage.clear();
          localStorage.setItem('user_id',0);
      toast('Logging Out ',{ transition: Zoom,});
      setTimeout(()=>window.location.href='/',1000);
      }
      else {
        alert(res.data.msg);
      }
    }).catch((error)=>{

    })
  }
  searchSubmit=(e)=>{
    e.preventDefault();
    var searchValue=this.state.searchValue.trim();
    if(searchValue=="")
    {
      return false;
    }
    else
    {
      //this.props.history.push('/web');
      this.props.history.push(`/web/search/keyword/${this.state.searchType}/${(searchValue.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}`)
    }
  }
  componentDidUpdate()
  {
    // var result=this.props.location.pathname.split('/');
    // console.log(result);
    // if(result[2]=="search" && result[3]=="keyword" && (result[4]!=this.state.searchType || result[5]!=this.state.searchValue))
    // {
    //   this.setState({searchValue:result[5],searchType:result[4]})
    // }
  }
  render()
  {
    // console.log(this.props.keyword);
  return(
    <header class="home_header">
        <div class="header_wrap">
            <div class="header_row">
                <div class="logo">
                    <Link to="/"><img src="images/logo.png" alt="" /></Link>
                </div>
                <div class="searchbox">
                <form onSubmit={this.searchSubmit}>
                                      <div class="inputbox">
                                          <select class="select_i" onChange={(e)=>this.setState({searchType:e.target.value})}>
                                            <option selected value="all">All</option>
                                            <option value="image">Image</option>
                                            <option value="video">Video</option>
                                          </select>
                                          <i class="fa fa-search" aria-hidden="true"></i>
                                          <input type="text" placeholder="What you want to Buy Today?" value={this.state.searchValue} onChange={(e)=>{this.setState({searchValue:e.target.value})}}/>
                                          <button type="submit">Search</button>
                                      </div>
                                      <div class="clearfix"></div>
                                  </form>
                    <div class="clearfix"></div>
                </div>
                <nav class="planet_nav planet_nav_right">
                    <ul>
                        <li>
                            <Link to="/web/vendor">Partner with us</Link>
                        </li>
                        <li>
                            <Link to="/web/seller">Sell on Planetshare</Link>
                        </li>
                        {/*<li class="dropdown">
                            <a class="dropdown-toggle" href="Javascript:;" data-toggle="dropdown"><span><i class="fa fa-user-circle" aria-hidden="true"></i></span></a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="javascript:;">Dashboard</a>
                                <a class="dropdown-item" href="javascript:;">Logout</a>
                            </div>
                        </li>*/}
                          {localStorage.getItem('user_id')==0 && <li>
                          <Link to="/login" class="btn btn_join">Join</Link>
                        </li>}
                        {localStorage.getItem('user_id')!=0 &&
                      <li class="dropdown user_infodet">
                            <a class="icon_user_login" href="Javascript:;"><span><i class="fa fa-user-circle" aria-hidden="true"></i></span></a>
                            <div class="overlay"></div>
                            <div class="user_infobox">
                                <span class="closebtn">&#10005;</span>
                                <div class="user_name">
                                    <h3>Hi, {localStorage.getItem('email')}</h3>
                                    <span>User ID: {localStorage.getItem('account_id')}</span>
                                    <Link to="/web/profile" class="prof_edit_icon close_side"><i class="fa fa-pencil"></i></Link>
                                </div>
                                <div class="browse_plan">
                                    <h3>Browse plans and pricing</h3>
                                    <ul class="browse_list">
                                      <li><Link to="/web/packs/image"  class="close_side">Image</Link></li>
                                      <li><Link to="/web/packs/video" class="close_side">Video </Link></li>
                                      {/*<li><a href="javascript:;">Music</a></li>
                                      <li><a href="javascript:;">Editorial</a></li>*/}
                                    </ul>
                                </div>
                                <div class="links">
                                    <ul class="link_list">
                                        {/*<li><a href="javascript:;"><i class="fa fa-university" aria-hidden="true"></i> Account Details</a></li>*/}
                                        <li><Link to="/web/orders"  class="close_side"><i class="fa fa-database" aria-hidden="true"></i>Your Orders</Link></li>
                                        <li class="features">
                                            <a href="javascript:;" data-toggle="collapse" data-target="#features_list"><i class="fa fa-sticky-note-o" aria-hidden="true"></i> Collections</a>
                                            <ul class="features_list" id="features_list" style={{display:"none"}}>
                                                <li><Link to="/web/imagecollection" class="close_side">Image Collection</Link></li>
                                                <li><Link to="/web/videocollection" class="close_side">Video Collection</Link></li>
                                                {/*<li><a href="javascript:;">Music Collection</a></li>*/}
                                            </ul>
                                        </li>
                                        <li class="features">
                                            <a href="javascript:;" data-toggle="collapse" data-target="#down_list"><i class="fa fa-download" aria-hidden="true"></i> Downloads</a>
                                            <ul class="features_list" id="down_list" style={{display:"none"}}>
                                                <li><Link to="/web/image_download_list" class="close_side">Image Download</Link></li>
                                                <li><Link to="/web/video_download_list" class="close_side">Video Download</Link></li>

                                            </ul>
                                        </li>
                                        <li>
                                        <a href="javascript:" onClick={()=>this.logOut()}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>}




                    </ul>
                </nav>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="header_bot">
            <div class="header_row">
                <nav class="navbar navbar-expand-md">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon">X</span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                              {/*<li class="nav-item">
                                <a class="nav-link dropdown-toggle" href="Javascript:;" data-toggle="dropdown">Transcoding</a>
                              <div class="dropdown-menu">
                                    <a class="dropdown-item" href="javascript:;">Logo Design <span class="fit-tag">new</span></a>
                                    <a class="dropdown-item" href="javascript:;">Business Cards & Stationery</a>
                                    <a class="dropdown-item" href="javascript:;">Illustration</a>
                                    <a class="dropdown-item" href="javascript:;">Brochure Design</a>
                                    <a class="dropdown-item" href="javascript:;">Poster Design</a>
                                    <a class="dropdown-item" href="javascript:;">Flyer Design</a>
                                    <a class="dropdown-item" href="javascript:;">Cartoons & Comics</a>
                                    <a class="dropdown-item" href="javascript:;">Portraits & Caricatures</a>
                                    <a class="dropdown-item" href="javascript:;">Packaging Design</a>
                                    <a class="dropdown-item" href="javascript:;">Infographic Design</a>
                                </div>
                            </li>*/}
                            <li class="nav-item">
                                <Link class="nav-link" to="/web/services/dubbing">Dubbing</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/web/services/transcoding">Transcoding</Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Auto Tagging</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Subtitling & Caption</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Streaming</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Archiving</a>
                            </li>
                            {/*<li class="nav-item">
                                <a class="nav-link" href="javascript:;">Auto Tagging</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:;">Subtitling & Caption</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:;">Streaming</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:;">Archiving</a>
                            </li>*/}
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="clearfix"></div>
        </div>
    </header>)
        }
}
export default Header;
