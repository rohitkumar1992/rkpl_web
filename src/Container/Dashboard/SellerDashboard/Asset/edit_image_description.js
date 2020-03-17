import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import {USERID,TOKEN,HEADER,TAG,GETSELLERFORMDATA,SELLERIMAGEUPLOADDESCRIPTION,GETFORMSTATUS,GETIMAGEVIDEODATA} from '../../../../url.js'
import {Link,withRouter} from "react-router-dom";
import Not_Found from '../../../../Component/not_found/not_found';
import Tooltip from '../../../../Component/tooltip.js'
import LoadingGif from '../../../../Component/Loader/loading_gif'
import {MultiSelect} from 'primereact/multiselect';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css';
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
class AddVideo extends Component {
state={img_data:[],err_result:[],imgs:[],image_id:0,loading:false,loading_msg:'Please Wait',not_found:false,keywords:[],btn_disable:false,category_list:[],license_rights:[],sel_license_rights:[],territory_rights:[],sel_territory_rights:[],mature_content:0}
  componentDidMount()
  {
this.setState({image_id:this.props.match.params.image_id},function()
  {
    this.checkVideoIdStatus()
  });
  }
  getFormData=()=>{
    axios.post(GETIMAGEVIDEODATA,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'id':this.state.image_id,
      'content_type':'image',
      'seller_id':localStorage.getItem('seller_id')
    },SELLER_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data.data;
        var strArr=response.territory_rights.split(',');
        var intArr=[];
        for(var i=0; i < strArr.length; i++)
          intArr.push(parseInt(strArr[i]));
        this.setState({img_data:response,keywords:response.keywords.split(','),mature_content:response.mature_content,
        sel_territory_rights:intArr},function()
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
        this.setState({category_list:res.data.image_cat_list,territory_rights:res.data.country_list});
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
      view_type:'image',
      view_id:this.state.image_id
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
    const {keywords,sel_license_rights,sel_territory_rights}=this.state;
    var event=e.target;
    var title=event.image_title.value.trim();
    var artist_name=event.artist_name.value.trim();
    var description=event.video_desc.value.trim();
    var short_desc=event.video_short_desc.value.trim();
    var category=event.category.value.trim();
    // var price=event.price.value.trim();
    var mature_content=0;
    if ($('#mature_content').is(":checked"))
    {
         mature_content=1
    }
    var formData=new FormData();
     formData.append('user_id',localStorage.getItem('user_id'));
     formData.append('tag',TAG);
formData.append('seller_id',localStorage.getItem('seller_id'));
     formData.append('image_id',this.state.image_id);
    formData.append('mature_content',mature_content);
     formData.append('title',title);
     formData.append('artist_name',artist_name);
     formData.append('description',description);
     formData.append('short_desc',short_desc);
     formData.append('status_tag',this.state.img_data.status);
     // formData.append('price',price);
     formData.append('image_category_id',category);
     formData.append('keywords',keywords);
     formData.append('territory_rights',sel_territory_rights);
     formData.append('license_rights',sel_license_rights);
axios.post(SELLERIMAGEUPLOADDESCRIPTION,formData,SELLER_HEADER)
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
           this.setState({loading:false,loading_msg:'Please Wait While We Are Updating Your Content'});
           setTimeout(()=>{
             this.props.history.push({
                   pathname : '/dashboard/seller/asset',
                   state :{
                   tag :'image',
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
    if(this.props.match.params.image_id!=this.state.image_id)
    {
this.setState({image_id:this.props.match.params.image_id,loading:false},function()
      {
        this.checkVideoIdStatus();
      });
        setTimeout(()=>this.setState({loading:true}),1000)
    }
  }
  render() {
    const {img_data,loading,loading_msg,not_found,keywords,category_list,err_result}=this.state;
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
                                                <span>Image Title</span>
                                                </label>
                                            </div>
                                            <div class="inputbox">
                                                <input type="text"  placeholder="Image Title" name="image_title" Value={img_data.title} required/>
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
                                                <input type="text"  placeholder="Artist name" name="artist_name" Value={img_data.artist_name} required/>
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
                                                  <span>Category</span>
                                                  </label>
                                              </div>
                                              <div class="inputbox">
                                                  <select class="f" name="category" required>
                                                      <option selected disabled value="">Select Category</option>
                                                          {category_list.length>0 && category_list.map((res,key)=>{
                                                          return(<option value={res.id} selected={img_data.image_category_id==res.id}>{res.name}</option>)
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
                                              <MultiSelect value={this.state.sel_territory_rights} options={this.state.territory_rights} onChange={(e) => {this.setState({sel_territory_rights: e.value})}} style={{minWidth:'12em'}} filter={true} placeholder="Select Territory Rights"/>
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
                                                      <input type="checkbox" alt="" name="mature_content" id="mature_content"  checked={this.state.mature_content} onClick={()=>{this.setState({mature_content:!this.state.mature_content})}}/>
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


                                    <div class="description">
                                        <h3 class="head">Short Description</h3>
                                        <div class="disc_box">
                                            <label>Short Description Of Your Image</label>
                                            <div class="inputbox">
                                                <textarea minlength="30" maxlength="80" name="video_short_desc" required>{img_data.short_desc}</textarea>
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
                                            <label>Briefly Describe Your Image</label>
                                            <div class="inputbox">
                                                <textarea minlength="80" maxlength="1200" name="video_desc" required>{img_data.description}</textarea>
                                                <div class="inf">
                                                <span>min. 80</span>
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
                                                <h3>Add your Image information</h3>
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
                                    </div>*/}
                                    <div class="asset_video_uploaded">
                                      <div class="gig_t_img"><img src={img_data.large_thumb} alt="" /></div>
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
export default AddVideo;
