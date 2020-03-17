import React from 'react';
const Tooltip =(props)=>{
  return(    <div class="gig_tooltip">
          <div class="box">
              <div class="icon"><i class="fa fa-plane" aria-hidden="true"></i></div>
                {props.children}
          </div>
      </div>);
}
export default Tooltip;
