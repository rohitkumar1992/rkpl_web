import React from 'react';
import Upload from '../../ServiceUploader/serviceupload';
import LoadingGif from '../../../Component/Loader/loading_gif';
import axios from 'axios';
import $ from 'jquery'
import Not_Found from '../../../Component/not_found/not_found';
import {Link,withRouter} from "react-router-dom";
import { History } from "react-router"
import Resumable from 'resumablejs';
import Player from '../../../Component/player';
import Authentication from '../../Authentication/Authentication';
import cogoToast from 'cogo-toast';
import {TAG,SERVICEFORMSTATUCHECK,SAVETRANSCODEFORM,VENDOR_ID} from '../../../url'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import DropDown from '../../../Component/dropdown.js';
const presetList=[{"label":"1080p","value":"1080",'price':150},{"label":"720p","value":"720",'price':200}]
const containerList=[{"label":"Auto","value":"Auto"},{"label":"350*450","value":"250*450"}]
const aspectList=[{"label":"16:9","value":"16:9"},{"label":"16:12","value":"16:12"}]
class TranscodeForm extends React.Component{
  state={isLoading:false,loading_msg:'Please Wait',not_found:false,video_id:0,video_data:[],presetVal:[],aspectVal:[],containerVal:[],price:0}
  componentDidMount()
  {
    this.setState({video_id:this.props.match.params.video_id},function()
  {
      this.getData();
  })
  }
  getData=()=>{
    axios.post(SERVICEFORMSTATUCHECK,{'user_id':localStorage.getItem('user_id'),'tag':TAG,service_tag:'transcode',video_id:this.state.video_id,'vendor_id':VENDOR_ID},{
    headers: {
     'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
  }).then((res)=>{
    if(res.data.success==1)
    {
      var response=res.data
      this.setState({video_data:response.data},function()
    {
      setTimeout(()=>this.setState({isLoading:true}),1000)
    })
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
    if(this.props.match.params.video_id!=this.state.video_id)
    {
      this.setState({video_id:this.props.match.params.video_id,not_found:false,isLoading:false},function()
    {
        this.getData();
    })
    }
  }
  presetSelect=(e)=>
  {
  var sum=0
    for(var j=0;j<e.value.length;j++)
    {
      var result=presetList.filter((res)=>res.value==e.value[j]);
      for(var i=0;i<result.length;i++)
      {
        sum+=result[i].price
      }
    }
  this.setState({presetVal:e.value,price:sum})
  }
  SaveForm=()=>{
    axios.post(SAVETRANSCODEFORM,{'user_id':localStorage.getItem('user_id'),'tag':TAG,video_id:this.state.video_id,'vendor_id':VENDOR_ID,'preset':this.state.presetVal,'container':this.state.containerVal,'aspect_ratio':this.state.aspectVal,'price':this.state.price},{
    headers: {
     'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
  }).then((res)=>{
    if(res.data.success==1)
    {
      var response=res.data
      this.setState({isLoading:false},function()
    {
      setTimeout(()=>this.props.history.push(`/address_service/transcode/${response.transcode_id}`),1000)
    })
    }
    else
    {
      cogoToast.error('Something Went Wrong',{position:'bottom-center'})
      this.setState({isLoading:true})
    }
  }).catch((error)=>{
    this.setState({notfound:true})
  })
  }
  render()
  {
    const {loading_msg,isLoading,not_found,video_data,price}=this.state
    if(!not_found)
    {
          if(isLoading)
          {
          return(<section class="inner_cont upload_cont">
        <div class="container">
            <div class="upl_ser_sec">
                <div class="main_cont">
                    <article class="gig_info">
                        <form action="javascript:;">
                            <h2>Fill Video Details</h2>
                            <div class="build_gal">
                                <div class="upload_area">
                                    <div class="bid_form">
                                        <div class="fields">
                                            <div class="field">
                                                <label>Preset <span data-toggle="tooltip" title="" data-original-title="Specify whether the Listing is targeted at the General Audience or Specific Audiences. You can specify several Specific Audiences."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                                                <DropDown list={presetList} optionLabel="" filterPlaceholder="Select Preset"  placeholder="Select Preset" selectVal={this.state.presetVal} onChangeSelect={this.presetSelect} required="true" class="inputbox"/>
                                            </div>
                                        </div>
                                        <div class="fields">
                                            <div class="field">
                                                <label>Conatiner <span data-toggle="tooltip" title="" data-original-title="Specify whether the Listing is targeted at the General Audience or Specific Audiences. You can specify several Specific Audiences."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                                                <DropDown list={containerList} optionLabel="" filterPlaceholder="Select Container"  placeholder="Select Container" selectVal={this.state.containerVal} onChangeSelect={(e)=>this.setState({containerVal:e.value})} required="true" class="inputbox"/>
                                            </div>
                                        </div>
                                        <div class="fields">
                                            <div class="field">
                                                <label>Aspect Ratio <span data-toggle="tooltip" title="" data-original-title="Specify whether the Listing is targeted at the General Audience or Specific Audiences. You can specify several Specific Audiences."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                                              <DropDown list={aspectList} optionLabel="" filterPlaceholder="Select Aspect Ratio"  placeholder="Select Aspect ratio" selectVal={this.state.aspectVal} onChangeSelect={(e)=>this.setState({aspectVal:e.value})} required="true" class="inputbox"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="clearfix"></div>
                    </article>
                </div>
                <aside class="sidebar_view sticky-top">
                    <div class="side_playlist play_list">
                        <h2></h2>
                        <Player url={video_data.host_url}/>
                        <div class="price_box">
                            <span class="ttl">Price</span>
                            <span class="val"><i class="fa fa-inr"></i>{price}</span>
                        </div>
                        <div class="buttons text-center">
                            <button type="button" class="btndefault" disabled={(this.state.presetVal.length>0 && this.state.containerVal.length>0 && this.state.aspectVal.length>0)?false:true} onClick={()=>this.SaveForm()}>Make Payment</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
        <div class="clearfix"></div>
    </section>)
        }
        else
         {
          return(<LoadingGif message={loading_msg}/>);
         }
    }
    else
    {
      return(<Not_Found/>)
    }
    }
  }
export default Authentication(TranscodeForm)
