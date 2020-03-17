// import Fingerprint from "fingerprintjs";
import React,{useEffect,useState} from 'react'
export const TAG="web";
const base_url="http://192.168.27.119/Shantanu_project/OTT_LIVE_WORK/LARAVEL_WORK/NEW_PLANETSHARE/Planetshare/public/api";
//const base_url="http://api.planetshare.in/public/api";
const baseUrl2="http://192.168.24.23/LARAVEL_WORK/Shantanu_26_02_20/public/api"
export const COUNTRYCODE=localStorage.getItem('countrycode')==null?'IN':localStorage.getItem('countrycode')
//export const LOGIN=base_url+"/login";
export const LOGIN=baseUrl2+"/login";
export const REGISTER=base_url+"/register";
export const LOGOUT=base_url+"/logout";
export const SEARCH=base_url+"/search";
export const VENDORREGISTRATION=base_url+"/createVendor";
export const SELLERREGISTRATION=base_url+"/createSeller";
export const GETCOUNTRY=base_url+"/get/country";
export const GETSTATE=base_url+"/get/state";
export const GETCITY=base_url+"/get/city";
export const HOMEDATA=base_url+"/getHomeData";
export const GETLANGUAGELIST=base_url+"/get/LanguageList";
export const GETVENDORSERVICECATEGORY=base_url+"/getVendorServiceList"
export const CREATEVENDORGIG=base_url+"/createVendorGig"
export const UPDATEVENDORGIG=base_url+"/updateVendorGig"
export const VENDORSERVICECHANGESTATUS=base_url+"/vendor/changeStatus"
export const SELLERIMAGECHANGESTATUS=base_url+"/seller/image/changeStatus"
export const SELLERIMAGEUPLOAD=base_url+"/seller/image/upload";
export const SELLERVIDEOUPLOAD=base_url+"/seller/video/upload";
export const GETSELLERFORMDATA=base_url+"/getSellerFormData"
export const SELLERVIDEOUPLOADDESCRIPTION=base_url+"/seller/video/data"
export const SELLERIMAGEUPLOADDESCRIPTION=base_url+"/seller/image/data"
export const GETFORMSTATUS=base_url+"/get/formStatus"
export const VENDORGIGINFO=base_url+"/vendor/gigInfo"
export const GETCATEGORY=base_url+"/get/category";
export const GETIMAGECATEGORYDATA=base_url+"/get/image/category_data";
export const GETVIDEOCATEGORYDATA=base_url+"/get/video/category_data";
export const GETIMAGEFILTERCONTENT=base_url+"/get/ImageFilterContent";
export const GETVIDEOFILTERCONTENT=base_url+"/get/VideoFilterContent";
export const GETIMAGEDATA=base_url+"/get/imageData";
export const GETVIDEODATA=base_url+"/get/videoData";
export const SETTOTALVIEW=base_url+"/addTotalViews";
export const GETIMAGEVIDEODATA=base_url+"/getImageVideoData"
export const VIEWMORE=base_url+"/get/viewmore";
export const BUYERPROFILE=base_url+"/get/buyer/profile";
export const VENDOR_GIG_INFO=base_url+"/get/info/vendorgig";
export const VENDOR_GIG_TAB_CONTENT=base_url+"/getVendorGigTabs";
export const SELLER_IMAGE_TAB_CONTENT=base_url+"/getSellerImageTabs";
export const ADDTOCOLLECTION=base_url+"/insert/collection";
export const GETUSERCOLLECTION=base_url+"/getUserCollection";
export const CREATECOLLECTION=base_url+"/create/collection";
export const GETUSERCOLLECTIONDATA=base_url+"/get/collectionData";
export const GETCARTINFO=base_url+"/get/cartInfo";
export const GETPACKS=base_url+"/get/packs";
export const GETPACKPRICE=base_url+"/get/packPrice";
export const GETUSERORDERS=base_url+"/get/orders";
export const INITIATEORDER=base_url+"/initateOrder";
export const USERLIST=base_url+"/getUserList"
export const DOWNLOADS=base_url+"/download"
export const DOWNLOADLIST=base_url+"/get/download/list"
export const SELLERLIST=base_url+"/getSellerList";
export const SELLER_VIDEO_LIST=base_url+"/seller/getVideoList"
export const SELLER_IMAGE_LIST=base_url+"/seller/getImageList";
export const SELLER_ORDERS_LIST=base_url+"/seller/orders";
export const EMAIL_OTP_SENT=base_url+"/sendMail";
export const EMAIL_OTP_VERIFY=base_url+"/verifyMail";
export const VERIFICATION_CHECK=base_url+"/verificationCheck";
export const SELLER_VENDOR_INFO=base_url+"/vendorSellerInfo";
export const SELLER_VENDOR_STATUS=base_url+'/status/vendor_seller'
export const PAYMENT=base_url+"/payment";
export const ADDADDRESS=baseUrl2+"/addAddress";



export const GETADDRESS=baseUrl2+"/getAddress";



export const CONTACTUS=base_url+"/contact_us"
export const GET2FA=base_url+"/2fa";
export const VERIFY2FA=base_url+"/validateInput";
export const ADDBIDFILE=base_url+"/addBidFile";
export const BIDMEDIA=base_url+"/addBidMedia";
export const BIDEXIST=base_url+"/bidIdExist";
export const BIDDATA=base_url+"/getBidData";
export const MAKEBIDOFFER=base_url+"/makeOffer"
export const ADDBIDRIGHTS=base_url+"/insertBidRights";
export const EDITPROFILE=base_url+"/editUserDetails";

/*------------Amar Api----------*/
export const SERVICEUPLOAD=baseUrl2+"/videoUpload";
export const BUYERVIDEOLIST=baseUrl2+"/videoList";
export const SERVICEFORMSTATUCHECK=baseUrl2+"/serviceFormStatus"
export const SAVETRANSCODEFORM=baseUrl2+"/save/service"
export const GETVIDEODATAANDPRICE=baseUrl2+"/get/price "
export const VENDOR_ID=1
/*------------END Amar Api----------*/

export const USERID=localStorage.getItem('user_id')==null?0:localStorage.getItem('user_id');
export const color_code=["#F4F0F0", "#FCEDE8", "#FFF0E5", "#FFF4E5", "#FDF6E7", "#FAF7EB", "#FBF9E9", "#FEFDE6", "#FFFFE5", "#EFF6F6", "#E5FEFF", "#F3E7FD", "#F5F0F4", "#FCE9E9" ]
// export const USERID= () => {
//   useEffect(() => {
//     changeuserid(localStorage.getItem('user_id')==null?0:localStorage.getItem('user_id'))
//
//   });
//   const [userid,changeuserid]=useState(localStorage.getItem('user_id')==null?0:localStorage.getItem('user_id'))
//   return userid
// };
export const VENDORID=localStorage.getItem('vendor_id')==null?0:localStorage.getItem('vendor_id');
export const SELLERID=localStorage.getItem('seller_id')==null?0:localStorage.getItem('seller_id');
export const TOKEN=localStorage.getItem('planetshare_web_token')==null?null:localStorage.getItem('planetshare_web_token');
// var fingerprint = new Fingerprint().get();
// localStorage.setItem('uuid',fingerprint)
// export const UUID=fingerprint
export const HEADER = {
headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization':"Bearer " + TOKEN,
}
};
export const OS=window.navigator.platform
export const NAME=window.navigator.appCodeName
class test extends React.Component
{
  componentDidUpdate()
  {

  }
  render()
  {
    return(
      <h5>loading</h5>
    )
  }
}
