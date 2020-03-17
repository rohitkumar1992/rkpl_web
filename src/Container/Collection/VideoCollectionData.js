import React from 'react';
import {Link} from 'react-router-dom';
import Authentication from '../Authentication/Authentication';
import {GETUSERCOLLECTIONDATA,USERID,TAG,DOWNLOADS} from '../../url';
import axios from 'axios';
import Not_Found from '../../Component/not_found/not_found';
import LoadingGif from '../../Component/Loader/loading_gif'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
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
class VideoCollectionData extends React.Component{
  state={isLoading:false,collection_id:'',not_found:false,collection_name:'',collection_data:[],loading_msg:'Please Wait'}
  componentDidMount()
  {
      // window.scrollTo({top:1000, left:0, behavior: 'smooth'});
    this.setState({collection_id:this.props.match.params.collection_id,collection_name:this.props.match.params.collection_name},function()
  {
    this.getData();
  });
  }
  getData=()=>{
    axios.post(GETUSERCOLLECTIONDATA,{
      'user_id':USERID,
      'tag':TAG,
      'collection_id':this.state.collection_id,
      'collection_type':"video"
    },HEADER).then((res)=>{
      var response=res.data;
      if(res.data.success==1)
      {
         this.setState({collection_data:res.data.data});
         setTimeout(()=>this.setState({isLoading:true}),1000);
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
    axios.post(DOWNLOADS,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'item_id':video_id,
      'pack_type':'video',
    },HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        toast(response.msg,{ transition: Zoom,});
      }
      else {
        this.props.history.push('/web/packs/video')
        var response=res.data;
        toast(response.msg,{ transition: Zoom,});
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.collection_id!=this.state.collection_id ||this.props.match.params.collection_name!=this.state.collection_name)
    {
        // window.scrollTo({top:0, left:0, behavior: 'smooth'});
    this.setState({collection_id:this.props.match.params.collection_id,collection_name:this.props.match.params.collection_name},function()
    {
      this.getData();
    });
    }
  }
  createMarkup=(desc)=> {
  return {__html: desc};
}
  render()
  {
    const {isLoading,not_found,collection_data,loading_msg}=this.state;
    if(!not_found)
    {
            const Gallery=(collection_data.length>0 && collection_data.map((result,key)=>{
              return(<div class="item" key={key}>
                          <Link to={`/web/video/${(result.video_item_info.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.video_item_info.id}`} class="box">
                                        <div class="img">
                                              <img class="load_place_vert" src={result.video_item_info.large_thumb} alt=""/>
                                          </div>
                                          <div class="desc">
                                              <span class="title">{result.video_item_info.title}</span>
                                              <div class="det" dangerouslySetInnerHTML={this.createMarkup(result.video_item_info.short_desc)} ></div>
                                          </div>
                                      </Link>
                                      <div class="sv_crt">
                                          <button type="button" class="crt" onClick={()=>this.addToDownload(result.video_item_info.id)}>
                                              <i class="fa fa-download" aria-hidden="true"></i>
                                              <span>Download</span>
                                          </button>
                                      </div>
                                  </div>);
            }));
            if(isLoading)
            {
              return( <section class="inner_cont addcollect_page">
                          <div class="container">
                              <div class="h2_ttl">
                                  <h2 class="h2"><span>{this.state.collection_name}</span></h2>
                              </div>
                            <article class="cat_gal_wrap ver_cat"><div class="ver_cat_list">
                            {collection_data.length>0 && Gallery}
                            {collection_data.length==0 && <h3 class="text-center">No Result Found</h3>}
                            </div><div class="clearfix"></div></article>
                          </div>
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
export default Authentication(VideoCollectionData);
