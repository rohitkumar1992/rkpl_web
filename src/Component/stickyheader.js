import React from 'react';
import {LOGOUT,TAG,TOKEN,USERLIST,USERID,HEADER} from '../url.js';
import axios from 'axios';
import {Link} from 'react-router-dom'
class StickyHeader extends React.Component
{
    state={searchValue:'',searchType:'all'}
    componentDidMount()
    {
        this.setState({searchValue:this.props.keyword,searchType:this.props.type})
    }
  logout=()=>{
    axios.post(LOGOUT,{
      'tag':'dash'
    },HEADER).then((res)=>{
      if(res.data.success==1)
      {
        localStorage.clear();
      setTimeout(()=>window.location.href='/',1000);
      }
      else {
        alert(res.data.msg);
      }
    }).catch((error)=>{

    })
  }
  searchSubmit=(e)=>{
    e.preventDefault();
    var searchValue=this.state.searchValue.trim();
    if(searchValue=="")
    {
      return false;
    }
    else
    {
      this.props.history.push(`/web/search/keyword/${this.state.searchType}/${(searchValue.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}`)
    }
  }
  componentDidUpdate()
  {
    // var result=this.props.location.pathname.split('/');
    // if(result[2]=="search" && result[3]=="keyword" && (result[4]!=this.state.searchType || result[5]!=this.state.searchValue))
    // {
    //   this.setState({searchValue:result[5],searchType:result[4]})
    // }
    // else {
    //   this.setState({searchValue:'',searchType:'all'})
    // }
  }
  render()
  {
    // console.log(this.props.keyword);
    const route_name=this.props.location.pathname.split('/')[2];
  return(
    <div class="sticky_header" style={{display:((route_name=='vendorservice_description' || route_name=='videocategorydata' || route_name=='imagecategorydata')?'none':'')}}>
        <div class="container">
            <div class="logo">
                <Link to="/"><img src="images/logo.png" alt="" /></Link>
            </div>
            <div class="searchbox">
            <form onSubmit={this.searchSubmit}>
                                <div class="inputbox">
                                <select class="select_i" onChange={(e)=>this.setState({searchType:e.target.value})}>
                                  <option selected value="all">All</option>
                                  <option value="image">Image</option>
                                  <option value="video">Video</option>
                                </select>
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                    <input type="text" placeholder="What you want to Buy Today?" value={this.state.searchValue} onChange={(e)=>{this.setState({searchValue:e.target.value})}}/>
                                    <button type="submit">Search</button>
                                </div>
                                <div class="clearfix"></div>
                            </form>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>)
        }
}
export default StickyHeader;
