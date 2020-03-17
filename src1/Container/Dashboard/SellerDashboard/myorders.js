import React from 'react';
import LoadingGif from '../../../Component/Loader/loading_gif'
import {USERID,SELLER_ORDERS_LIST,TOKEN,TAG} from '../../../url.js';
import axios from 'axios';
import Pagination from "react-js-pagination";
const SELLER_HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class Analytics extends React.Component{
  state={keywords:'',loading:false,loading_msg:'Please Wait',item_type:'image',order_data:[],imgSelect:true,vidSelect:false,itemsCountPerPage:5,current_page:1,total_pages:1,pageRangeDisplayed:3}
  componentDidMount()
  {
  this.getData(this.state.current_page);
  }
  getData=(page)=>{
    axios.post(`${SELLER_ORDERS_LIST}?page=${page}`,{
      'user_id':localStorage.getItem('user_id'),
      'seller_id':localStorage.getItem('seller_id'),
      'tag':TAG,
      'limit':this.state.itemsCountPerPage,
      'item_type':this.state.item_type,
      'keywords':this.state.keywords,
    },SELLER_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({current_page:response.data.current_page,order_data:response.data.data,total_pages:response.data.total})
          setTimeout(()=>this.setState({loading:true}),1000)
      }
      else {

      }
    }).catch((error)=>{

    });
  }
  sellerOrderRole=(e)=>{
    var role=e.target.value;
    if(role=="image")
    {
          this.setState({keywords:'',imgSelect:true,vidSelect:false,item_type:'image',current_page:1,loading:false},function()
        {
          this.getData(1,4)
        })
      return false;
    }
    if(role=="video")
    {
  this.setState({keywords:'',imgSelect:false,vidSelect:true,item_type:'video',current_page:1,loading:false},function()
    {
      this.getData(1,4)
    });
    return false;
    }
  }
  handlePageChange=(pageNumber)=>{
    this.setState({current_page: pageNumber},function()
  {
    this.getData(pageNumber)
  });
  }
  render()
  {
    const {loading,loading_msg,order_data,imgSelect,vidSelect}=this.state;
    if(loading)
    {
    return( <section class="dashb_cont orders_page top_div">
        <div class="container">
            <div class="db_cont_head">
                <h2>Negotiations</h2>
                <div class="searchbox">
                    <form action="javascript:;">
                        <div class="inputbox">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input type="text" placeholder="Search by order id" value={this.state.keywords} onChange={(e)=>{this.setState({keywords:e.target.value},function(){this.getData(this.state.current_page);})
                          }}/>
                            <button type="submit">Search</button>
                        </div>
                        <div class="clearfix"></div>
                    </form>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="db_tab_cont">
                <div class="tab-content">
                    <div class="tab-pane active" id="order_priority">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="4"><span class="title">Orders</span></th>
                                        <th colspan="6">
                                            <select onChange={this.sellerOrderRole}>
                                                <option selected={this.state.imgSelect} value="image">Images</option>
                                                <option value="video" selected={this.state.vidSelect}>Videos</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th >Asset</th>
                                        <th><span  >Order Id</span></th>
                                        <th><span >Title</span></th>
                                        <th><span >Price</span></th>
                                        <th><span >Time</span></th>
                                        <th><span >Payment Status</span></th>
                                    </tr>
                                    {(loading && order_data.length>0) && order_data.map((res,key)=>{
                                       return(<tr class="accordion" key={key} class="top_div">
                                       <th></th>
                                           <td>
                                           <div class="img">
                                                {imgSelect && <img src={res.image_item_info.large_thumb!=null?res.image_item_info.large_thumb:"/images/user_hover.svg"} alt="" />}
                                                {vidSelect && <img src={res.video_item_info.large_thumb!=null?res.video_item_info.large_thumb:"/images/user_hover.svg"} alt="" />}
                                           </div>
                                           </td>
                                           <td>
                                            {res.order_id}
                                           </td>
                                           <td>
                                           {imgSelect && res.image_item_info.title}
                                           {vidSelect && res.video_item_info.title}
                                           </td>
                                           <td>
                                           {res.price}
                                           </td>
                                           <td>
                                           {res.created_at}
                                           </td>
                                           <td>
                                           Success
                                           </td>
                                           </tr>);
                                     })}
                                     {!loading && <tr><td colspan="11" class="text-center" ><LoadingGif message={loading_msg}/></td></tr>}
                                    {(loading && order_data.length<=0) && <tr>
                                        <td colspan="9" class="text-center">No orders to show.</td>
                                    </tr>}
                                </tbody>
                            </table>
                            <Pagination
                                activePage={this.state.current_page}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.total_pages}
                                pageRangeDisplayed={this.state.pageRangeDisplayed}
                                onChange={this.handlePageChange}
                                itemClass='page-item'
                                linkClass="page-link bold"
                                    />
                        </div>
                    </div>

                    <div class="clearfix"></div>
                </div>
                <div class="clearfix"></div>
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
export default Analytics;
