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
const GIGLIST = Loadable({
  loader: () => import('./GigList/GigList.js'),
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
const GIGPREVIEW = Loadable({
  loader: () => import('./GigPreview/GigPreview.js'),
  loading: Loading,
});
const PROFILE = Loadable({
  loader: () => import('./vendor_profile.js'),
  loading: Loading,
});
const ANALYTICS = Loadable({
loader: () => import('./analytics.js'),
loading: Loading,
});
const EARNINGS = Loadable({
loader: () => import('./earnings.js'),
loading: Loading,
});
const ORDERS = Loadable({
loader: () => import('./myorders.js'),
loading: Loading,
});
const MESSAGE = Loadable({
loader: () => import('./message.js'),
loading: Loading,
});
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path:'/dashboard/vendor', exact:true, name: 'DASHBOARDLANDING',  component: DASHBOARDLANDING },
    { path:'/dashboard/vendor/giglist', exact:true, name: 'DASHBOARDLANDING',  component: GIGLIST },
    { path:'/dashboard/vendor/creategig',name: 'DASHBOARDLANDING',  component: CREATEGIG },
    { path:'/dashboard/vendor/profile',name: 'VENDORPROFILE',  component: PROFILE },
    { path:'/dashboard/vendor/analytics',name: 'VENDOR ANALYTICS',  component: ANALYTICS },
    { path:'/dashboard/vendor/earnings',name: 'VENDOR EARNINGS',  component: EARNINGS },
    { path:'/dashboard/vendor/message',name: 'MESSAGE',  component: MESSAGE },
    { path:'/dashboard/vendor/orders',name: 'VENDOR ORDERS',  component: ORDERS },
    { path:'/dashboard/vendor/editgig/:gig_id',name: 'EDITGIG',  component: EDITGIG },
    { path:'/dashboard/vendor/gigpreview/:gig_id',name: 'GIGPREVIEW',  component: GIGPREVIEW },
];

export default routes;
