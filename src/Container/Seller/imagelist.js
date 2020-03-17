import React, { Component } from 'react';
import Authentication from '../Authentication/Authentication';
import {Link,Redirect} from "react-router-dom";
import {LOGIN,TAG,TOKEN,SELLER_IMAGE_LIST,USERID,HEADER} from '../../url.js';
import BreadCrumb from '../../Component/breadcrumb';
import axios from 'axios';
class SellerImageList extends Component {
  state={
    isLoading:false,sellerList:[],
    currentPage:1,
    total:0
}
  componentDidMount()
  {
    this.getData(1,10)
  }
  getData=(page,limit)=>{
    axios.post(SELLER_IMAGE_LIST,{
      'tag':'dash',
      'limit':limit,
      'user_id':USERID
    },HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          this.setState({currentPage:response.current_page,total:response.total,sellerList:response.data})
        }
    }).catch((error)=>{

    })
  }
  status=(status)=>{
    var name="";
    if(status==1)
    {
      name="Active";
    }
    if(status==2)
    {
      name="Pending";
    }
    if(status==0)
    {
      name="InActive";
    }
    if(status==3)
    {
      name="Disapproved";
    }
    if(status==4)
    {
      name="InQueue";
    }

      return( <div class="status_btn">
              <button type="button" className={`btn ${status==1?'btn-success':'btn-danger'} btn-sm`}>{name}</button>
            </div>);
  }
  render() {
    const {sellerList}=this.state;
    const tableContent=sellerList.map((res,key)=>{
      return(<tr key={key}>
                <td><img src={res.large_thumb} style={{width:'60px'}}/></td>
                <td>{res.request_id}</td>
                <td>{res.title}</td>
                <td>{res.artist_name}</td>
                <td>{res.price}</td>
                <td>{res.created_at}</td>
                <td>{this.status(res.status)}</td>
                <td>
                <div class="dropdown">
                  <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Active
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="javascript:;"><i class="fa fa-eye" aria-hidden="true"></i> View Entries</a>
                      <a class="dropdown-item" href="javascript:;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>
                      <a class="dropdown-item" href="javascript;;"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
                  </div>
              </div>
                </td></tr>)
    })
    return (
      <div id="content top_div">
        <div class="content_area">
          <BreadCrumb name="ImageList"/>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Thumburl</th>
                  <th>Image Id</th>
                  <th>Title</th>
                  <th>Artist Name</th>
                  <th>Price</th>
                  <th>Register Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {tableContent}

              </tbody>
            </table>
          </div>
        </div>


      </div>
    );
  }
}

export default Authentication(SellerImageList);
