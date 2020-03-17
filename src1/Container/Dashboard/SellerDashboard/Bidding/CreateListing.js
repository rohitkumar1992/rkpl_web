import React,{useState,useEffect} from 'react';
import {USERID,TOKEN,HEADER,TAG,ADDBIDFILE,GETLANGUAGELIST} from '../../../../url.js'
import ImageCrop from '../../../ImageCrop/ImageCrop';
import Portal from '../../UploadPortal/UploadPortal';
import {MultiSelect} from 'primereact/multiselect';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css';
import LoadingGif from '../../../../Component/Loader/loading_gif'
import $ from 'jquery';
import axios from 'axios';
import cogoToast from 'cogo-toast';
const SELLER_HEADER = {
headers: {
  'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
const CreateList =(props)=>{
  const [bid_portal,change_bid_portal]=useState(false);
  const [auth_err,change_auth_err]=useState('');
  const [original_img,change_original_image]=useState('');
  const [croppedImageUrl,change_croppedImageUrl]=useState('');
  const [cropDataUrl,changeCropDataUrl]=useState('');
  const [updateTrue,change_updateTrue]=useState(false);
  const [lang_sel,change_lang_sel]=useState([]);
  const [dubb_lang_sel,change_dubb_lang_sel]=useState([]);
  const [subtitle_lang_sel,change_subtitle_lang_sel]=useState([]);
  const [genre,changeGenre]=useState([]);
  const [keywords,changeKeywords]=useState([]);
  const [director,changeDirector]=useState([]);
  const [producer,changeProducer]=useState([]);
  const [cast,changeCast]=useState([]);
  const [writer,changeWriter]=useState([]);
  const [mainTitle,changeMainTitle]=useState({"title":"","language":"","key":1});
  const [alternateTitle,changeAlternateTitle]=useState([{"title":"","language":"","key":1}]);
  const [synopsis,changeSynopsis]=useState([{"title":"","language":"","key":1}]);
  const [bidType,changeBidType]=useState([]);
  const [offerPrice,changeOfferPrice]=useState([]);
  const [isLoading,isLoadingChange]=useState(true);
  const [loading_msg,change_loading_msg]=useState('');
  const [languageList,changelanguageList]=useState([]);
  const changeQuality=()=>{
  const checkeds = document.getElementsByName("quality_type");
     var checkedArr=[];
    for (let i = 0; i < checkeds.length; i++) {
      if (checkeds[i].checked) {
        checkedArr.push(checkeds[i].value);
      }
    }
    changeBidType({...bidType,"quality":checkedArr})
  }
  useEffect(()=>{
    axios.get(GETLANGUAGELIST).then((res)=>{
      if(res.data.success==1)
      {
         changelanguageList(res.data.data)
      }
    }).catch((err)=>{

    })
  },{});
  const isValidated=(e)=>{
    e.preventDefault();
    var main_title=mainTitle;
    var genres=genre;
    var languages=lang_sel;
    var bid_type=bidType;
    var synopsis_submit=synopsis;
    var languages=lang_sel;
    var bid_type=bidType;
    var dubb_lang=dubb_lang_sel;
    var subtitle_lang=subtitle_lang_sel;
    var s_keywords=keywords;
    var s_producer=producer;
    var s_director=director;
    var s_cast=cast;
    var s_writer=writer;
    var alternate_title=alternateTitle;
    var box_office_price=offerPrice;
    var croppedImageUrl=cropDataUrl;
    var censorship_rating=e.target.censor_ship.value.trim();
    var year_of_release=e.target.release_year.value.trim();
    var production_studios=e.target.production_studio_name.value.trim();
    var country_origin=e.target.country.value.trim();
    var imdb_id=e.target.imdb_id.value.trim();
    var eidr_id=e.target.eidr_id.value.trim();
    // console.log(dubb_lang_sel);
    if(dubb_lang_sel==null)
    {
      dubb_lang_sel='';
      dubb_lang_sel='';
    }
    if(offerPrice==null)
    {
      offerPrice='';
    }
    if(subtitle_lang_sel==null)
    {
      subtitle_lang_sel='';
    }
    if(s_keywords==null)
    {
      s_keywords='';
    }
    if(s_producer==null)
    {
      s_producer='';
    }
    if(s_director==null)
    {
      s_director='';
    }
    if(s_cast==null)
    {
      s_cast='';
    }
    if(s_writer==null)
    {
      s_writer='';
    }
    if(croppedImageUrl=="")
    {
      cogoToast.error('Please upload poster',{position:'bottom-center'})
      return false;
    }
    if(genres.length==0 || languages.length==0)
    {
      cogoToast.error('Please fill all the mandatory fields',{position:'bottom-center'})
      return false;
    }
    if(year_of_release=="" || production_studios=="" || country_origin=="")
    {
      cogoToast.error('Please fill all the mandatory fields',{position:'bottom-center'})
      return false;
    }
    var formData=new FormData();
    formData.append('user_id',localStorage.getItem('user_id'));
formData.append('seller_id',localStorage.getItem('seller_id'));
    formData.append('tag',TAG);
    formData.append('file',croppedImageUrl);
    formData.append('main_title',main_title);
    formData.append('synopsis',synopsis_submit);
    formData.append('bid_type',bid_type);
    formData.append('languages',languages);
    formData.append('genres',genres);
    formData.append('alternate_title',alternate_title);
    formData.append('dubbing_languages',dubb_lang);
    formData.append('subtitle_languages',subtitle_lang);
    formData.append('censorship_rating',censorship_rating);
    formData.append('cast',s_cast);
    formData.append('keywords',s_keywords);
    formData.append('producer',s_producer);
    formData.append('production_studios',production_studios);
    formData.append('year_of_release',year_of_release);
    formData.append('eidr_id',eidr_id);
    formData.append('country_origin',country_origin);
    formData.append('imdb_id',imdb_id);
    formData.append('writer',s_writer);
    formData.append('director',s_director);
    formData.append('box_office_price',box_office_price);

axios.post(ADDBIDFILE,{user_id:localStorage.getItem('user_id'),seller_id:localStorage.getItem('seller_id'),tag:TAG,file:croppedImageUrl,
        main_title:main_title,
        synopsis:synopsis_submit,
        bid_type:bid_type,
        languages:languages,
        genres:genres,
        alternate_title:alternate_title,
        dubbing_languages:dubb_lang_sel,
        subtitle_languages:subtitle_lang_sel,
        censorship_rating:censorship_rating,
        cast:cast,
        producer:producer,
        production_studios:production_studios,
        year_of_release:year_of_release,
        eidr_id:eidr_id,
        country_origin:country_origin,
        imdb_id:imdb_id,
        writer:writer,
        director:director,
box_office_price:offerPrice},SELLER_HEADER).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        if(response.success==1)
        {
          isLoadingChange(false);
          change_loading_msg('Uploading')
setTimeout(()=>props.history.push(`/dashboard/seller/bidding/bid_media_upload/${response.bid_id}`),1000);
        }
      }
      else {
      }

    }).catch((error)=>{
    })
  }
  if(isLoading)
  {
  return(
    <section class="dashb_cont">
      <div class="container">
          <div class="content_dash bidding_dash">
    <div class="bidding_form">
      <h3>Listing Details</h3>
      <form class="bid_form" onSubmit={isValidated} enctype="multipart/form-data">
          {/*<div class="fields">
              <div class="field">
                  <label>Department <span data-hint="Select the department you wish this Listing to belong to. This will determine what members of your Organization will receive relevant notifications and who will be able to manage Enquiries and Offers."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                  <div class="inputbox">
                      <select>
                          <option>Planetcast Media - General</option>
                      </select>
                  </div>
              </div>
          </div>*/}
          <div class="bid_boxes">
            <div class="left_box">
              <div class="fields boxes">
                  {/*<div class="box l">
                      <div class="field" onClick={()=>{change_bid_portal(true);$("#portal_modal").addClass("show")}}>
                          <div class="icon">
                            <i class="fa fa-pencil"></i>
                          </div>
                          <label for="upload_vimg">
                              <i class="fa fa-upload" aria-hidden="true"></i>
                              <b>Upload key artwork <sup>*</sup></b>
                              <p>Click here to choose poster file to upload</p>
                              <img src={croppedImageUrl} id="bid_thumbnail" alt="" />
                          </label>
                      </div>
                  </div>
                  {(bid_portal) &&<Portal modalType="bidding_portal" img_poster={croppedImageUrl} onBack={()=>{changeCropDataUrl('');change_original_image('');change_croppedImageUrl('');change_updateTrue(true)}} onChange={()=>{change_bid_portal(true);change_auth_err('')}}><ImageCrop onBack={()=>{changeCropDataUrl('');change_original_image('');change_croppedImageUrl('');change_updateTrue(true)}} onChange={()=>{change_bid_portal(true);change_auth_err('')}} cropImgUrl={(src,url,crop_data_url)=>{change_croppedImageUrl(url);change_original_image(src);changeCropDataUrl(crop_data_url);change_updateTrue(false)}} updateTrue={updateTrue} original_img={original_img} croppedImageUrl={croppedImageUrl}/></Portal>}*/}
                  <div class="field al pd0">
                      <label>Listing Title/Name<sup>*</sup> <span data-hint="Type in the name of the new Listing. If the Listing represents a TV Series/Season, please do not include the season number in the title. Instead, simply put the name of the TV Show. (i.e. do not enter in 'Friends: Season 3', instead simply put 'Friends'. We'll fill in the season number later. Please provide the title in the primary language and specify the language in the language dropdown to the right."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                        <div class="inputbox">
                            <input required type="text" placeholder="Main Title" alt="" onChange={(e)=>{ let newArr={...mainTitle};newArr.title=e.target.value;changeMainTitle(newArr)}} required/>
                            <select required onChange={(e)=>{ let newArr={...mainTitle};newArr.language=e.target.value;changeMainTitle(newArr)}}>
                            <option value="" selected disabled>Select Language</option>
{languageList.map((res,key)=><option value={res.value}>{res.label}</option>)}
                            </select>
                        </div>
                  </div>
                  <div class="field al">
                      <label>Alternate Titles <span data-hint="You can provide one or more alternate titles of the listed Film, TV series, etc. Often this could be a different title used in another market, or a different language representation of the title. If the original title's language is not English and you provided the English title above, then providing the original language title here is encouraged."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      {alternateTitle.map((res,key)=>{
                        return(<div class="inputbox">
                            <input type="text" placeholder="Alternate Title" alt="" onChange={(e)=>{ let newArr=[...alternateTitle];newArr[key].title=e.target.value;changeAlternateTitle(newArr)}}/>
                            <select onChange={(e)=>{ let newArr=[...alternateTitle];newArr[key].language=e.target.value;changeAlternateTitle(newArr)}}>
                            <option value="" selected disabled>Select Language</option>
{languageList.map((res,key)=><option Value={res.value}>{res.label}</option>)}
                            </select>
                            <div class="icon">
                                {key==0 && <i class="fa fa-plus-circle" aria-hidden="true" onClick={()=>changeAlternateTitle([...alternateTitle,{"title":"","language":"","key":alternateTitle.length+1}])}></i>}
                                {(key!=0 && alternateTitle.length==key+1)&& <i class="fa fa-minus-circle" aria-hidden="true" onClick={()=>changeAlternateTitle(alternateTitle.filter((item,index) =>key+1 !==item.key))}></i>}
                            </div>
                        </div>)
                      })}
                  </div>
              </div>
              <div class="fields boxes">
                  <div class="field al">
                      <label>Synopsis (max 4,000 characters)<sup>*</sup> <span data-hint="Provide a detailed Summary or Synopsis of the content represented in the Listing. If the Listing is a season of a TV Series, the Synopsis should describe the Season and not the overall TV Series. Specify the language of the Synopsis you entered. Press the (+) icon if you'd like to add another Synopsis in another language"><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      {synopsis.map((res,key)=>{
                        return(<div class="inputbox">
                          <textarea required placeholder="Add a synopsis to your listing" onChange={(e)=>{ let newArr=[...synopsis];newArr[key].title=e.target.value;changeSynopsis(newArr)}}></textarea>
                          <select required onChange={(e)=>{ let newArr=[...synopsis];newArr[key].language=e.target.value;changeSynopsis(newArr)}}>
                          <option value="" selected disabled>Select Language</option>
{languageList.map((res,key)=><option Value={res.value}>{res.label}</option>)}
                          </select>
                          <div class="icon">
                              {key==0 && <i class="fa fa-plus-circle" aria-hidden="true" onClick={()=>changeSynopsis([...synopsis,{"title":"","language":"","key":synopsis.length+1}])}></i>}
                              {(key!=0 && synopsis.length==key+1)&& <i class="fa fa-minus-circle" aria-hidden="true" onClick={()=>changeSynopsis(synopsis.filter((item,index) =>key+1 !==item.key))}></i>}
                          </div>
                      </div>)})}
                  </div>
              </div>
              <div class="fields frmt">
                  <div class="field">
                      <label>Type<sup>*</sup> <span data-hint="Specify the type of work represented by the Listing, such as Film, TV Series, etc. If you select TV Series, then you will be asked to provide the Season number. Generally, Listings should be of Seasons and not entire Series."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <select name="bid_type" required onChange={(e)=>{changeBidType({...bidType,"type":e.target.value,"seasons":0,"episodes":0})}} required>
                              <option value="" selected disabled>Select type</option>
                              <option value="Film">Film</option>
                              <option value="TV Series">TV Series</option>
                              <option value="TV Shows/Special">TV Shows/Special</option>
                              <option value="Web Series">Web Series</option>
                              <option value="Sports">Sports</option>
                              <option value="Short Film">Short Film</option>
                          </select>
                      </div>
                  </div>
                  <div class="field">
    <label>Runtime(minutes)<sup>*</sup> <span data-hint="The approximate run-time of the content described by the Listing in minutes. If the Listing is of a TV Series/Season, then please provide the typical length of a single episode in the series. Likewise, if the Listing is a multiple episode TV Show/Special, provide the typical length of a single episode. For broadcast, this should be the content length (e.g. a show that fills a 1 hour slot with commercials, will typically have a duration of 45 minutes)."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <input type="text" onChange={(e)=>{changeBidType({...bidType,"run_time":e.target.value})}} required/>
                      </div>
                  </div>
                  {bidType.type=="Web Series" && <div class="field">
                      <label>Season<sup>*</sup> <span data-toggle="tooltip"  ><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <input type="text" onChange={(e)=>{changeBidType({...bidType,"seasons":e.target.value})}}/>
                      </div>
                  </div>}
                  {bidType.type=="Web Series" && <div class="field">
<label>Episodes<sup>*</sup> <span data-toggle="tooltip"><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <input type="text" onChange={(e)=>{changeBidType({...bidType,"episodes":e.target.value})}}/>
                      </div>
                  </div>}
                  <div class="field">
                      <label>Format<sup>*</sup> <span data-hint="Select the format profiles the Listing's content is available in for licensing."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <label for="sd">
                              <input type="checkbox" id="sd" value="SD" name="quality_type" onChange={()=>changeQuality()}/>
                              <span>SD</span>
                          </label>
                          <label for="hd">
                              <input type="checkbox" name="quality_type" value="HD" id="hd" onChange={()=>changeQuality()}/>
                              <span>HD</span>
                          </label>
                          <label for="4k">
                              <input type="checkbox" name="quality_type" value="4K" id="4k" onChange={()=>changeQuality()}/>
                              <span>4K</span>
                          </label>
                          <label for="8k">
                              <input type="checkbox" name="quality_type" value="8K" id="8k" onChange={()=>changeQuality()}/>
                              <span>8K</span>
                          </label>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
<label>Languages<sup>*</sup> <span data-hint="Provide the primary, original spoken language(s) of the Listing. This is not meant to represent any dubbings (these will come next)."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <MultiSelect value={lang_sel} options={languageList} onChange={(e) => change_lang_sel(e.value)}  style={{minWidth:'12em'}} filter={true} placeholder="Select Language"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Dubbing Languages <span data-hint="Provide a listing of audio dubbings available for licensing."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <MultiSelect value={dubb_lang_sel} options={languageList} onChange={(e) => change_dubb_lang_sel(e.value)}  style={{minWidth:'12em'}} filter={true} placeholder="Select Dubbing Language"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Subtitles Languages <span data-hint="Provide a listing of subtitles available for licensing."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <MultiSelect value={subtitle_lang_sel} options={languageList} onChange={(e) => change_subtitle_lang_sel(e.value)} style={{minWidth:'12em'}} filter={true} placeholder="Select Subtitling Language"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Censorship Rating <span data-hint="Provide a rating of the Listing, generally from the country of origin. If there is no rating, please select 'Not Rated'. If unknown, please leave this blank."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <select name="censor_ship" >
                              <option value="" selected disabled>Select</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
<label>Genre(s)<sup>*</sup> <span data-hint="Provide a listing of one or more Genres of the Listing."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <TagsInput value={genre} onChange={(genre)=>{changeGenre(genre)}} onlyUnique={true} maxTags={10}   placeholder="Add Genre"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Keywords <span data-hint="Provide a listing of relevant keywords that will help buyers find your Listing more easily. These keywords can be as detailed as needed."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <TagsInput value={keywords} onChange={(keywords)=>{changeKeywords(keywords)}} onlyUnique={true} maxTags={10}   placeholder="Add Keywords"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="row">
                      <div class="col-md-6">
                          <div class="field">
                              <label>IMDB ID <span data-hint="If you know the IMDb id of your Film or Series, please enter it here. IMDb IDs typically take the form of 'tt#######', and can be found in the URL of the entry. e.g. The IMDb URL for the movie Avatar is https://www.imdb.com/title/tt0499549/. The IMDb ID is tt0499549. It is strongly encouraged to enter the IMDb ID if an IMDb entry already exists as it will help prospective buyers evaluate your Listing better."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                              <div class="inputbox">
                                  <input type="text" placeholder="" name="imdb_id"/>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="field">
                              <label>EIDR ID <span data-hint="EIDR is a global unique identifier system for a broad array of audio visual objects, including motion pictures, television, and radio programs. More and more content buyers are requiring the use of EIDR when ingesting content onto their platforms. Planetshare uses EIDR to uniquely identify Films, TV Series, etc so that both the Buyer and Seller can effectively and transparently transact. If your content already has an EIDR ID, please type it in here. If not, don't worry -Planetshare will help register one for you."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                              <div class="inputbox">
                                  <input type="text" placeholder="" name="eidr_id"/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <h3>Production Details</h3>
              <div class="fields">
                  <div class="field">
                      <label>Production Studios<sup>*</sup> <span data-hint="Type in one or more companies that were/are involved in the production of the content described in this Listing. These are typically the top few production companies that were/are instrumental in producing the content. Note that this should not be a listing of the individual producers with producer credits. We'll capture these later."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <input type="text" placeholder="Production companies" name="production_studio_name" required/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Year of Release<sup>*</sup> <span data-hint="Provide the Year of Release of the Listing. This should be the year of original release and not subsequent re-releases or dubbing releases. This is a required field."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <input type="text" placeholder="" name="release_year" required/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Country(ies) of origin<sup>*</sup> <span data-hint="Provide a listing of the one or more primary countries of origin of this Listing. This is not a listing of the filming locations."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <input type="text" placeholder="Countries of origin" name="country" required/>
                      </div>
                  </div>
              </div>

              <h3>Cast & Crew</h3>
              <div class="fields">
                  <div class="field">
                      <label>Cast members <span data-hint="Provide a listing of the key four or five cast members. Focus on the recognizable names. This will help buyers find your Listing if they're interested in purchasing content featuring a specific actor."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <TagsInput value={cast} onChange={(cast)=>{changeCast(cast)}} onlyUnique={true} maxTags={10}   placeholder="Add Cast"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Producer(s) <span data-hint="Provide a listing of the key four or five Producers. Focus on the recognizable names and/or those Producers with higher responsibilities in the production. This will help buyers find your Listing if they're interested in purchasing content featuring a specific Producer."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <TagsInput value={producer} onChange={(producer)=>{changeProducer(producer)}} onlyUnique={true} maxTags={10}   placeholder="Add Producer"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
<label>Director(s)<sup>*</sup> <span data-hint="Provide the name of the director (or a list of if there are more than one). This will help buyers find your Listing if they're interested in purchasing content featuring a specific Director."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                        <TagsInput value={director} onChange={(director)=>{changeDirector(director)}} onlyUnique={true} maxTags={10}   placeholder="Add Director"/>
                      </div>
                  </div>
              </div>
              <div class="fields">
                  <div class="field">
                      <label>Writer(s) <span data-hint="Provide a listing of the key four or five writers. Focus on the recognizable names and/or those Writers with higher writing credits. This will help buyers find your Listing if they're interested in purchasing content featuring a specific Writer."><i class="fa fa-question-circle-o" aria-hidden="true"></i></span></label>
                      <div class="inputbox">
                          <TagsInput value={writer} onChange={(writer)=>{changeWriter(writer)}} onlyUnique={true} maxTags={10}   placeholder="Add Writer"/>
                      </div>
                  </div>
              </div>

              <h3>Make an Offer</h3>
              <div class="fields">
                  <div class="field coun">
                      <label>Offer Price</label>
                      <div class="inputbox">
                          <select onChange={(e)=>{changeOfferPrice({...offerPrice,"currency":e.target.value})}} required>
                              <option value="" selected disabled>Select Currency</option>
                              <option value="USD">USD</option>
                              <option value="INR">INR</option>
                          </select>
                          <input type="text" alt="" onChange={(e)=>{changeOfferPrice({...offerPrice,"price":e.target.value})}} required/>
                      </div>
                  </div>
              </div>
              <div class="buttons">
                  <button type="submit" class="btndefault">Continue</button>
              </div>
            </div>
            <div class="right_box sticky-top">
              <div class="fields boxes">
                <div class="box l">
                    <div class="field" onClick={()=>{change_bid_portal(true);$("#portal_modal").addClass("show")}}>
                        <div class="icon">
                          <i class="fa fa-pencil"></i>
                        </div>
                        <label for="upload_vimg">
                            <i class="fa fa-upload" aria-hidden="true"></i>
                            <b>Upload key artwork <sup>*</sup></b>
                            <p>Click here to choose poster file to upload</p>
                            <img src={croppedImageUrl} id="bid_thumbnail" alt="" />
                        </label>
                    </div>
                </div>
                {(bid_portal) &&<Portal modalType="bidding_portal" img_poster={croppedImageUrl} onBack={()=>{changeCropDataUrl('');change_original_image('');change_croppedImageUrl('');change_updateTrue(true)}} onChange={()=>{change_bid_portal(true);change_auth_err('')}}><ImageCrop onBack={()=>{changeCropDataUrl('');change_original_image('');change_croppedImageUrl('');change_updateTrue(true)}} onChange={()=>{change_bid_portal(true);change_auth_err('')}} cropImgUrl={(src,url,crop_data_url)=>{change_croppedImageUrl(url);change_original_image(src);changeCropDataUrl(crop_data_url);change_updateTrue(false)}} updateTrue={updateTrue} original_img={original_img} croppedImageUrl={croppedImageUrl}/></Portal>}
              </div>
            </div>
          </div>
      </form>
    </div>
    </div>
    <div class="clearfix"></div>
</div>
<div class="clearfix"></div>
</section>
    )
  }
  else {
return(<LoadingGif message={loading_msg}/>)
  }
}
export default CreateList;
