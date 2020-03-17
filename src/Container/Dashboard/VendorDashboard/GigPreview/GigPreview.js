import React from 'react';
import {Link} from 'react-router-dom';
import {VENDOR_GIG_INFO,USERID,TAG,color_code} from '../../../../url';
import axios from 'axios';
import Not_Found from '../../../../Component/not_found/not_found';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Wordwrap from '../../../../Component/wordwrap';
import LoadingGif from '../../../../Component/Loader/loading_gif'
import ReactJWPlayer from 'react-jw-player';
const responsive={
  320:{items:1},
  480:{items:1},
  600:{items:1},
  960:{items:1},
  1200:{items:1}
  }
class ViewServiceDesc extends React.Component{
  state={isLoading:true,gig_id:'',gig_desc:{},vendor_desc:{},not_found:false,loading_msg:'Please Wait'}
  componentDidMount()
  {
    $('.view_detail .top_links nav ul').on('click', 'li', function() {
    $('.view_detail .top_links nav ul li.active').removeClass('active');
    $(this).addClass('active');
});
    this.setState({gig_id:this.props.match.params.gig_id},function()
  {
    this.getData();
  });
  }
  getData=()=>{
    axios.post(VENDOR_GIG_INFO,{
      'user_id':USERID,
      'tag':TAG,
      'gig_id':this.state.gig_id,
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
         this.setState({gig_desc:response.gig_info,vendor_desc:response.vendor_info});
         setTimeout(()=>this.setState({isLoading:true}),1000);
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.gig_id!=this.state.gig_id )
    {
        // window.scrollTo({top:0, left:0, behavior: 'smooth'});
      this.setState({gig_id:this.props.match.params.gig_id,isLoading:false},function()
    {
      this.getData();
    });
    }
  }
  createMarkup=()=> {
  return {__html: this.state.gig_desc.gig_description};
}
ScrollTo=(scroll_id)=>{
  var myEle = document.getElementById(scroll_id);
  if(myEle)
  {
      $(this).addClass('active').siblings().removeClass('active');
    $(`#${scroll_id}_tab`).addClass('active');
    $('html, body').animate({
      scrollTop: ($(`#${scroll_id}`).offset().top-90)
    }, 500);
  }

}
  render()
  {
    const {isLoading,not_found,gig_desc,vendor_desc,loading_msg}=this.state;
    if(!not_found)
    {
            if(isLoading)
            {
              return(<section class="view_detail top_div">
                      <article class="top_links sticky-top">
                          <nav>
                              <ul>
                                  <li id="overview_tab">
                                      <a href="javascript:"  onClick={()=>this.ScrollTo('overview')}>Overview</a>
                                  </li>
                                  <li  id="description_tab">
                                      <a href="javascript:" onClick={()=>this.ScrollTo('description')}>Description</a>
                                  </li>
                                  <li id="about_vendor_tab">
                                      <a href="javascript:"  onClick={()=>this.ScrollTo('about_vendor')}>About The Vendor</a>
                                  </li>
                                  <li id="review_tab" >
                                      <a href="javascript:" onClick={()=>this.ScrollTo('review')}>Reviews</a>
                                  </li>
                              </ul>
                              <div class="actions">
    

                              </div>
                          </nav>
                      </article>
                      <article class="view_page">
                          <div class="container">
                              <div class="main_cont">
                                  <div class="box">
                                      <div class="overview" id="overview">
                                          {/*<div class="breadcrumb">
                                              <ul>
                                                  <li>
                                                      <a href="javascript:;">Home</a>
                                                  </li>
                                                  <li>
                                                      <a href="javascript:;">Dubbing</a>
                                                  </li>
                                                  <li>
                                                      <a href="javascript:;">Voice Over</a>
                                                  </li>
                                              </ul>
                                              <div class="clearfix"></div>
                                          </div>*/}
                                          <h2>{gig_desc.gig_title}</h2>
                                          <div class="user_overview">
                                              <div class="user_img">
                                                  <div class="icon">
                                                      <img src={vendor_desc.profile_pic} alt="" />
                                                  </div>
                                                  <div class="name">
                                                      <a href="javascript:;">{gig_desc.vendor_name}</a>
                                                      <div class="seller_level" data-toggle="tooltip" data-placement="top" title="Completed at least 10 orders on time with a minimum 4.8 rating">
                                                          Level 1 Seller
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="user_rating">
                                                  <div class="star">
                                                      <span class="fa fa-star checked"></span>
                                                      <span class="fa fa-star checked"></span>
                                                      <span class="fa fa-star checked"></span>
                                                      <span class="fa fa-star"></span>
                                                      <span class="fa fa-star"></span>
                                                  </div>
                                                  <div class="ttl_rat">5.0</div>
                                                  <a href="javascript:;" class="ttl_rev">(19)</a>
                                              </div>
                                          </div>

                                          <div class="slider_area">
                                              <div class="slider-container">
                                              <OwlCarousel
                                                 className="owl-theme"
                                                 items={1}
                                                 nav={true}
                                                 loop={true}
                                                 autoplay={false}
                                                 autoplayTimeout={7000}
                                                 smartSpeed={1500}
                                                 id="slider"
                                                 >
                                                    <div class="item" style={{backgroundColor:'#FCEDE8'}}>
                                                       <div class="content">
                                                          <img src={gig_desc.gig_image_1} class="img-responsive" />
                                                       </div>
                                                    </div>
                                                    <div class="item" style={{backgroundColor:'#FDF6E7'}}>
                                                       <div class="content">
                                                          <img src={gig_desc.gig_image_2} class="img-responsive" />
                                                       </div>
                                                    </div>
                                                    <div class="item" style={{backgroundColor:'#FEFDE6'}}>
                                                       <div class="content">
                                                          <img src={gig_desc.gig_image_3} class="img-responsive" />
                                                       </div>
                                                    </div>
                                                    <div class="item" style={{backgroundColor:'#FFFFE5'}}>
                                                       <div class="content">
                                                       <ReactJWPlayer
                                                       style={{backgroundColor:'grey'}}
                                                       ref={(ref) => { this.player = ref }}
                                                       playerId='jw-player'
                                                       image={`${gig_desc.gig_image_3}`}
                                                       playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                                                       file={gig_desc.gig_video_url}
                                                       aspectRatio="16:9"
                                                       isAutoPlay={false}
                                                       controls={true}
                                                       repeat="true"
                                                         customProps={{
                                                           controls: true,
                                                           repeat: true,
                                                           stretching: 'fill',
                                                           preload: 'auto',
                                                           volume: 100,
                                                           width: '100%',
                                                           height: '100%',
                                                       }}
                                                       />
                                                       </div>
                                                    </div>

                                                  </OwlCarousel>
                                                  {/*<div class="slider-controls">
                                                    <a class="slider-left" href="javascript:;"><span><i class="fa fa-angle-left"></i></span></a>
                                                    <a class="slider-right" href="javascript:;"><span><i class="fa fa-angle-right"></i></span></a>
                                                  </div>*/}
                                              </div>
                                              {/*<div class="thumbnail-slider-container">
                                                 <div id="thumbnailSlider" class="thumbnail-slider owl-carousel">
                                                    <div class="item">
                                                       <div class="content">
                                                          <img src={gig_desc.gig_image_1} class="img-responsive" />
                                                       </div>
                                                    </div>
                                                    <div class="item">
                                                       <div class="content">
                                                          <img src={gig_desc.gig_image_2} class="img-responsive" />
                                                       </div>
                                                    </div>
                                                    <div class="item">
                                                       <div class="content">
                                                          <img src={gig_desc.gig_image_3} class="img-responsive" />
                                                       </div>
                                                    </div>
                                                 </div>
                                              </div>*/}
                                              <div class="clearfix"></div>
                                          </div>
                                      </div>

                                      <div class="desc" id="description">
                                          <h3>About This Gig</h3>
                                          {/*<p><span>First,</span> we define exactly what you're looking for- trailer, hard/soft sell, documentary, corporate, storyteller, character, older or younger- as a highly versatile voice actor, the more precise you are in your description, the more accurate the nuances of my recording will be.</p>
                                          <p><span>Next,</span> I record in my professional studio (AKG C414 mic & RME Fireface UC) and send the files to you in the format of your choice. For an additional fee you can be in on the recording by Skype or Source Connect and give me live direction. Then you provide your feedback and if necessary, I fix it.</p>
                                          <p><span>Finally...</span> you get just what you need (and all within 48 hours!)</p>
                                          <p>Highly Satisfied Customer include:</p>
                                          <ul class="bul_list">
                                              <li>IBM</li>
                                              <li>DJI</li>
                                              <li>British Gas</li>
                                              <li>NICE</li>
                                          </ul>
                                          <p><span>A pleasure working with Bobby.</span> Wonderful delivery of the script along with a timely and professional recording. We will definitely work together again!" (Creative House Group)</p>
                                          <ul class="metadt">
                                              <li>
                                                  <p>Gender</p>
                                                  <span>Male</span>
                                              </li>
                                              <li>
                                                  <p>Purpose</p>
                                                  <span>Video Narration, Radio, TV</span>
                                              </li>
                                              <li>
                                                  <p>Language</p>
                                                  <span>English</span>
                                              </li>
                                              <li>
                                                  <p>Accent</p>
                                                  <span>English British</span>
                                              </li>
                                              <li>
                                                  <p>Age Range</p>
                                                  <span>Adult</span>
                                              </li>
                                          </ul>*/}

                                     <p dangerouslySetInnerHTML={this.createMarkup()} ></p>
                                       <div class="clearfix"></div>
                                      </div>

                                      <div class="prof_card" id="about_vendor">
                                          <h3>About The Vendor</h3>
                                          <div class="prof_info">
                                              <div class="prof_img">
                                                  <img src={vendor_desc.profile_pic} alt="" />
                                                  <a href="javascript:;">Level One</a>
                                              </div>
                                              <div class="prof_label">
                                                  <div class="name">
                                                      <a href="javascript:;">{vendor_desc.fname}&nbsp;{vendor_desc.lname}</a>
                                                  </div>
                                                  <p class="desctxt">{vendor_desc.description}</p>
                                                  <div class="user_rating">
                                                      <div class="star">
                                                          <span class="fa fa-star checked"></span>
                                                          <span class="fa fa-star checked"></span>
                                                          <span class="fa fa-star checked"></span>
                                                          <span class="fa fa-star"></span>
                                                          <span class="fa fa-star"></span>
                                                      </div>
                                                      <div class="ttl_rat">5.0</div>
                                                      <a href="javascript:;" class="ttl_rev">(19)</a>
                                                  </div>
                                                  {/*<a href="javascript:;" class="btn btn_cont">Contact Me</a>*/}
                                              </div>
                                              <div class="clearfix"></div>
                                          </div>
                                          <div class="verify_info">
                                              <div class="verify">
                                                  <img src="images/icon_pro_verify.png" alt=""/>
                                              </div>
                                              <ul>
                                                  <li><i class="fa fa-check-circle"></i> E-Commerce Development</li>
                                                  <li><i class="fa fa-check-circle"></i> Website Builders & CMS</li>
                                                  <li><i class="fa fa-check-circle"></i> Data Analysis & Reports</li>
                                                  <li><i class="fa fa-check-circle"></i> Local Listings</li>
                                                  <li><i class="fa fa-check-circle"></i> Social Media Marketing</li>

                                              </ul>
                                          </div>
                                          <div class="stats_desc">
                                              <ul class="user_stats">
                                                  <li>From <strong>Israel</strong></li>
                                                  <li>Member since <strong>July 2016</strong></li>
                                                  <li>Avg. Response Time <strong>1 hour</strong></li>
                                                  <li>Recent Delivery <strong>4 days</strong></li>
                                              </ul>
                                              <div class="sellr_desc">
                                                  <p>Over 25 years of professional voice work on an enormous range of projects ranging from documentaries to commercials, corporate movies to IVR systems and learning materials, all with an emphasis on vocal versatility and backed up by professionalism & punctuality.</p>
                                              </div>
                                          </div>
                                          <div class="clearfix"></div>
                                      </div>

                                      {/*<div class="related_tags">
                                          <h3>Related Tags</h3>
                                          <ul>
                                              <li>
                                                  <a href="javascript::" class="btn btn_tag">voice actor</a>
                                              </li>
                                              <li>
                                                  <a href="javascript::" class="btn btn_tag">dubbing</a>
                                              </li>
                                              <li>
                                                  <a href="javascript::" class="btn btn_tag">narrator</a>
                                              </li>
                                              <li>
                                                  <a href="javascript::" class="btn btn_tag">voice artist</a>
                                              </li>
                                              <li>
                                                  <a href="javascript::" class="btn btn_tag">voice talent</a>
                                              </li>
                                          </ul>
                                      </div>*/}
                                  </div>
                              </div>
                              <aside class="sidebar_view sticky-top">
                                  <div class="verified_pack">
                                      <img src="images/logo.png" alt="" />
                                      <p>Hand-vetted professionals, verified for quality and service.</p>
                                      {/*<a href="javascript:;">Learn More</a>*/}
                                  </div>

                                  <div class="order_det">
                                      <ul class="nav nav-tabs">
                                          <li><a class="active" data-toggle="tab" href="#premium">Premium</a></li>
                                          <li><a data-toggle="tab" href="#standard">Standard</a></li>
                                          <li><a data-toggle="tab" href="#basic">Basic</a></li>
                                      </ul>
                                      <div class="tab-content">
                                          <div id="premium" class="tab-pane in active">
                                              <div class="orderprice">
                                                  <h3>
                                                      Order Details
                                                      <span><i class="fa fa-inr" aria-hidden="true"></i>{gig_desc.premium_pack_price}</span>
                                                  </h3>
                                              </div>
                                              <div class="desc">
                                                  <p>{gig_desc.premium_pack_description}</p>
                                              </div>
                                              <div class="pack_cont">
                                                  <div class="del_time">
                                                      <div class="delivry"><i class="fa fa-clock-o" aria-hidden="true"></i>{gig_desc.premium_pack_delivery_time} Days Delivery</div>
                                                      <div class="revision"><i class="fa fa-repeat" aria-hidden="true"></i> {gig_desc.premium_pack_revision} Revision</div>
                                                  </div>
                                                  <div class="features">
                                                      <h4 data-toggle="collapse" data-target="#features_list">What's Included <i class="fa fa-angle-down" aria-hidden="true"></i></h4>
                                                      <ul class="features_list" id="features_list" style={{display:"none"}}>
                                                          <li>Design Customization</li>
                                                          <li>Content Upload</li>
                                                          <li class="noinclude">Responsive Design</li>
                                                      </ul>
                                                  </div>
                                              </div>
                                              {/*<button type="submit" class="btn btn_cont">Continue(<i class="fa fa-inr" aria-hidden="true"></i>{gig_desc.premium_pack_price})</button>
                                              <a href="javascript:;" class="compr_pckg">Compare Packages</a>*/}
                                          </div>
                                          <div id="standard" class="tab-pane fade">
                                              <div class="orderprice">
                                                  <h3>
                                                      Order Details
                                                      <span><i class="fa fa-inr" aria-hidden="true"></i>{gig_desc.standard_pack_price}</span>
                                                  </h3>
                                              </div>
                                              <div class="desc">
                                                  <p>{gig_desc.standard_pack_description}</p>
                                              </div>
                                              <div class="pack_cont">
                                                  <div class="del_time">
                                                      <div class="delivry"><i class="fa fa-clock-o" aria-hidden="true"></i> {gig_desc.standard_pack_delivery_time} Days Delivery</div>
                                                      <div class="revision"><i class="fa fa-repeat" aria-hidden="true"></i> {gig_desc.standard_pack_revision} Revision</div>
                                                  </div>
                                                  <div class="features">
                                                      <h4 data-toggle="collapse" data-target="#features_list">What's Included <i class="fa fa-angle-down" aria-hidden="true"></i></h4>
                                                      <ul class="features_list" id="features_list" style={{display:"none"}}>
                                                          <li>Design Customization</li>
                                                          <li>Content Upload</li>
                                                          <li class="noinclude">Responsive Design</li>
                                                      </ul>
                                                  </div>
                                              </div>
                                              {/*<button type="submit" class="btn btn_cont">Continue(<i class="fa fa-inr" aria-hidden="true"></i>{gig_desc.standard_pack_price})</button>
                                              <a href="javascript:;" class="compr_pckg">Compare Packages</a>*/}
                                          </div>
                                          <div id="basic" class="tab-pane fade">
                                              <div class="orderprice">
                                                  <h3>
                                                      Order Details
                                                      <span><i class="fa fa-inr" aria-hidden="true"></i>{gig_desc.basic_pack_price}</span>
                                                  </h3>
                                              </div>
                                              <div class="desc">
                                                  <p>{gig_desc.basic_pack_description}</p>
                                              </div>
                                              <div class="pack_cont">
                                                  <div class="del_time">
                                                      <div class="delivry"><i class="fa fa-clock-o" aria-hidden="true"></i> {gig_desc.basic_pack_delivery_time} Days Delivery</div>
                                                      <div class="revision"><i class="fa fa-repeat" aria-hidden="true"></i> {gig_desc.basic_pack_revision} Revision</div>
                                                  </div>
                                                  <div class="features">
                                                      <h4 data-toggle="collapse" data-target="#features_list">What's Included <i class="fa fa-angle-down" aria-hidden="true"></i></h4>
                                                      <ul class="features_list" id="features_list" style={{display:"none"}}>
                                                          <li>Design Customization</li>
                                                          <li>Content Upload</li>
                                                          <li class="noinclude">Responsive Design</li>
                                                      </ul>
                                                  </div>
                                              </div>
                                              {/*<button type="submit" class="btn btn_cont">Continue(<i class="fa fa-inr" aria-hidden="true"></i>{gig_desc.basic_pack_price})</button>
                                              <a href="javascript:" class="compr_pckg">Compare Packages</a>*/}
                                          </div>
                                      </div>
                                  </div>
                                  {/*<div class="contct_seller">
                                      <a href="javascript:;" class="btn btn_sellercontct">Contact Vendor</a>
                                  </div>*/}
                              </aside>
                          </div>
                      </article>
                      <div class="user_itemlist">
                          <div class="container">

                          </div>
                      </div>
                      <div class="clearfix"></div>
                  </section>)
            }
            else {
              return(<LoadingGif message={loading_msg}/>);
            }
          }
    else {
      return(<Not_Found/>)
    }
  }
}
export default ViewServiceDesc;
