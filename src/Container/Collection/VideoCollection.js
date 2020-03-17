import React from 'react';
import Authentication from '../Authentication/Authentication';
import {GETUSERCOLLECTION,USERID,TAG,TOKEN,CREATECOLLECTION} from '../../url';
import axios from 'axios';
import {Link} from 'react-router-dom'
import $ from 'jquery'
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
class VideoCollection extends React.Component
{
  state={not_found:false,loading:false,loading_msg:'Please Wait',collection_list:[]}
  componentDidMount()
  {
    this.getData();

  }
  getData=()=>{
    axios.post(GETUSERCOLLECTION,{user_id:USERID,collection_type:'video',tag:TAG},HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({collection_list:response.data})
          setTimeout(()=>this.setState({loading:true}),1000)
      }
    }).catch((error)=>{

    })
  }
  createNewCollection=()=>{
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
          $(".modal .close").click()
        this.getData();
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
  render()
  {
    const {loading,loading_msg,collection_list}=this.state;
    if(loading)
    {
      const Video=(collection_list.length>0 && collection_list.map((res,key)=>{
        return(   <div class="cat_item"  key={key}>
              <div class="box">
                  <ul class="g_menu">
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-pencil" aria-hidden="true"></i>
                              Rename
                          </a>
                      </li>
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-share" aria-hidden="true"></i>
                              Share
                          </a>
                      </li>
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-files-o" aria-hidden="true"></i>
                              Copy
                          </a>
                      </li>
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-trash-o" aria-hidden="true"></i>
                              Delete
                          </a>
                      </li>
                  </ul>
                  <div class="img">
                        <Link to={`/web/videocollection/${(res.collection_name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`}>
                          <img src="images/dubbing1.jpg" alt="" />
                      </Link>
                  </div>
                  <div class="desc">
                    {res.collection_name}
                  </div>
                  <div class="price_info">
                      <a class="wish gig_ac" href="javascript:" data-hint="Collect action"><i class="fa fa-angle-down" aria-hidden="true"></i></a>
                      <a class="count" href="javascript:">0</a>
                  </div>
              </div>
          </div> )
      }));
      return(<section class="collect_cont">
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
  <span id="error_msg" style={{color:'red'}}></span>
  <div class="modal-footer">
    <button class="btn btndefault" onClick={()=>{this.createNewCollection()}}>Save</button>
  </div>
</div>
</div>
</div>
              <div class="container">
                  <div class="user_collect">
                      <h2>Collections <span>1</span></h2>
                      <div class="tab-content">
                          <div id="activegigs" class="tab-pane active">
                              <div class="cat_gal">
                                  <div class="cat_item">
                                      <div class="box">
                                            <a class="dropdown-item" href="javascript:;"  data-toggle="modal" data-target="#modalLoginForm" class=" add_gig "  disabled={this.state.cart_btn} >
                                              <span class="plus">+</span>
                                              <span>Create New</span>
                                          </a>
                                      </div>
                                  </div>

                                    {Video}
                              </div>
                              <div class="cat_gal creat_gig">

                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
          </section>)
      }
      else {
        return(<LoadingGif message={loading_msg}/>)
      }
  }
}
export default Authentication(VideoCollection);
