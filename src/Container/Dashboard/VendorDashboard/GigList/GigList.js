import React from 'react';
import {VENDOR_GIG_TAB_CONTENT,USERID,TAG,VENDORID,VENDORSERVICECHANGESTATUS} from '../../../../url';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import axios from 'axios';
import Not_Found from '../../../../Component/not_found/not_found';
import $ from 'jquery';
import Tabs from '../tabs/tabs';
import Pagination from "react-js-pagination";
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import More from '../more_dots/more_dots';
import LoadingGif from '../../../../Component/Loader/loading_gif'
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const Accord=()=>{
    return( <tr class="rowContent">
          <td colspan="11">
              <div class="gigs_cont">
                  <div class="box l">
                      <div class="top_info">
                          <div class="status">
                              <h3>Gig Status</h3>
                              <button class="btndefault" type="button">Active</button>
                          </div>
                          <div class="statusinfo">
                              <h3>Gig Info</h3>
                              <div class="days">
                                  <span>2</span>
                                  Days average delivery time
                              </div>
                              <div class="days">
                                  <span>0</span>
                                  Orders in queue
                              </div>
                          </div>
                      </div>
                      <div class="limitorder">
                          <h3>
                              Limit orders in queue
                              <label class="switch">
                                  <input type="checkbox"/>
                                  <span class="slider round"></span>
                              </label>
                          </h3>
                          <p>Using this feature allows you to control the number of orders you can receive. Once the limit you set is reached, your Gig will temporarily be removed from Fiverr’s search. <br/>Disabling this feature returns your Gig to Fiverr’s search (approximately 15 minutes later).</p>
                      </div>
                      <div class="limitorder watermark">
                          <h3>
                              Activate Watermark
                              <label class="switch">
                                  <input type="checkbox"/>
                                  <span class="slider round"></span>
                              </label>
                          </h3>
                          <p>Activating this feature automatically adds the Fiverr Watermark to the images in the Order page and to your portfolio on your Gig page.</p>
                          <ol>
                              <li>The watermark will appear on image delivery previews prior to the buyer accepting and completing the order.</li>
                              <li>The watermark will only appear on images from completed orders in your Gig portfolio. It will not appear on images you upload to your portfolio.</li>
                          </ol>
                          <a href="javascript:;" class="learnmore">Learn more</a>
                      </div>
                  </div>
                  <div class="box r">
                      <h3>Reviews</h3>
                      <ul>
                          <li>
                              <span class="ttl">Communication with seller</span>
                              <span class="rating">
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <span class="reviews">(N/A)</span>
                              </span>
                          </li>
                          <li>
                              <span class="ttl">Service as described</span>
                              <span class="rating">
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <span class="reviews">(N/A)</span>
                              </span>
                          </li>
                          <li>
                              <span class="ttl">Buy again or recommend</span>
                              <span class="rating">
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <span class="reviews">(N/A)</span>
                              </span>
                          </li>
                          <li class="total">
                              <span class="ttl">Total</span>
                              <span class="rating">
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <span class="reviews">(0)</span>
                              </span>
                          </li>
                      </ul>
                  </div>
                  <div class="gig_perform">
                      <div class="perf_head">
                          <h3>Gig Performance</h3>
                          <div class="gigviews">
                              <label>Gig Views in the last 30 days</label>
                              <select>
                                  <option>Impressions</option>
                                  <option>Clicks</option>
                                  <option selected>Gig Views</option>
                                  <option>Social Gig Views</option>
                                  <option>Orders</option>
                                  <option>Conversion Rate</option>
                              </select>
                          </div>
                      </div>
                      <div class="graph">
                          <p class="nodata">No data available for this graph type.</p>
                      </div>
                      <div class="clearfix"></div>
                  </div>
              </div>
          </td>
      </tr>)
}
class GigList extends React.Component{
  state={loading_msg:'Please Wait',isLoading:false,not_found:false,tab_index:1,tab_count:[],tab_data:[],itemsCountPerPage:5,current_page:1,total_pages:1,pageRangeDisplayed:3}
  componentDidMount()
  {
  this.getData(this.state.current_page,this.state.tab_index);
  }
  getData=(page,tab_index)=>{
     const VENDOR_HEADER = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    };
    axios.post(`${VENDOR_GIG_TAB_CONTENT}?page=${page}`,{
      'user_id':localStorage.getItem('seller_id'),
      'vendor_id':localStorage.getItem('vendor_id'),
      'tag':TAG,
      'limit':this.state.itemsCountPerPage,
      'tab_index':tab_index
    },VENDOR_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({current_page:response.tab_data.current_page,tab_count:response.tabs,tab_data:response.tab_data.data,total_pages:response.tab_data.total});
        setTimeout(()=>this.setState({isLoading:true}),1000)
      }
      else {

      }
    }).catch((error)=>{

    });
  }
  handlePageChange=(pageNumber)=>{
    this.setState({current_page: pageNumber},function()
  {
    this.getData(pageNumber,this.state.tab_index)
  });
  }
  changeTab=(tab_index)=>{
    this.setState({current_page:1,tab_index:tab_index,},function()
  {
        this.getData(1,tab_index)
  })
  }
  changeStatus=(status,gig_id)=>{
    const VENDOR_HEADER = {
   headers: {
     'Content-Type': 'application/json;charset=UTF-8',
     'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
   }
   };
    axios.post(VENDORSERVICECHANGESTATUS,{
      'vendor_id':localStorage.getItem('vendor_id'),
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'status':status,
      'gig_id':gig_id
    },VENDOR_HEADER).then((res,key)=>{
      if(res.data.success==1)
      {
        this.getData(this.state.current_page,this.state.tab_index);
      }
      else {
        toast('Something Went Wrong',{ transition: Zoom,});
      }
    }).catch((error)=>{

    })
  }
  render()
  {
    const {isLoading,not_found,tab_data,loading_msg}=this.state;

    if(!not_found)
    {
      if(isLoading)
      {
      return(<section class="dashb_cont">
        <div class="container">
            <div class="db_cont_head">
                <h2>Gigs</h2>
                <h3>
                    Accepting Customer Orders
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </h3>
            </div>
            <Tabs tabData={this.state.tab_count} tab_index={this.state.tab_index} {...this.props} changeTab={this.changeTab.bind(this)}/>
            <div class="db_tab_cont">
                <div class="tab-content">
                    <div class="tab-pane active" id="gigactive">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="5"><span class="title">Your Services</span></th>
                                        <th colspan="6">
                                            <select>
                                                <option selected>Last 30 Days</option>
                                                <option>Last 7 Days</option>
                                                <option>Last Month</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                 <tbody>
                                    <tr>
                                        <th>
                                            {/*<label class="checkbox_fake">
                                                <input type="checkbox" />
                                                <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                            </label>*/}
                                        </th>
                                        <th colspan="3">Gig</th>
                                        <th><span data-toggle="tooltip" >Impressions</span></th>
                                        <th><span data-toggle="tooltip" >Clicks</span></th>
                                        <th><span data-toggle="tooltip" >Views</span></th>
                                        <th><span data-toggle="tooltip" >Orders</span></th>
                                        <th><span data-toggle="tooltip" >Cancellations</span></th>
                                        <th colspan="2"></th>
                                    </tr>
                                    {(tab_data.length>0 && isLoading)  && tab_data.map((res,key)=>{
                                        return( <tr class="accordion" key={key} >
                                            <td>
                                                {/*<label class="checkbox_fake">
                                                    <input type="checkbox" />
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>*/}
                                            </td>
                                            <td>
                                                <div class="img">
                                                    <img src={res.gig_image_1} alt="" />
                                                </div>
                                            </td>
                                            <td>
                                                <div class="link">
                                                    <a href="javascript:;">{res.gig_title}</a>
                                                </div>
                                            </td>
                                            <td></td>
                                            <td>0 <i class="fa fa-long-arrow-up blue"></i></td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0%</td>
                                            <td></td>
                                            <td>
                                              {tab_data.length>0  &&<More tab_index={this.state.tab_index} changeStatus={this.changeStatus} service_id={res.id}/>}
                                            </td>
                                            </tr>
                                          )
                                    })}
                                    {!isLoading && <tr><td colspan="11" class="text-center"  ><LoadingGif message={loading_msg}/></td></tr>}
                                  {/*  <tr class="accordion" >
                                        <td>
                                            <label class="checkbox_fake">
                                                <input type="checkbox" />
                                                <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                            </label>
                                        </td>
                                        <td>
                                            <div class="img">
                                                <img src="images/seller_icon.jpg" alt="" />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="link">
                                                <a href="javascript:;">do best in dubbing services in india as well as abrod</a>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td>0 <i class="fa fa-long-arrow-up blue"></i></td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0%</td>
                                        <td></td>
                                        <td>
                                            <div class="dropdown">
                                              <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
                                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <a class="dropdown-item" href="javascript:;">Preview</a>
                                                  <a class="dropdown-item" href="javascript:;">Edit</a>
                                                  <a class="dropdown-item" href="javascript;;">Share</a>
                                                  <a class="dropdown-item" href="javascript;;">Pause</a>
                                                  <a class="dropdown-item" href="javascript;;">Delete</a>
                                                  <a class="dropdown-item" href="javascript;;">Add Video</a>
                                                  <a class="dropdown-item" href="javascript;;"><input type="checkbox" /> Live Portfolio</a>
                                              </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr class="accordion">
                                        <td>
                                            <label class="checkbox_fake">
                                                <input type="checkbox" />
                                                <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                            </label>
                                        </td>
                                        <td>
                                            <div class="img">
                                                <img src="images/seller_icon.jpg" alt="" />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="link">
                                                <a href="javascript:;">do best in dubbing services in india as well as abrod</a>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td>0 <i class="fa fa-long-arrow-up blue"></i></td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0%</td>
                                        <td></td>
                                        <td>
                                            <div class="dropdown">
                                              <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
                                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <a class="dropdown-item" href="javascript:;">Preview</a>
                                                  <a class="dropdown-item" href="javascript:;">Edit</a>
                                                  <a class="dropdown-item" href="javascript;;">Share</a>
                                                  <a class="dropdown-item" href="javascript;;">Pause</a>
                                                  <a class="dropdown-item" href="javascript;;">Delete</a>
                                                  <a class="dropdown-item" href="javascript;;">Add Video</a>
                                                  <a class="dropdown-item" href="javascript;;"><input type="checkbox" /> Live Portfolio</a>
                                              </div>
                                            </div>
                                        </td>
                                    </tr>*/}
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
    else {
      return(<Not_Found/>)
    }
  }
}
export default GigList;
