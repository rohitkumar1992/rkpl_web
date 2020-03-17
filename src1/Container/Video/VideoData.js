import React from 'react';
import {Link} from 'react-router-dom';
import {GETVIDEODATA,TAG,ADDTOCOLLECTION,CREATECOLLECTION,DOWNLOADS,GETPACKS,SETTOTALVIEW} from '../../url';
import $ from 'jquery'
import axios from 'axios';
import ReactJWPlayer from 'react-jw-player';
import Not_Found from '../../Component/not_found/not_found';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import WordWrap from '../../Component/wordwrap';
import LoadingGif from '../../Component/Loader/loading_gif'
import cogoToast from 'cogo-toast';
import Share from '../Share/Share';
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
class ImageData extends React.Component{
  state={singlePack:[],video_pack_id:0,packsData:[],downloadDisabled:false,isLoading:false,video_id:'',video_name:'',not_found:false,video_data:[],similar_data:[],cart_status:0,cart_btn:false,collection_list:[],loading_msg:'Please Wait',showShare:false}
  componentDidMount()
  {
   $('body').removeClass('bfix_pack');
    $('.download_packs .user_infodet .closebtn, .planet_nav > ul > li.user_infodet .overlay , .close_side').on('click', function(){
      $('body').removeClass('bfix_pack');
    });

    this.setState({video_id:this.props.match.params.video_id,video_name:this.props.match.params.video_name},function()
    {
      setTimeout(()=>this.setState({isLoading:true}),1000);
      this.setView();
      this.getPacks();
    });
  }
  sidePanel=()=>{
      $('body').addClass('bfix_pack');
  }
  setView=()=>{
    axios.post(SETTOTALVIEW,{
      tag:TAG,content_type:'video',user_id:localStorage.getItem('user_id'),id:this.state.video_id
    }).then((res)=>{
      if(res.data.success==1)
      {

        this.getData();
      }
      else {
      }
    }).catch((error)=>{

    })
  }
  getPacks=()=>{
    axios.post(GETPACKS,{
      tag:TAG,pack_type:'video',user_id:localStorage.getItem('user_id')
    }).then((res)=>{
      if(res.data.success==1)
      {
        var final_data=res.data.data.filter((result)=>result.single_pack!=1);
        var singlePack=res.data.data.filter((result)=>result.single_pack==1);
        this.setState({packsData:final_data,singlePack:singlePack})
      }
      else {
      }
    }).catch((error)=>{

    })
  }
  getData=()=>{
    axios.post(GETVIDEODATA,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'video_id':this.state.video_id,
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({video_data:response.data,similar_data:response.similar_data,cart_status:response.cart_status,collection_list:response.collection_list});
         setTimeout(()=>this.setState({isLoading:true}),1000);
      }
      else {
        this.setState({not_found:true})
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.video_id!=this.state.video_id )
    {
        // window.scrollTo({top:0, left:0, behavior: 'smooth'});
      this.setState({video_id:this.props.match.params.video_id,video_name:this.props.match.params.video_name,isLoading:true,not_found:false},function()
    {
      this.setView();
      this.getData();
    });
  }
}
videoSize=(bytes)=>{
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
createNewCollection=()=>{
  if(localStorage.getItem('user_id')==0)
  {
    toast("Please Login",{ transition: Zoom,});
    this.props.history.push('/login');
    return false;
  }
  var coll_name=$('#collection_name').val();
  if(coll_name.trim()=="")
  {
    toast("Collection Name Can't Be Empty",{ transition: Zoom,});
    return false;
  }
  axios.post(CREATECOLLECTION,{
    'user_id':localStorage.getItem('user_id'),
    'tag':TAG,
    'collection_type':'video',
    'collection_name':coll_name
  },HEADER).then((res)=>{
    if(res.data.success==1)
    {
      var response=res.data;
      this.addToCollection(response.collection_id);
    //  toast(response.msg,{ transition: Zoom,});
    }
    else if(res.data.success==2){
      var response=res.data;
      toast(response.msg,{ transition: Zoom,});
    }
    else {
      var response=res.data;
      toast(response.msg,{ transition: Zoom,});
    }
  }).catch((error)=>{
    this.setState({not_found:true})
  })
}
addToCollection=(collection_id)=>{
  if(localStorage.getItem('user_id')==0)
  {
    toast("Please Login",{ transition: Zoom,});
    this.props.history.push('/login');
    return false;
  }
//  this.setState({cart_btn:true});
  axios.post(ADDTOCOLLECTION,{
    'user_id':localStorage.getItem('user_id'),
    'tag':TAG,
    'item_id':this.state.video_id,
    'item_type':'video',
    'collection_id':collection_id
  },HEADER).then((res)=>{
    if(res.data.success==1)
    {
      var response=res.data;
      $(".modal .close").click()
      this.getData();
      toast(response.msg,{ transition: Zoom,});
    }
    else {
      var response=res.data;
      toast(response.msg,{ transition: Zoom,});
    }
  }).catch((error)=>{
    this.setState({not_found:true})
  })
}
addToDownload=(video_id)=>{
  if(localStorage.getItem('user_id')==0)
  {
    toast("Please Login",{ transition: Zoom,});
    this.props.history.push('/login');
    return false;
  }
    this.setState({downloadDisabled:true})
  axios.post(DOWNLOADS,{
    'user_id':localStorage.getItem('user_id'),
    'tag':TAG,
    'item_id':video_id,
    'pack_type':'video',
  },HEADER).then((res)=>{
    if(res.data.success==1)
    {
      var response=res.data;
      setTimeout(()=>{this.setState({downloadDisabled:false},function()
    {
      toast(response.msg,{ transition: Zoom,});
    })},1000)
    }
    else {
        this.setState({downloadDisabled:false})
      var response=res.data;
      this.sidePanel();
        //this.props.history.push('/web/packs/video')
      //toast(response.msg,{ transition: Zoom,});
    }
  }).catch((error)=>{
    this.setState({not_found:true,downloadDisabled:false})
  })
}
buyPack=(e)=>{
  e.preventDefault();
  if(this.state.video_pack_id==0)
  {
    cogoToast.error('Please select a pack',{position:'bottom-center'});
    return false;
  }
  else {
    localStorage.setItem('address_payment_status','1');
    localStorage.setItem('lastLocation',this.props.location.pathname);
    $('body').removeClass('bfix_pack');
    this.props.history.push(`/address/video/${this.state.video_pack_id}`)
  }
  }
  render()
  {
  const {isLoading,packsData,not_found,video_data,similar_data,cart_status,collection_list,loading_msg,singlePack,downloadDisabled,showShare}=this.state;
  const Similar_Data=(similar_data.length>0 && similar_data.map((res,key)=>{
    return( <div class="col col-md-2 col-sm-4" key={key}>
            <div class="box">
                <Link to={`/web/video/${(res.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`}>
                    <img src={res.large_thumb} alt="" />
                    <div class="ov"></div>
                    <div class="q_t">
                        <span class="tm">{res.dimension}</span>
                        <span class="ttle"><WordWrap name={res.title} count={1}/></span>
                    </div>
                </Link>
                <div class="sv_crt">
                    <button type="button" class="crt" onClick={()=>this.addToDownload(res.id)}>
                        <i class="fa fa-download" aria-hidden="true"></i>
                        <span>Download</span>
                    </button>
                    {/*<button type="button" class="sv">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        <span>Save</span>
                    </button>*/}
                </div>
            </div>
        </div>);
  }));
    if(!not_found)
    {
            if(isLoading)
            {
              return(
                <div>
                  <section class="inner_cont paymnt top_div">
                    <ToastContainer autoClose={1000}/>
                    <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header text-center">
                            <h4 class="modal-title">Create Collection</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <div class="md-form">
                              <i class="fas fa-text"></i>
                              <label data-error="wrong" data-success="right" for="defaultForm-email">Your Collection Name</label>
                              <input type="text" id="collection_name" class="form-control validate"/>
                            </div>
                          </div>
                          <div class="collct_list">
                            {collection_list.length>0?collection_list.map((res,key)=>{
                              return(<button class="icon" key={key} onClick={()=>this.addToCollection(res.id)}>{res.collection_name}</button>);
                            }):<h5>No Collection Found</h5>}
                          </div>
                          <span id="error_msg" style={{color:'red'}}></span>
                          <div class="modal-footer">
                            <button class="btn btndefault" onClick={()=>{this.createNewCollection()}}>Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <article class="payment_page">
                        <div class="container">
                            <div class="main_cont">
                                <div class="box">
                                    <div class="video_area">
                                    <ReactJWPlayer
                                    style={{backgroundColor:'grey'}}
                                    ref={(ref) => { this.player = ref }}
                                    playerId='jw-player'
                                    image={`${video_data.large_thumb}`}
                                    playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                                    file={video_data.demo_url}
                                    aspectRatio="16:9"
                                    isAutoPlay={true}
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
                                        <div class="video_btns">
                                        {cart_status==1  && <button class="icon">
                                        <i class="fa fa-check" aria-hidden="true"></i><span>Saved</span></button>}
                                        {cart_status==2  && <button class="icon" onClick={()=>this.props.history.push('/login')}>
                                        <i class="fa fa-plus-circle" aria-hidden="true"></i><span>Save</span></button>}
                                        {cart_status==0 &&
                                          <a class="dropdown-item" href="javascript:;"  data-toggle="modal" data-target="#modalLoginForm" class="icon"  ><i class="fa fa-plus-circle" aria-hidden="true"></i><span>Save</span> </a>
                                          }

                                            {/*<button class="icon">
                                                <i class="fa fa-download" aria-hidden="true"></i>
                                                <span>Try</span>
                                            </button>*/}
                                            <button class="icon" onClick={()=>this.setState({showShare:true})}>
                                                <i class="fa fa-upload" aria-hidden="true"></i>
                                                <span>Share</span>
                                            </button>
                                            {showShare && <Share url={this.props.location.pathname} onClose={()=>this.setState({showShare:false})}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <aside class="sidebar_view sticky-top">
                                <div class="payment_info">
                                    <h3><span>Stock Footage</span>{video_data.short_desc}</h3>
                                    <div class="pay_user">
                                        <div class="img">
                                            <div class="icon">
                                                <img src="images/icon_payment_user.jpg" alt="" />
                                            </div>
                                            <div class="desc">
                                                <p class="title">By <a href="javascript:;">{video_data.artist_name}</a></p>
                                                <p>Stock footage ID: {video_data.request_id}</p>
                                            </div>
                                        </div>
                                        <div class="specf">
                                            <span><b>Video clip length:</b> 00:11</span>
                                            <span><b>FPS:</b> 25</span>
                                            <span><b>Aspect ratio:</b> 16:9</span>
                                        </div>
                                        <div class="modelno">
                                            <p>Singed model release: <a href="javascript:">Standard footage license</a></p>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <label class="n_inp">{video_data.extension}
                                                            {/*<input type="radio" name="radio" />
                                                            <span></span>*/}
                                                        </label>
                                                    </td>
                                                    <td>
                                                        {/*<span class="inr">INR<i class="fa fa-inr" aria-hidden="true"></i>{video_data.price}</span>*/}
                                                    </td>
                                                      <td>{this.videoSize(572656516)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {localStorage.getItem('user_id')!=0 && <div class="buttons">
                                          <button type="button" class="btn btn_cart" onClick={()=>this.addToDownload(video_data.id)} disabled={this.state.downloadDisabled}><i class="fa fa-download" aria-hidden="true"></i>{downloadDisabled==false?"Download":"Downloading.."}</button>
                                      </div>}
                                      {localStorage.getItem('user_id')==0 && <div class="buttons">
                                            <button type="button" class="btn btn_cart" onClick={()=>this.props.history.push('/login')}><i class="fa fa-download" aria-hidden="true"></i>Download</button>
                                        </div>}

                                </div>
                            </aside>
                        </div>
                    </article>
                    <article class="payment_page">
                        <div class="container">
                            <div class="cat_i_v_list">
                              {similar_data.length>0 &&   <h2>Visually similar stock footage</h2>}
                                <div class="row">
                                  {Similar_Data}
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </article>
                    <div class="clearfix"></div>
                  </section>
                  <div class="download_packs">
                    <div class="user_infodet">
                        <div class="overlay" onClick={()=>{$('body').removeClass('bfix_pack')}}></div>
                        <div class="user_infobox">
                            <span class="closebtn" onClick={()=>{$('body').removeClass('bfix_pack')}}>&#10005;</span>
                            <form onSubmit={this.buyPack}>
                              <div class="plan_area">
                                <div class="user_name">
                                    <h2>Ready to purchase?</h2>
                                    <p>It's simple. Your video will start downloading once you choose your plan. Our worry-free standard license covers the most common use of this video.</p>
                                </div>
                                {singlePack.length>0  && <h4>Single video</h4>}
                                {singlePack.length>0 && <p class="t">Save with our plan.</p>}
                                {singlePack.length>0 && <ul class="pr_list">
                                    {singlePack.map((res,key)=>{
                                      return(<li key={key} class={res.popular_content==1?"more_pop":""}>
                                          <div class="radiobox">
                                              <input type="radio" id={`price_${res.id}`} name="pre_price"  onClick={()=>{this.setState({video_pack_id:res.id})}}/>
                                              <label for={`price_${res.id}`}>
                                                  <div class="p_box l">
                                                      {res.popular_content==1 && <p class="popular">Most populer</p>}
                                                      <p><strong>{res.pack_count} videos</strong>&nbsp;({res.pack_expire_time} days)</p>
                                                      <p class="rupee"><strong>INR<i class="fa fa-inr"></i> {res.pack_price}</strong></p>
                                                  </div>
                                                  {/*<div class="p_box r">
                                                      <p><strong>INR<i class="fa fa-inr"></i> 9.16</strong> <span>per image</span></p>
                                                  </div>*/}
                                              </label>
                                          </div>
                                      </li>)
                                    })}
                                </ul>}
                                <h4>Value-priced  plans</h4>
                                <p class="t">Save with an annual plan, charged monthly.</p>
                                <div class="price_list_area">
                                    <div class="col">
                                        <p class="free" data-toggle="collapse" data-target="#inc_list">
                                            <a href="javascript:">Free</a>
                                            Includes <strong>Planetshare Editor Pro</strong>
                                        </p>
                                        <ul class="inc_list" id="inc_list" style={{display:"none"}}>
                                            <li>
                                                <p>Create social media posts, promotions, and more in minutes</p>
                                            </li>
                                            <li>
                                                <p>Choose from hundreds of templates or customize an image</p>
                                            </li>
                                            <li>
                                                <p>Access professional design elements and time-saving features</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col">
                                      <ul class="pr_list">
                                          {packsData.length>0 && packsData.map((res,key)=>{
                                            return(<li key={key} class={res.popular_content==1?"more_pop":""}>
                                                <div class="radiobox">
                                                    <input type="radio" id={`price_${res.id}`} name="pre_price"  onClick={()=>this.setState({video_pack_id:res.id})}/>
                                                    <label for={`price_${res.id}`}>
                                                        <div class="p_box l">
                                                            {res.popular_content==1 && <p class="popular">Most populer</p>}
                                                            <p><strong>{res.pack_count} videos</strong>&nbsp;({res.pack_expire_time} days)</p>
                                                            <p class="rupee"><strong>INR<i class="fa fa-inr"></i> {res.pack_price}</strong></p>
                                                        </div>
                                                        {/*<div class="p_box r">
                                                            <p><strong>INR<i class="fa fa-inr"></i> 9.16</strong> <span>per image</span></p>
                                                        </div>*/}
                                                    </label>
                                                </div>
                                            </li>)
                                          })}
                                      </ul>
                                      {/*<p>* Billed monthly for one year. Early cancellation fee may apply.</p>*/}
                                    </div>
                                </div>
                              </div>
                              <div class="buttons">
                                    <button type="submit" class="btndefault" disabled={this.state.video_pack_id==0?true:false}>Buy now</button>
                                  {/*<a href="javascript:;" class="m_price">See monthly pricing</a>*/}
                              </div>
                            </form>
                        </div>
                    </div>
                  </div>
                </div>
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
export default ImageData;
