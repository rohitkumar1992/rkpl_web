import React from 'react';
import LoadingGif from '../../../Component/Loader/loading_gif'
class Analytics extends React.Component{
  state={loading:false,loading_msg:'Please Wait'}
  componentDidMount(){
        setTimeout(()=>this.setState({loading:true}),1000)
  }
  render()
  {
    const {loading,loading_msg}=this.state
    if(loading)
    {
    return(<section class="dashb_cont top_div">
        <div class="container">
            <div class="content_dash analytics_dash">
                <h2>Analytics</h2>
                <div class="price_analys_box">
                    <ul>
                        <li>
                            <p>Total Earnings</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                        <li>
                            <p>Total Completed Orders</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                        <li>
                            <p>Avg. Selling Price</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                        <li>
                            <p>Earned in December</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>

                <div class="analys_level">
                    <h3>Achieve these goals to become a Level One Vendor</h3>
                    <div class="goals_box">
                        <div class="box l">
                            <div class="prog_areas complete">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>Response Rate</h4>
                                        <p>Respond to 90% of the inquiries you received in the last 60 days</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator">100%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prog_areas complete">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>Order Completion Rate</h4>
                                        <p>Complete 90% of your orders, over the course of 60 days</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator">100%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prog_areas complete">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>On-time Delivery</h4>
                                        <p>Deliver 90% of your orders on time, over the course of 60 days</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator">100%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prog_areas rating">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>Rating</h4>
                                        <p>Maintain a 4.7 star rating, over the course of 60 days</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box r">
                            <div class="prog_areas sell_senior">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>Selling Seniority</h4>
                                        <p>Complete at least 60 day as a Vendor</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress_lab">4 day</span>
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator">60 day</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prog_areas">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>Orders</h4>
                                        <p>Receive and complete at least 10 orders (all time)</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator">10</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prog_areas">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>Earnings</h4>
                                        <p>Earn at least <i class="fa fa-inr"></i>400 from completed orders (all time)</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator"><i class="fa fa-inr"></i>400</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prog_areas complete">
                                <div class="area l">
                                    <div class="prog_cont">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        <h4>Days Without Warnings</h4>
                                        <p>Avoid receiving warnings for TOS violations over the course of 30 day</p>
                                    </div>
                                </div>
                                <div class="area r">
                                    <div class="prog_bar">
                                        <span class="indicator">0</span>
                                        <div class="bar">
                                            <span class="progress"></span>
                                        </div>
                                        <span class="indicator">30 day</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="analys_rating">
                    <h3>Ratings</h3>
                    <div class="rating_box">
                        <div class="box l">
                            <h4>
                                All-Time Rating 0
                                <div class="user_rating">
                                    <div class="star">
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                    </div>
                                    <div href="javascript:;" class="ttl_rev">(0)</div>
                                </div>
                            </h4>
                            <ul class="rat_list">
                                <li>
                                    <span class="indicator">5 Star</span>
                                    <div class="bar">
                                        <span class="progress"></span>
                                    </div>
                                    <span class="indicator">(0)</span>
                                </li>
                                <li>
                                    <span class="indicator">4 Star</span>
                                    <div class="bar">
                                        <span class="progress"></span>
                                    </div>
                                    <span class="indicator">(0)</span>
                                </li>
                                <li>
                                    <span class="indicator">3 Star</span>
                                    <div class="bar">
                                        <span class="progress"></span>
                                    </div>
                                    <span class="indicator">(0)</span>
                                </li>
                                <li>
                                    <span class="indicator">2 Star</span>
                                    <div class="bar">
                                        <span class="progress"></span>
                                    </div>
                                    <span class="indicator">(0)</span>
                                </li>
                                <li>
                                    <span class="indicator">1 Star</span>
                                    <div class="bar">
                                        <span class="progress"></span>
                                    </div>
                                    <span class="indicator">(0)</span>
                                </li>
                            </ul>
                        </div>
                        <div class="box m">
                            <h4>Rating Breakdown</h4>
                            <ul class="rat_breakdown">
                                <li>
                                    <label>Communication With Vendor</label>
                                    <div class="user_rating">
                                        <div class="star">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                        <div href="javascript:;" class="ttl_rev">(0)</div>
                                    </div>
                                </li>
                                <li>
                                    <label>Service as Described</label>
                                    <div class="user_rating">
                                        <div class="star">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                        <div href="javascript:;" class="ttl_rev">(0)</div>
                                    </div>
                                </li>
                                <li>
                                    <label>Buy Again or Recommend</label>
                                    <div class="user_rating">
                                        <div class="star">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                        <div href="javascript:;" class="ttl_rev">(0)</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="box r">
                            <h4>Rated Orders <span>0%</span></h4>
                            <ul class="rat_list">
                                <li>
                                    <div class="bar">
                                        <span class="progress"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
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
