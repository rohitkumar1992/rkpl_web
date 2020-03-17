
import React from 'react';
import ReactDOM from 'react-dom';
import ReactJWPlayer from 'react-jw-player';
import $ from 'jquery';
import ActivityLoader from 'react-loader-spinner';
const modalRoot=document.getElementById('portal_modal');

const Modal =(props)=>{
  // console.log(props.result)
  return ReactDOM.createPortal(
      <div className={props.modalType=="data_description"?"vd_dsc":""} style={{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        display:'grid',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)'
      }} >
      {props.modalType=="bidding_portal" && <div class="modal-dialog crop_img" role="document" style={{width:500}}>
          <div class="modal-content">
            <div class="modal-header text-center">

              <button type="button" class="close" onClick={()=>{$("#portal_modal").removeClass("show");props.onChange()}}>&times;</button>
            </div>
            <div class="modal-body">
              <div>
                {props.children}
              </div>

              <span id="error_msg" style={{color:'red'}}>{props.auth_err}</span>
            </div>
          </div>
        </div>}
    {(props.modalType=="data_description" && props.content_type=="image") && <div class="modal-dialog" role="document" style={{width:500}}>
        <div class="modal-content">
          <div class="modal-header text-center">
            <button type="button" class="close" onClick={()=>{$("#portal_modal").removeClass("show");props.onChange()}}>&times;</button>
          </div>
          <div class="modal-body">
          <div class="vd_info_desc">
                  <div class="box l">
                    <div class="img_box">
                      <img src={props.result.large_thumb} alt="" />
                    </div>
                  </div>
                  <div class="box r">
                    <ul class="vd_info_list">
                      <li>
                        <p><span>Seller Name :</span> <span class="vl">{props.result.seller_name}</span></p>
                      </li>
                      <li>
                        <p><span>Request Id :</span> <span class="vl">{props.result.request_id}</span></p>
                      </li>
                      <li>
                        <p><span>Artist Name :</span> <span class="vl">{props.result.artist_name}</span></p>
                      </li>
                      <li>
                        <p><span>Title :</span> <span class="vl">{props.result.title}</span></p>
                      </li>
                      <li>
                        <p><span>Dimension :</span> <span class="vl">{props.result.dimension}</span>
                        <span>Size :</span> <span class="vl">{props.result.size} bytes</span>
                        <span>Extension :</span> <span class="vl">{props.result.extension}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Keywords :</span>
                          {props.result.keywords.split(',').map((res,key)=>{
                            return(<a href="javascript:" class="btn btn_catlist">{res}</a>)
                          })}
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Category :</span>
                          <a href="javascript:" class="btn btn_catlist">{props.result.get_image_cat.name}</a>
                        </p>
                      </li>
                      <li>
                        <p><span>Short Description :</span> <span class="vl">{props.result.short_desc}</span></p>
                      </li>
                      <li>
                        <p><span>Description :</span> <span class="vl">{props.result.description}</span></p>
                      </li>
                    </ul>
                  </div>
                </div>
            <span id="error_msg" style={{color:'red'}}></span>
          </div>
        </div>
      </div>}
    {(props.modalType=="data_description" && props.content_type=="video") && <div class="modal-dialog" role="document" style={{width:500}}>
        <div class="modal-content">
          <div class="modal-header text-center">
            <button type="button" class="close" onClick={()=>{$("#portal_modal").removeClass("show");props.onChange()}}>&times;</button>
          </div>
          <div class="modal-body">
            <div class="vd_info_desc v_d">
              <div class="box l">
                <div class="img_box">
                  <img src={props.result.large_thumb} alt="" />
                </div>
              </div>
              <div class="box r">
                {props.content_type=="video" && <ReactJWPlayer
                style={{backgroundColor:'grey'}}

                playerId='jw-player'
                image={`${props.result.large_thumb}`}
                playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                file={props.result.demo_url}
                aspectRatio="16:9"
                isAutoPlay={false}
                controls={true}
                repeat="true"
                  customProps={{
                    controls: true,
                    repeat: true,
                    stretching: 'fill',
                    preload: 'auto',
                    volume: 30,
                    width: '100%',
                    height: '100%',
                }}
                />}
              </div>
            </div>
            <div class="vd_info_desc v_d">
              <div class="cont_box">
                <ul class="vd_info_list">
                  <li>
                    <p><span>Video Title :</span> <span class="vl">{props.result.title}</span></p>
                  </li>
                  <li>
                    <p><span>Seller Name :</span> <span class="vl">{props.result.seller_name}</span></p>
                  </li>
                  <li>
                    <p><span>Request Id :</span> <span class="vl">{props.result.request_id}</span></p>
                  </li>
                  <li>
                    <p><span>Artist Name :</span> <span class="vl">{props.result.artist_name}</span></p>
                  </li>
                  <li>
                    <p>
                      <span>Producer :</span>
                      {props.result.producer.split(',').map((res,key)=>{
                        return(<a href="javascript:" class="btn btn_catlist">{res}</a>)
                      })}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Director :</span>
                      {props.result.director.split(',').map((res,key)=>{
                        return(<a href="javascript:" class="btn btn_catlist">{res}</a>)
                      })}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Genre :</span>
                      {props.result.genre.split(',').map((res,key)=>{
                        return(<a href="javascript:" class="btn btn_catlist">{res}</a>)
                      })}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Cast :</span>
                      {props.result.cast.split(',').map((res,key)=>{
                        return(<a href="javascript:" class="btn btn_catlist">{res}</a>)
                      })}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Keywords :</span>
                      {props.result.keywords.split(',').map((res,key)=>{
                        return(<a href="javascript:" class="btn btn_catlist">{res}</a>)
                      })}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Category :</span>
                      <a href="javascript:" class="btn btn_catlist">{props.result.get_video_cat.name}</a>
                    </p>
                  </li>
                  <li class="sort_desc">
                    <p><span>Short Description :</span> <span class="vl">{props.result.short_desc}</span></p>
                  </li>
                  <li class="long_desc">
                    <p><span>Description :</span> <span class="vl">{props.result.description}</span></p>
                  </li>
                </ul>
              </div>
            </div>
            <span id="error_msg" style={{color:'red'}}></span>
          </div>
        </div>
      </div>}

          </div>,modalRoot
    )
}
export default Modal;
