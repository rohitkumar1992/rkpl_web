import React from 'react';
import Authentication from '../Authentication/Authentication';
import {GETUSERORDERS,USERID,TAG,TOKEN} from '../../url';
import axios from 'axios';
import $ from 'jquery'
import {Link} from 'react-router-dom'
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import Moment from 'react-moment';
import LoadingGif from '../../Component/Loader/loading_gif'
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const HEADER = {
headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class Orders extends React.Component
{
  state={not_found:false,loading:false,loading_msg:'Please Wait',order_list:[]}
  componentDidMount()
  {
    this.getData();
  }
  getData=()=>{
    axios.post(GETUSERORDERS,{user_id:USERID,tag:TAG},HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({order_list:response.data})
          setTimeout(()=>this.setState({loading:true}),1000)
      }
    }).catch((error)=>{

    })
  }
  render()
  {
    const {loading,loading_msg,order_list}=this.state;
    if(loading)
    {
      const Orders=(order_list.length>0 && order_list.map((res,key)=>{
        return(   <div class="cat_item"  key={key}>
              <div class="box">
                  <ul class="g_menu">
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-pencil" aria-hidden="true"></i>
                              Rename
                          </a>
                      </li>
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-share" aria-hidden="true"></i>
                              Share
                          </a>
                      </li>
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-files-o" aria-hidden="true"></i>
                              Copy
                          </a>
                      </li>
                      <li>
                          <a href="javascript:">
                              <i class="fa fa-trash-o" aria-hidden="true"></i>
                              Delete
                          </a>
                      </li>
                  </ul>
                  <div class="img">

                          <img src="images/dubbing1.jpg" alt="" />

                  </div>
                  <div class="desc">
                    {res.order_info.pack_name}
                  </div>
                  <div class="price_info">
                      <a class="wish gig_ac" href="javascript:" data-hint="Collect action"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                      <a class="count" href="javascript:">{res.order_info.pack_price}</a>
                  </div>
              </div>
          </div> )
      }));
      const toUpperCaseFilter = (d) => {
          return d.toUpperCase();
      };
      return(   <section class="inner_cont order_l">
        <article class="order_l_page">
            <div class="container">
                <div class="main_cont">
                    <div class="box">
                        <h2>Your Orders</h2>


                        <div class="order_list">
                          {order_list.length>0 && order_list.map((res,key)=>{return(<div class="item">
                              <div class="order_info">
                                  <div class="col placed">
                                      <p>Order Placed</p>
                                      <p>{res.payment_id_1!=null?'Success':'Transaction Failed'}</p>
                                       <Moment filter={toUpperCaseFilter} element="span">{res.created_at}</Moment>
                                  </div>
                                  <div class="col total">
                                      <p>Total</p>
                                      <p><i class="fa fa-inr" aria-hidden="true"></i><span>{res.order_info.pack_price}</span></p>
                                  </div>
                                  <div class="col orderid">
                                      <p><span>Order Id: {res.order_id}</span> {/*<a href="javascript:">Order Detail</a>*/}</p>
                                  </div>
                              </div>
                              <div class="prod_summry">
                                  <div class="prod_cont">
                                      <div class="img">
                                          <a href="javascript:;">
                                              <img src="images/cart_img.jpg" alt="" />
                                          </a>
                                      </div>
                                      <div class="prod_info">
                                          <p class="ttl"><a href="javascript:">{res.order_info.pack_name}</a></p>
                                          <p><b>Expires at:</b> <Moment filter={toUpperCaseFilter} element="span" add={{ days:res.order_info.pack_expire_time }}>{res.created_at}</Moment></p>
                                          <p><b>Total Number of Downloads:</b> {res.pack_total_download_count}</p>
                                          <p><b>Remaining Downloads:</b> {res.pack_total_download_count-res.pack_download_count}</p>
                                      </div>
                                  </div>
                                  <div class="prod_price">
                                  <div class="price">
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                    <span>{res.order_info.pack_price}</span>
                                  </div>
                                  </div>
                              </div>
                          </div>);})}
                      </div>
                    </div>
                </div>
                {order_list.length==0 && <h3 class="nohis">You Have No Purchase History Yet</h3>}
                {/*<aside class="sidebar_view sticky-top">
                    <div class="buyagain_info">
                        <h3>Buy it again</h3>
                        <ul class="buyagain_list">
                            <li>
                                <div class="prod_summry">
                                    <div class="prod_cont">
                                        <div class="img">
                                            <a href="javascript:;">
                                                <img src="images/cart_img.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div class="prod_info">
                                            <p class="ttl"><a href="javascript:;">I will design a hand drawn logo and brand identity</a></p>
                                            <div class="price">
                                                <i class="fa fa-inr" aria-hidden="true"></i>
                                                <span>41,683.36</span>
                                            </div>
                                            <a class="btn" href="javascript:">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="prod_summry">
                                    <div class="prod_cont">
                                        <div class="img">
                                            <a href="javascript:;">
                                                <img src="images/cart_img.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div class="prod_info">
                                            <p class="ttl"><a href="javascript:;">I will design a hand drawn logo and brand identity</a></p>
                                            <div class="price">
                                                <i class="fa fa-inr" aria-hidden="true"></i>
                                                <span>41,683.36</span>
                                            </div>
                                            <a class="btn" href="javascript:">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="prod_summry">
                                    <div class="prod_cont">
                                        <div class="img">
                                            <a href="javascript:;">
                                                <img src="images/cart_img.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div class="prod_info">
                                            <p class="ttl"><a href="javascript:;">I will design a hand drawn logo and brand identity</a></p>
                                            <div class="price">
                                                <i class="fa fa-inr" aria-hidden="true"></i>
                                                <span>41,683.36</span>
                                            </div>
                                            <a class="btn" href="javascript:">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>*/}
            </div>
        </article>
        <div class="clearfix"></div>
    </section>)
      }
      else {
        return(<LoadingGif message={loading_msg}/>)
      }
  }
}
export default Authentication(Orders);
