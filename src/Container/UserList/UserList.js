import React, { Component } from 'react';
import Authentication from '../Authentication/Authentication';
import {Link,Redirect} from "react-router-dom";
import {LOGIN,TAG,TOKEN,USERLIST,USERID,HEADER} from '../../url.js';
import BreadCrumb from '../../Component/breadcrumb';
import axios from 'axios';
class UserList extends Component {
  state={
    isLoading:false,userList:[],
    currentPage:1,
    total:0
}
  componentDidMount()
  {
    this.getData(1,10)
  }
  getData=(page,limit)=>{
    axios.post(USERLIST,{
      'tag':'dash',
      'limit':limit,
      'user_id':USERID
    },HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          this.setState({currentPage:response.current_page,total:response.total,userList:response.data})
        }
    }).catch((error)=>{

    })
  }
  status=(status)=>{
      return( <div class="status_btn">
              <button type="button" className={`btn ${status==1?'btn-success':'btn-danger'} btn-sm`}>Active</button>
            </div>);
  }
  render() {
    const {userList}=this.state;
    const tableContent=userList.map((res,key)=>{
      return(<tr key={key}><td>{res.Accountid}</td>
                <td>{res.name}</td>
                <td>{res.email}</td>
                <td>{res.created_at}</td>
                <td>Application</td>
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
      <div id="content">
        <div class="content_area">
          <BreadCrumb name="UserList"/>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Register Date</th>
                  <th>Provider</th>
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

export default Authentication(UserList);
// <tr>
//   <td>87</td>
//   <td>Tester</td>
//   <td>test@gmail.com</td>
//   <td>Male</td>
//   <td>2019-07-08</td>
//   <td>Application</td>
//   <td>
//     <div class="status_btn">
//       <button type="button" class="btn btn-success btn-sm">Active</button>
//     </div>
//   </td>
//   <td>
//     <select>
//       <option>Pending</option>
//       <option>In Process</option>
//       <option>Close</option>
//     </select>
//   </td>
// </tr>
// <tr>
//   <td>87</td>
//   <td>Tester</td>
//   <td>test@gmail.com</td>
//   <td>Male</td>
//   <td>2019-07-08</td>
//   <td>Application</td>
//   <td>
//     <div class="status_btn">
//       <button type="button" class="btn btn-success btn-sm">Active</button>
//     </div>
//   </td>
//   <td>
//     <div class="dropdown">
//       <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Active
//       </button>
//       <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//           <a class="dropdown-item" href="javascript:;"><i class="fa fa-eye" aria-hidden="true"></i> View Entries</a>
//           <a class="dropdown-item" href="javascript:;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>
//           <a class="dropdown-item" href="javascript;;"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
//       </div>
//   </div>
//   </td>
// </tr>
// <tr>
//   <td>87</td>
//   <td>Tester</td>
//   <td>test@gmail.com</td>
//   <td>Male</td>
//   <td>2019-07-08</td>
//   <td>Application</td>
//   <td>
//     <div class="status_btn">
//       <button type="button" class="btn btn-success btn-sm">Active</button>
//     </div>
//   </td>
//   <td>
//     <a href="javascript:;"><i class="fa fa-check-square" aria-hidden="true"></i></a>
//     <a href="javascript:;"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
//   </td>
// </tr>
// <tr>
//   <td>87</td>
//   <td>Tester</td>
//   <td>test@gmail.com</td>
//   <td>Male</td>
//   <td>2019-07-08</td>
//   <td>Application</td>
//   <td>
//     <div class="status_btn">
//       <button type="button" class="btn btn-success btn-sm">Active</button>
//     </div>
//   </td>
//   <td>
//     <select>
//       <option>Pending</option>
//       <option>In Process</option>
//       <option>Close</option>
//     </select>
//   </td>
// </tr>
// <tr>
//   <td>87</td>
//   <td>Tester</td>
//   <td>test@gmail.com</td>
//   <td>Male</td>
//   <td>2019-07-08</td>
//   <td>Application</td>
//   <td>
//     <div class="status_btn">
//       <button type="button" class="btn btn-success red btn-sm">Inactive</button>
//     </div>
//   </td>
//   <td>
//     <div class="dropdown">
//       <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Active
//       </button>
//       <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//           <a class="dropdown-item" href="javascript:;"><i class="fa fa-eye" aria-hidden="true"></i> View Entries</a>
//           <a class="dropdown-item" href="javascript:;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>
//           <a class="dropdown-item" href="javascript;;"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
//       </div>
//   </div>
//   </td>
// </tr>
