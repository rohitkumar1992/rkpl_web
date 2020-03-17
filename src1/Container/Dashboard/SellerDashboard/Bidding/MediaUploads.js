import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import {USERID,TAG,HEADER,BIDMEDIA,BIDEXIST} from '../../../../url';
import {Link,withRouter} from "react-router-dom";
import { History } from "react-router"
import Resumable from 'resumablejs';
import ReactJWPlayer from 'react-jw-player';
import cogoToast from 'cogo-toast';
import Progress from '../Asset/progressbar';
import LoadingGif from '../../../../Component/Loader/loading_gif';
import Not_Found from '../../../../Component/not_found/not_found';
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
const uploadPercentage='0%';
class MediaUpload extends Component {
  state={
    percentage:'',
    video_id:'',
    showTable:false,
    tableContent:[],
    nextComponent:false,
    email:'',not_found:false,embed_url_path:'',video_error:false,
  tag:'',loading:false,loading_msg:'Please Wait',btn_disable:true,bid_id:'',embed_url:false,embed_btn:false

  }
  componentWillMount()
  {
    // this.props.history.push('',{ detail: 'user'});
    // this.props.history.push({
    //       pathname : '/dashboard/seller/asset',
    //       state :{
    //       tag :'video',
    //       }
    //       }
    //     );
    var email=localStorage.getItem('username');
    this.setState({email:email});
  }
  componentDidMount()
  {
    setTimeout(()=>this.setState({loading:true,bid_id:this.props.match.params.bid_id},function()
  {
      this.getStatus()
  }),1000)
  }
  componentDidUpdate()
  {
    if(this.props.match.params.bid_id!=this.state.bid_id )
    {
      this.setState({bid_id:this.props.match.params.bid_id,loading:true,not_found:false},function()
    {
       this.getStatus();
    });
   }
  }
  getStatus=()=>{
    axios.post(BIDEXIST,{status_type:'media',bid_id:this.state.bid_id,user_id:localStorage.getItem('user_id'),tag:TAG,seller_id:localStorage.getItem('seller_id')},{  headers:{
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }}).then((res,key)=>{
      if(res.data.success==1)
      {
        this.setState({loading:true},function()
      {
            this.getUpload();
      })
      }
      else {
        this.setState({not_found:true})
      }
    }).catch((error)=>{

    })
  }
  getUpload=()=>{
      var $ = window.$; // use the global jQuery instance
      var tag=this.props.tag;
      this.setState({tag:tag});
      var $fileUpload = $('#resumable-browse');
      $('#start-upload-btn').hide();
        $('#pause-upload-btn').hide();
        $('#cancel-upload-btn').hide();
      var $fileUploadDrop = $('#resumable-drop');
      var $uploadList = $("#file-upload-list");
      if ($fileUpload.length > 0 && $fileUploadDrop.length > 0) {
          var resumable = new Resumable({

          // Use chunk size that is smaller than your maximum limit due a resumable issue
          // https://github.com/23/resumable.js/issues/51
          chunkSize: 5 * 1024 * 1024, // 1MB
          // fileType: ['mp4','3gp','avi','flv'],
          fileType: ['3gp','mp4','flv'],
          simultaneousUploads:1,
          testChunks: false,
          throttleProgressCallbacks: 1,
          maxFiles:1,
          // Get the url from data-url tag
          target: $fileUpload.data('url'),
          // Append token to the request - required for web routes
          headers:{
          'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
        },
          query:{_token : $('input[name=_token]').val(),media_type:'upload',bid_id:this.state.bid_id,tag:TAG,seller_id:localStorage.getItem('seller_id'),user_id:localStorage.getItem('user_id')},
          maxFilesErrorCallback(files, errorCount){ console.log(errorCount);},
          maxFileSizeErrorCallback(file, errorCount){console.log(errorCount)}
      });

  // Resumable.js isn't supported, fall back on a different method
  $('#resumable-browse').click(function()
  {
    $('#dubbing_cont').addClass('collapsed');
    $('#dubbing_upload_button').removeClass('show');
  })
      if (!resumable.support) {
          $('#resumable-error').show();
      } else {
          // Show a place for dropping/selecting files
          $fileUploadDrop.show();
          resumable.assignDrop($fileUpload[0]);
          resumable.assignBrowse($fileUploadDrop[0]);

          // Handle file add event

          resumable.on('fileAdded', function (file) {
              // Show progress pabr

              $fileUpload.hide();
              $uploadList.show();
              $('#progress_bar_status').show()

              $('#file_upload_button').hide()
              // $('#start-upload-btn').show();
                $('#pause-upload-btn').show();
                $('#cancel-upload-btn').show();
              // Show pause, hide resume
              $('.resumable-progress .progress-resume-link').hide();
              $('.resumable-progress .progress-pause-link').show();
              // Add the file to the list
              $uploadList.append('<li class="resumable-file-' + file.uniqueIdentifier + '">Uploading <span class="resumable-file-name"></span> <span class="resumable-file-progress"></span>');
              $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-name').html(file.fileName);
              // Actually start the upload
                              // console.log(file);
              resumable.upload();
          });

          resumable.on('fileSuccess', function (file, message) {
            var result=JSON.parse(message);
            $('#video_id').val(result.video_id);

            $('#start-upload-btn').hide();
            $('#pause-upload-btn').hide();
            $('#cancel-upload-btn').hide();
            $('#progress_bar_status').hide();
            $('#file_upload_button').show();
            $('#progress_bar_status').hide()
            $('#save_button').show();
              $fileUpload.show();


              // Reflect that the file upload has completed
              $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html('(completed)');
          });
          resumable.on('fileError', function (file, message) {
              // Reflect that the file upload has resulted in error
              $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html('(file could not be uploaded: ' + message + ')');
          });
          resumable.on('fileProgress', function (file) {
              // Handle progress for both the file and the overall upload
              $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html(Math.floor(file.progress() * 100) + '%');
              $('.progress-bar').css({width: Math.floor(resumable.progress() * 100) + '%'});
              $('#hidden_percent').val(Math.floor(file.progress() * 100));
              $('#show_percentage').html(Math.floor(file.progress() * 100)+'%');
             // uploadPercentage=Math.floor(file.progress() * 100) + '%';
              // this.setState({percentage:'10'});
          });
      }
      $('#pause-upload-btn').click(function(){
        $('#pause-upload-btn').hide();
        $('#start-upload-btn').show();
          if (resumable.files.length>0) {
              if (resumable.isUploading()) {
                return  resumable.pause();
              }
              return resumable.upload();
          }
      });
      $('#start-upload-btn').click(function(){
                $('#start-upload-btn').hide();
                  $('#pause-upload-btn').show();
          resumable.upload();
      });

  }
}

pause(){
 // Show resume, hide pause
 $('.resumable-progress .progress-resume-link').show();
 $('.resumable-progress .progress-pause-link').hide();
}
cancel(){
$('.resumable-file-progress').html('canceled');
}
redirectHandler=()=>
{
  var video_id=document.getElementById('video_id').value;
  // alert(video_id);
  if(video_id=='')
  {
    return false;
  }
  else {
     this.setState({video_id:video_id,btn_disable:false})
    this.setState({loading:true,loading_msg:'Saving Your Content'},function()
  {
    setTimeout(()=>{
        cogoToast.success('Your content is under review',{position:'bottom-center'});
        this.props.history.push(`/dashboard/seller/bidding/bid_rights/${this.state.bid_id}`)},1000);
})
  }
}
submitEmbedUrl=(e)=>{
  e.preventDefault();
  this.setState({embed_btn:true})
  var video_url=e.target.embed_url.value.trim();
  if(video_url=='')
  {
    alert('Please Provide Url');
    this.setState({embed_btn:false})
    return false;
  }
  if(this.state.video_error)
  {
    alert('Video url is invalid');
    this.setState({embed_btn:false})
    return false;
  }
  axios.post(BIDMEDIA,{video_url:video_url,seller_id:localStorage.getItem('seller_id'),user_id:localStorage.getItem('user_id'),media_type:'embed',bid_id:this.state.bid_id,tag:TAG}
,{ headers:{
  'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}}).then((res)=>{
  if(res.data.success==1)
  {
    this.setState({embed_btn:false})
    this.setState({loading:true,loading_msg:'Saving Your Content'},function()
  {
      setTimeout(()=>{

          this.props.history.push(`/dashboard/seller/bidding/bid_rights/${this.state.bid_id}`)},1000);
  })
  }
  else {
    this.setState({embed_btn:false,loading:false,loading_msg:'Please Wait'})
  }
}).catch((error)=>{
this.setState({embed_btn:false,loading:false,loading_msg:'Please Wait'})
})
}
onError=(event)=>{
  //console.log(event);
  // alert('hi');
  this.setState({video_error:true})
}
  render() {
    const {video_error,loading_msg,loading,img_loading_msg,img_loading,not_found,embed_url,embed_url_path}=this.state;
    if(!not_found)
    {
      if(loading)
      {
        return (
          <section class="inner_cont upload_cont">
                  <article class="gig_info">
                      <div class="container">
                          <div class="vend_cont">
                            <div class="upl_tabs">
                              <button className={ embed_url==false?" btndefault active":"btndefault"  }  onClick={()=>this.setState({embed_url:false,embed_url_path:'',video_error:false})}>Upload</button>
                              <button className={ embed_url==true?"btndefault active":"btndefault" }  onClick={()=>this.setState({embed_url:true})}>Embed Url</button>
                            </div>
                              {!embed_url && <form class="form_control" onSubmit={this.uploadImage} enctype="multipart/formData">
                                  <h2>Upload/Provide Trailer Of Your Asset</h2>
                                  <div class="build_gal">
                                      <div class="upload_area">
                                      <button type="button" class="btn btn-warning" aria-label="Pause upload" id="pause-upload-btn" style={{display: "none"}}>
                                          <span class="glyphicon glyphicon-pause " aria-hidden="true"></span> Pause upload
                                      </button>
                                      <button type="button" class="btn btn-info" aria-label="Start upload" id="start-upload-btn" style={{display: "none"}}>
                                          <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Start upload
                                      </button>
                                        <button type="button" class="btn btn-warning" aria-label="Pause upload" id="cancel-upload-btn" style={{display: "none"}} onClick={()=>{this.props.history.push('/dashboard/seller');setTimeout(()=>this.props.history.replace('/dashboard/seller/add_asset/video'),1000);}}>
                                            <span class="glyphicon glyphicon-pause " aria-hidden="true"></span> Cancel upload
                                        </button>
                                        <input type="hidden" id="video_id"/>
                                          <ul class="browse_list mult">
                                              <li>
                                                  <div class="upl_box">
                                                      <label for="gallery-photo-add">

                                                        <div id="resumable-drop">
                                                        <div id="file_upload_button" class="mt-16">
                                                        <span class="fileinput-button">
                                                            <i class="glyphicon glyphicon-plus"></i>
                                                             <button type="button" class="btndefault fileinput-button" id="resumable-browse"   data-url={`${BIDMEDIA}`}>Select Files</button>
                                                        </span>
                                                        </div>
                                                        </div>
                                                      </label>
                                                        <Progress  percent={this.state.percentage}/>
                                                       <div class="col-lg-offset-2 col-lg-12" id="progress_bar_status" style={{display:'none'}}>
                                                       <p>

                                                       <div id="show_percentage" ></div>
                                                       </p>

                                                       </div>

                                                  </div>
                                              </li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div class="buttons">
                                      <button type="button" class="btndefault" id="upload_img_btn"  onClick={()=>this.redirectHandler()}>Save</button>
                                  </div>
                              </form>}
                              {embed_url && <form class="form_control" onSubmit={this.submitEmbedUrl}>
                                <div class="fields embed">
                                  <div class="inputbox">
                                    <input type="text" name="embed_url" placeholder="Enter Video url" onChange={(e)=>this.setState({video_error:false,embed_url_path:e.target.value})} required/>
                                    {(embed_url_path!='' && !video_error) &&   <ReactJWPlayer
                                    style={{backgroundColor:'grey'}}
                                    ref={(ref) => { this.player = ref }}
                                    playerId='jw-player'
                                    playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                                    file={embed_url_path}
                                    aspectRatio="16:9"
                                    isAutoPlay={true}
                                    controls={true}
                                    onSetupError={this.onError}
                                    onError={this.onError}
                                    onPlay={()=>this.setState({video_error:false})}
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
                                    />}
                                    {video_error && <h3>Invalid Video url</h3>}
                                    <button class="btndefault" type="submit" disabled={this.state.embed_btn}>Save</button>
                                  </div>
                                </div>
                              </form>}
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
    else {
      return(<Not_Found/>)
    }
      }
    }
export default MediaUpload;
// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4
