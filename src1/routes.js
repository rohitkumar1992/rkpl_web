import React from 'react';
import Loadable from 'react-loadable';
import LoadingGif from './Component/Loader/loading_gif'
function Loading() {
  return (<LoadingGif message="Please Wait"/>);
}
const HOME = Loadable({
  loader: () => import('./Container/Home/home.js'),
  loading: Loading,
});
const VIEWMORE = Loadable({
  loader: () => import('./Container/ViewMore/ViewMore.js'),
  loading: Loading,
});
const NOT_FOUND = Loadable({
  loader: () => import('./Component/notfound.js'),
  loading: Loading,
});
const VENDORSERVICEDESCRIPTION= Loadable({
  loader: () => import('./Container/Vendor/vendorservicedesc.js'),
  loading: Loading,
});
const IMAGECATEGORYDATA= Loadable({
  loader: () => import('./Container/Category_Data/image_category_data.js'),
  loading: Loading,
});
const VIDEOCATEGORYDATA= Loadable({
  loader: () => import('./Container/Category_Data/video_category_data.js'),
  loading: Loading,
});
const IMAGEDATA= Loadable({
  loader: () => import('./Container/Image/ImageData.js'),
  loading: Loading,
});
const VIDEODATA= Loadable({
  loader: () => import('./Container/Video/VideoData.js'),
  loading: Loading,
});
const VENDORHOME= Loadable({
  loader: () => import('./Container/Vendor/vendor_home.js'),
  loading: Loading,
});
const SELLERHOME= Loadable({
  loader: () => import('./Container/Seller/seller_home.js'),
  loading: Loading,
});
const IMAGE_COLLECTION= Loadable({
  loader: () => import('./Container/Collection/ImageCollection.js'),
  loading: Loading,
});
const VIDEO_COLLECTION= Loadable({
  loader: () => import('./Container/Collection/VideoCollection.js'),
  loading: Loading,
});
const IMAGE_COLLECTION_DATA= Loadable({
  loader: () => import('./Container/Collection/ImageCollectionData.js'),
  loading: Loading,
});
const VIDEO_COLLECTION_DATA= Loadable({
  loader: () => import('./Container/Collection/VideoCollectionData.js'),
  loading: Loading,
});
const PACKS= Loadable({
  loader: () => import('./Container/Packs/Packs.js'),
  loading: Loading,
});
const PROFILE= Loadable({
  loader: () => import('./Container/Profile/Profile.js'),
  loading: Loading,
});
const ORDERS= Loadable({
  loader: () => import('./Container/Orders/order.js'),
  loading: Loading,
});
const TERMSCONDITION= Loadable({
  loader: () => import('./Component/term_condition.js'),
  loading: Loading,
});
const PRIVACYPOLICY= Loadable({
  loader: () => import('./Component/privacy_policy.js'),
  loading: Loading,
});
const CONTACTUS= Loadable({
  loader: () => import('./Component/contact_us.js'),
  loading: Loading,
});
const IMAGE_DOWNLOAD= Loadable({
  loader: () => import('./Container/Downloads/ImageDownload.js'),
  loading: Loading,
});
const VIDEO_DOWNLOAD= Loadable({
  loader: () => import('./Container/Downloads/VideoDownload.js'),
  loading: Loading,
});
const SELL_ON_PLANETSHRAE= Loadable({
  loader: () => import('./Component/sell_on_planetshare.js'),
  loading: Loading,
});
const BUY_ON_PLANETSHRAE= Loadable({
  loader: () => import('./Component/buy_on_planetshare.js'),
  loading: Loading,
});
const TEST= Loadable({
  loader: () => import('./Container/HomeData/photos.js'),
  loading: Loading,
});
const MUSIC= Loadable({
  loader: () => import('./Container/Music/music_home.js'),
  loading: Loading,
});
const ABOUTUS= Loadable({
  loader: () => import('./Component/aboutus.js'),
  loading: Loading,
});
const DUBBING= Loadable({
  loader: () => import('./Component/services/dubbing.js'),
  loading: Loading,
});
const PARTNER_WITH_US= Loadable({
  loader: () => import('./Component/partner_with_us.js'),
  loading: Loading,
});
const BIDDING_DESCRIPTION=Loadable({
  loader: () => import('./Container/Bidding/Bidding_desc.js'),
  loading: Loading,
});
const MAKE_BID=Loadable({
  loader: () => import('./Container/Bidding/make_bid.js'),
  loading: Loading,
});
const SEARCH=Loadable({
  loader: () => import('./Container/Search/search.js'),
  loading: Loading,
});
const TRANSCODING= Loadable({
  loader: () => import('./Component/services/transcoding.js'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [

    { path:'/web',exact:true,name: 'Home',  component: HOME },
    { path:'/web/search/keyword/:searchType/:keyword',exact:true,name: 'SEARCH',  component: SEARCH },
    { path:'/web/test',exact:true,name: 'Home',  component: TEST },
    { path:'/web/music',exact:true,name: 'Home',  component: MUSIC },
    { path:'/web/orders',exact:true,name: 'ImagePacks',  component:ORDERS },
    { path:'/web/packs/:pack_name',exact:true,name: 'ImagePacks',  component:PACKS },
    { path:'/web/profile',exact:true,name: 'Profile',  component:PROFILE },
    { path:'/web/imagecollection',exact:true,name: 'ImageCollection',  component: IMAGE_COLLECTION },
    { path:'/web/imagecollection/:collection_name/:collection_id',exact:true,name: 'ImageCollectionData',  component: IMAGE_COLLECTION_DATA },
    { path:'/web/videocollection',exact:true,name: 'VideoCollection',  component: VIDEO_COLLECTION },
    { path:'/web/videocollection/:collection_name/:collection_id',exact:true,name: 'VideoCollectionData',  component: VIDEO_COLLECTION_DATA },
    { path:'/web/image_download_list',exact:true,name: 'Image Download',  component: IMAGE_DOWNLOAD },
    { path:'/web/video_download_list',exact:true,name: 'Video Download',  component: VIDEO_DOWNLOAD },
    { path:'/web/viewall/:view_more_type/:vid',exact:true,name: 'Home',  component: VIEWMORE },
    { path:'/web/vendorservice_description/:gig_service_id/:gig_id',exact:true,name: 'Vendor Gig Desc',  component: VENDORSERVICEDESCRIPTION },
    { path:'/web/imagecategorydata/:cat_name/:cat_id',exact:true,name: 'Image Category',  component: IMAGECATEGORYDATA },
    { path:'/web/image/:image_name/:image_id',exact:true,name: 'Image Data',  component: IMAGEDATA },
    { path:'/web/video/:video_name/:video_id',exact:true,name: 'Video Data',  component: VIDEODATA },
    { path:'/web/videocategorydata/:cat_name/:cat_id',exact:true,name: 'Video category',  component: VIDEOCATEGORYDATA },
    { path:'/web/vendor',exact:true,name: 'Vendor Home',  component: VENDORHOME },
    { path:'/web/seller',exact:true,name: 'Seller Home',  component: SELLERHOME },
    { path:'/web/contact_us',exact:true,name: 'CONTACTUS',  component: CONTACTUS },
    { path:'/web/privacy_policy',exact:true,name: 'PRIVACYPOLICY',  component: PRIVACYPOLICY },
    { path:'/web/aboutus/:id_name',exact:true,name: 'ABOUTUS',  component: ABOUTUS },
    { path:'/web/term_condition',exact:true,name: 'TERMSCONDITION',  component: TERMSCONDITION },
    { path:'/web/sell_on_planetshare',exact:true,name: 'Sell on planetshare',  component: SELL_ON_PLANETSHRAE },
    { path:'/web/buy_on_planetshare',exact:true,name: 'Buy on planetshare',  component: BUY_ON_PLANETSHRAE },
    { path:'/web/partner_with_us',exact:true,name: 'Partner with us',  component: PARTNER_WITH_US },
    { path:'/web/services/dubbing',exact:true,name: 'Dubbing',  component: DUBBING },
    { path:'/web/services/transcoding',exact:true,name: 'Transcoding',  component: TRANSCODING },
    { path:'/web/bidding/bid_description/:bid_id',exact:true,name: 'BIDDING_DESCRIPTION',  component: BIDDING_DESCRIPTION },
    { path:'/web/bidding/perf_bid/:bid_req_id/:bid_id',exact:true,name: 'MAKE_BID',  component: MAKE_BID},
    { path:'*',exact:true,name: 'Not Found',  component: NOT_FOUND },
];
export default routes;
