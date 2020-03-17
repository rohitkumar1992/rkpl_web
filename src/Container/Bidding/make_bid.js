import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Authentication from '../Authentication/Authentication';
import {USERID,TAG,BIDDATA,MAKEBIDOFFER} from '../../url';
import LoadingGif from '../../Component/Loader/loading_gif';
import Not_Found from '../../Component/not_found/not_found';
import ReactJWPlayer from 'react-jw-player';
import Duration from '../../Component/duration';
import DatePicker from "react-datepicker";
import cogoToast from 'cogo-toast';
import "react-datepicker/dist/react-datepicker.css";
const HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class MakeOffer extends React.Component{
  state={offer_price:'',not_found:false,loading:false,loading_msg:'Please Wait',btn_disable:false,bid_id:'',bid_data:[],language_list:[],
rights_format:["Free To Air","Pay TV","S-VOD","A-VOD","Transport"],l_period:{"type":"Indefinitely","start_date":"","end_date":""}, startDate: new Date(),endDate: new Date()
,rights_data:{"type":"All rights","format":[],"all_rights":""},offer_status_data:[]}
  componentDidMount()
  {
     //cogoToast.success('Your offer has been captured and sent to seller',{position:'bottom-center'});
    $(document).ready(function() {
            $(".bid_form table tbody td > label.hold").click(function() {
                $(this).toggleClass("active");
            });
            $('input[type="checkbox"]').on('change', function() {
                $('input[name="' + this.name + '"]').not(this).prop('checked', false);
            });
        });
      setTimeout(()=>this.setState({bid_id:this.props.match.params.bid_id},function()
    {
        this.getStatus()
    }),1000)
  }
  getStatus=()=>{
    axios.post(BIDDATA,{bid_id:this.state.bid_id,user_id:localStorage.getItem('user_id'),tag:TAG},{  headers:{
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }}).then((res,key)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({loading:true,bid_data:response.data,language_list:response.language,offer_status_data:response.offer},function()
      {
      })
      }
      else {
        this.setState({not_found:true})
      }
    }).catch((error)=>{

    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.bid_id!=this.state.bid_id )
    {
      this.setState({bid_id:this.props.match.params.bid_id,loading:true,not_found:false},function()
    {
       this.getStatus();
    });
   }
  }
  handleChange(value,e,type) {
   if(type=="start")
   {
     let l_period={...this.state.l_period};l_period['start_date']=value;
   this.setState({startDate:value,l_period})
   }
   else {
     let l_period={...this.state.l_period};l_period['end_date']=value;
      this.setState({endDate:value,l_period})
   }
   }
    makeOfferSubmit=(e)=>{
     e.preventDefault();
     this.setState({btn_disable:true});
     var offer_price=e.target.offer_price.value.trim();
     if(offer_price==0)
     {
       alert('Enter Price');
       return false;
     }
     axios.post(MAKEBIDOFFER,{bid_id:this.state.bid_id,user_id:localStorage.getItem('user_id'),
     offer_price:offer_price,tag:TAG,l_period:this.state.l_period,rights:this.state.rights_data},{headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
     }}).then((res)=>{
       if(res.data.success==1)
       {
         this.setState({isLoading:false,loading_msg:"Uploading Your Offer"});
         setTimeout(()=>{
           cogoToast.success('Your offer has been captured and sent to seller',{position:'bottom-center',size: '10px'});
           this.props.history.push(`/web/bidding/bid_description/${this.state.bid_id}`)
         },1000)
       }
       else {
         cogoToast.success(res.data.msg,{position:'bottom-center'});
         this.setState({btn_disable:false,isLoading:true,loading_msg:"Please Wait"})
       }
     }).catch((error)=>{
       this.setState({btn_disable:false,isLoading:true,loading_msg:"Please Wait"})
     })
   }
  render()
  {
    const {offer_status_data,loading_msg,loading,not_found,bid_data,language_list,rights_format,l_period,rights_data,btn_disable}=this.state;
    if(!not_found)
    {
      if(loading)
      {
        return(<section class="view_detail setrights">
        <article class="view_page">
            <div class="container">
                <div class="main_cont">
                    <div class="box">
                        <form class="bid_form" onSubmit={this.makeOfferSubmit}>
                            <h3>Rights Package</h3>
                            <div class="l_period">
                                <div class="field">
                                    <label><b>Licence Period</b></label>
                                    <div class="inputbox">
                                        <select required onChange={(e)=>{if(e.target.value=="Indefinitely"){
                                          this.setState({l_period:{"type":"Indefinitely","start_date":"","end_date":""}})
                                          return false;};let l_period={...this.state.l_period};l_period['type']=e.target.value;this.setState({l_period})}}>
                                            <option selected value="Indefinitely">Indefinitely</option>
                                            <option value="Fixed Term">Fixed Term</option>
                                        </select>
                                    </div>
                                </div>
                                {l_period['type']=="Fixed Term" && <div class="field">
                                    <label>Start date</label>
                                    <div class="inputbox">
                                    <DatePicker
                                 selected={this.state.startDate}
                                 onChange={(value, e) => this.handleChange(value, e,'start')}
                                 dateFormat="MM-dd-yyyy"
                                 showYearDropdown={true}
                                 showMonthDropdown={true}
                               />
                                    </div>
                                </div>}
                                {l_period['type']=="Fixed Term" && <div class="field">
                                    <label>End date</label>
                                    <div class="inputbox">
                                    <DatePicker
                                 selected={this.state.endDate}
                                 onChange={(value, e) => this.handleChange(value, e,'end')}
                                 dateFormat="MM-dd-yyyy"
                                 showYearDropdown={true}
                                 showMonthDropdown={true}
                               />
                                    </div>
                                </div>}
                            </div>

                            <div class="l_period sold_r">
                                <div class="field">
                                    <label><b>Rights You Need</b></label>
                                    <div class="inputbox">
                                        <select required onChange={(e)=>{if(e.target.value=="All rights"){
                                          let changes={...this.state.rights_data};
                                          changes['format']=[];
                                          changes['all_rights']="";
                                          changes['type']=e.target.value;
                                          this.setState({rights_data:changes});
                                          return false;
                                        };let rights_data={...this.state.rights_data};rights_data['type']=e.target.value;rights_data["all_rights"]="";this.setState({rights_data})}}>
                                            <option selected value="All rights">All rights</option>
                                            <option value="Limited">Limited</option>
                                        </select>
                                    </div>
                                </div>
                                {rights_data.type=="All rights" && <div class="field ex">
                                    <label>
                                        <input type="radio" value="E" name="exclusive" onChange={(e)=>{let rights_data={...this.state.rights_data};rights_data['all_rights']="E";this.setState({rights_data})}}/>
                                        <span><i class="fa fa-check" aria-hidden="true"></i> <b>Exclusive</b></span>
                                    </label>
                                </div>}
                                {rights_data.type=="All rights" && <div class="field ex">
                                    <label>
                                        <input type="radio" value="NE" name="exclusive" onChange={(e)=>{let rights_data={...this.state.rights_data};rights_data['all_rights']="NE";this.setState({rights_data})}}/>
                                        <span><i class="fa fa-check" aria-hidden="true"></i> <b>Non Exclusive</b></span>
                                    </label>
                                </div>
                            }
                            </div>
                            {rights_data.type=="Limited" && <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Format</th>
                                            <th colspan="2">Rights</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rights_format.map((res,key)=>{
                                          return(<tr key={key}>
                                              <td>{res}</td>
                                              <td>
                                                  <label>
                                                      <input type="radio" name={res} value={res} onChange={(e)=>{let rights_data={...this.state.rights_data};let format_info=[...this.state.rights_data.format];format_info.push({[res]:"E"});rights_data['format']=format_info;this.setState({rights_data})}}/>
                                                      <span><i class="fa fa-check"  aria-hidden="true"></i> <b>Exclusive</b></span>
                                                  </label>
                                              </td>
                                              <td>
                                                  <label>
                                                      <input type="radio" name={res} value={res} onChange={(e)=>{let rights_data={...this.state.rights_data};let format_info=[...this.state.rights_data.format];format_info.push({[res]:"NE"});rights_data['format']=format_info;this.setState({rights_data})}}/>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i> <b>Non Exclusive</b></span>
                                                  </label>
                                              </td>
                                          </tr>)
                                        })}

                                    </tbody>
                                </table>
                            </div>}
                            {offer_status_data==null && <div>
                            <h3>Offer Price</h3>
                            <div class="field" data-hint="Your offer price must be more than base price"><div class="inputbox"><input type="text" name="offer_price" placeholder="Enter Price" equired  value={this.state.offer_price} onChange={(e)=>{
                              if(isNaN(e.target.value))
                              {
                                return false;
                              }
                              else{
                                this.setState({offer_price:e.target.value})
                              }
                            }} /></div></div>
                            <div class="buttons">
                                <button type="submit" class="btndefault" disabled={btn_disable}>Send Your Offer To Seller</button>
                            </div>
                            </div>}
                            {offer_status_data!=null && <div class="yr_price">
                            <h3>Your Price</h3>
                            <span>{offer_status_data.user_price}</span>
                          </div>}
                        </form>
                    </div>
                </div>
                <aside class="sidebar_view sticky-top">
                    <div class="bid_preview">
                        <div class="main_cont">
                            <div class="box">
                                <div class="overview" id="overview">
                                    <div class="desc makeoffr" id="make_offer">
                                        <div class="lang">
                                            <label>Base Price:</label>
                                            <p><i class={bid_data.box_office_price.currency=="USD"?"fa fa-usd":"fa fa-inr"} aria-hidden="true"></i>{bid_data.box_office_price.price}</p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <h2>{bid_data.main_title.title}</h2>
                                    <div class="user_overview">
                                        <div class="user_img">
                                            <div class="name">
                                                <p>
                                                     <span>{bid_data.bid_type.type}</span> | <span><Duration sec1={bid_data.bid_type.run_time * 60000}/></span>
                                                </p>
                                            </div>
                                        </div>
                                        {/*<div class="user_rating">
                                            <div class="star">
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                            <div class="ttl_rat">5.0</div>
                                        </div>*/}
                                    </div>
                                    <div class="video_area">
                                        <div class="img">
                                              <img src={bid_data.poster_url} />
                                        </div>
                                        <ReactJWPlayer
                                        style={{backgroundColor:'grey'}}
                                        ref={(ref) => { this.player = ref }}
                                        playerId='jw-player'
                                        image={`${bid_data.poster_url}`}
                                        playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                                        file={bid_data.video_url}
                                        aspectRatio="16:9"
                                        isAutoPlay={false}
                                        controls={true}
                                        repeat="true"
                                          customProps={{
                                            controls: true,
                                            repeat: true,
                                            stretching: 'fill',
                                            preload: 'auto',
                                            volume: 100,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        />
                                    </div>
                                </div>
                                  {(bid_data.cast!==null || bid_data.producers!=null || bid_data.director!=null || bid_data.writer!=null) && <div class="desc" id="description">
                                    <h3>About This Bid</h3>
                                    <p>{bid_data.synopsis[0].title} </p>
                                    {bid_data.languages!=null && <div class="lang">
                                    <label>Languages:</label>
                                    <p>
                                        {bid_data.languages.split(',').map((res,key)=>{
                                          let data=language_list.filter((data)=>{return data.id==res})
                                          return(
                                            <a href="javascript:" className="btn" key={key}>{data[0].lang_name}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    {bid_data.dubbing_languages!=null && <div class="lang">
                                    <label>Dubbing Languages:</label>
                                    <p>
                                        { bid_data.dubbing_languages!=null && bid_data.dubbing_languages.split(',').map((res,key)=>{
                                          let data=language_list.filter((data)=>{return data.id==res})
                                          return(
                                            <a href="javascript:" className="btn" key={key}>{data[0].lang_name}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    {bid_data.subtitle_languages!=null && <div class="lang">
                                    <label>Subtitle Languages:</label>
                                    <p>
                                        {bid_data.dubbing_languages.split(',').map((res,key)=>{
                                          let data=language_list.filter((data)=>{return data.id==res})
                                          return(
                                            <a href="javascript:" className="btn" key={key}>{data[0].lang_name}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    {bid_data.genres!=null &&<div class="lang">
                                    <label>Genre(s):</label>
                                    <p>
                                        {bid_data.genres.split(',').map((res,key)=>{
                                          return(<a href="javascript:" className="btn" key={key}>{res} </a>)
                                        })}
                                    </p>
                                    </div>}
                                    {bid_data.keywords!=null &&<div class="lang">
                                    <label>Keywords:</label>
                                    <p>
                                        {bid_data.keywords.split(',').map((res,key)=>{
                                          return(<a href="javascript:" className="btn" key={key}>{res}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    <div class="clearfix"></div>
                                </div>}
                                <div class="prof_card" id="prod_detail">
                                    <h3>Production Details</h3>
                                    <div class="stats_desc">
                                        <ul class="user_stats">
                                            <li>Production Studios: <strong>{bid_data.production_studios}</strong></li>
                                            <li>Year of Release: <strong>{bid_data.year_of_release}</strong></li>
                                            <li>Country(ies) of origin: <strong>{bid_data.country_origin}</strong></li>
                                        </ul>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                {(bid_data.cast!=null || bid_data.writer!=null || bid_data.director!=null || bid_data.producers!=null) && <div class="desc" id="cast_crew">
                                    <h3>Cast & Crew</h3>
                                    {bid_data.cast!=null &&<div class="lang">
                                    <label>Cast:</label>
                                    <p>
                                        {bid_data.cast.split(',').map((res,key)=>{
                                          return(<a href="javascript:" className="btn" key={key}>{res}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    {bid_data.producers!=null &&<div class="lang">
                                    <label>Producers:</label>
                                    <p>
                                        {bid_data.producers.split(',').map((res,key)=>{
                                          return(<a href="javascript:" className="btn" key={key}>{res}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    {bid_data.director!=null &&<div class="lang">
                                    <label>Director:</label>
                                    <p>
                                        {bid_data.director.split(',').map((res,key)=>{
                                          return(<a href="javascript:" className="btn" key={key}>{res}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    {bid_data.writer!=null &&<div class="lang">
                                    <label>Writer:</label>
                                    <p>
                                        {bid_data.writer.split(',').map((res,key)=>{
                                          return(<a href="javascript:" className="btn" key={key}>{res}</a>)
                                        })}
                                    </p>
                                    </div>}
                                    <div class="clearfix"></div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
        <div class="clearfix"></div>
    </section>
            )
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
export default Authentication(MakeOffer);
