import React from 'react';
import {Link} from 'react-router-dom'
const MoreDots=(props)=>{
  if(props.tab_index==1)
  {
    return(<div class="dropdown">
    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="javascript:">Preview</a>
        < Link to={`/dashboard/seller/asset/edit_${props.content_type}/${props.service_id}`} class="dropdown-item" >Edit</Link>
        <a class="dropdown-item" href="javascript:">Share</a>
        <a class="dropdown-item" href="javascript:" onClick={()=>props.changeStatus(0,props.service_id)}>Pause</a>
        <a class="dropdown-item" href="javascript:">Delete</a>
        <a class="dropdown-item" href="javascript:">Add Video</a>
        <a class="dropdown-item" href="javascript:"><input type="checkbox" /> Live Portfolio</a>
    </div>
    </div>)
  }
  if(props.tab_index==2)
  {
    return(<div class="dropdown">
    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="javascript:">Preview</a>
      < Link to={`/dashboard/seller/asset/edit_${props.content_type}/${props.service_id}`} class="dropdown-item" >Edit</Link>
        <a class="dropdown-item" href="javascript:">Delete</a>
        <a class="dropdown-item" href="javascript:"><input type="checkbox" /> Live Portfolio</a>
    </div>
    </div>)
  }
  if(props.tab_index==3)
  {
    return(<div class="dropdown">
    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="javascript:">Preview</a>
< Link to={`/dashboard/seller/asset/edit_${props.content_type}/${props.service_id}`} class="dropdown-item" >Edit</Link>
        <a class="dropdown-item" href="javascript:">Delete</a>
        <a class="dropdown-item" href="javascript:"><input type="checkbox" /> Live Portfolio</a>
    </div>
    </div>)
  }
  if(props.tab_index==0)
  {
    return(<div class="dropdown">
    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="javascript:;">Preview</a>
      < Link to={`/dashboard/seller/asset/edit_${props.content_type}/${props.service_id}`} class="dropdown-item" >Edit</Link>
        <a class="dropdown-item" href="javascript:">Share</a>
        <a class="dropdown-item" href="javascript:" onClick={()=>props.changeStatus(1,props.service_id)}>Active</a>
        <a class="dropdown-item" href="javascript:">Delete</a>
        <a class="dropdown-item" href="javascript:">Add Video</a>
        <a class="dropdown-item" href="javascript:"><input type="checkbox" /> Live Portfolio</a>
    </div>
    </div>)
  }
}
export default MoreDots;
