import React from 'react';
import {Link} from 'react-router-dom';
import {VIEWMORE,USERID,TAG,color_code} from '../../url';
import axios from 'axios';
import Not_Found from '../../Component/not_found/not_found';
import Gallery12 from '../HomeData/photos'
import LoadingGif from '../../Component/Loader/loading_gif'
import Wordwrap from '../../Component/wordwrap';
// import Masonary from './massionary';
import $ from 'jquery'
class ViewMore extends React.Component{
  state={  color_code:["#F4F0F0", "#FCEDE8", "#FFF0E5", "#FFF4E5", "#FDF6E7", "#FAF7EB", "#FBF9E9", "#FEFDE6", "#FFFFE5", "#EFF6F6", "#E5FEFF", "#F3E7FD", "#F5F0F4", "#FCE9E9" ],isLoading:false,view_more_type:'',vid:'',view_more_result:[],not_found:false,page_title:'',page_description:'',stag:[],loading_msg:'Please Wait',imageLoaded:false}
  componentDidMount()
  {
    //  $('#mosonary').hide();
      // window.scrollTo({top:1000, left:0, behavior: 'smooth'});
    this.setState({view_more_type:this.props.match.params.view_more_type,vid:this.props.match.params.vid},function()
  {
    this.getData();
  //    window.addEventListener('load', this.handleLoad);

  });
    //  $('#masonary').hide();
  }

  // handleLoad=()=>{
  // setTimeout(()=>$('#mosonary').show(),1000);
  // }
  imageLoaded=(id)=>{
    $('#'+id).show()
  //  setTimeout(()=>,1000)
  }
  getData=()=>{
    axios.post(VIEWMORE,{
      'user_id':USERID,
      'tag':TAG,
      'view_more_type':this.state.view_more_type,
      'cat_id':this.state.vid
    }).then((res)=>{
      var response=res.data;
      if(res.data.success==1)
      {
        var stag=[];
        var result=response.data;
      //  for(var i=0;i<response.data.length;i++)
      //  {
        //
        //   var img = new Image();
        //   var width=2.5;
        //   var height=3;
        //   img.src = result[i].large_img;
        //   // if(img.height>2000)
        //   // {
        //   //   height=7
        //   // }
        //   // if(img.height>1500 && img.height<=1900)
        //   // {
        //   //   height=6
        //   // }
        //   // if(img.width>1800 && img.width<2500)
        //   // {
        //   //   width=5;
        //   // //  height=6
        //   // }
        //   // if(img.width>290 && img.width<600)
        //   // {
        //   //   width=3;
        //   // //  height=5;
        //   // }
        //   if(img.width>=600 && img.width<=1800)
        //   {
        //     width=4.5;
        //   //  height=5;
        //   }
        //   // if(img.width>=236 && img.width<=285)
        //   // {
        //   //   width=2;
        //   //
        //   // }
        //   // if(img.width>=2500 && img.width<=5000)
        //   // {
        //   //   width=3;
        //   //   height=1.5
        //   //
        //   // }
        //   // if(img.width>5000 && img.width<=6000)
        //   // {
        //   //   width=7;
        //   //   height=10;
        //   // }
        //   // if(img.width>6000)
        //   // {
        //   //   width=8;
        //   //   height=12;
        //   // }
          //var feed={id:result[i].id,title:result[i].title,short_desc:result[i].short_desc,src:result[i].large_img,}
        //   // var feed={id:result[i].id,title:result[i].title,short_desc:result[i].short_desc,src:result[i].large_img,width: Math.floor(Math.random() * (+wmax - +wmin)) + +wmin,height: Math.floor(Math.random() * (+hmax - +hmin)) + +hmin}
         //stag.push(feed)
       //}
        //         function shuffle(array) {
        //   var currentIndex = array.length, temporaryValue, randomIndex;
        //
        //   // While there remain elements to shuffle...
        //   while (0 !== currentIndex) {
        //
        //     // Pick a remaining element...
        //     randomIndex = Math.floor(Math.random() * currentIndex);
        //     currentIndex -= 1;
        //
        //     // And swap it with the current element.
        //     temporaryValue = array[currentIndex];
        //     array[currentIndex] = array[randomIndex];
        //     array[randomIndex] = temporaryValue;
        //   }
        //
        //   return array;
        // }

         this.setState({view_more_result:response.data,page_title:response.title,page_description:response.description});
         setTimeout(()=>this.setState({isLoading:true}),1000);
         //
         // var totalImage = 0, imageCount = 0;
         //  var elements=''
   //       for(var i=0;i<response.data.length;i++)
   //       {
   //
   //                  elements+= "<div class='gl_item'>"
   //                  elements+="<div class='img top_div'><img style={{backgroundColor:this.state.color_code[Math.floor(Math.random()*this.state.color_code.length)]}} src={result.large_img} /></div>"
   //                   elements+="<div class='b_d'>div class='icons'><i class='fa fa-heart'></i><i class='fa fa-angle-down'><span>Collect</span></i></div></div><div class='t_d'><div class='det'> <div class='info'>";
   //                   elements+="<p><img src='images/logo.png'  /></p></div><div class='dwn'><i class='fa fa-download'></i></div></div></div></div>";
   //       }
   //
   // $('#masonary').html(elements);
   // $('.gl_item .img img').load(function() {
   //   imageCount++;
   //   if(totalImage == imageCount){
   //     $('#masonary').masonry('reload');
   //   }
   // })
       }

    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.vid!=this.state.vid ||this.props.match.params.view_more_type!=this.state.view_more_type)
    {
        // window.scrollTo({top:0, left:0, behavior: 'smooth'});
      this.setState({isLoading:false,not_found:false,view_more_type:this.props.match.params.view_more_type,vid:this.props.match.params.vid},function()
    {
      this.getData();
    });
    }
  }
  createMarkup=(desc)=> {
  return {__html: desc};
}
  render()
  {
    const {isLoading,view_more_result,not_found,page_title,page_description,loading_msg,stag,imageLoaded}=this.state;
    if(!not_found)
    {
          if(this.props.match.params.view_more_type=="imagegallery" || this.props.match.params.view_more_type=="videogallery")
          {

            const Gallery=(view_more_result.length>0 && view_more_result.map((result,key)=>{
              return(<div class="item" key={key}>
                        <Link to={this.props.match.params.view_more_type=="imagegallery"?`/web/image/${(result.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`:`/web/video/${(result.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`} class="box">
                                          <div class="img" style={{backgroundColor:this.state.color_code[Math.floor(Math.random()*this.state.color_code.length)]}}>
                                              <img class="load_place_vert1" src={result.large_img} alt=""  />
                                          </div>
                                          <div class="desc">
                                              <span class="title">{result.title}</span>
                                              <div class="det"  dangerouslySetInnerHTML={this.createMarkup(result.short_desc)}></div>
                                          </div>
                                      </Link>
                                  </div>);
            }));
            const Gallery1=(view_more_result.length>0 && view_more_result.map((result,key)=>{
              return(<div class="gl_item wow slideInUp" style={{backgroundColor:this.state.color_code[Math.floor(Math.random()*this.state.color_code.length)]}}>
                <Link to={`/web/image/${(result.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`}>
                <div class="img top_div"><img onLoad={()=>this.imageLoaded(`image_show_${result.id}`)} id={`image_show_${result.id}`} src={result.large_img} /></div></Link>
                <div class="b_d">
                  <div class="icons">
                    <i class="fa fa-heart"></i>
                    <i class="fa fa-angle-down"><span>Collect</span></i>
                  </div>
                </div>
                <div class="t_d">
                  <div class="det">
                    <div class="info">
                      <p><img src="images/logo.png" alt="" /> {result.title}</p>
                    </div>
                    <div class="dwn">
                      <i class="fa fa-download"></i>
                    </div>
                  </div>
                </div>
              </div>);
            }));
            const Test=(<Gallery12 view_more_result={stag}/>)
            if(isLoading)
            {
                  return( <section class="inner_cont listing_page">
                              <div class="container">
                                  <article class="top_cat_detail">
                                      <h2>{page_title}</h2>
                                      <p>{page_description}</p>
                                      {/*<div class="buttons">
                                          <a href="javascript:;" class="btn btn_join">Join</a>
                                      </div>*/}
                                  </article>

                                  <article class="cat_gal_wrap ver_cat">
                                  {/*this.props.match.params.view_more_type=="imagegallery"?Test:Gallery*/}
                                  {this.props.match.params.view_more_type!="imagegallery" && <div class="ver_cat_list ">{Gallery}</div>}
                                  {(this.props.match.params.view_more_type=="imagegallery") && <div class=" masonary" id="masonary" >{Gallery1}</div>}
                                  <div class="clearfix"></div></article>

                              </div>
                            </section>)
            }
            else {
              return(<LoadingGif message={loading_msg}/>);
            }
          }
          if(this.props.match.params.view_more_type=="dubbing" || this.props.match.params.view_more_type=="subtitling" || this.props.match.params.view_more_type=="writingtranslation")
          {const Listing=(view_more_result.length>0 && view_more_result.map((result,key)=>{
            return( <div class="cat_item" key={key}>
                    <div class="box">
                      <Link to={`/web/vendorservice_description/${result.vendor_service_gigs_id}/${result.id}`}>
                          <div class="img" style={{backgroundColor:color_code[Math.floor(Math.random()*color_code.length)]}}>
                              <a>
                                  <img src={result.gig_image_1} alt="" />
                              </a>
                          </div>
                          <div class="sell_info">
                              <a><img src={result.get_profile_picture.profile_pic} alt="" />{result.vendor_name}</a>
                          </div>
                          <div class="desc">
                              <a><Wordwrap name={result.gig_title} count={8}/></a>
                          </div>
                          <div class="review">
                              <div class="rating">
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                  <span class="rating_val">4.5</span>
                                  <span class="rat_count">(1)</span>
                              </div>
                              {/*<div class="verify" data-hint="This Gig is offered by unrivaled talent verified by Planetshare for quality and service.">
                                  <img src="images/seller_logo.svg" alt="" />
                              </div>*/}
                          </div>
                      </Link>
                      <div class="price_info">
                          <a class="wish" href="javascript:;" data-hint="Add to Saved"><i class="fa fa-heart" aria-hidden="true"></i></a>
                          <a class="price" href="javascript:"><small>Starting at</small> <i class="fa fa-inr" aria-hidden="true"></i>{result.basic_pack_price}</a>
                      </div>
                    </div>
                </div>);
          }));
              if(isLoading)
              {
              return(
                <section class="inner_cont listing_page top_div">
                    <div class="container">
                        <article class="top_cat_detail">
                            <h2>{page_title}</h2>
                            <p>{page_description}</p>
                            {/*<div class="buttons">
                                <a href="javascript:;" class="btn btn_join">Join</a>
                            </div>*/}
                        </article>

                        <article class="cat_gal_wrap">
                            <aside class="cat_list_box">
                                <div class="cat_gal">
                                    {Listing}

                                </div>
                                {/*<div class="pagination_box">
                                    <ul class="pagination">
                                      <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                                      <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </div>*/}
                                <div class="clearfix"></div>
                            </aside>
                            <div class="clearfix"></div>
                        </article>

                        {/*<article class="bot_cat_detail">
                            <h2>Services Related To Dubbing</h2>
                            <div class="buttons">
                                <a href="javascript:;" class="btn">Voice Over</a>
                                <a href="javascript:;" class="btn">Translation</a>
                                <a href="javascript:;" class="btn">Dialogue Editing</a>
                                <a href="javascript:;" class="btn">Mising & Mastering</a>
                                <a href="javascript:;" class="btn">Singers & Vocalists</a>
                                <a href="javascript:;" class="btn">Transcripts</a>
                                <a href="javascript:;" class="btn">Jingle & Drops</a>
                                <a href="javascript:;" class="btn">Sound Effects</a>
                                <a href="javascript:;" class="btn">Content Marketing</a>
                                <a href="javascript:;" class="btn">Slideshow & Promo Videos</a>
                            </div>
                        </article>*/}
                    </div>
                    <div class="clearfix"></div>
                </section>);
                }
                else {
                  return(<LoadingGif message={loading_msg}/>);
                }
          }
          if(this.props.match.params.view_more_type=="imagecat" || this.props.match.params.view_more_type=="videocat")
          {
            const Categories=(view_more_result.length>0 && view_more_result.map((res,key)=>{
              return(<div class="col col-sm-6 col-md-2">
                            <Link to={this.props.match.params.view_more_type=="videocat"?`/web/videocategorydata/${(res.name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`:`/web/imagecategorydata/${(res.name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`} class="box">
                                <div class="img" style={{backgroundColor:this.state.color_code[Math.floor(Math.random()*this.state.color_code.length)]}}>
                                    <img src={res.large_img} alt="" style={{height:'280px'}} class="load_place_vert"/>
                                </div>
                                  {/*<div class="desc">
                                  <p>{res.cat_name}</p>
                                </div>*/}
                            </Link>
                        </div>);
            }));
            if(isLoading)
            {
              return(
                <section class="inner_cont listing_page top_div">
                    <div class="container">
                        <article class="top_cat_detail">
                            <h2>{page_title}</h2>
                            <p>{page_description}</p>
                            {/*<div class="buttons">
                                <a href="javascript:;" class="btn btn_join">Join</a>
                            </div>*/}
                        </article>
                  <aside class="ser_list_box">
                      <div class="row">
                  {Categories}
                  </div>
                  </aside>
                  <div class="clearfix"></div>
                  </div></section>)
            }
            else {
              return(<LoadingGif message={loading_msg}/>);
          }
        }
          else {
            return(<Not_Found/>)
          }
      }
    else {
      return(<Not_Found/>)
    }
  }
}
export default ViewMore;
