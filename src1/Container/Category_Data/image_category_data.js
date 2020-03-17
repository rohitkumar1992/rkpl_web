import React from 'react';
import {Link} from 'react-router-dom';
import {GETIMAGECATEGORYDATA,USERID,TAG,GETIMAGEFILTERCONTENT,DOWNLOADS} from '../../url';
import LoadingGif from '../../Component/Loader/loading_gif'
import axios from 'axios';
import $ from 'jquery'
import Not_Found from '../../Component/not_found/not_found';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import WordWrap from '../../Component/wordwrap';
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
class ImageCategoryData extends React.Component{
  state={isLoading:false,loading_msg:'Please Wait',cat_id:'',cat_name:'',not_found:false,category_data:[],
current_page:0,total_pages:0,limit:20,total_result:0,filter_artist_data:[],keyword:'',keywords_final:[]}
  componentDidMount()
  {
    var cat_name=this.props.match.params.cat_name;
    var fcat_name=cat_name.charAt(0).toUpperCase() + cat_name.substr(1).toLowerCase();
    this.setState({cat_id:this.props.match.params.cat_id,cat_name:fcat_name},function()
  {
       setTimeout(()=>this.setState({isLoading:true}),1000);
    this.getData(1,this.state.limit,'');
    this.getFilterContent();
  });

  }
  toggle=()=>{
        $('.filter_btn').toggleClass("filter_on");
        $(".category_page").toggleClass("fullwidth");
        $(".side_filter").toggleClass("open_filter");

  }
  getData=(page,limit,keyword)=>{
    axios.post(GETIMAGECATEGORYDATA,{
      'user_id':USERID,
      'tag':TAG,
      'limit':limit,
      'keyword':keyword,
      'category_id':this.state.cat_id,
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        var uniqueKeyqord=[];
        if(response.data.data.length>0)
        {
        for(var i=0;i<response.data.data.length;i++)
        {
           var data=response.data.data[i].keywords.split(',');
           for(var j=0;j<data.length;j++)
           {
            uniqueKeyqord.push(data[j])
           }
        }
      }
        const namesArr = uniqueKeyqord.filter(function(elem, pos) {
              return uniqueKeyqord.indexOf(elem) == pos;
          });
         this.setState({keyword:keyword,category_data:response.data.data,keywords_final:namesArr,current_page:response.data.current_page,total_pages:response.data.total,total_result:response.total_result});
         setTimeout(()=>this.setState({isLoading:true}),1000);
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  getFilterContent=()=>{
    axios.post(GETIMAGEFILTERCONTENT,{
      'user_id':USERID,
      'tag':TAG,
      'category_id':this.state.cat_id,
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
         this.setState({filter_artist_data:response.data});
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  componentDidUpdate()
  {
      if(this.props.match.params.cat_id!=this.state.cat_id )
    {
      var cat_name=this.props.match.params.cat_name;
      var fcat_name=cat_name.charAt(0).toUpperCase() + cat_name.substr(1).toLowerCase();
      this.setState({cat_id:this.props.match.params.cat_id,cat_name:fcat_name},function()
    {
         setTimeout(()=>this.setState({isLoading:true}),1000);
      this.getData(this.state.current_page,this.state.limit);
    });
    }
  }
  addToDownload=(image_id)=>{
    if(localStorage.getItem('user_id')==0)
    {
      toast("Please Login",{ transition: Zoom,});
      this.props.history.push('/login');
      return false;
    }
    axios.post(DOWNLOADS,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'item_id':image_id,
      'pack_type':'image',
    },HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        toast(response.msg,{ transition: Zoom,})
      }
      else {
        var response=res.data;
          this.props.history.push('/web/packs/image')
        toast(response.msg,{ transition: Zoom,});
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  render()
  {
    const {isLoading,not_found,category_data,cat_name,total_pages,total_result,filter_artist_data,loading_msg,keywords_final}=this.state;
    if(!not_found)
    {
      const Image_Listing=(category_data.length>0 && category_data.map((res,key)=>{
        return( <div class="col col-md-2 col-sm-4">
              <div class="box">
                  <Link to={`/web/image/${(res.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`}>
                      <img src={res.large_thumb} alt="" />
                      <div class="ov"></div>
                      <div class="q_t">
                          <span class="ql">4K</span>
                          <span class="tm">{res.extension}</span>
                          <span class="ttle"><WordWrap name={res.title} count={3}/></span>
                      </div>
                  </Link>
                  <div class="sv_crt">
                      <button type="button" class="crt" onClick={()=>this.addToDownload()}>
                          <i class="fa fa-download" aria-hidden="true"></i>
                          <span>Download</span>
                      </button>
                      {/*<button type="button" class="sv">
                          <i class="fa fa-plus-circle" aria-hidden="true"></i>
                          <span>Save</span>
                      </button>*/}
                  </div>
              </div>
          </div>);
      }));
      const Keywords=(keywords_final.length>0 && keywords_final.slice(0,10).map((res,key)=>{
          return(<a href="javascript:;" class="btn btn_catlist">{res}</a>)}))

      const Filter_Artist_Name=(filter_artist_data.length>0 && filter_artist_data.map((res,key)=>{
        return(<div class="col col-sm-4">
                  <button type="button" class="btn btn-success" onClick={()=>this.getData(1,this.state.limit,res.artist_name)}>{res.artist_name}</button>
              </div>);
      }));
            if(isLoading)
            {
              return(
                <section class="category_page top_div">
                    {/*<div class="filter_area sticky-top">
                        <div class="filter_btn">
                            <h2><i class="fa fa-exchange" aria-hidden="true"></i> Filters</h2>
                            <div class="btntoggle" onClick={this.toggle}><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                        </div>
                        <div class="clearfix"></div>
                    </div>*/}
                    <div class="cat_filter_area">
                        {/*<div  class="side_filter">
                            <form action="javascript:;" id="filter_form" class="filter_form sticky-top">
                                <h3>
                                    Planetshare Select
                                    <label class="switch">
                                        <input type="checkbox"/>
                                        <span class="slider round"></span>
                                    </label>
                                </h3>
                                <p>Only show our selection of premium quality clips</p>

                                <div id="accordion">
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#sortby">
                                                Sort By
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="sortby" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">Populer</button>
                                                    </div>
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">Fresh Content</button>
                                                    </div>
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">Best Match</button>
                                                    </div>
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">Random</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#maxresolution">
                                                Maximum Resolution
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="maxresolution" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-4">
                                                        <button type="button" class="btn btn-success">4K</button>
                                                    </div>
                                                    <div class="col col-sm-4">
                                                        <button type="button" class="btn btn-success">HD</button>
                                                    </div>
                                                    <div class="col col-sm-4">
                                                        <button type="button" class="btn btn-success">SD</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#fps">
                                                Artist Name
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="fps" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                  {Filter_Artist_Name}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#duration">
                                                Duration
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="duration" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-12">
                                                        <p class="dur">
                                                            <input type="text" />
                                                            <span>to</span>
                                                            <input type="text" />
                                                            <span>seconds</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#people">
                                                People
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="people" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">With people</button>
                                                    </div>
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">Without people</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#category_filter">
                                                Category
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="category_filter" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-12">
                                                        <div class="selectbox">
                                                            <label>Select a category</label>
                                                            <select>
                                                                <option>Select Category</option>
                                                                <option>Animal/Wildlife</option>
                                                                <option>Animal/Wildlife</option>
                                                                <option>Animal/Wildlife</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#contributor">
                                                Contributor
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="contributor" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-12">
                                                        <div class="inputbox">
                                                            <input type="text" />
                                                            <label>Name</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card">
                                        <h3 class="card-header">
                                            <a class="card-link" data-toggle="collapse" href="#usage">
                                                Usage
                                                <i class="fa fa-angle-up" aria-hidden="true"></i>
                                            </a>
                                        </h3>
                                        <div id="usage" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">Only editorial</button>
                                                    </div>
                                                    <div class="col col-sm-6">
                                                        <button type="button" class="btn btn-success">Non editorial</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="clearfix"></div>
                            </form>
                            <div class="clearfix"></div>
                        </div>*/}
                        <div class="cat_content_area">
                            <div class="top_info">
                                <h2>{cat_name} royalty-free stock images</h2>
                                <p>
                                    {total_result} {cat_name} royalty-free stock images <a href="javascript:;">{/*See {cat_name} stock images*/}</a>
                                </p>
                                {/*<div class="pagination_page">
                                    <ul>
                                        <li class="prv">
                                            <a href="javascript:"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
                                        </li>
                                        <li>
                                            <input type="text" value="1" alt="" />
                                        </li>
                                        <li class="nxt">
                                            <a href="javascript:"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
                                        </li>
                                    </ul>
                                    <span>of 1700</span>
                                </div>*/}
                                <div class="clearfix"></div>
                            </div>
                            <div class="cat_btn_list">
                            {
                              Keywords
                            }
                                <div class="clearfix"></div>
                            </div>

                            <div class="cat_i_v_list">
                                <div class="row">

                                    {Image_Listing}

                                </div>
                                <div class="clearfix"></div>
                            </div>

                            <div class="top_info">
                                {/*<div class="buttons">
                                    <button type="button" class="btn btn-success">Next</button>
                                </div>*/}
                                {/*<div class="pagination_page">
                                    <ul>
                                        <li class="prv">
                                            <a href="javascript:"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
                                        </li>
                                        <li>
                                            <input type="text" value="1" alt="" />
                                        </li>
                                        <li class="nxt">
                                            <a href="javascript:"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
                                        </li>
                                    </ul>
                                    <span>of 1700</span>
                                </div>*/}
                                <div class="clearfix"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </section>)
            }
            else {
              return(<LoadingGif message={loading_msg}/>);
            }
          }
    else {
      return(<Not_Found/>)
    }
  }
}
export default ImageCategoryData;
