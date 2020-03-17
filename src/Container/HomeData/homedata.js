
import React from 'react';
import {Link} from 'react-router-dom';
import {HOMEDATA,GETCATEGORY,USERID,color_code} from '../../url';
import axios from 'axios';
import Loader from '../../Component/Loader/loader';
import Wordwrap from '../../Component/wordwrap';
import cogoToast from 'cogo-toast';
import ReactJWPlayer from 'react-jw-player';
import Duration from '../../Component/duration'
class HomeData extends React.Component{
  state={isLoading:false,service_list:[],gallery_list:[],category_list:[],image_category_data:[],video_category_data:[],
bid_list:[]}
  componentDidMount()
  {
    this.getHomeData();
  }
  getHomeData=()=>{
    axios.get(HOMEDATA).then((res)=>{
      var response=res.data;
      if(res.data.success==1)
      {
         this.setState({bid_list:response.bid_list[1].listing,service_list:response.services,gallery_list:response.gallery_list,category_list:response.category_list});
         setTimeout(()=>this.setState({isLoading:true}),1000);
      }
    }).catch((error)=>{

    })
  }
  createMarkup=(desc)=> {
  return {__html: desc};
}
  render()
  {
    const {service_list,gallery_list,isLoading,image_category_data,video_category_data,category_list,bid_list}=this.state;
    const service=(service_list.length>0 && service_list.map((res,key)=>{
      return(      <article class="cat_gal_wrap" key={key}>
                          {res.get_gigs_list.length>0 && <aside class="cat_gal_head">
                              <h2>{res.service_name} Services</h2>
                              <Link to={`/web/viewall/${(res.service_name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`}  class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></Link>
                          </aside>}
                          <aside class="cat_list_box">
                              <div class="cat_gal">
                              {res.get_gigs_list.slice(0,5).map((result,key1)=>{
                                  return(<div class="cat_item">
                                          <div class="box">
                                            <Link to={`/web/vendorservice_description/${result.vendor_service_gigs_id}/${result.id}`}>
                                                <div class="img" style={{backgroundColor:color_code[Math.floor(Math.random()*color_code.length)]}}>
                                                    <a>
                                                        <img src={result.gig_image_1} alt="" />
                                                    </a>
                                                </div>
                                                <div class="sell_info">
                                                    <a><img src={result.get_profile_picture.profile_pic} alt="" />{result.vendor_name}</a>
                                                </div>
                                                <div class="desc">
                                                    <a><Wordwrap name={result.gig_title} count={8}/></a>
                                                </div>
                                                <div class="review">
                                                    <div class="rating">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <span class="rating_val">4.5</span>
                                                        <span class="rat_count">(1)</span>
                                                    </div>
                                                    {/*<div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Planetshare for quality and service.">
                                                        <img src="images/seller_logo.svg" alt="" />
                                                    </div>*/}
                                                </div>
                                            </Link>
                                            <div class="price_info">
                                                <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                                <a class="price" href="javascript:"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>{result.basic_pack_price}</a>
                                            </div>
                                          </div>
                                      </div>)
                              })}
                              </div>
                              <div class="clearfix"></div>
                          </aside>
                          <div class="clearfix"></div>
                      </article>)
    }));
    const Gallery=(gallery_list.length>0 && gallery_list.map((res,key)=>{
      return(<article class="cat_gal_wrap ver_cat" key={key}>
                {res.listing.length>0 && <aside class="cat_gal_head">
                    <h2>{res.name}</h2>
                      <Link to={`/web/viewall/${(res.cat_name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.cat_id}`} class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></Link>
                </aside>}
                    <div class="ver_cat_list">
                    {res.listing.slice(0,8).map((result,key1)=>{
                      return(<div class="item" style={{backgroundColor:color_code[Math.floor(Math.random()*color_code.length)]}}>
                                  <Link to={res.cat_id==6?`/web/image/${(result.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`:`/web/video/${(result.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`} class="box">
                                      <div class="img" >
                                          <img class="load_place_vert1" src={result.large_thumb} alt=""/>
                                      </div>
                                      <div class="desc">
                                          <span class="title">{result.title.replace(/^(.{8}[^\s]*).*/, "$1")}</span>
                                          <div class="det" dangerouslySetInnerHTML={this.createMarkup(result.short_desc)}></div>
                                      </div>
                                  </Link>
                              </div>)
                    })}
                </div>
                  <div class="clearfix"></div>
            </article>
);
}));
const Category_List=(category_list.length>0 && category_list.map((res,key)=>{
  return( <article class="home_ser_wrap" key={key}>
          <aside class="ser_gal_head">
              <h2>{res.name}</h2>
              {res.cat_id=="image_cat" && <Link to={`/web/viewall/imagecat/6_jiesf12img_cat`} class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></Link>}
              {res.cat_id=="video_cat" && <Link to={`/web/viewall/videocat/6_jiesf12vid_cat`} class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></Link>}
          </aside><aside class="ser_list_box">
              <div class="row">
          {res.listing.slice(0,6).map((result,key1)=>{
            return( <div class="col col-sm-6 col-md-2" style={{backgroundColor:color_code[Math.floor(Math.random()*color_code.length)]}}>
                          <Link to={res.cat_id=="image_cat"?`/web/imagecategorydata/${(result.cat_name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`:`/web/videocategorydata/${(result.cat_name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`} class="box">
                              <div class="img">
                                  <img src={result.large_img_url} alt="" style={{height:'280px'}}/>
                              </div>
                                {/*<div class="desc">
                                <p>{res.cat_name}</p>
                              </div>*/}
                          </Link>
                      </div>)
          })
        }
          </div>
          </aside>
          <div class="clearfix"></div>
      </article>)
}));
    if(isLoading)
    {
    return(
      <section class="inner_cont top_div">
            <div class="container">
            {service}
                <article class="home_ser_wrap">
                    <aside class="ser_gal_head">
                        <h2>Get Top Planetshare Services</h2>
                        {/*<a href="javascript:;" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></a>*/}
                    </aside>
                    <aside class="ser_list_box">
                        <div class="row">
                            <div class="col col-sm-6 col-md-4">
                                <a href="javascript:;" class="box" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>
                                    <div class="img">
                                        <img src="images/hservice_transcoding.jpg" alt="" />
                                    </div>
                                    <div class="desc">
                                        <p>Transcoding</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col col-sm-6 col-md-4">
                                <a href="javascript:;" class="box" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>
                                    <div class="img">
                                        <img src="images/hservice_livestreaming.jpg" alt="" />
                                    </div>
                                    <div class="desc">
                                        <p>Streaming</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col col-sm-6 col-md-4">
                                <a href="javascript:;" class="box" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>
                                    <div class="img">
                                        <img src="images/hservice_archiving.jpg" alt="" />
                                    </div>
                                    <div class="desc">
                                        <p>Archiving</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </aside>
                    <div class="clearfix"></div>
                </article>

              <article class="home_offer">
                    <aside class="offer_banner">
                        <img src="images/offer_banner.jpg" alt="" />
                        {/*<div class="caption">
                            <p class="desc">Be inspired to achieve more, and faster with top-quality work delivered by our Pros.</p>
                            <a href="javascript:;" class="more">See #MadeOnPro Curated Works<i class="fa fa-angle-right" aria-hidden="true"></i></a>
                        </div>*/}
                        <div class="clearfix"></div>
                    </aside>
                    <div class="clearfix"></div>
                </article>

              {/*  <article class="cat_gal_wrap">
                    <aside class="cat_gal_head">
                        <h2>Video Under 1500</h2>
                        <a href="filter_listing.html" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                    </aside>
                    <aside class="cat_list_box">
                        <div class="cat_gal">
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="payment.html">
                                            <img src="images/video_ser1.jpg" alt="" />
                                            <div class="play_icon"><button class="play"></button></div>
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="payment.html"><img src="images/seller_icon.jpg" alt="" /> anatomyoflogos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="payment.html">I will create a video ad for your company</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">5.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="payment.html"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>1,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/video_ser2.jpg" alt="" />
                                            <div class="play_icon"><button class="play"></button></div>
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> eitansouroujon</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will create a professional, compelling instagram video</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">2.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>1,350</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/video_ser3.jpg" alt="" />
                                            <div class="play_icon"><button class="play"></button></div>
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> leeoz1</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will animate your facebook cover</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.5</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>2,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/video_ser4.jpg" alt="" />
                                            <div class="play_icon"><button class="play"></button></div>
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> keithlapinski</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will produce a campaign video to get you elected</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">3.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>3,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/video_ser5.jpg" alt="" />
                                            <div class="play_icon"><button class="play"></button></div>
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> luminous123</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will create a cinematic and professional ad for you</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>4,050</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </aside>
                    <div class="clearfix"></div>
                </article>

                <article class="cat_gal_wrap">
                    <aside class="cat_gal_head">
                        <h2>Today's Deal</h2>
                        <a href="javascript:;" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                    </aside>
                    <aside class="cat_list_box">
                        <div class="cat_gal">
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/edev_ser1.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> anawergos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will deliver sleek product advertising video</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>6,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/edev_ser2.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> ggret445665</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will create a social media video for your brand</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">2.9</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>550</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/edev_ser3.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> anaogos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will produce a short commercial video</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.3</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>7,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/edev_ser4.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> an555ogos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will create your fashion runway video</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">2.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>3,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/edev_ser5.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> anat55556gos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will create a trailer for you</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">5.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>5,050</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </aside>
                    <div class="clearfix"></div>
                </article>

                <article class="home_offer">
                    <aside class="offer_banner">
                        <img src="images/offer_banner2.jpg" alt="" />
                        <div class="caption">
                            <div class="icon">
                                <img src="images/logo1.png" alt="" />
                            </div>
                            <p class="desc">Planetshare Customer Experience Team</p>
                            <p class="txt">Planetshare Customers get premium support with faster responses. We’ll get back to you within two hours.</p>
                        </div>
                        <div class="clearfix"></div>
                    </aside>
                    <div class="clearfix"></div>
                </article>

                <article class="cat_gal_wrap">
                    <aside class="cat_gal_head">
                        <h2>Images Under 500</h2>
                        <a href="javascript:;" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                    </aside>
                    <aside class="cat_list_box">
                        <div class="cat_gal">
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/recommend_ser1.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> sunidk333</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design a logo for your brand identity</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>4,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/recommend_ser2.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> 555kfjfirik</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design creative advisor poster</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">3.0</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>2,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/recommend_ser3.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> anatomyo</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design Your movie poster</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.4</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>2,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/recommend_ser4.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> anatommmmggos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design your advertising banner</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">3.8</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>11,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/recommend_ser5.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> logos4532</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design web designs images</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.7</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>8,050</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </aside>
                    <div class="clearfix"></div>
                </article>

                <article class="cat_gal_wrap">
                    <aside class="cat_gal_head">
                        <h2>Recommentations For You</h2>
                        <a href="javascript:;" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                    </aside>
                    <aside class="cat_list_box">
                        <div class="cat_gal">
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/weekly_ser1.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> sulekdinf333</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will create an analytics report with recommendations</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.2</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>5,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/weekly_ser2.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> aur7h5h5gos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design roller banner or standee</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.3</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>3,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/weekly_ser3.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> angkieyoflogos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will write an on point case study</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">3.5</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>650</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/weekly_ser4.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> a556glogos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design your promotional poster</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">3.6</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>2,050</a>
                                    </div>
                                </div>
                            </div>
                            <div class="cat_item">
                                <div class="box">
                                    <div class="img">
                                        <a href="javascript:;">
                                            <img src="images/weekly_ser5.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div class="sell_info">
                                        <a href="javascript:;"><img src="images/seller_icon.jpg" alt="" /> adfgmdfkogos</a>
                                    </div>
                                    <div class="desc">
                                        <a href="javascript:;">I will design icons for web and mobile</a>
                                    </div>
                                    <div class="review">
                                        <div class="rating">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <span class="rating_val">4.2</span>
                                            <span class="rat_count">(1)</span>
                                        </div>
                                        <div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service.">
                                            <img src="images/seller_logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <div class="price_info">
                                        <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                                        <a class="price" href="javascript:;"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>7,050</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </aside>
                    <div class="clearfix"></div>
                </article>

                <article class="quotation_wrap">
                    <aside class="quotation_head">
                        <h2>Request For Quatation <span>Customization Service</span></h2>
                    </aside>
                    <aside class="quotation_box">
                        <div class="row">
                            <div class="col col-lg-6">
                                <div class="box l">
                                    <a href="javascript:;">
                                        <img src="images/quote_img.jpg" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div class="col col-lg-6">
                                <div class="box">
                                    <form action="javascript:;">
                                        <h3 class="ttl">One Request, <br/>Multiple Quotes</h3>
                                        <div class="inputbox">
                                            <input type="text" placeholder="What are you looking for..." />
                                        </div>
                                        <div class="inputbox l">
                                            <input type="text" placeholder="Quantity" />
                                            <select>
                                                <option>select</option>
                                                <option>Video</option>
                                                <option>Photo</option>
                                            </select>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="inputbox">
                                            <label>Select template type:</label>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default">Request price</button>
                                                <button type="button" class="btn btn-default">Request a sample</button>
                                                <button type="button" class="btn btn-default">Request quotation details</button>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-submit">Request For Quotation</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </aside>
                    <div class="clearfix"></div>
                </article>
                <article class="home_ser_wrap">
                    <aside class="ser_gal_head">
                        <h2>Image Categories</h2>
                        <Link to="/web/viewall/imagecat/6_jiesf12img_cat" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></Link>
                    </aside>
                    <aside class="ser_list_box">
                        <div class="row">
                    {ImageCategories}
                    </div>
                    </aside>
                    <div class="clearfix"></div>
                </article>*/}
                {Category_List}
                <article class="home_offer">
                <aside class="offer_banner two">
                                        <img src="images/offer_banner2.jpg" alt="" />
                                        <div class="caption">
                                            <div class="icon">
                                              <i class="fa fa-music" aria-hidden="true"></i>
                                            </div>
                                            <p class="desc">Find music to that goes along your footage</p>
                                            <p class="txt">Music and footage go hand in hand! Use exclusive royalty-free music to stun your audience. Get access to Symphonic, Atmospheric, Acoustic and almost everything else that you need! Easily download shorts and loops to fit the length of your project.</p>
                                            <Link to="/web/music" class="btndefault">Listen now</Link>
                                        </div>
                                        <div class="clearfix"></div>
                                    </aside>
                    <div class="clearfix"></div>
                </article>
                <article class="findplan">
                <h3>
                    <span>Stunning content, straightforward prices</span>
                </h3>
                <div class="buttons">
                    <Link to="/web/packs/image" class="btndefault" >Find your plan</Link>
                </div>
                <div class="clearfix"></div>
            </article>

            <article class="cat_gal_wrap vdo_cat">
                <aside class="cat_gal_head">
                    <h2>Curated videos for your project</h2>
                </aside>
                <aside class="cat_list_box">
                    <div class="vd_cat_list">
                        <div class="item">
                            <Link to="web/videocategorydata/waterfall/13" class="box" >
                                <div class="img">
                                    <img src="images/water_fall.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>WaterFall</h3>
                                    <p>57 Videos</p>
                                </div>
                            </Link>
                        </div>
                        <div class="item">
                            <Link to="web/videocategorydata/foodrecipe/11" class="box" >
                                <div class="img">
                                    <img src="images/food_receipe.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Food & Receipe</h3>
                                    <p>39 Videos</p>
                                </div>
                            </Link>
                        </div>
                        <div class="item">
                            <Link to="web/videocategorydata/celebration/9" class="box" >
                                <div class="img">
                                    <img src="images/celebration.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Celebration</h3>
                                    <p>60 Videos</p>
                                </div>
                            </Link>
                        </div>
                        <div class="item">
                            <Link to="web/videocategorydata/christmas/10" class="box" >
                                <div class="img">
                                    <img src="images/christmas.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Christmas</h3>
                                    <p>19 Videos</p>
                                </div>
                            </Link>
                        </div>
                        <div class="item">
                            <Link to="web/videocategorydata/snowfall/12" class="box" >
                                <div class="img">
                                    <img src="images/snowfall.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>SnowFall</h3>
                                    <p>22 Videos</p>
                                </div>
                            </Link>
                        </div>
                        <div class="item">
                            <Link to="web/videocategorydata/travels/14" class="box" >
                                <div class="img">
                                    <img src="images/travel.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Travel</h3>
                                    <p>10 Videos</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </aside>
                <div class="clearfix"></div>
            </article>
                {/*<article class="home_ser_wrap">
                    <aside class="ser_gal_head">
                        <h2>Video Categories</h2>
                        <Link to="/web/viewall/videocat/6_jied12vid_cat" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></Link>
                    </aside>
                    <aside class="ser_list_box">
                        <div class="row">
                    {VideoCategories}
                    </div>
                    </aside>
                    <div class="clearfix"></div>
                </article>*/}
                {Gallery}


            </div>

            <div class="buy_sell_vd">
              <div class="container">
                  <h2>Why Buyers & Sellers Should Choose Planetshare</h2>
                  <div class="vd_frame">
                  <ReactJWPlayer
                  style={{backgroundColor:'grey'}}
                  ref={(ref) => { this.player = ref }}
                  playerId='jw-player'
                  image="images/hservice_livestreaming.jpg"
                  playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                  file="https://res.cloudinary.com/deyonsykf/video/upload/v1581395356/videos/Seller___Buyer_Video_n8oqcn.mp4"
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
            </div>

            <div class="bidding_box">
            <div class="container">
                <aside class="cat_gal_head">
                    {this.state.bid_list.length>0 && <h2>Make an offer to seller</h2>}
                    {/*<a href="javascript:" class="viewall" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>View All <i class="fa fa-angle-right" aria-hidden="true"></i></a>*/}
                </aside>
            </div>
            <div class="bid_list_item">
                {this.state.bid_list.length>0 && this.state.bid_list.map((res,key)=>{
                  return(<div class="box" key={key} >
                      <div class="img_box" style={{backgroundColor:color_code[Math.floor(Math.random()*color_code.length)]}}>
                          <Link to={`/web/bidding/bid_description/${res.id}`}>
                              <img src={res.poster_url} alt="" />
                              <div class="desc">
                                  <div class="tag">
                                      <p>{res.bid_type.type}</p>
                                  </div>
                                  <div class="det">
                                      <h3>{res.main_title.title}</h3>
                                      <div class="eps">
                                          <p><Duration sec1={res.bid_type.run_time * 60000}/></p>
                                      </div>
                                      <div class="txt">
                                          <p>{res.synopsis[0].title}</p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  </div>)
                })}

            </div>
        </div>
            <div class="clearfix"></div>
        </section>);
      }
      else {
        return(<Loader/>);
      }
  }
}
export default HomeData;
