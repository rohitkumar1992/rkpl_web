import React from 'react';
import {Link} from 'react-router-dom';
const Tabs=(props)=>{
  const makeTabs=(props.tabData.length>0 && props.tabData.map((res,key)=>{
    return( <li class="nav-item" key={key} style={{cursor:'pointer'}}>
            <a className={`nav-link ${props.tab_index==res.id?'active':''}`} data-toggle="tab"  onClick={()=>props.changeTab(res.id)}>{res.name} {res.count>0 && <span>{res.count}</span>}</a>
        </li>)
  }));
  return(            <div class="db_tabs">
                  <ul class="nav nav-tabs">
                      {makeTabs}
                  </ul>
                  <div class="buttons">
                      <Link to="/dashboard/vendor/creategig" class="btndefault">Create a new gig</Link>
                  </div>
              </div>)
}
export default Tabs;
