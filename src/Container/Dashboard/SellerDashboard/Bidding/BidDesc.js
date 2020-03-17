import React from 'react';
import {Link} from 'react-router-dom';
import {TAG,BIDEXIST} from '../../../../url';
import axios from 'axios';
import Not_Found from '../../../../Component/not_found/not_found';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.css';
import LoadingGif from '../../../../Component/Loader/loading_gif'
import cogoToast from 'cogo-toast';
import ReactJWPlayer from 'react-jw-player';
import $ from 'jquery';
import Duration from '../../../../Component/duration'
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
// const USERID=localStorage.getItem('user_id');
const SELLER_HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class BiddingDesc extends React.Component{
  state={bid_data:{},isLoading:false,loading_msg:'Please Wait',not_found:false,language_list:[]}
  componentDidMount()
  {
    this.setState({bid_id:this.props.match.params.bid_id},function()
  {
       //setTimeout(()=>this.setState({isLoading:true}),1000);
       this.getData();
  });
  }
  getData=()=>{
    axios.post(BIDEXIST,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'bid_id':this.state.bid_id,
      'seller_id':localStorage.getItem('seller_id'),
      'status_type':'bid_desc'
    },SELLER_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({bid_data:response.data,language_list:response.language});
        setTimeout(()=>this.setState({isLoading:true}),1000);
      }
      else {
          this.setState({not_found:true,isLoading:false})
      }
    }).catch((error)=>{
    this.setState({not_found:true,isLoading:false})
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.bid_id!=this.state.bid_id )
    {
      this.setState({bid_id:this.props.match.params.bid_id,isLoading:true,not_found:false},function()
    {
       this.getData();
    });
   }
  }
  render()
  {
    const {bid_data,isLoading,loading_msg,not_found,language_list}=this.state;
    if(!not_found)
    {
      if(isLoading)
      {
        return(<section class="view_detail gig_preview bid_preview dsh">

        <article class="view_page">
            <div class="container">
                <div class="main_cont">
                    <div class="box">
                        <div class="overview" id="overview">
                            {bid_data.staus==4 && <h2>{bid_data.main_title.title} <span>{bid_data.bid_type.type}</span> <span class="pendng"><em>Pending</em></span></h2>}
                            <div class="user_overview">
                                <div class="user_img">
                                    <div class="name">
                                        <p>
                                        <span>{bid_data.bid_type.type}</span> | <span><Duration sec1={bid_data.bid_type.run_time*60000}/></span> | <span>4K</span>
                                        </p>
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
                                </div>
                            </div>
                            <div class="video_area">
                                <div class="img">
                                    <img src={bid_data.poster_url} />
                                </div>
                            </div>
                        </div>
                        <div class="desc" id="description">
                            <h3>About This Bid</h3>
                            <p>{bid_data.synopsis[0].title} </p>
                            {bid_data.languages!=null && <div class="lang">
                            <label>Languages:</label>
                            <p>
                                {bid_data.languages!=null && bid_data.languages.split(',').map((res,key)=>{
                                  let data=language_list.filter((data)=>{return data.id==res})
                                  return(
                                    <a href="javascript:" className="btn"  key={key}>{data[0].lang_name}</a>)
                                })}
                            </p>
                            </div>}
                            {bid_data.dubbing_languages!=null && <div class="lang">
                            <label>Dubbing Languages:</label>
                            <p>
                                { bid_data.dubbing_languages!=null && bid_data.dubbing_languages.split(',').map((res,key)=>{
                                  let data=language_list.filter((data)=>{return data.id==res})
                                  return(
                                    <a href="javascript:" className="btn"  key={key}>{data[0].lang_name}</a>)
                                })}
                            </p>
                            </div>}
                            {bid_data.subtitle_languages!=null && <div class="lang">
                            <label>Subtitle Languages:</label>
                            <p>
                                {bid_data.dubbing_languages!=null && bid_data.dubbing_languages.split(',').map((res,key)=>{
                                  let data=language_list.filter((data)=>{return data.id==res})
                                  return(
                                    <a href="javascript:" className="btn"  key={key}>{data[0].lang_name}</a>)
                                })}
                            </p>
                            </div>}
                            {bid_data.genres!=null &&<div class="lang">
                            <label>Genre(s):</label>
                            <p>
                                {bid_data.genres!=null && bid_data.genres.split(',').map((res,key)=>{
                                  return(<a href="javascript:" className="btn"  key={key}>{res}</a>)
                                })}
                            </p>
                            </div>}
                            {bid_data.keywords!=null &&<div class="lang">
                            <label>Keywords:</label>
                            <p>
                                {bid_data.keywords!=null && bid_data.keywords.split(',').map((res,key)=>{
                                  return(<a href="javascript:" className="btn"  key={key}>{res}</a>)
                                })}
                            </p>
                            </div>}
                            <div class="clearfix"></div>
                        </div>
                        <div class="prof_card" id="prod_detail">
                            <h3>Production Details</h3>
                            <div class="stats_desc">
                                <ul class="user_stats">
                                    <li>Production Studios: <strong>{bid_data.production_studios}</strong></li>
                                    <li>Year of Release: <strong>{bid_data.year_of_release}</strong></li>
                                    <li>Country(ies) of origin: <strong>{bid_data.country_origin}</strong></li>
                                </ul>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                          {(bid_data.cast!==null || bid_data.producers!=null || bid_data.director!=null || bid_data.writer!=null) && <div class="desc" id="cast_crew">
                            <h3>Cast & Crew</h3>
                            {bid_data.producers!=null &&<div class="lang">
                            <label>Producers:</label>
                            <p>
                                {bid_data.producers.split(',').map((res,key)=>{
                                  return(<a href="javascript:" className="btn"  key={key}>{res}</a>)
                                })}
                            </p>
                            </div>}
                            {bid_data.director!=null &&<div class="lang">
                            <label>Director:</label>
                            <p>
                                {bid_data.director.split(',').map((res,key)=>{
                                  return(<a href="javascript:" className="btn" key={key}>{res}</a>)
                                })}
                            </p>
                            </div>}
                            {bid_data.writer!=null &&<div class="lang">
                            <label>Writer:</label>
                            <p>
                                {bid_data.writer.split(',').map((res,key)=>{
                                  return(<a href="javascript:" className="btn"  key={key}>{res}</a>)
                                })}
                            </p>
                            </div>}
                            <div class="clearfix"></div>
                        </div>}
                        <div class="desc makeoffr" id="make_offer">
                          <div class="yr_price">
                            <h3>Base Price</h3>
                            <span><i className={bid_data.box_office_price.currency=="USD"?"fa fa-usd":"fa fa-inr"} aria-hidden="true"></i>{bid_data.box_office_price.price}</span>
                          </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <aside class="sidebar_view sticky-top">
                   <div class="bid_trial">
                   <h2>Trailer {/*<a href="javascript:;"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Bid</a>*/}</h2>
                   {(bid_data.video_url==null && bid_data.status==4) && <div class="pending_upl">
                       <Link to={`/dashboard/seller/bidding/bid_media_upload/${this.state.bid_id}`} >Pending to upload</Link>
                   </div>}
                      {bid_data.video_url!=null &&   <ReactJWPlayer
                      style={{backgroundColor:'grey'}}
                      ref={(ref) => { this.player = ref }}
                      playerId='jw-player'
                      image={`${bid_data.poster_url}`}
                      playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                      file={bid_data.video_url}
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
                      />}
                        <div class="buttons">
                    {(bid_data.video_url!=null && bid_data.status==4) &&   <button class="s_btn" onClick={()=>{this.props.history.push(`/dashboard/seller/bidding/bid_rights/${this.state.bid_id}`)}}>Add Rights <i class="fa fa-plus"></i></button>}</div>
                    </div>
                </aside>
            </div>
        </article>
        <div class="clearfix"></div>
    </section>
    )
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
export default BiddingDesc;
