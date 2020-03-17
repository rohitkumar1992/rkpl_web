import React from 'react';
import Loader from 'react-loader-spinner'
const CommonLoader =(props)=>{
  return(<div class="container loader_cont" ><img src="/images/2.gif" style={{width:85,height:85}}/><h3>{props.message}</h3></div>)
  // return(<div class="container loader_cont" > <Loader
  //        type="RevolvingDot"
  //        color="#0195ED"
  //        height={100}
  //        width={100}
  //     ></Loader><h3>{props.message}</h3></div>)
}
export default CommonLoader;
