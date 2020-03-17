import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import {USERID,TAG,HEADER,VENDORID,SELLERIMAGEUPLOAD} from '../../../../url';
import {Link,withRouter} from "react-router-dom";
import Resumable from 'resumablejs';
import Progress from './progressbar';
import LoadingGif from '../../../../Component/Loader/loading_gif'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const SELLER_HEADER = {
headers: {
 'Content-Type': 'multipart/form-data',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class AddImage extends Component {
  state={imgs:[],
    tag:'',loading:false,loading_msg:'Please Wait',img_loading:1,img_loading_msg:'Uploading Content',btn_disable:true
  }
  componentDidMount()
  {
    setTimeout(()=>this.setState({loading:true}),1000)
  }
 _onChange= (event)=>{
    if(event.target.files.length>6)
    {
      toast('Maximum six files are allowed',{ transition: Zoom,});
      return false;
    }
    this.setState({
        imgs: event.target.files,img_loading:2
    });
    setTimeout(()=>this.setState({img_loading:3,btn_disable:false}),2000)
}
uploadImage=(e)=>{
  e.preventDefault();

  this.setState({loading:false,btn_disable:true,loading_msg:'Uploading Your Content'})
  var formData=new FormData();
  formData.append('user_id',localStorage.getItem('user_id'));
  formData.append('seller_id',localStorage.getItem('seller_id'));
  formData.append('tag',TAG);
  for(var i=0;i<this.state.imgs.length;i++)
  {
        formData.append(`file[${i}]`,this.state.imgs[i]);
  }
  axios.post(SELLERIMAGEUPLOAD,formData,SELLER_HEADER).then((res)=>{
    if(res.data.success==1)
    {
      var response=res.data;
        setTimeout(()=>this.props.history.push('/dashboard/seller/asset'),2000);
    }
    else {
      this.setState({loading:true,btn_disable:false,loading_msg:''})
    }
  }).catch((error)=>{
      this.setState({loading:true,btn_disable:false,loading_msg:''})
    toast('Something Went Wrong',{ transition: Zoom,});
  })
}
  render() {
      const {loading_msg,loading,img_loading_msg,img_loading}=this.state;
    if(loading)
    {
    return (
      <section class="inner_cont upload_cont">
              <article class="gig_info">
                  <div class="container">
                      <div class="vend_cont">
                          <form class="form_control" onSubmit={this.uploadImage} enctype="multipart/formData">
                              <h2>Upload Your Content</h2>
                              <div class="build_gal">
                                  <div class="upload_area">
                                      <ul class="browse_list mult">
                                          <li>
                                              <div class="upl_box">
                                                  <label for="gallery-photo-add">
                                                  <input
                                                  ref="file"
                                                  type="file"
                                                  name="user[image]"
                                                  multiple="true"
                                                  id="gallery-photo-add"
                                                  onChange={this._onChange}/>
                                                      <button class="btndefault" type="button">Select multiple files</button>
                                                  </label>
                                                   <span class="note">(.eps files or jpegs that are at least 4.0 megapixels)</span>
                                              </div>
                                          </li>
                                      </ul>
                                      <div class="upload_gallery top_div">
                                          {(this.state.imgs && img_loading==3) && [...this.state.imgs].map((file)=>(
                                                        <img src={URL.createObjectURL(file)} alt="" />
                                                 ))}
                                            {/*img_loading==2 && <LoadingGif message={loading_msg}/>*/}
                                            {img_loading==2 && <LoadingGif message="Uploading"/>}
                                      </div>
                                  </div>
                              </div>
      ​
                              <div class="buttons">
                                  <button type="submit" class="btndefault" id="upload_img_btn" disabled={this.state.btn_disable}>Next</button>
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
export default AddImage;
// {this.state.showTable && <Paging total={this.state.total} clicked={this.pagingContent.bind(this)} first={this.state.first} rows={this.state.rows} search={this.state.search}/>}
// data-url={`${CHUNK_UPLOAD_SERVICE}/${this.state.email}`}
