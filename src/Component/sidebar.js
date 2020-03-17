import React from 'react';
import {Link} from 'react-router-dom';
function Sidebar()
{
  return(
    <nav id="sidebar">
      <div class="user_head">
        <a href="#" class="box">
          <div class="icon">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <p>{localStorage.getItem('name')}</p>
        </a>
      </div>
      <div class="nav_category">Main Menu</div>
      <ul class="components">
        <li>
          <a href="#">
            <i class="fa menu_icon fa-puzzle-piece" aria-hidden="true"></i>
            <span class="menu-title">Dashboard</span>
          </a>
        </li>
        <li class="drop">
          <Link to="/seller" >
            <i class="fa menu_icon fa-tachometer" aria-hidden="true"></i>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            <span class="menu-title">Seller</span>
          </Link>
          <ul id="dashboardmenu">
            <li>
              <Link to="/seller/imagelist">Seller Images</Link>
            </li>
            <li>
              <Link to="/seller/videolist">Seller Videos</Link>
            </li>
          </ul>
        </li>
        <li class="drop">
          <Link to="/vendor" >
            <i class="fa menu_icon fa-tachometer" aria-hidden="true"></i>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            <span class="menu-title">Vendor</span>
          </Link>
          <ul id="dashboardmenu">
            <li>
              <Link to="/vendor/servicelist">Vendor Service List</Link>
            </li>
            <li>
              <Link to="/seller/videolist">Seller Videos</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/userlist">
            <i class="fa menu_icon fa-book" aria-hidden="true"></i>
            <span class="menu-title">UserList</span>
          </Link>
        </li>
        <li class="drop">
          <a href="#">
            <i class="fa menu_icon fa-camera" aria-hidden="true"></i>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            <span class="menu-title">Page Layout</span>
          </a>
          <ul id="pageSubmenu">
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
            <li><a href="#">Page 3</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="fa menu_icon fa-envelope-open" aria-hidden="true"></i>
            <span class="menu-title">Page Layout</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa menu_icon fa-telegram" aria-hidden="true"></i>
            <span class="menu-title">Setting</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Sidebar;
