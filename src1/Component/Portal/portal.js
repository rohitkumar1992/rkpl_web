import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ActivityLoader from 'react-loader-spinner';
import LoadingGif from '../Loader/loading_gif'
const modalRoot=document.getElementById('portal_modal');

const Modal =(props)=>{
  return ReactDOM.createPortal(
      <div style={{
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
      {(!props.loader && props.modalType=="email") && <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="logo">
            <img src="images/logo.png" alt="" />
          </div>
          <div class="modal-header text-center">
            <h4 class="modal-title">OTP</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="md-form">
              <i class="fas fa-text"></i>
              <label data-error="wrong" data-success="right" for="defaultForm-email">Enter Your otp</label>
                  {props.children}
            </div>
          </div>

          <span id="error_msg" style={{color:'red'}}>{props.warning_msg}</span>
          <div class="modal-footer">
            <button class="btn btndefault" onClick={()=>props.emailOtpVerify()} disabled={props.otp_enable}>Submit</button>
          </div>
        </div>
      </div>}
      {(props.loader && props.modalType=="email") &&     <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="logo">
                <img src="images/logo.png" alt="" />
              </div>
              <div class="modal-header text-center">

              </div>
              <div class="modal-body">
              <LoadingGif message={props.loading_msg}/>
              </div>

              <span id="error_msg" style={{color:'red'}}></span>
            </div>
          </div>}
      {props.modalType=="two_auth" && <div class="modal-dialog" class="qrmodal" role="document">
          <div class="modal-content">
            <div class="logo">
              <img src="images/logo.png" alt="" />
            </div>
            <div class="modal-header text-center">
            <div>
              <form  class="qrcode">
              {props.img_2fa=='' &&  <button type="button" onClick={()=>props.get2Fa()}>Reload</button>}
              <img src={props.img_2fa} />
              <button type="button" class="close" onClick={()=>{$("#portal_modal").removeClass("show");props.onChange()}}><i class="fa fa-window-close" aria-hidden="true"></i></button>
              <div class="inputbox"><input type="text" name="two_auth" id="two_auth"/>
              <button type="button" class="btndefault" onClick={props.TwoFactorAuth}>Verify</button>
              </div>
              </form>
            </div>
            </div>
            <div class="modal-body">

            <span id="error_msg" style={{color:'red'}}>{props.auth_err}</span>
          </div>
        </div>
        </div>}

          </div>,modalRoot
    )
}
export default Modal;
