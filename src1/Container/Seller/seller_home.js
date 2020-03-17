import React from 'react';
import {Link} from 'react-router-dom';
import {GETVIDEOCATEGORYDATA,USERID,TAG,GETVIDEOFILTERCONTENT} from '../../url';
import axios from 'axios';
import $ from 'jquery'
import Not_Found from '../../Component/not_found/not_found';
import { withLastLocation } from 'react-router-last-location';
class SellerHome extends React.Component{
state={not_found:false,isLoading:true}
componentDidMount()
{
  $('.registerbox .reg_box .box .video').click(function() {
    $(this).addClass('play_vdo');
    $(this).children('video')[0].play();
  });
}
  render()
  {
    const {not_found,isLoading}=this.state
    if(!not_found)
    {
      if(isLoading)
      {
        return(<div class="top_div">
          <section class="inner_banner">
              <div class="box">
              <video autoPlay muted loop>
                                    <source src= "https://res.cloudinary.com/deyonsykf/video/upload/v1578564969/videos/transcoding1_sb52gv.mp4" type="video/mp4"/>
                                    <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631335/videos/transcoding1_njn9pj.ogv" type="video/ogv"/>
                                    <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631679/videos/transcoding1_uvwdnk.webm" type="video/webm"/>
                                </video>
                  <div class="caption">
                      <div class="container">
                          <h2>Work Your Way</h2>
                          <p class="desc">You bring the skill. We'll make earning easy.</p>
                          <div class="buttons">
                              <Link to="/dashboard/seller"><button type="button" class="btndefault">{localStorage.getItem('seller_id')==0?"Become a Seller":"Go To Dashboard"}</button></Link>
                          </div>
                      </div>
                      <div class="clearfix"></div>
                  </div>
                  <div class="timeframe">
                      <div class="container">
                          <ul>
                              <li>
                                  <p>A Gig is Bought Every</p>
                                  <span>4 SEC</span>
                              </li>
                              <li>
                                  <p>Transactions</p>
                                  <span>50K+</span>
                              </li>
                              <li>
                                  <p>Price Range</p>
                                  <span><i class="fa fa-inr"></i>5 - <i class="fa fa-inr"></i>5,00,000</span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="clearfix"></div>
          </section>
          <section class="inner_cont vndr_page">
              <div class="howwork">
                  <div class="container">
                      <h2>How It Works</h2>
                      <ul class="work_list">
                         <li>
                             <div class="icon create"></div>
                             <h4>1. Create A Gig</h4>
                             <p>Add your expertise to provide high-quality dubbing and subtitling services.</p>
                         </li>
                         <li>
                             <div class="icon work"></div>
                             <h4>2. Deliver Great Work</h4>
                             <p>Add your experience to finish job videos and upload with our easy to use platforms.</p>
                         </li>
                         <li>
                             <div class="icon paid"></div>
                             <h4>3. Get Paid</h4>
                             <p>Get paid handsomely for providing high-quality services to customers.</p>
                         </li>
                      </ul>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div class="registerbox">
                  <div class="container">
                      <div class="reg_box">
                          <div class="row">
                              <div class="col col-md-6">
                                  <div class="box">
                                      <img src="images/learn_logo.png" alt="" />
                                      <h2>On-demand professional courses, led by the world’s leading experts.</h2>
                                      <p>Discover what it takes to be a top-notch seller on Planetshare with this complimentary Learn from Planetshare course.</p>
                                      {/*<Link to="/dashboard/seller"><button type="button" class="btndefault">Register</button></Link>*/}
                                  </div>
                              </div>
                              <div class="col col-md-6">
                                  <div class="box">
                                      <div class="video">
                                          <video id="planetvideo" controls>
                                              <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1581509705/transcoding_yg5sw4.mp4" type="video/mp4"/>
                                          </video>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div class="buyer_story">
                  <div class="container">
                      <h2>Buyer Stories</h2>
                      <ul class="buyer_list">
                          <li>
                              <div class="img">
                                  <img src="images/buyer_reg1.jpg" alt="" />
                              </div>
                              <div class="info">
                                  <p><i>"People love our logo, and we love Planetshare."</i></p>
                                  <p class="name">Jennifer Gore, CEO of Weleet</p>
                              </div>
                          </li>
                          <li>
                              <div class="img">
                                  <img src="images/buyer_reg2.jpg" alt="" />
                              </div>
                              <div class="info">
                                  <p><i>"Planetshare is an amazing resource for anyone in the startup space."</i></p>
                                  <p class="name">Adam Mashaal, CEO of Mashfeed</p>
                              </div>
                          </li>
                          <li class="rev">
                              <div class="img">
                                  <img src="images/buyer_reg3.jpg" alt="" />
                              </div>
                              <div class="info">
                                  <p><i>"There is no way I could have produced anything without Planetshare."</i></p>
                                  <p class="name">Christopher Sunami, Music Producer</p>
                              </div>
                          </li>
                          <li class="rev">
                              <div class="img">
                                  <img src="images/buyer_reg4.jpg" alt="" />
                              </div>
                              <div class="info">
                                  <p><i>"Planetshare enables me to quickly, efficiently and cost-effectively get things done."</i></p>
                                  <p class="name">Cristina Dolan, Entrepreneur</p>
                              </div>
                          </li>
                      </ul>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div class="vend_qa">
                  <div class="container">
                      <h2>Q&A</h2>
                      <div class="row" id="accordion">
                          <div class="col col-lg-6">
                              <div class="qa_list">
                                  <div class="card">
                                      <div class="card-header">
                                          <h3 class="card-link" data-toggle="collapse" href="#qa1">
                                              How can i sell my service?
                                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                                          </h3>
                                      </div>
                                      <div id="qa1" class="collapse" data-parent="#accordion">
                                          <div class="card-body">
                                              Be creative! You can offer any service you wish as long as it's legal and complies with our terms. There are over 200 categories you can browse to get ideas.
                                          </div>
                                      </div>
                                  </div>

                                  <div class="card">
                                      <div class="card-header">
                                          <h3 class="collapsed card-link" data-toggle="collapse" href="#qa2">
                                              How much money can I make?
                                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                                          </h3>
                                      </div>
                                      <div id="qa2" class="collapse" data-parent="#accordion">
                                          <div class="card-body">
                                              It's totally up to you. You can work as much as you want. Many sellers work on Planetshare full time and some keep their 9-5 job while using Planetshare to make extra money.
                                          </div>
                                      </div>
                                  </div>

                                  <div class="card">
                                      <div class="card-header">
                                          <h3 class="collapsed card-link" data-toggle="collapse" href="#qa3">
                                              How much does it cost
                                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                                          </h3>
                                      </div>
                                      <div id="qa3" class="collapse" data-parent="#accordion">
                                          <div class="card-body">
                                              It's free to join Planetshare. There is no subscription required or fees to list your services. You keep 80% of each transaction.
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col col-lg-6">
                              <div class="qa_list">
                                  <div class="card">
                                      <div class="card-header">
                                          <h3 class="card-link" data-toggle="collapse" href="#qa4">
                                              How much time will I need to invest?
                                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                                          </h3>
                                      </div>
                                      <div id="qa4" class="collapse" data-parent="#accordion">
                                          <div class="card-body">
                                              It's very flexible. You need to put in some time and effort in the beginning to learn the marketplace and then you can decide for yourself what amount of work you want to do.
                                          </div>
                                      </div>
                                  </div>

                                  <div class="card">
                                      <div class="card-header">
                                          <h3 class="collapsed card-link" data-toggle="collapse" href="#qa5">
                                              How do I price my service?
                                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                                          </h3>
                                      </div>
                                      <div id="qa5" class="collapse" data-parent="#accordion">
                                          <div class="card-body">
                                              With Gig Packages, you set your pricing anywhere from $5 - $995 and offer three versions of your service at three different prices.
                                          </div>
                                      </div>
                                  </div>

                                  <div class="card">
                                      <div class="card-header">
                                          <h3 class="collapsed card-link" data-toggle="collapse" href="#qa6">
                                              How do I get paid?
                                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                                          </h3>
                                      </div>
                                      <div id="qa6" class="collapse" data-parent="#accordion">
                                          <div class="card-body">
                                              Once you complete a buyer's order, the money is transferred to your account. No need to chase clients for payments and wait 60 or 90 days for a check.
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div class="vend_started">
                  <div class="container">
                      {localStorage.getItem('seller_id')==0 && <p>Sign up to Upload Assets</p>}
                      <Link to="/dashboard/seller"><button class="btndefault" type="button">{localStorage.getItem('seller_id')==0?"Get Started":"Go To Dashboard"}</button></Link>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
          </section></div>
        )
      }
            else {
              return(<div>Loading..</div>);
            }
          }
    else {
      return(<Not_Found/>)
    }
  }
}
export default withLastLocation(SellerHome); 
