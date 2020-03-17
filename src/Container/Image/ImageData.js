import React from 'react';
import {Link} from 'react-router-dom';
import {GETIMAGEDATA,TAG,ADDTOCOLLECTION,CREATECOLLECTION,DOWNLOADS,GETPACKS,SETTOTALVIEW} from '../../url';
import axios from 'axios';
import Not_Found from '../../Component/not_found/not_found';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.css';
import LoadingGif from '../../Component/Loader/loading_gif'
import cogoToast from 'cogo-toast';
import Share from '../Share/Share';
import WordWrap from '../../Component/wordwrap';
import $ from 'jquery'
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
// const USERID=localStorage.getItem('user_id');
 const HEADER = {
headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class ImageData extends React.Component{
  state={isImageZoom:false,singlePack:[],image_pack_id:0,packsData:[],showShare:false,downloadDisabled:false,isLoading:false,image_id:'',image_name:'',not_found:false,image_data:[],similar_data:[],cart_status:0,cart_btn:false,collection_list:[],loading_msg:'Please Wait'}
  componentDidMount()
  {
    $('body').removeClass('bfix_pack');
    $('.download_packs .user_infodet .closebtn, .planet_nav > ul > li.user_infodet .overlay , .close_side').on('click', function(){
      $('body').removeClass('bfix');
    });
    this.setState({image_id:this.props.match.params.image_id,image_name:this.props.match.params.image_name},function()
  {
       setTimeout(()=>this.setState({isLoading:true}),1000);
       this.setView();
       this.getData();
  });
  }
  sidePanel=()=>{
      $('body').addClass('bfix_pack');
  }
  setView=()=>{
    axios.post(SETTOTALVIEW,{
      tag:TAG,content_type:'image',user_id:localStorage.getItem('user_id'),id:this.state.image_id
    }).then((res)=>{
      if(res.data.success==1)
      {
        this.getPacks();
      }
      else {
      }
    }).catch((error)=>{

    })
  }
  getPacks=()=>{
    axios.post(GETPACKS,{
tag:TAG,pack_type:'image',user_id:localStorage.getItem('user_id')
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
    axios.post(GETIMAGEDATA,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'image_id':this.state.image_id,
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({image_data:response.data,similar_data:response.similar_data,cart_status:response.cart_status,collection_list:response.collection_list});
         setTimeout(()=>this.setState({isLoading:true}),1000);
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.image_id!=this.state.image_id )
    {
      this.setState({image_id:this.props.match.params.image_id,image_name:this.props.match.params.image_name,isLoading:true,not_found:false},function()
    {
       this.setView();
       this.getData();
    });
   }
  }
  imageSize=(bytes)=>{
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
      'collection_type':'image',
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
      'item_id':this.state.image_id,
      'item_type':'image',
      'collection_id':collection_id
    },HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        $(".modal .close").click()
        toast(response.msg,{ transition: Zoom,});
          this.getData();
      }
      else {
        var response=res.data;
        toast(response.msg,{ transition: Zoom,});
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  addToDownload=(image_id)=>{
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
      'item_id':image_id,
      'pack_type':'image',
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
        this.setState({downloadDisabled:false});
        this.sidePanel();
        //this.props.history.push('/web/packs/image')
        var response=res.data;
        //toast(response.msg,{ transition: Zoom,});
      }
    }).catch((error)=>{
      this.setState({not_found:true,downloadDisabled:false})
    })
  }
  buyPack=(e)=>{
    e.preventDefault();
    if(this.state.image_pack_id==0)
    {
      cogoToast.error('Please select a pack',{position:'bottom-center'});
      return false;
    }
    else {
      localStorage.setItem('address_payment_status','1');
      localStorage.setItem('lastLocation',this.props.location.pathname);
      $('body').removeClass('bfix_pack');
      this.props.history.push(`/address/image/${this.state.image_pack_id}`)
    }
    }
  render()
  {
  const {isImageZoom,singlePack,packsData,isLoading,not_found,image_data,similar_data,cart_status,collection_list,loading_msg,downloadDisabled,showShare}=this.state;
    if(!not_found)
    {
      const Similar_Data=(similar_data.length>0 && similar_data.map((res,key)=>{
        return( <div class="col col-md-2 col-sm-4" key={key}>
                <div class="box">
                    <Link to={`/web/image/${(res.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`}>
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
            if(isLoading)
            {
              return(
                <div><section class="inner_cont paymnt top_div">
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
                                          <div class="img"><img src={image_data.large_thumb}/></div>

                                        <div class="video_btns">
                                        {cart_status==1  && <button class="icon">
                                        <i class="fa fa-check" aria-hidden="true"></i><span>Saved</span></button>}
                                        {cart_status==2  && <button class="icon" onClick={()=>this.props.history.push('/login')}>
                                        <i class="fa fa-plus-circle" aria-hidden="true"></i><span>Save</span></button>}
                                        {cart_status==0 &&
                                          <a class="dropdown-item" href="javascript:;"  data-toggle="modal" data-target="#modalLoginForm" class="icon"  disabled={this.state.cart_btn} ><i class="fa fa-plus-circle" aria-hidden="true"></i><span>Save</span> </a>
                                          }

                                          <button class="icon" onClick={() => this.setState({ isImageZoom: true })}>
                                              <i class="fa fa-compress" aria-hidden="true"></i>
                                              <span>Preview</span>
                                          </button>
                                            {/*<button class="icon" onClick={()=>this.props.history.push(`/planetshare_editor/${this.state.image_name}/${this.state.image_id}`)}>
                                                <i class="fa fa-edit" aria-hidden="true"></i>
                                                <span>Edit</span>
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
                                    <h3><span>Stock Image</span>{image_data.short_desc}</h3>
                                    <div class="pay_user">
                                        <div class="img">
                                            <div class="icon">
                                                <img src="images/icon_payment_user.jpg" alt="" />
                                            </div>
                                            <div class="desc">
                                                <p class="title">By <a href="javascript:;">{image_data.artist_name}</a></p>
                                                <p>Stock footage ID: {image_data.request_id}</p>
                                            </div>
                                        </div>
                                        <div class="specf">

                                        </div>
                                        <div class="modelno">
                                            <p>Singed model release: <a href="javascript:;">Standard image license</a></p>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <label>{image_data.extension}
                                                            {/*<input type="radio" name="radio" />*/}
                                                            <span></span>
                                                        </label>
                                                    </td>
                                                    {/*<td>
                                                        <span class="inr"><i class="fa fa-inr" aria-hidden="true"></i>{image_data.price}</span>
                                                    </td>*/}
                                                    <td><span class="resl">{image_data.dimension}</span></td>
                                                    <td>{this.imageSize(image_data.size)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                  {localStorage.getItem('user_id')!=0 && <div class="buttons">
                                        <button type="button" class="btn btn_cart" onClick={()=>this.addToDownload(image_data.id)} disabled={this.state.downloadDisabled}><i class="fa fa-download" aria-hidden="true"></i>{downloadDisabled==false?"Download":"Downloading.."}</button>
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
                            {similar_data.length>0 && <div class="cat_i_v_list">
                                <h2>Visually similar stock image</h2>
                                <div class="row">
                                      {Similar_Data}
                                </div>
                                <div class="clearfix"></div>
                            </div>}
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
                                  <p>It's simple. Your image will start downloading once you choose your plan. Our worry-free standard license covers the most common use of this image.</p>
                              </div>
                              {singlePack.length>0  && <h4>Single image</h4>}
                              {singlePack.length>0 && <p class="t">Save with our plan.</p>}
                              {singlePack.length>0 && <ul class="pr_list">
                                  {singlePack.map((res,key)=>{
                                    return(<li key={key} class={res.popular_content==1?"more_pop":""}>
                                        <div class="radiobox">
                                            <input type="radio" id={`price_${res.id}`} name="pre_price"  onClick={()=>this.setState({image_pack_id:res.id})}/>
                                            <label for={`price_${res.id}`}>
                                                <div class="p_box l">
                                                    {res.popular_content==1 && <p class="popular">Most populer</p>}
                                                    <p><strong>{res.pack_count} images</strong>&nbsp;({res.pack_expire_time} days)</p>
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
                              <h4>Value-priced annual plans</h4>
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
                                                  <input type="radio" id={`price_${res.id}`} name="pre_price"  onClick={()=>{this.setState({image_pack_id:res.id})}}/>
                                                  <label for={`price_${res.id}`}>
                                                      <div class="p_box l">
                                                          {res.popular_content==1 && <p class="popular">Most populer</p>}
                                                          <p><strong>{res.pack_count} images</strong>&nbsp;({res.pack_expire_time} days)</p>
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
                              {/*<h4>Prepaid image pack</h4>
                              <p class="t">Get images on demand. Download within a year.</p>
                              <ul class="pr_list">
                                  <li>
                                      <div class="radiobox">
                                          <input type="radio" id="pre_price3" name="pre_price1" />
                                          <label for="pre_price3">
                                              <div class="p_box l">
                                                  <p><strong>25 images</strong>/mo</p>
                                                  <p class="rupee"><strong>INR<i class="fa fa-inr"></i> 229</strong>/mo</p>
                                              </div>
                                              <div class="p_box r">
                                                  <p><strong>INR<i class="fa fa-inr"></i> 9.16</strong> <span>per image</span></p>
                                              </div>
                                          </label>
                                      </div>
                                  </li>
                                  <li class="more_pop">
                                      <div class="radiobox">
                                          <input type="radio" id="pre_price4" name="pre_price1" />
                                          <label for="pre_price4">
                                              <div class="p_box l">
                                                  <p class="popular">More populer</p>
                                                  <p><strong>5 images</strong>/mo</p>
                                                  <p class="rupee"><strong>INR<i class="fa fa-inr"></i> 49</strong>/mo</p>
                                              </div>
                                              <div class="p_box r">
                                                  <p><strong>INR<i class="fa fa-inr"></i> 9.80</strong> <span>per image</span></p>
                                              </div>
                                          </label>
                                      </div>
                                  </li>
                              </ul>*/}
                            </div>
                            <div class="buttons">
                                  <button type="submit" class="btndefault" disabled={this.state.image_pack_id==0?true:false}>Buy</button>
                                {/*<a href="javascript:;" class="m_price">See monthly pricing</a>*/}
                            </div>
                          </form>
                      </div>
                  </div>
                  {isImageZoom && (
                      <Lightbox
                        mainSrc={image_data.large_thumb}
                        onCloseRequest={() => this.setState({ isImageZoom: false })}
                      />
                    )}
                </div></div>)
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
