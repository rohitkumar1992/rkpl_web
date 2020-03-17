import React, { Component } from 'react';
import axios from 'axios';
class Progress extends Component {
state={
  percentage:''
}

render()
{

return(
  <div class="progress" style={{height:'25px'}}>
    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" >

    </div>
  </div>
)
}
}
export default Progress
