import React from 'react';
import {USERID,UPDATEVENDORGIG,TOKEN,HEADER,TAG,GETLANGUAGELIST,GETVENDORSERVICECATEGORY,VENDORGIGINFO} from '../../../../url.js'
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import Tooltip from '../../../../Component/tooltip.js'
import 'react-toastify/dist/ReactToastify.css';
import ActivityLoader from 'react-loader-spinner';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
import {MultiSelect} from 'primereact/multiselect';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import LoadingGif from '../../../../Component/Loader/loading_gif'
import validator from 'validator';
import cogoToast from 'cogo-toast';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const VENDOR_HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
}
};
class CreateGig extends React.Component
{
  state={err_result:[],imagePreviewUrl:'',gig_img_count:0,img1:[],img2:[],img3:[],btn_disable:false,language:[],imgs:[],loading:true,loading_msg:'Please Wait',categories:[],category_id:0,keywords:[],isLoading:false,lang_sel:[]}
    componentDidMount()
    {
      this.setState({gig_id:this.props.match.params.gig_id},function()
    {
      this.getLanguageList();
      this.getVendorCategories();
      this.getGigInfo();
    })
    }
    componentDidUpdate()
    {
      if(this.state.gig_id!=this.props.match.params.gig_id)
      {
          this.setState({gig_id:this.props.match.params.gig_id},function()
        {
          this.getLanguageList();
          this.getVendorCategories();
          this.getGigInfo();
        })
      }
    }
    getGigInfo=()=>{
      axios.post(VENDORGIGINFO,{
        'user_id':localStorage.getItem('user_id'),
        'vendor_id':localStorage.getItem('vendor_id'),
        'tag':TAG,
        'gig_id':this.state.gig_id
      },HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          this.setState({gig_info:res.data.data,not_found:false,gig_title:response.gig_title,lang:response.language});
          setTimeout(()=>this.setState({isLoading:true,loading:false}),1000);
        }
        else {
            this.setState({not_found:true,isLoading:false,loading:true})
        }
      }).catch((error)=>{
        this.setState({not_found:true,isLoading:false,loading:true})
      })
    }
    getCheck=()=>{
      var lang_array=this.state.lang.split(',');
        for(var i=0;i<lang_array.length;i++)
        {
          $(`#lang_check_${lang_array[i]}`).attr('checked', true);
        }
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
        axios.post(GETVENDORSERVICECATEGORY,{'user_id':localStorage.getItem('user_id'),'tag':TAG},HEADER).then((res)=>{
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
      this.setState({btn_disable:true})
      var languages =this.state.lang_sel;
      // $.each($("input[name='lang']:checked"), function(){
      // languages.push($(this).val());
      // });
     // var gig_upload_1 = document.querySelector('#gig_upload_1').files[0];
     if(this.state.gig_img_count<3)
     {
         this.setState({btn_disable:false})
         cogoToast.error('Three Gig Images are mandatory');
         //toast('Three Gig Images are mandatory',{ transition: Zoom,});
         return false;
     }
      var gig_upload_1 =this.state.img1[0];
     var gig_upload_2 = this.state.img2[0];
     var gig_upload_3 = this.state.img3[0];
     var gig_video_upload = document.querySelector('#gig_video_upload').files[0];
     var gig_title=e.target.gig_title.value.trim();
     var category=e.target.category.value.trim();
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
    var search_tag=gig_keywords.split(',');
    if(category=="NA")
    {
      cogoToast.error('Please select a category');
       this.setState({btn_disable:false})
      return false;
    }
    if(category!='')
    {
      if(category==3)
      {
       var subcategory=e.target.subcategory.value.trim();
       if(subcategory=='')
       {
         this.setState({btn_disable:false})
         cogoToast.error('Please select a subcategory');
         return false;
       }
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
          if(!basic_video_length.match(video_length_form) || !standard_video_length.match(video_length_form) || !premium_video_length.match(video_length_form))
          {
            cogoToast.error('Video Length format is not valid');
            this.setState({btn_disable:false})
            //toast('Video Length format is not valid',{ transition: Zoom,});
            return false;
          }
      }
    }
      if(category!=3)
      {
        if(basic_video_length=='' || standard_video_length=='' || premium_video_length=='')
        {
          this.setState({btn_disable:false});
            cogoToast.error('Please Fill Video Length Field');
           //toast('Please Fill Video Length Field',{ transition: Zoom,});
            return false;
        }
      }
      if(category==3)
      {
        if(basic_word_count=='' || standard_word_count=='' || premium_word_count=='')
        {
          this.setState({btn_disable:false});
            cogoToast.error('Please Enter Word Count');
          // toast('Please Enter Word Count',{ transition: Zoom,});
          return false;
        }
        if(basic_word_count!='' && standard_word_count!='' && premium_word_count!='')
        {
          var word_count_form=/^[0-9]+$/;
            if(!basic_word_count.match(word_count_form) || !standard_word_count.match(word_count_form) || !premium_word_count.match(word_count_form))
            {
              this.setState({btn_disable:false});
                cogoToast.error('Word Count format is not valid');
              //toast('Word Count format is not valid',{ transition: Zoom,});
              return false;
            }
        }
      }
    // }
    var formData=new FormData();
    formData.append('user_id',localStorage.getItem('user_id'));
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
       formData.append('subcategory_id',0);
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
    axios.post(UPDATEVENDORGIG,formData,VENDOR_HEADER)
    .then(response=>{
      if(response.data.success==3)
      {
        var err_result=response.data.data;
        this.setState({btn_disable:false,err_result:response.data.error});
            $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      }
      if(response.data.success==2)
      {
        this.setState({btn_disable:false});
          cogoToast.error(response.data.msg);
      //  toast(response.data.msg,{ transition: Zoom,});
        return false;
      }
      else if(response.data.success==1){
            this.setState({btn_disable:false})
          this.setState({loading:true,loading_msg:'Please Wait While We Are Creating Your Gig'});
          setTimeout(()=>{
            this.props.history.push('/dashboard/vendor');},2000);
      }
      else {
          this.setState({btn_disable:false});
            cogoToast.error('Something Went Wrong Please Try After Some Time');
          //toast('Something Went Wrong',{ transition: Zoom,});
      }
    })
    .catch((error)=>{
        this.setState({btn_disable:false});
          cogoToast.error('Something Went Wrong Please Try After Some Time');
    //toast('Something Went Wrong',{ transition: Zoom,});
    });
}
result(params) {
  //  console.log(params);
  }
render()
{
  const {loading_msg,loading,language,categories,isLoading,err_result}=this.state;
  const Language=(language.length>0 && language.map((res,key)=>{
    return(<li>
        <label>
            <input type="checkbox" alt="" value={res.value} name="lang"/>
            <span class="check"></span>
            <span>{res.name}</span>
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
  if(isLoading)
  {
  if(!loading)
  {
    return(<section class="inner_cont create_gig top_div">
    <ToastContainer autoClose={1000}/>
            <article class="gig_info">
                <div class="container">
                    <div class="vend_cont">
                  {err_result.length >0 && <div class="error_box">
                          <ul>
                            {err_result.map((res,key)=>{
                              return(<li key={key}><p>{res}</p></li>)
                            })}
                          </ul>
                        </div>}
                        <form class="form_control" onSubmit={this.onSubmitForm}>
                            <div class="field_area">
                                <div class="fields">
                                    <div class="label">
                                        <label>
                                            <span>Gig Title</span>
                                        </label>
                                    </div>
                                    <div class="inputbox">
                                        <textarea class="title" maxlength="50" placeholder="do something I'm really good at" name="gig_title"  required></textarea>
                                        <span class="indent">I will</span>
                                        <div class="inf">
                                            <span class="char-count">0/50 max</span>
                                        </div>
                                    </div>
                                    <Tooltip>
                                    <div class="text">
                                        <h3>Describe your Gig.</h3>
                                        <p>This is your Gig title. Choose wisely, you can only use 80 characters.</p>
                                    </div>
                                    <div class="gig_t_img"><img src="images/icon_tooltip1.png" alt="" /></div>
                                    </Tooltip>
                                </div>
                                <div class="fields">
                                    <div class="label">
                                        <label>
                                            <span>Category</span>
                                        </label>
                                    </div>
                                    <div class="inputbox">
                                        <select onChange={(e)=>{this.setState({category_id:e.target.value})}} name="category"  required>
                                            <option selected disabled value="NA">Select Category</option>
                                            {Categories}
                                        </select>
                                        {this.state.category_id==3 && <select name="subcategory"  >
                                            <option selected>Select Sub Category</option>
                                            { SubCategories}
                                        </select>}
                                    </div>
                                    <Tooltip>
                                    <div class="text">
                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                        <h3>Where will your Gig end up?</h3>
                                        <p>By defining your Gig properly it will be easier for buyers to find and buy.</p>
                                    </div>
                                    <div class="gig_t_img"><img src="images/icon_tooltip6.png" alt="" /></div>
                                    </Tooltip>
                                </div>
                                <div class="fields lang">
                                    <div class="label">
                                        <label>
                                            <span>Language</span>
                                        </label>
                                    </div>
                                    <div class="inputbox">
                                        <div class="">
                                            <div class="box">
                                                <h3>What language do you write in?</h3>
                                                {/*<ul class="lang_list">
                                                  {Language}

                                                </ul>*/}
                                                  <MultiSelect  value={this.state.lang_sel} options={language} onChange={(e) => this.setState({lang_sel: e.value})}  style={{minWidth:'12em'}} filter={true} placeholder="Choose"/>
                                            </div>
                                        </div>
                                    </div>
                                    <Tooltip>
                                    <div class="text">
                                        <h3>Make your Gig easy to find.</h3>
                                        <p>By defining your Gig properly it will be easier for buyers to find and buy.</p>
                                    </div>
                                    <div class="gig_t_img"><img src="images/icon_tooltip12.png" alt="" /></div>
                                    </Tooltip>
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
                                    <Tooltip>
                                    <div class="text">
                                        <h3>Let Buyers Know How to Find Your Gig</h3>
                                        <p>Enter search terms, which you feel buyers will use when looking for your service.</p>
                                        <p>The terms you enter here are very important and will have an impact on your overall exposure on Planetshare.</p>
                                        <p>When adding your search terms, please keep in mind the following:</p>
                                        <ul>
                                            <li>
                                                <p>Special characters and duplicated terms will be ignored.</p>
                                            </li>
                                            <li>
                                                <p>It doesn’t matter if you use upper case, lower case letters, or plural forms of words.</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="gig_t_img"><img src="images/icon_tooltip4.png" alt="" /></div>
                                    </Tooltip>
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
                                                    <div class="inputbox" >
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
                                                    <Tooltip>
                                                    <div class="text">
                                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                        <h3>Title</h3>
                                                    </div>
                                                    <ul>
                                                        <li><p>Give your package a catchy title, which describes what it includes.</p></li>
                                                        <li><p><b>For example:</b> 2D or 3D cover, Print-Ready Version</p></li>
                                                    </ul>
                                                    </Tooltip>
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
                                                    <Tooltip>
                                                    <div class="text">
                                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                        <h3>Description</h3>
                                                    </div>
                                                    <ul>
                                                        <li><p>Summarize what this package offers buyers, and why you included these items in your package.</p></li>
                                                        <li><p>You can use maximum 100 chars.</p></li>
                                                    </ul>
                                                    <p><b>For example:</b> This "Full Logo Design" package includes a standard logo design with 4 revisions and the source file.</p>

                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            <tr class="pack_del">
                                                <td></td>
                                                <td>
                                                    <div class="inputbox">
                                                        <select name="basic_pack_delivery" required>
                                                            <option selected disabled value="">Delivery Time</option>
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
                                                            <option selected disabled value="">Delivery Time</option>
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
                                                            <option selected disabled value="">Delivery Time</option>
                                                            <option value="1">1 day delivery</option>
                                                            <option value="2">2 day delivery</option>
                                                            <option value="3">3 day delivery</option>
                                                            <option value="4">4 day delivery</option>
                                                        </select>
                                                    </div>
                                                    <Tooltip>
                                                    <div class="text">
                                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                        <h3>Delivery Time</h3>
                                                    </div>
                                                    <ul>
                                                        <li><p>Delivery Time is the amount of time you have to work on the package, starting from when a buyer places the order.</p></li>
                                                        <li><p>Set a delivery time that makes sense for you, based on the combined time it takes you to create every part of the package.</p></li>
                                                    </ul>
                                                    </Tooltip>
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
                                                    <Tooltip>
                                                    <div class="text">
                                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                        <h3>Video Length</h3>
                                                    </div>
                                                    <ul>
                                                        <li><p>Summarize what this package offers buyers, and why you included these items in your package.</p></li>
                                                        <li><p>You can use maximum 100 chars.</p></li>
                                                    </ul>
                                                    <p><b>For example:</b> This "Full Logo Design" package includes a standard logo design with 4 revisions and the source file.</p>

                                                    </Tooltip>
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
                                                        <Tooltip>
                                                        <div class="text">
                                                            <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                            <h3>Video Length</h3>
                                                        </div>
                                                        <ul>
                                                            <li><p>Summarize what this package offers buyers, and why you included these items in your package.</p></li>
                                                            <li><p>You can use maximum 100 chars.</p></li>
                                                        </ul>
                                                        <p><b>For example:</b> This "Full Logo Design" package includes a standard logo design with 4 revisions and the source file.</p>

                                                        </Tooltip>
                                                    </td>
                                                    </tr>}
                                            <tr class="pack_del">
                                                <td>Revisions</td>
                                                <td>
                                                    <div class="inputbox">
                                                        <select name="basic_pack_revision" required>
                                                            <option selected disabled value="">No.of Revisions</option>
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
                                                        <option selected disabled value="">No.of Revisions</option>
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
                                                        <option selected disabled value="">No.of Revisions</option>
                                                        <option value="1">1 </option>
                                                        <option value="2">2 </option>
                                                        <option value="3">3 </option>
                                                        <option value="4">4 </option>
                                                        <option value="5">5 </option>
                                                    </select>
                                                    </div>
                                                    <Tooltip>
                                                    <div class="text">
                                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                        <h3>Select to include in your packages</h3>
                                                    </div>
                                                    <p><b>Revisions</b></p>
                                                    <p>The number of tweaks you offer in this package.</p>
                                                    </Tooltip>
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
                                                            <option selected disabled value=""> &#8377; 50-&#8377; 500</option>
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
                                                        <option selected disabled value="">&#8377; 50-&#8377; 500</option>
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
                                                        <option selected disabled value="">&#8377; 50-&#8377; 500</option>
                                                        <option value="50">&#8377; 50</option>
                                                        <option value="100">&#8377; 100</option>
                                                        <option value="150">&#8377; 150</option>
                                                        <option value="200">&#8377; 200</option>
                                                        <option value="300">&#8377; 300</option>
                                                        <option value="400">&#8377; 400</option>
                                                        <option value="500">&#8377; 500</option>
                                                        </select>
                                                    </div>
                                                    <Tooltip>
                                                    <div class="text">
                                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                                        <h3>Price</h3>
                                                    </div>
                                                    <ul>
                                                        <li><p>Earn up to 64% more per order with Triple Gig Packages.</p></li>
                                                        <li><p>Package price can be between <i class="fa fa-inr"></i>5 - <i class="fa fa-inr"></i>995.</p></li>
                                                        <li><p>Price your packages from lowest (Basic) to highest (Premium).</p></li>
                                                        <li><p>You can always change your package price in the future.</p></li>
                                                        <li><p>This is the base price, you can add "Upgrades" in the section below.</p></li>
                                                    </ul>
                                                    </Tooltip>
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
                                    <Tooltip>
                                    <div class="text">
                                        <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                        <h3>This is your chance to be creative. Explain your Gig.</h3>
                                        <p>Describe what you are offering. Be as detailed as possible so buyers will be able to understand if this meets their needs. Should be at least 120 characters.</p>
                                    </div>
                                    </Tooltip>
                                </div>
                            </div>



                                <div class="build_gal">
                                <h3 class="head">Build Your Gig Gallery</h3>
                                <div class="upload_area">
                                    <label>Gig Photos <span>Upload photos that describe or are related to your Gig.</span></label>
                                    <span class="gal_count">({this.state.gig_img_count}/3)</span>
                                        <ul class="browse_list">
                                            <li>
                                                <div class="upl_box">
                                                    <div class="drag_area">
                                                        <span>Drag a Photo or</span>
                                                        <label for="gig_upload1">
                                                        <input
                                                            ref="file"
                                                            type="file"
                                                            name="user[image]"
                                                            accept="image/*"
                                                            id="gig_upload1"

                                                            onChange={(event)=>this._onChange(event,'img1')}/>
                                                            <input type="file" accept="image/*" />
                                                            <span>Browse</span>
                                                            {this.state.img1 && [...this.state.img1].map((file)=>(
                                                                          <img src="" id="upload_img"  src={URL.createObjectURL(file)} alt="" />   ))}

                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="upl_box">
                                                    <div class="drag_area">
                                                        <span>Drag a Photo or</span>
                                                        <label for="gig_upload2">
                                                        <input
                                                            ref="file"
                                                            type="file"
                                                            name="user[image]"
                                                            accept="image/*"
                                                            id="gig_upload2"

                                                            onChange={(event)=>this._onChange(event,'img2')}/>
                                                            <input type="file"  accept="image/*"/>
                                                            <span>Browse</span>
                                                            {this.state.img2 && [...this.state.img2].map((file)=>(
                                                                          <img src="" id="upload_img"  src={URL.createObjectURL(file)} alt="" />   ))}

                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="upl_box">
                                                    <div class="drag_area">
                                                        <span>Drag a Photo or</span>
                                                        <label for="gig_upload3">
                                                        <input
                                                            ref="file"
                                                            type="file"
                                                            name="user[image]"
                                                            accept="image/*"
                                                            id="gig_upload3"

                                                            onChange={(event)=>this._onChange(event,'img3')}/>
                                                            <input type="file"  accept="image/*"/>
                                                            <span>Browse</span>
                                                            {this.state.img3 && [...this.state.img3].map((file)=>(
                                                                          <img src="" id="upload_img"  src={URL.createObjectURL(file)} alt="" />   ))}

                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <Tooltip>
                                        <div class="text">
                                            <h3>Photos</h3>
                                            <p>Upload photos in JPEG, JPG, PNG and ensure they’re at least 550 pixels width x 370 pixels height.</p>
                                            <p>We suggest uploading them in landscape format to make better use of the space.</p>
                                            <p>Lastly, put your best foot forward! Stand out on Planetshare with your favorite photos.</p>
                                            <p>Need help? Check out Planetshare expert photoshop talent here.</p>
                                        </div>
                                        </Tooltip>
                                    </div>


                                <div class="upload_area upl_vd">
                                    <label>Gig Videos <span>Add a relevant, high quality video that best showcases your Gig. <br/>Please choose a video shorter than 75 seconds and smaller than 50MB</span></label>
                                    <span class="gal_count">(0/1)</span>
                                    <ul class="browse_list">
                                        <li>

                                            <div class="upl_vdeo">
                                                <label for="gig_video_upload">
                                                    <input type="file" id="gig_video_upload" accept="video/*" onChange={this.fileChangedHandler} required/>
                                                            {this.state.imagePreviewUrl!='' && <video width="400" controls>
                                                                       <source src={this.state.imagePreviewUrl} />
                                                                       Your browser does not support HTML5 video.
                                                                  </video>}
                                                    <img src="" id="gig_video_upload_1" alt="" />
                                                </label>
                                            </div>

                                        </li>
                                    </ul>
                                    <Tooltip>
                                    <div class="text">
                                        <h3>Video</h3>
                                        <p>Upload photos in JPEG, JPG, PNG and ensure they’re at least 550 pixels width x 370 pixels height.</p>
                                        <p>Ensure the production quality is representative of your deliveries.</p>
                                        <p>Need help with your video? Check out our Planetshare expert audio/video talent here.</p>
                                    </div>
                                    </Tooltip>
                                </div>
                            </div>

                            <div class="buttons">
                                <button type="submit" class="btndefault" disabled={this.state.btn_disable}>Save & Continue</button>
                            </div>
                            <div class="gig_tooltip gig_tooltip_main">
                                <div class="box">
                                    <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                                    <div class="text">
                                        <h3>Start Defining Your Gig</h3>
                                    </div>
                                    <div class="gig_t_img"><img src="images/tooltip_vd.jpg" alt="" /></div>
                                    <ul>
                                        <li>
                                            <p>Create a catchy title.</p>
                                        </li>
                                        <li>
                                            <p>Choose a category that fits your Gig.</p>
                                        </li>
                                        <li>
                                            <p>Add meta data to help buyers find more information regarding your Gig.</p>
                                        </li>
                                        <li>
                                            <p>Add tags to help buyers find your Gig while searching.</p>
                                        </li>
                                    </ul>

                                    <hr></hr>

                                    <div class="text">
                                        <h3>Set your packages</h3>
                                    </div>
                                    <div class="gig_t_img"><img src="images/tooltip_vd.jpg" alt="" /></div>
                                    <ul>
                                        <li>
                                            <p>Set the prices for your 3 packages.</p>
                                        </li>
                                        <li>
                                            <p>Select the elements you want to include in each offer.</p>
                                        </li>
                                        <li>
                                            <p>Add Extras to increase your order value.</p>
                                        </li>
                                    </ul>

                                    <hr></hr>

                                    <div class="text">
                                        <h3>Write Your Description</h3>
                                    </div>
                                    <div class="gig_t_img"><img src="images/tooltip_vd.jpg" alt="" /></div>
                                    <ul>
                                        <li>
                                            <p>Include the most important information for your Gig.</p>
                                        </li>
                                    </ul>

                                    <hr></hr>

                                    <div class="text">
                                        <h3>Showcase Your Talent</h3>
                                    </div>
                                    <div class="gig_t_img"><img src="images/tooltip_vd.jpg" alt="" /></div>
                                    <ul>
                                        <li>
                                            <p>Add photos, an introduction video files that best represent your service.</p>
                                        </li>
                                    </ul>
                                </div>
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
    return(<LoadingGif message={loading_msg}/>)
  }
}
else {
  return(<LoadingGif message={loading_msg}/>)
}
}
}



export default CreateGig;
