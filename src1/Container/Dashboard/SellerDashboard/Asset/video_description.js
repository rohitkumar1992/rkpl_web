import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import {USERID,TOKEN,HEADER,TAG,GETSELLERFORMDATA,SELLERVIDEOUPLOADDESCRIPTION,GETFORMSTATUS,GETIMAGEVIDEODATA} from '../../../../url.js'
import {Link,withRouter} from "react-router-dom";
import Not_Found from '../../../../Component/not_found/not_found';
import LoadingGif from '../../../../Component/Loader/loading_gif'
import {MultiSelect} from 'primereact/multiselect';
import 'primereact/resources/themes/nova-light/theme.css';
import ReactJWPlayer from 'react-jw-player';
import Tooltip from '../../../../Component/tooltip.js'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
});
const SELLER_HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
const license_rights=[
  {"value":"TV Right(Satellite,Free Tv,Pay Tv)","label":"TV Right(Satellite,Free Tv,Pay Tv)"},
  {"value":"VOD(AVOD,SVOD,TVOD)","label":"VOD(AVOD,SVOD,TVOD)"},
  {"value":"Mobile Network","label":"Mobile Network"},
  {"value":"Social Media(FB,TW)","label":"Social Media(FB,TW)"},
  {"value":"VideoPlatform(Youtube, DailyMotion)","label":"VideoPlatform(Youtube, DailyMotion)"},
  {"value":"Airlines","label":"Airlines"},
  {"value":"DTH","label":"DTH"},
  {"value":"Cable","label":"Cable"},
  {"value":"IPTV","label":"IPTV"},
  {"value":"Ship","label":"Ship"},
  {"value":"Hotel","label":"Hotel"},
]
class VideoDescription extends Component {
state={vid_data:[],err_result:[],imgs:[],video_id:0,language:[],loading:false,loading_msg:'Please Wait',not_found:false,lang_sel:[],director:[],producer:[],genre:[],cast:[],keywords:[],btn_disable:false,category_list:[],license_rights:[],sel_license_rights:[],territory_rights:[],sel_territory_rights:[]}
  componentDidMount()
  {
this.setState({video_id:this.props.match.params.video_id},function()
  {
    this.checkVideoIdStatus()
  });
  }
  getFormData=()=>{
    axios.post(GETIMAGEVIDEODATA,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'id':this.state.video_id,
      'content_type':'video',
      'seller_id':localStorage.getItem('seller_id')
    },SELLER_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data.data;
        this.setState({vid_data:response},function()
      {
        this.getAdditionalInfo();
      })
      }
      else {
      }
    }).catch((error)=>{
    })
  }
  getAdditionalInfo=()=>{
    axios.get(GETSELLERFORMDATA).then((res)=>{
      if(res.data.success==1)
      {
this.setState({language:res.data.language_list,category_list:res.data.video_cat_list,territory_rights:res.data.country_list});
        setTimeout(()=>this.setState({loading:true}),1000)
      }
      else {
      }
    }).catch((error)=>{
    })
  }
  checkVideoIdStatus=()=>{
    axios.post(GETFORMSTATUS,{
      user_id:localStorage.getItem('user_id'),
      seller_id:localStorage.getItem('seller_id'),
      tag:TAG,
      view_type:'video',
      view_id:this.state.video_id
    },SELLER_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        this.setState({not_found:false},function()
      {
        this.getFormData();
      })
      }
      else {
        this.setState({not_found:true})
      }
    }).catch((error)=>{
    })
  }
  _onChange= (event)=>{
    if(event.target.files.length>1)
    {
              toast('Maximum one file is allowed',{ transition: Zoom,});
      return false;
    }
    this.setState({
        imgs: event.target.files
    })
}
  videoDescSubmit=(e)=>{
    e.preventDefault();
    this.setState({btn_disable:true});
    const {producer,director,keywords,cast,genre,lang_sel,imgs,sel_license_rights,sel_territory_rights}=this.state;
    var event=e.target;
    var title=event.video_title.value.trim();
    var artist_name=event.artist_name.value.trim();
    var description=event.video_desc.value.trim();
    var short_desc=event.video_short_desc.value.trim();
    var category=event.category.value.trim();
  //  var price=event.price.value.trim();
    var mature_content=0;
    if ($('#mature_content').is(":checked"))
    {
         mature_content=1
    }
    // if(imgs.length<=0 || producer.length<=0 || director.length<=0 || keywords.length<=0 || cast.length<=0 || genre.length<=0 || lang_sel.length<=0 || sel_territory_rights.length<=0 || sel_license_rights.length<=0 || title=='' || artist_name=='' || short_desc=='' || description==''  || category=='')
    // {
    //     toast('All Fields Must Be Filled',{ transition: Zoom,});
    //    this.setState({btn_disable:false})
    //   return false;
    // }
      // var price_form=/^[0-9]+$/;
      // if(!price.match(price_form))
      // {
      //   toast('Price Must Be In Numeric',{ transition: Zoom,});
      //    this.setState({btn_disable:false})
      // return false;
      // }
    var formData=new FormData();
     formData.append('user_id',localStorage.getItem('user_id'));
     formData.append('tag',TAG);
formData.append('seller_id',localStorage.getItem('seller_id'));
     formData.append('video_id',this.state.video_id);
    formData.append('mature_content',mature_content);
     formData.append('title',title);
     formData.append('artist_name',artist_name);
     formData.append('description',description);
     formData.append('short_desc',short_desc);
     formData.append('cast',cast);
     formData.append('producer',producer);
     formData.append('genre',genre);
     formData.append('director',director);
     // formData.append('price',price);
     formData.append('video_category_id',category);
     formData.append('file',imgs[0]);
     formData.append('keywords',keywords);
     formData.append('territory_rights',sel_territory_rights);
     formData.append('license_rights',sel_license_rights);
     formData.append('language_id',lang_sel);
axios.post(SELLERVIDEOUPLOADDESCRIPTION,formData,SELLER_HEADER)
     .then(response=>{
       if(response.data.success==3)
       {
         var err_result=response.data.data;
this.setState({btn_disable:false,err_result:response.data.error});
             $("html, body").animate({ scrollTop: 0 }, "slow");
         return false;
       }
     if(response.data.success==1){
           this.setState({btn_disable:false})
           this.setState({loading:false,loading_msg:'Please Wait While We Are Uploading Your Content'});
           setTimeout(()=>{
             this.props.history.push({
                   pathname : '/dashboard/seller/asset',
                   state :{
                   tag :'video',
                   }
                   }
                 )},2000);
       }
       else {
           this.setState({btn_disable:false})
           toast('Something Went Wrong',{ transition: Zoom,});
       }
     })
     .catch((error)=> {
         this.setState({btn_disable:false})
     toast('Something Went Wrong',{ transition: Zoom,});
     });
  }
  componentDidUpdate()
  {
    if(this.props.match.params.video_id!=this.state.video_id)
    {
this.setState({video_id:this.props.match.params.video_id,loading:false},function()
      {
        this.checkVideoIdStatus();
      });
        setTimeout(()=>this.setState({loading:true}),1000)
    }
  }
  render() {
    const {vid_data,loading,loading_msg,not_found,language,keywords,cast,producer,director,category_list,err_result}=this.state;
    if(not_found)
    {
      return(<Not_Found/>)
    }
    else
      {
        if(loading)
        {
          return (
            <section class="inner_cont cr_vd_desc">
                    <article class="gig_info">
                        <div class="container">
                            <div class="vend_cont">
                            {err_result.length >0 && <div class="error_box">
                                    <ul>
{err_result.map((res,key)=>{
                                        return(<li key={key}><p>{res}</p></li>)
                                      })}
                                    </ul>
                                  </div>}
                                <form class="form_control" onSubmit={this.videoDescSubmit}>
                                    <div class="field_area">
                                        <div class="fields">
                                            <div class="label">
                                                <label>
                                                  <span>Video Title</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                                <input type="text"  placeholder="Video Title" name="video_title" required/>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Describe your Gig.</h3>
                                                <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_title.png" alt="" /></div>
                                            </Tooltip>
                                        </div>

                                        <div class="fields">
                                            <div class="label">
                                                <label>
                                                  <span>Artist Name</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                                <input type="text"  placeholder="Artist name" name="artist_name" required/>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Describe your Gig.</h3>
                                                <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_title.png" alt="" /></div>
                                            </Tooltip>
                                        </div>

                                        <div class="fields">
                                            <div class="label">
                                                <label>
                                                <span>Producer</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                              <TagsInput value={this.state.producer} onChange={(producer)=>{this.setState({producer})}} onlyUnique={true} maxTags={10}   placeholder={"Add Producers"}/>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Describe your Gig.</h3>
                                                <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_producer.png" alt="" /></div>
                                            </Tooltip>
                                        </div>

                                        <div class="fields">
                                            <div class="label">
                                                <label>
                                                <span>Director</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                               <TagsInput value={this.state.director} onChange={(director)=>{this.setState({director})}} onlyUnique={true} maxTags={10}   placeholder='Add Directors'/>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Describe your Gig.</h3>
                                                <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_dir.png" alt="" /></div>
                                            </Tooltip>
                                        </div>

                                        <div class="fields">
                                            <div class="label">
                                                <label>
                                                <span>Genre</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                              <TagsInput value={this.state.genre} onChange={(genre)=>{this.setState({genre})}} onlyUnique={true} maxTags={10}   placeholder='Add Genre'/>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Describe your Gig.</h3>
                                                <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_title.png" alt="" /></div>
                                            </Tooltip>
                                        </div>

                                        <div class="fields">
                                            <div class="label">
                                                <label>
                                                <span>Cast</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                                <TagsInput value={this.state.cast} onChange={(cast)=>{this.setState({cast})}} onlyUnique={true} maxTags={10}   placeholder="Add Cast"/>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Describe your Gig.</h3>
                                                <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_cast.png" alt="" /></div>
                                            </Tooltip>
                                        </div>

                                        <div class="fields">
                                            <div class="label">
                                                <label>
                                                  <span>Keywords</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                                <TagsInput value={this.state.keywords} onChange={(keywords)=>{this.setState({keywords})}} onlyUnique={true} maxTags={10}   placeholder='Add Keywords'/>
                                                <div class="inf">
                                                    <span class="char-count">Up to 5 items</span>
                                                </div>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Describe your Gig.</h3>
                                                <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_keyword.png" alt="" /></div>
                                            </Tooltip>
                                        </div>

                                          <div class="fields">
                                              <div class="label">
                                                  <label>
                                                      <span>Languages</span>
                                                  </label>
                                              </div>
                                              <div class="inputbox">
                                                  <MultiSelect value={this.state.lang_sel} options={language} onChange={(e) => this.setState({lang_sel: e.value})}  style={{minWidth:'12em'}} filter={true} placeholder="Select Language"/>
                                              </div>
                                              <Tooltip>
                                              <div class="text">
                                                  <h3>Describe your Gig.</h3>
                                                  <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                              </div>
                                              <div class="gig_t_img"><img src="images/icon_tooltip_lang.png" alt="" /></div>
                                              </Tooltip>
                                          </div>
                                          <div class="fields">
                                              <div class="label">
                                                  <label>
                                                    <span>Category</span>
                                                  </label>
                                              </div>
                                              <div class="inputbox">
                                                  <select class="f" name="category" required>
                                                      <option selected disabled value="">Select Category</option>
                                                      {category_list.length>0 && category_list.map((res,key)=>{
                                                        return(<option value={res.id}>{res.name}</option>)
                                                      })}
                                                  </select>
                                              </div>
                                              <Tooltip>
                                              <div class="text">
                                                  <h3>Describe your Gig.</h3>
                                                  <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                              </div>
                                              <div class="gig_t_img"><img src="images/icon_tooltip_category.png" alt="" /></div>
                                              </Tooltip>
                                          </div>
                                          <div class="fields">
                                              <div class="label">
                                                  <label>
                                                      <span>License Rights</span>
                                                  </label>
                                              </div>
                                              <div class="inputbox">
                                              <MultiSelect value={this.state.sel_license_rights} options={license_rights} onChange={(e) => this.setState({sel_license_rights: e.value})} style={{minWidth:'12em'}} filter={true} placeholder="Select License Rights"/>
                                              </div>
                                              <Tooltip>
                                              <div class="text">
                                                  <h3>Describe your Gig.</h3>
                                                  <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                              </div>
                                              <div class="gig_t_img"><img src="images/icon_tooltip_lr.png" alt="" /></div>
                                              </Tooltip>
                                          </div>
                                          <div class="fields">
                                              <div class="label">
                                                  <label>
                                                      <span>Territory Rights</span>
                                                  </label>
                                              </div>
                                              <div class="inputbox">
                                              <MultiSelect value={this.state.sel_territory_rights} options={this.state.territory_rights} onChange={(e) => this.setState({sel_territory_rights: e.value})} style={{minWidth:'12em'}} filter={true} placeholder="Select Territory Rights"/>
                                              </div>
                                              <Tooltip>
                                              <div class="text">
                                                  <h3>Describe your Gig.</h3>
                                                  <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                              </div>
                                              <div class="gig_t_img"><img src="images/icon_tooltip_tr.png" alt="" /></div>
                                              </Tooltip>
                                          </div>
                                          {/*<div class="fields">
                                              <div class="label">
                                                  <label>
<span>Price</span>
                                                  </label>
                                              </div>
                                              <div class="inputbox">
                                                  <input type="text"  placeholder="Enter price" name="price" required/>
                                              </div>
                                          </div>*/}
                                          <div class="fields">
                                              <div class="label">
                                                  <label>
                                                      <span>Mature Content</span>
                                                  </label>
                                              </div>
                                              <div class="inputbox check">
                                                  <label>
                                                      <input type="checkbox" alt="" name="mature_content" id="mature_content"/>
                                                      <span class="check"><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                      <span>Above 18 &nbsp;(Select only if you are above 18)</span>
                                                  </label>
                                              </div>
                                              <Tooltip>
                                              <div class="text">
                                                  <h3>Describe your Gig.</h3>
                                                  <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                              </div>
                                              <div class="gig_t_img"><img src="images/icon_tooltip_above18.png" alt="" /></div>
                                              </Tooltip>
                                          </div>
                                    </div>

                                    <div class="build_gal">
                                        <div class="upload_area">
                                            <label>Video thumbnail <span>Upload thumbnail that describe or are related to your video.</span></label>
                                            <ul class="browse_list">
                                                <li>
                                                    <div class="upl_box">
                                                        <div class="drag_area">
                                                          <span>Drag a Photo or</span>
                                                          <label for="gig_upload">
                                                          <input
                                                          ref="file"
                                                          type="file"
                                                          name="user[image]"
                                                          accept="image/*"
                                                          id="gig_upload"

                                                          onChange={this._onChange}/>
                                                          <input type="file"  />
                                                          <span>Browse</span>
                                                          {this.state.imgs && [...this.state.imgs].map((file)=>(
                                                          <img src="" id="upload_img"  src={URL.createObjectURL(file)} alt="" />   ))}

                                                          </label>
                                                          </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <Tooltip>
                                            <div class="text">
                                                <h3>Photos</h3>
                                                <p>Upload photos in JPEG, JPG, PNG and ensure they’re at least 550 pixels width x 370 pixels height.</p>
                                                <p>We suggest uploading them in landscape format to make better use of the space.</p>
                                                <p>Lastly, put your best foot forward! Stand out on Planetshare with your favorite photos.</p>
                                                <p>Need help? Check out Planetshare expert photoshop talent here.</p>
                                            </div>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <div class="description">
                                        <h3 class="head">Short Description</h3>
                                        <div class="disc_box">
                                            <label>Short Description Of Your Video</label>
                                            <div class="inputbox">
                                                <textarea minlength="30" maxlength="80" name="video_short_desc" required></textarea>
                                                <div class="inf">
                                                    <span>max. 80</span>
                                                </div>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                <h3>This is your chance to be creative. Explain your Gig.</h3>
                                                <p>Describe what you are offering. Be as detailed as possible so buyers will be able to understand if this meets their needs. Should be at least 120 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_sortdesc.png" alt="" /></div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div class="description">
                                        <h3 class="head">Description</h3>
                                        <div class="disc_box">
                                            <label>Briefly Describe Your Video</label>
                                            <div class="inputbox">
                                                <textarea minlength="80" maxlength="1200" name="video_desc" required></textarea>
                                                <div class="inf">
                                                    <span>min. 120</span>
                                                </div>
                                            </div>
                                            <Tooltip>
                                            <div class="text">
                                                <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                <h3>This is your chance to be creative. Explain your Gig.</h3>
                                                <p>Describe what you are offering. Be as detailed as possible so buyers will be able to understand if this meets their needs. Should be at least 120 characters.</p>
                                            </div>
                                            <div class="gig_t_img"><img src="images/icon_tooltip_desc.png" alt="" /></div>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <div class="buttons">
                                        <button type="submit" class="btndefault" disabled={this.state.btn_disable}>{this.state.btn_disable?"Saving...":"Save & Continue"}</button>
                                    </div>
                                    {/*<div class="gig_tooltip gig_tooltip_main">
                                        <div class="box">
                                            <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                            <div class="text">
                                                <h3>Add your video information</h3>
                                            </div>
                                            <div class="gig_t_img"><img src="images/tooltip_vd.jpg" alt="" /></div>
                                            <ul>
                                                <li>
<p>Create a catchy title.</p>
                                                </li>
                                                <li>
<p>Choose a category that fits your Gig.</p>
                                                </li>
                                                <li>
                                                    <p>Add meta data to help buyers find more information regarding your Gig.</p>
                                                </li>
                                                <li>
                                                    <p>Add tags to help buyers find your Gig while searching.</p>
                                                </li>
                                            </ul>

                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <p>Set the prices for your 3 packages.</p>
                                                </li>
                                                <li>
<p>Select the elements you want to include in each offer.</p>
                                                </li>
                                                <li>
                                                    <p>Add Extras to increase your order value.</p>
                                                </li>
                                            </ul>

                                            <hr></hr>

                                            <ul>
                                                <li>
<p>Include the most important information for your Gig.</p>
                                                </li>
                                            </ul>

                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <p>Add photos, an introduction video files that best represent your service.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    */}
                                    <div class="asset_video_uploaded">
                                    <ReactJWPlayer
                                    style={{backgroundColor:'grey'}}
                                    ref={(ref) => { this.player = ref }}
                                    playerId='jw-player'
                                    image={vid_data.large_thumb}
                                    playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                                    file={vid_data.demo_url}
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
                                    </div>
                                </form>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </article>
                    <div class="clearfix"></div>
                </section>

              )
        }
        else {
          return(<LoadingGif message={loading_msg}/>)
        }
      }
  }
}
export default VideoDescription;
