import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import {Link} from 'react-router-dom'
import {TAG,GETPACKS} from '../../url.js';
import Not_Found from '../../Component/not_found/not_found';
import LoadingGif from '../../Component/Loader/loading_gif'
import jsonp from 'jsonp';
;
class Packs extends React.Component
{
  state={pack_id:0,pack_name:'',packs:[],loading_msg:'Please Wait',isLoading:false,not_found:false}
  componentDidMount()
  {
this.setState({pack_name:this.props.match.params.pack_name},function()
  {
    this.getData();
  })
  }
  getData=()=>{
    axios.post(GETPACKS,{
tag:TAG,pack_type:this.state.pack_name,user_id:localStorage.getItem('user_id')
    }).then((res)=>{
      if(res.data.success==1)
      {
        var final_data=res.data.data.filter((result)=>result.single_pack!=1);
        this.setState({packs:final_data,not_found:false});
        setTimeout(()=>this.setState({isLoading:true}),1000)
      }
      else {
        this.setState({not_found:true})
      }

    }).catch((error)=>{

    })
  }
  formSubmit=(e)=>{
    e.preventDefault();
    if(this.state.pack_id==0)
    {
      alert('Please Select A Pack');
      return false;
    }
    else {
      localStorage.setItem('address_payment_status','1');
      localStorage.setItem('lastLocation',this.props.location.pathname);
      this.props.history.push(`/address/${this.state.pack_name}/${this.state.pack_id}`)
      //this.props.history.push(`/payment/${this.state.pack_name}/${this.state.pack_id}`)
    }

    }
    componentDidUpdate()
    {
      if(this.state.pack_name!=this.props.match.params.pack_name)
      {
this.setState({pack_name:this.props.match.params.pack_name,isLoading:false},function()
      {
        this.getData();
      })
      }
    }
  render()
  {
    const {isLoading,not_found,tab_data,loading_msg}=this.state;
    if(!not_found)
    {
      if(isLoading)
      {
    return(<section class="pricing_page">
        <div class="plans_indv">
            <div class="container">
                <h2>Images for every project, plans for every budget</h2>
                <p class="txt">Access over 313 million images with 1,87,000 new images added every day.</p>
                <div class="indv_box">
                    <h3>Plans for individuals</h3>
                    <div class="plan_area">
                        <div class="box l">
                            <h4>Various priced plans</h4>
                            {/*<p class="t">Save up to 40% with an annual plan, charged monthly. Early cancellation fee may apply.</p>*/}
                            <form onSubmit={this.formSubmit}>
                            <div class="price_list_area">
                                <div class="col l">
                                    <p class="free">
                                        <a href="javascript:">Free</a>
                                        Includes <strong>Planetshare Editor Pro</strong>
                                    </p>
                                    <ul class="inc_list">
                                        <li>
                                            <p>Create social media posts, promotions, and more in minutes</p>
                                        </li>
                                        <li>
                                            <p>Choose from hundreds of templates or customize an image</p>
                                        </li>
                                        <li>
                                            <p>Access professional design elements and time-saving features</p>
                                        </li>
                                    </ul>
                                    <a class="more" href="#">Learn more</a>
                                </div>

                                <div class="col r">
                                    <ul class="pr_list">
                                    {this.state.packs.length>0 && this.state.packs.map((res,key)=>{
                                          return(<li class={res.popular_content==1?"more_pop":""} key={key}>
                                              <div class="radiobox">
                                                  <input type="radio" name="price"  id={`price_${res.id}`} onClick={()=>this.setState({pack_id:res.id})}/>
                                                  <label for={`price_${res.id}`}>
                                                      <div class="p_box l">
                                                      {res.popular_content==1 && <p class="popular">Most populer</p>}
                                                      <p><strong>{res.pack_count} {this.state.pack_name}</strong></p>
                                                          <p class="rupee"><strong>INR<i class="fa fa-inr"></i> {res.pack_price}</strong></p>
                                                      </div>
                                                      <div class="p_box r">
                                                      <p><strong>Days</strong> <span>{res.pack_expire_time}</span></p>
                                                      </div>
                                                  </label>
                                              </div>
                                          </li>)
                                        })}
                                    </ul>
                                </div>

                            </div>
                            <div class="buttons">
                                <button type="submit" class="btndefault" disabled={this.state.pack_id==0?true:false}>Buy now</button>
                              {/*  <a href="javascript:;" class="m_price">See monthly pricing</a>*/}
                            </div>
                              </form>
                        </div>
                        {/*<div class="box r">
                            <h4>Popular image pack</h4>
                            <p class="t">Get images on demand. <br/>Download within a year.</p>

                            <ul class="pr_list">
                                <li>
                                    <div class="radiobox">
                                        <input type="radio" id="pre_price1" name="pre_price" />
                                        <label for="pre_price1">
                                            <div class="p_box l">
<p><strong>25 images</strong>/mo</p>
                                                <p class="rupee"><strong>INR<i class="fa fa-inr"></i> 229</strong>/mo</p>
                                            </div>
                                            <div class="p_box r">
<p><strong>INR<i class="fa fa-inr"></i> 9.16</strong> <span>per image</span></p>
                                            </div>
                                        </label>
                                    </div>
                                </li>
                                <li class="more_pop">
                                    <div class="radiobox">
                                        <input type="radio" id="pre_price2" name="pre_price" />
                                        <label for="pre_price2">
                                            <div class="p_box l">
                                                <p class="popular">More populer</p>
<p><strong>5 images</strong>/mo</p>
                                                <p class="rupee"><strong>INR<i class="fa fa-inr"></i> 49</strong>/mo</p>
                                            </div>
                                            <div class="p_box r">
<p><strong>INR<i class="fa fa-inr"></i> 9.80</strong> <span>per image</span></p>
                                            </div>
                                        </label>
                                    </div>
                                </li>
                            </ul>

                            <div class="buttons">
                                <button type="button" class="btndefault">Buy now</button>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>
        <div class="cust_ww">
            <div class="container">
                <h2>Our licenses protect over 1.5 million customers worldwide.</h2>
                <ul class="custww_list">
                    <li>Unlimited digital reproduction</li>
                    <li>Worldwide usage</li>
                    <li>Extended rights with enhanced and enterprise licenses</li>
                </ul>
                <div class="buttons">
                    <button class="btndefault" type="button">Compare licenses</button>
                </div>
            </div>
        </div>
        <div class="qu_box">
            <div class="container">
                <h2>Still have questions? We're here to help.</h2>
                <ul class="contct_list">
                    <li>
                        <div class="box">
                            <div class="icon">
                                <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                            </div>
                            <div class="desc">
                                <h3>FAQ</h3>
                                <p>Explore our frequently asked questions section.</p>
                                <a href="javascript:;" class="btndefault">View FAQ</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="box">
                            <div class="icon">
                                <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                            </div>
                            <div class="desc">
                                <h3>Give us a call</h3>
                                <p>Your local phone number: 000 800 0401 382</p>
                                <a href="javascript:" class="btndefault">Call us</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="box">
                            <div class="icon">
                                <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                            </div>
                            <div class="desc">
                                <h3>Send us a message</h3>
                                <p>We'll get back to you.</p>
                                <Link to="/web/contact_us" class="btndefault">Email us</Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
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
export default Packs;
