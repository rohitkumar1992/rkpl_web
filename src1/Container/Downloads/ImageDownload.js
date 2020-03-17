import React from 'react';
import Authentication from '../Authentication/Authentication';
import {USERID,TAG,TOKEN,DOWNLOADLIST} from '../../url';
import axios from 'axios';
import $ from 'jquery'
import {Link} from 'react-router-dom'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import LoadingGif from '../../Component/Loader/loading_gif'
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
class ImageDownload extends React.Component
{
  state={not_found:false,loading:false,loading_msg:'Please Wait',download_list:[]}
  componentDidMount()
  {
    this.getData();
  }
  getData=()=>{
    axios.post(DOWNLOADLIST,{user_id:localStorage.getItem('user_id'),tag:TAG,'item_type':'image'},HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({download_list:response.data})
          setTimeout(()=>this.setState({loading:true}),1000)
      }
    }).catch((error)=>{

    })
  }
  Download=(id)=>{
    return false;
    axios({
      url: 'http://localhost/Shantanu_project/OTT_LIVE_WORK/LARAVEL_WORK/NEW_PLANETSHARE/Planetshare/public/api/download', //your url
      method: 'POST',
      responseType: 'blob', // important
      data:{video_id:46},
      headers: {
        'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
      }
    },).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'title'); //or any other extension
       document.body.appendChild(link);
       link.click();
    });
  }
  render()
  {
    const {loading,loading_msg,download_list}=this.state;
    if(loading)
    {
      return(<section class="inner_cont download_page">
        <div class="container">
            <div class="downloads_cont">
                <div class="h2_ttl">
                    <h2 class="h2"><span>Downloads</span></h2>
                </div>
                <div class="tab-content">
                    <div class="tab-pane container active" id="download_images">
                        <ul class="down_img_list">
                            {download_list.length>0 && download_list.map((res,key)=>{
                              return(<li>
                                <Link to={`/web/image/${res.image_item_desc.title}/${res.image_item_desc.id}`} class="box">
                                      <img src={res.image_item_desc.large_thumb} alt="" />
                                  </Link>
                                  <div class="sv_crt">
                                      <button type="button" class="crt" onClick={()=>this.Download(res.item_id)}>
                                          <i class="fa fa-download" aria-hidden="true"></i>
                                          <span>Download</span>
                                      </button>
                                  </div>
                              </li>)
                            })}
                        </ul>
                        {download_list.length==0 && <h4 class="text-center">No Result Found</h4>}
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </section>)
      }
      else {
        return(<LoadingGif message={loading_msg}/>)
      }
  }
}
export default Authentication(ImageDownload);
