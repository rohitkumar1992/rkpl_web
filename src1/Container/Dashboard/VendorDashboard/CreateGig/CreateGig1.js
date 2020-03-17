import React from 'react';
import {USERID,CREATEVENDORGIG,TOKEN,HEADER,TAG,GETLANGUAGELIST,GETVENDORSERVICECATEGORY} from '../../../../url.js'
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';
import ActivityLoader from 'react-loader-spinner';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
class CreateGig extends React.Component
{
  state={language:[],loading:false,loading_msg:'',categories:[],category_id:0,keywords:[]}
  componentDidMount()
  {
  this.getLanguageList();
  this.getVendorCategories();

  }
    getLanguageList=()=>{
      axios.get(GETLANGUAGELIST).then((res)=>{
        if(res.data.success==1)
        {
          this.setState({language:res.data.data});
        }
        else {

        }

      }).catch((error)=>{

      })
    }
    getVendorCategories=()=>{
      axios.post(GETVENDORSERVICECATEGORY,{'user_id':USERID,'tag':TAG},HEADER).then((res)=>{
        if(res.data.success==1)
        {
          this.setState({categories:res.data.data.data});
        }
        else {

        }

      }).catch((error)=>{

      })
    }
  onSubmitForm=(e)=>{
      e.preventDefault();
      var languages = [];
      $.each($("input[name='lang']:checked"), function(){
      languages.push($(this).val());
      });
     var gig_upload_1 = document.querySelector('#gig_upload_1').files[0];
     var gig_upload_2 = document.querySelector('#gig_upload_2').files[0];
     var gig_upload_3 = document.querySelector('#gig_upload_3').files[0];
     var gig_video_upload = document.querySelector('#gig_video_upload').files[0];
     var gig_title=e.target.gig_title.value.trim();
     var category=e.target.category.value.trim();
     if(category!='')
     {
       if(category==3)
       {
        var subcategory=e.target.subcategory.value.trim();
        var standard_closed_caption=0;
        var premium_closed_caption=0;
        var basic_closed_caption=0;
        var basic_word_count=e.target.basic_word_count.value.trim();
        var standard_word_count=e.target.standard_word_count.value.trim();
        var premium_word_count=e.target.premium_word_count.value.trim();
          if ($('#basic_closed_caption').is(":checked"))
          {
               basic_closed_caption=1
          }
          if ($('#standard_closed_caption').is(":checked"))
          {
               standard_closed_caption=1
          }
          if ($('#premium_closed_caption').is(":checked"))
          {
               premium_closed_caption=1
          }
       }
       if(category!=3)
       {
         var basic_video_length=e.target.basic_video_length.value.trim();
         var standard_video_length=e.target.standard_video_length.value.trim();
         var premium_video_length=e.target.premium_video_length.value.trim();
         var video_length_form=/^[0-9]+$/;
           if(!basic_video_length.match(video_length_form) && !standard_video_length.match(video_length_form) && !premium_video_length.match(video_length_form))
           {
             toast('Video Length format is not valid',{ transition: Zoom,});
             return false;
           }
       }
     }
    var gig_keywords=e.target.gig_keywords.value.trim();
    var basic_pack_name=e.target.basic_pack_name.value.trim();
    var standard_pack_name=e.target.standard_pack_name.value.trim();
    var premium_pack_name=e.target.premium_pack_name.value.trim();
    var basic_pack_desc=e.target.basic_pack_desc.value.trim();
    var standard_pack_desc=e.target.standard_pack_desc.value.trim();
    var premium_pack_desc=e.target.premium_pack_desc.value.trim();
    var basic_pack_delivery=e.target.basic_pack_delivery.value.trim();
    var standard_pack_delivery=e.target.standard_pack_delivery.value.trim();
    var premium_pack_delivery=e.target.premium_pack_delivery.value.trim();
    var basic_pack_revision=e.target.basic_pack_revision.value.trim();
    var standard_pack_revision=e.target.standard_pack_revision.value.trim();
    var premium_pack_revision=e.target.premium_pack_revision.value.trim();
    var gig_description=e.target.gig_description.value.trim();
    var basic_pack_price=e.target.basic_pack_price.value.trim();
    var standard_pack_price=e.target.standard_pack_price.value.trim();
    var premium_pack_price=e.target.premium_pack_price.value.trim();

    if(languages.length<=0 || gig_upload_1=='' || gig_upload_2=='' || gig_upload_3=='' ||  gig_video_upload=='' || gig_title=='' || category=='' || basic_pack_name=='' || standard_pack_name=='' || premium_pack_name=='' || basic_pack_desc=='' || standard_pack_desc=='' || premium_pack_desc=='' || gig_keywords=='' || basic_pack_delivery=='' || standard_pack_delivery=='' || premium_pack_delivery=='' || basic_pack_revision=='' || standard_pack_revision=='' || premium_pack_revision=='' || basic_pack_price=='' || standard_pack_price=='' || premium_pack_price=='')
    {
      if(category!=3)
      {
        if(basic_video_length=='' || standard_video_length=='' || premium_video_length=='')
        {
           toast('All fields must be filled',{ transition: Zoom,});
            return false;
        }
      }
      if(category==3)
      {
        if(basic_word_count=='' || standard_word_count=='' || premium_word_count=='')
        {
           toast('All fields must be filled',{ transition: Zoom,});
          return false;
        }
      }
    }
    var formData=new FormData();
    formData.append('user_id',USERID);
    formData.append('tag',TAG);
    formData.append('vendor_id',localStorage.getItem('vendor_id'));
    formData.append('gig_image_1',gig_upload_1);
    formData.append('gig_image_2',gig_upload_2);
    formData.append('gig_image_3',gig_upload_3);
    formData.append('gig_video_url',gig_video_upload);
    formData.append('language',languages);
    formData.append('gig_title',gig_title);
    formData.append('gig_description',gig_description);
    formData.append('category_id',category);
    if(category==3)
    {
       formData.append('subcategory_id',subcategory);
       formData.append('standard_pack_closed_captioning',standard_closed_caption);
       formData.append('premium_pack_closed_captioning',premium_closed_caption);
       formData.append('basic_pack_closed_captioning',basic_closed_caption);
       formData.append('basic_pack_word_count',basic_word_count);
       formData.append('standard_pack_word_count',standard_word_count);
       formData.append('premium_pack_word_count',premium_word_count);
     }
     else {
       formData.append('basic_pack_video_length',basic_video_length);
       formData.append('standard_pack_video_length',standard_video_length);
       formData.append('premium_pack_video_length',premium_video_length);
     }
    formData.append('basic_pack_name',basic_pack_name);
    formData.append('standard_pack_name',standard_pack_name);
    formData.append('premium_pack_name',premium_pack_name);
    formData.append('basic_pack_description',basic_pack_desc);
    formData.append('standard_pack_description',standard_pack_desc);
    formData.append('premium_pack_description',premium_pack_desc);
    formData.append('basic_pack_delivery_time',basic_pack_delivery);
    formData.append('standard_pack_delivery_time',standard_pack_delivery);
    formData.append('premium_pack_delivery_time',premium_pack_delivery);
    formData.append('basic_pack_revision',basic_pack_revision);
    formData.append('standard_pack_revision',standard_pack_revision);
    formData.append('premium_pack_revision',premium_pack_revision);
    formData.append('basic_pack_price',basic_pack_price);
    formData.append('standard_pack_price',standard_pack_price);
    formData.append('premium_pack_price',premium_pack_price);
    var search_tag=gig_keywords.split(',');
    formData.append('search_tag',search_tag);
    axios.post(CREATEVENDORGIG,formData,HEADER)
    .then(response=>{
      if(response.data.success=='1'){
          this.setState({loading:true,loading_msg:'Please Wait While We Are Creating Your Gig'});
          setTimeout(()=>{
            this.props.history.push('/dashboard/vendor');},2000);
      }
      else {
          toast('Something Went Wrong',{ transition: Zoom,});
      }
    })
    .catch(function (error) {
    toast('Something Went Wrong',{ transition: Zoom,});
    });
}
render()
{
  const {loading_msg,loading,language,categories}=this.state;
  const Language=(language.length>0 && language.map((res,key)=>{
    return(<li>
        <label>
            <input type="checkbox" alt="" value={res.id} name="lang"/>
            <span class="check"></span>
            <span>{res.lang_name}</span>
        </label>
    </li>);
  }));
  const Categories=(categories.length>0 && categories.map((res,key)=>{
    if(res.parent_id==0)
    {
    return(<option  key={key} value={res.id}>{res.service_name}</option>);
  }
  }));
  const SubCategories=(categories.length>0 && categories.map((res,key)=>{
    if(res.parent_id!=0)
    {
    return(<option  key={key} value={res.id}>{res.service_name}</option>);
  }
  }));
  if(!loading)
  {
return(<section class="inner_cont create_gig top_div">
<ToastContainer autoClose={1000}/>
        <article class="gig_info">
            <div class="container">
                <div class="vend_cont">
                    <form class="form_control" onSubmit={this.onSubmitForm}>
                        <div class="field_area">
                            <div class="fields">
                                <div class="label">
                                    <label>
                                        <span>Gig Title</span>
                                    </label>
                                </div>
                                <div class="inputbox">
                                    <textarea class="title" maxlength="80" placeholder="do something I'm really good at" name="gig_title"  required></textarea>
                                    <span class="indent">I will</span>
                                    <div class="inf">
                                        <span class="char-count">0/80 max</span>
                                    </div>
                                </div>
                            </div>
                            <div class="fields">
                                <div class="label">
                                    <label>
                                        <span>Category</span>
                                    </label>
                                </div>
                                <div class="inputbox">
                                    <select onChange={(e)=>{this.setState({category_id:e.target.value})}} name="category"  required>
                                        <option selected >Select Category</option>
                                        {Categories}
                                    </select>
                                    {this.state.category_id==3 && <select name="subcategory"  >
                                        <option selected>Select Sub Category</option>
                                        { SubCategories}
                                    </select>}
                                </div>
                            </div>
                            <div class="fields lang">
                                <div class="label">
                                    <label>
                                        <span>Language</span>
                                    </label>
                                </div>
                                <div class="inputbox">
                                    <div class="lang_box">
                                        <div class="box">
                                            <h3>What language do you write in?</h3>
                                            <ul class="lang_list">
                                              {Language}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="fields">
                                <div class="label">
                                    <label>
                                        <span>Search Tags</span>
                                    </label>
                                </div>

                                <div class="inputbox">
                                <input type="text"  placeholder="" name="gig_keywords" required/>
                                    <div class="inf">
                                        <span class="char-count">Up to 5 items Separated by ,</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="packages">
                            <h3 class="head">Packages</h3>
                            <div class="table-responsive">
                                <table class="table table-bordered pack_table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Basic</th>
                                            <th>Standard</th>
                                            <th>Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="pack_name">
                                            <td></td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Name your package" name="basic_pack_name" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Name your package"  name="standard_pack_name" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Name your package"  name="premium_pack_name" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="pack_name desc">
                                            <td></td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Describe the details of your offering"  name="basic_pack_desc" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Describe the details of your offering" name="standard_pack_desc" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Describe the details of your offering" name="premium_pack_desc" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="pack_del">
                                            <td></td>
                                            <td>
                                                <div class="inputbox">
                                                    <select name="basic_pack_delivery" required>
                                                        <option selected disabled>Delivery Time</option>
                                                        <option value="1">1 day delivery</option>
                                                        <option value="2">2 day delivery</option>
                                                        <option value="3">3 day delivery</option>
                                                        <option value="4">4 day delivery</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <select name="standard_pack_delivery" required>
                                                        <option selected disabled>Delivery Time</option>
                                                        <option value="1">1 day delivery</option>
                                                        <option value="2">2 day delivery</option>
                                                        <option value="3">3 day delivery</option>
                                                        <option value="4">4 day delivery</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <select name="premium_pack_delivery" required>
                                                        <option selected disabled>Delivery Time</option>
                                                        <option value="1">1 day delivery</option>
                                                        <option value="2">2 day delivery</option>
                                                        <option value="3">3 day delivery</option>
                                                        <option value="4">4 day delivery</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                        {/*<tr class="check_box">
                                            <td>Editable File</td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" />
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" />
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" />
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr class="check_box">
                                            <td>Review & Critique</td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" />
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" />
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" />
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                        </tr>*/}
                                        {this.state.category_id==3 && <tr class="pack_name">
                                            <td>Word Count</td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Total Number Of Words" name="basic_word_count" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Total Number Of Words" name="standard_word_count" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <textarea placeholder="Total Number Of Words" name="premium_word_count" required></textarea>
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                            </td>
                                            </tr>}
                                            {this.state.category_id!=3 && <tr class="pack_name">
                                                <td>Video Length</td>
                                                <td>
                                                    <div class="inputbox">
                                                        <textarea placeholder="Video length in seconds" name="basic_video_length" required></textarea>
                                                        <i class="fa fa-pencil"></i>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="inputbox">
                                                        <textarea placeholder="Video length in seconds" name="standard_video_length" required></textarea>
                                                        <i class="fa fa-pencil"></i>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="inputbox">
                                                      <textarea placeholder="Video length in seconds" name="premium_video_length" required></textarea>
                                                        <i class="fa fa-pencil"></i>
                                                    </div>
                                                </td>
                                                </tr>}
                                        <tr class="pack_del">
                                            <td>Revisions</td>
                                            <td>
                                                <div class="inputbox">
                                                    <select name="basic_pack_revision" required>
                                                        <option selected disabled>No.of Revisions</option>
                                                        <option value="1">1 </option>
                                                        <option value="2">2 </option>
                                                        <option value="3">3 </option>
                                                        <option value="4">4 </option>
                                                        <option value="5">5 </option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                <select name="standard_pack_revision" required>
                                                    <option selected disabled>No.of Revisions</option>
                                                    <option value="1">1 </option>
                                                    <option value="2">2 </option>
                                                    <option value="3">3 </option>
                                                    <option value="4">4 </option>
                                                    <option value="5">5 </option>
                                                </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                <select name="premium_pack_revision" required>
                                                    <option selected disabled>No.of Revisions</option>
                                                    <option value="1">1 </option>
                                                    <option value="2">2 </option>
                                                    <option value="3">3 </option>
                                                    <option value="4">4 </option>
                                                    <option value="5">5 </option>
                                                </select>
                                                </div>
                                            </td>
                                        </tr>
                                        {this.state.category_id==3 && <tr class="check_box">
                                            <td>Closed Captioning</td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" name="basic_closed_caption" id="basic_closed_caption"/>
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" name="standard_closed_caption" id="standard_closed_caption"/>
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                            <td>
                                                <label class="checkbox_fake">
                                                    <input type="checkbox" name="premium_closed_caption" id="premium_closed_caption"/>
                                                    <span><i class="fa fa-check-square" aria-hidden="true"></i></span>
                                                </label>
                                            </td>
                                        </tr>}

                                        <tr class="pack_del">
                                            <td>Price</td>
                                            <td>
                                                <div class="inputbox">
                                                    <select name="basic_pack_price" required>
                                                        <option selected disabled> &#8377; 50-&#8377; 500</option>
                                                        <option value="50">&#8377; 50</option>
                                                        <option value="100">&#8377; 100</option>
                                                        <option value="150">&#8377; 150</option>
                                                        <option value="200">&#8377; 200</option>
                                                        <option value="300">&#8377; 300</option>
                                                        <option value="400">&#8377; 400</option>
                                                        <option value="500">&#8377; 500</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <select name="standard_pack_price" required>
                                                    <option selected disabled>&#8377; 50-&#8377; 500</option>
                                                    <option value="50">&#8377; 50</option>
                                                    <option value="100">&#8377; 100</option>
                                                    <option value="150">&#8377; 150</option>
                                                    <option value="200">&#8377; 200</option>
                                                    <option value="300">&#8377; 300</option>
                                                    <option value="400">&#8377; 400</option>
                                                    <option value="500">&#8377; 500</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="inputbox">
                                                    <select name="premium_pack_price" required>
                                                    <option selected disabled>&#8377; 50-&#8377; 500</option>
                                                    <option value="50">&#8377; 50</option>
                                                    <option value="100">&#8377; 100</option>
                                                    <option value="150">&#8377; 150</option>
                                                    <option value="200">&#8377; 200</option>
                                                    <option value="300">&#8377; 300</option>
                                                    <option value="400">&#8377; 400</option>
                                                    <option value="500">&#8377; 500</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="description">
                            <h3 class="head">Description</h3>
                            <div class="disc_box">
                                <label>Briefly Describe Your Gig</label>
                                <div class="inputbox">
                                    <textarea minlength="120" maxlength="1200" name="gig_description" required></textarea>
                                    <div class="inf">
                                        <span>min. 120</span>
                                        <span class="char-count">0/1200 characters</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="build_gal">
                            <h3 class="head">Build Your Gig Gallery</h3>
                            <div class="upload_area">
                                <label>Gig Photos <span>Upload photos that describe or are related to your Gig.</span></label>
                                <span class="gal_count">(0/3)</span>
                                <ul class="browse_list">
                                    <li>
                                        <div class="upl_box">
                                            <div class="drag_area">
                                                <span>Drag a Photo or</span>
                                                <label for="gig_upload_1">
                                                    <input type="file" id="gig_upload_1" accept="image/*" required/>
                                                    <span>Browse</span>
                                                    <img src="" id="upload_img_1" alt="" />
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                    <div class="upl_box">
                                        <div class="drag_area">
                                            <span>Drag a Photo or</span>
                                            <label for="gig_upload_2">
                                                <input type="file" id="gig_upload_2" accept="image/*" required/>
                                                <span>Browse</span>
                                                <img src="" id="upload_img_2" alt="" />
                                            </label>
                                        </div>
                                    </div>
                                    </li>
                                    <li>
                                    <div class="upl_box">
                                        <div class="drag_area">
                                            <span>Drag a Photo or</span>
                                            <label for="gig_upload_3">
                                                <input type="file" id="gig_upload_3" accept="image/*" required/>
                                                <span>Browse</span>
                                                <img src="" id="upload_img_3" alt="" />
                                            </label>
                                        </div>
                                    </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="upload_area">
                                <label>Gig Videos <span>Add a relevant, high quality video that best showcases your Gig. <br/>Please choose a video shorter than 75 seconds and smaller than 50MB</span></label>
                                <span class="gal_count">(0/1)</span>
                                <ul class="browse_list">
                                    <li>
                                        <div class="upl_box">
                                        <div class="drag_area">
                                            <span>Drag a Video or</span>
                                            <label for="gig_video_upload">
                                                <input type="file" id="gig_video_upload" accept="video/*" required/>
                                                <span>Browse</span>
                                                <img src="" id="gig_video_upload_1" alt="" />
                                            </label>
                                        </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="buttons">
                            <button type="submit" class="btndefault">Save & Continue</button>
                        </div>
                    </form>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="clearfix"></div>
        </article>
        <div class="clearfix"></div>
    </section>)
  }
  else {
    return(<div class="container"><ActivityLoader
      type="Triangle"
       color="black"
       height={100}
       width={100}
       timeout={30000}/>
       <h3>{loading_msg}</h3>
       </div>)
  }
}
}



export default CreateGig;
