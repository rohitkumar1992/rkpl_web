import React from 'react';
import {Link} from 'react-router-dom';
import {LOGOUT} from '../../../url';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast,cssTransition} from 'react-toastify';
const Zoom = cssTransition({
enter: 'zoomIn',
exit: 'zoomOut',
duration: 750,
});
const header_data=[{'name':'Dashboard','url':''},{'name':'Messages','url':'message'},{'name':'Orders','url':'orders'},{'name':'Assets','url':'asset'},{'name':'Create Offer','url':'bidding'},{'name':'Analytics','url':'analytics'},{'name':'Earnings','url':'earnings'}]
class Header extends React.Component{
  logOut=()=>{
   const HEADER = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('planetshare_web_token'),
    }
    };
    axios.post(LOGOUT,{
      'tag':'web'
    },HEADER).then((res)=>{
      if(res.data.success==1)
      {
        // localStorage.setItem('user_id',0);
        // localStorage.setItem('seller_id',0);
        // localStorage.setItem('vendor_id',0);
        // localStorage.setItem('planetshare_web_token',null);
        localStorage.clear();
          localStorage.setItem('user_id',0);
      toast('Logging Out ',{ transition: Zoom,});
      setTimeout(()=>window.location.href='/',1000);
      }
      else {
        alert(res.data.msg);
      }
    }).catch((error)=>{

    })
  }
  render()
  {
    // const route_name=this.props.location.pathname.split('/');
    // style={{color:route_name[3]==res.name.toLowerCase()?'#0195ed':''}}
    const header_link=(header_data.map((res,key)=>{
    return(<li class="active"><Link to={`/dashboard/seller/${res.url.toLowerCase()}`} >{res.name}</Link></li>);
  }));
  return( <header class="home_header dash_header">
        <div class="header_wrap">
            <div class="header_row">
                <div class="logo">
                    <Link to="/dashboard/seller"><img src="images/logo.png" alt="" /></Link>
                </div>
                <nav class="planet_nav planet_nav_right">
                    <ul>
                    {header_link}
                    </ul>
                    <ul>
                        <li>
                            <Link to="/web" class="switch_link">Switch to Buying</Link>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" href="Javascript:;" data-toggle="dropdown"><span><img src="images/dash_user.png" alt="" /></span></a>
                            <div class="dropdown-menu">
                            <Link to="/dashboard/seller" class="dropdown-item" href="javascript:"><i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link>
                            <Link to="/dashboard/seller/profile" class="dropdown-item" href="javascript:"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Profile</Link>
                            <a class="dropdown-item" href="javascript:;" onClick={this.logOut}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="clearfix"></div>
        </div>
    </header>)
}
}
export default Header;
