import React from 'react';
import Loadable from 'react-loadable';
import LoadingGif from '../../../Component/Loader/loading_gif'
function Loading() {
  return (<LoadingGif message="Please Wait"/>);
}
const DASHBOARDLANDING = Loadable({
  loader: () => import('./dashboard_landing/dashboard_landing.js'),
  loading: Loading,
});
const CREATEGIG = Loadable({
  loader: () => import('./CreateGig/CreateGig.js'),
  loading: Loading,
});
const EDITGIG = Loadable({
  loader: () => import('./EditGig/EditGig.js'),
  loading: Loading,
});
const PROFILE = Loadable({
  loader: () => import('./seller_profile.js'),
  loading: Loading,
});
const ANALYTICS = Loadable({
loader: () => import('./analytics.js'),
loading: Loading,
});
const EARNINGS = Loadable({
loader: () => import('./earnings.js'),
loading: Loading
});
const ORDERS = Loadable({
loader: () => import('./myorders.js'),
loading: Loading,
});
const ASSETS = Loadable({
loader: () => import('./Asset/Asset.js'),
loading: Loading,
});
const ADDIMAGE = Loadable({
loader: () => import('./Asset/addimage.js'),
loading: Loading,
});
const ADDVIDEO = Loadable({
loader: () => import('./Asset/addvideo.js'),
loading: Loading,
});
const ADDVIDEODESC = Loadable({
loader: () => import('./Asset/video_description.js'),
loading: Loading,
});
const ADDIMAGEDESC = Loadable({
loader: () => import('./Asset/image_description.js'),
loading: Loading,
});
const BIDDING = Loadable({
loader: () => import('./Bidding/CreateListing.js'),
loading: Loading,
});
const BIDDING_HOME = Loadable({
loader: () => import('./Bidding/Bidding.js'),
loading: Loading,
});
const VIDEOEDIT = Loadable({
loader: () => import('./Asset/edit_video_description.js'),
loading: Loading,
});
const IMAGEEDIT = Loadable({
loader: () => import('./Asset/edit_image_description.js'),
loading: Loading,
});
const BIDDING_RIGHTS = Loadable({
loader: () => import('./Bidding/SetRights.js'),
loading: Loading,
});
const BIDDING_MEDIA_UPLOAD = Loadable({
loader: () => import('./Bidding/MediaUploads.js'),
loading: Loading,
});
const BIDDING_DESC = Loadable({
loader: () => import('./Bidding/BidDesc.js'),
loading: Loading,
});
const MESSAGE = Loadable({
loader: () => import('./message.js'),
loading: Loading
});
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path:'/dashboard/seller', exact:true, name: 'DASHBOARDLANDING',  component: DASHBOARDLANDING },
    { path:'/dashboard/seller/creategig',name: 'DASHBOARDLANDING',  component: CREATEGIG },
    { path:'/dashboard/seller/profile',name: 'SELLERPROFILE',  component: PROFILE },
    { path:'/dashboard/seller/analytics',name: 'SELLER ANALYTICS',  component: ANALYTICS },
    { path:'/dashboard/seller/earnings',name: 'SELLER EARNINGS',  component: EARNINGS },
    { path:'/dashboard/seller/message',name: 'MESSAGE',  component: MESSAGE },
    { path:'/dashboard/seller/orders',name: 'SELLER ORDERS',  component: ORDERS },
    { path:'/dashboard/seller/bidding',exact:true,name: 'SELLER BIDDING',  component: BIDDING_HOME },
    { path:'/dashboard/seller/bidding/create_bid',name: 'SELLER BIDDING',  component: BIDDING },
    { path:'/dashboard/seller/bidding/bid_desc/:bid_id',name: 'SELLER BIDDING_DESC',  component: BIDDING_DESC },
    { path:'/dashboard/seller/bidding/bid_media_upload/:bid_id',name: ' BIDDING MEDIA UPLOAD',  component: BIDDING_MEDIA_UPLOAD },
    { path:'/dashboard/seller/bidding/bid_rights/:bid_id',name: ' BIDDING RIGHTS',  component: BIDDING_RIGHTS},
    { path:'/dashboard/seller/asset',exact:true,name: 'SELLER ASSETS',  component: ASSETS },
    { path:'/dashboard/seller/asset/edit_image/:image_id',name: 'SELLER IMAGE EDIT',  component: IMAGEEDIT },
    { path:'/dashboard/seller/asset/edit_video/:video_id',name: 'SELLER VIDEO EDIT',  component: VIDEOEDIT },
    { path:'/dashboard/seller/add_asset/image',name: 'ADD IMAGE SELLER',  component: ADDIMAGE },
    { path:'/dashboard/seller/add_asset/video',name: 'ADD VIDEO SELLER',  component: ADDVIDEO },
    { path:'/dashboard/seller/add_asset/videodesc/:video_id',name: 'ADD VIDEO DESC SELLER',  component: ADDVIDEODESC },
    { path:'/dashboard/seller/add_asset/imagedesc/:image_id',name: 'ADD VIDEO DESC SELLER',  component: ADDIMAGEDESC },
    { path:'/dashboard/seller/editgig/:gig_id',name: 'EDITGIG',  component: EDITGIG },
];

export default routes;
