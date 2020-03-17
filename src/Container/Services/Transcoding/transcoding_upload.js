import React from 'react';
import Upload from '../../ServiceUploader/serviceupload';
import LoadingGif from '../../../Component/Loader/loading_gif';
import Authentication from '../../Authentication/Authentication';
import axios from 'axios';
import $ from 'jquery'
import Not_Found from '../../../Component/not_found/not_found';
import {Link,withRouter} from "react-router-dom";
import { History } from "react-router"
import Resumable from 'resumablejs';
import Player from '../../../Component/player'
import {TAG,BUYERVIDEOLIST} from '../../../url'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const HEADER = {
headers: {
 'Content-Type': 'multipart/form-data',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
const uploadPercentage='0%';
class TranscoderUpload extends React.Component{
  state={isLoading:false,loading_msg:'Please Wait',not_found:false,mylist:[],show_my_list:false,my_list_id:0,my_list_host_url:''}
  _nodes = new Map()
  componentDidMount()
  {
    this.getData();
  }
  getData=()=>{
    axios.post(BUYERVIDEOLIST,{'user_id':localStorage.getItem('user_id'),'tag':TAG},{
    headers: {
     'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
  }).then((res)=>{
    if(res.data.success==1)
    {
      var response=res.data
      this.setState({mylist:response.data},function()
    {
      setTimeout(()=>this.setState({isLoading:true}),1000)
    })
    }
  }).catch((error)=>{

  })
  }
  playVideo = (e,id) => {

    const node = this._nodes.get(id);
    node.play()
    $('#load_'+id).hide();
     };

     pauseVideo = (e,id) => {
        $('#load_'+id).hide();
       const node = this._nodes.get(id);
      node.pause();
     };
  render()
  {
    const {loading_msg,isLoading,not_found,mylist,show_my_list,my_list_id,my_list_host_url}=this.state
    if(!not_found)
    {
      const listing=mylist.length>0 && mylist.map((res,key)=>{
        return(<li class="col-md-6 col-sm-6" key={key}>
              <div class="box">
                  <a href="javascript:" onClick={()=>this.setState({show_my_list:true,my_list_id:res.id,my_list_host_url:res.host_url})}>
                  <p id={`load_${res.id}`} style={{display:'none'}} >Loading...</p>
                  <video loop ref={c => this._nodes.set(res.id, c)}  src={res.host_url} type="video/mp4" onMouseEnter={(e)=>this.playVideo(e,res.id)} onMouseLeave={(e)=>this.pauseVideo(e,res.id)}
                  ></video>
                  </a>
                  <div class="q_t">
                      <span class="tm">{res.extension}</span>
                  </div>
              </div>
          </li>)
      })
          if(isLoading)
          {
          return(<section class="inner_cont upload_cont">
              <div class="container">
                  <div class="upl_ser_sec">
                    <div class="main_cont">
                      <article class="gig_info">
                          <div class="container">
                              <div class="vend_cont">
                                  {!show_my_list && <Upload service_name="transcoding"/>}
                                  {show_my_list && <div class="u_v_ar top_div">
                                      <h2>Transcode Video</h2>
                                      <div class="vd_b top_div">
                                        <button type="button" class="btndefault" onClick={()=>this.setState({show_my_list:false,my_list_id:0,my_list_host_url:''})}>Cancel</button>
                                        <div class="v_b" style={{backgroundColor:'grey'}}>
                                        <Player url={my_list_host_url}/>
                                        </div>
                                      </div>
                                      <button onClick={()=>this.props.history.push(`/web/services/transcoding/fill_details/${my_list_id}`)}>Next</button>
                                  </div>}
                                  <div class="clearfix"></div>
                              </div>
                          </div>
                          <div class="clearfix"></div>
                      </article>
                    </div>

                      <aside class="sidebar_view sticky-top">
                          <div class="side_playlist play_list">
                              {mylist.length>0 && <h2>Select From Your List</h2>}
                              {mylist.length==0 &&<div class="empty_box">
                                  <p>List Is Empty</p>
                              </div>}
                                {mylist.length>0 &&<ul class="u_v_l row">
                              {listing}
                              </ul>}
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
export default Authentication(TranscoderUpload)
