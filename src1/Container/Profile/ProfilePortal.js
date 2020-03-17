import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ActivityLoader from 'react-loader-spinner';
import LoadingGif from '../../Component/Loader/loading_gif'
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
      {(!props.profile_loader && props.modalType=="name") && <div class="modal-dialog edit_prof" role="document">
        <div class="modal-content">
          {/*<div class="logo">
            <img src="images/logo.png" alt="" />
          </div>*/}
          <div class="modal-header text-center">
            <h4 class="modal-title">Name</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.onChange();$("#portal_modal").removeClass("show");}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={props.onFormSubmit}>
          <div class="modal-body">
            <div class="md-form">
              <i class="fas fa-text"></i>
              <label data-error="wrong" data-success="right" for="defaultForm-email">Enter New Name</label>
              <input class="form-control" type="text" name="name" required/>
            </div>
          </div>

          <span id="error_msg" style={{color:'red'}}>{props.error_msg}</span>
          <div class="modal-footer">
            <button class="btn btndefault"  disabled={props.update_btn_enable}>Update</button>
          </div>
          </form>
        </div>
      </div>}
      {(!props.profile_loader && props.modalType=="password") && <div class="modal-dialog edit_prof" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title">Password</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.onChange();$("#portal_modal").removeClass("show");}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={props.onFormSubmit}>
          <div class="modal-body">
            <div class="md-form">
              <i class="fas fa-text"></i>
              <label data-error="wrong" data-success="right" for="defaultForm-email">Old Password</label>
              <input type="password" class="form-control" alt="" name="old_pass" required/>
              <label data-error="wrong" data-success="right" for="defaultForm-email">New Password</label>
              <input type="password" class="form-control" alt="" name="new_pass" required/>
              <label data-error="wrong" data-success="right" for="defaultForm-email">Confirm Password</label>
              <input type="password" class="form-control" alt="" name="newc_pass" required/>
            </div>
          </div>

          <span id="error_msg" style={{color:'red'}}>{props.error_msg}</span>
          <div class="modal-footer">
            <button class="btn btndefault" disabled={props.update_btn_enable}>Update</button>
          </div>
          </form>
        </div>
      </div>}
      {(!props.profile_loader && props.modalType=="email") && <div class="modal-dialog edit_prof" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title">Email</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.onChange();$("#portal_modal").removeClass("show");}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={props.onFormSubmit}>
          <div class="modal-body">
            <div class="md-form">
              <i class="fas fa-text"></i>
              <label data-error="wrong" data-success="right" for="defaultForm-email">Enter New Email</label>
              <input class="form-control" type="email" name="email" required/>
            </div>
          </div>
          <span id="error_msg" style={{color:'red'}}>{props.error_msg}</span>
          <div class="modal-footer">
            <button class="btn btndefault"  disabled={props.update_btn_enable}>Update</button>
          </div>
            </form>
        </div>
      </div>}
        {(props.profile_loader) &&     <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="logo">
                <img src="images/logo.png" alt="" />
              </div>
              <div class="modal-header text-center">

              </div>
              <div class="modal-body">
              <LoadingGif message="Updating"/>
              </div>
            </div>
          </div>}
          </div>,modalRoot
    )
}
export default Modal;
