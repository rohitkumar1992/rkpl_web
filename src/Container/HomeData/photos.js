//import Gallery from 'react-grid-gallery';
import Gallery from 'react-photo-gallery';
import React,{ useState, useCallback } from 'react';
import {Link} from 'react-router-dom';
import Carousel, { Modal, ModalGateway } from "react-images";

class  Stagger extends React.Component{
  state={
    color_code:["#F4F0F0", "#FCEDE8", "#FFF0E5", "#FFF4E5", "#FDF6E7", "#FAF7EB", "#FBF9E9", "#FEFDE6", "#FFFFE5", "#EFF6F6", "#E5FEFF", "#F3E7FD", "#F5F0F4", "#FCE9E9" ]
  }
  imageSelect=(obj)=>{
  //  console.log(obj);
  }
  // renderImage=(e,obj)=>{
  //   console.log(e.photo);
  //   var item=e.photo;
  //   return (<img src={item.src}/>)
  // }
  createMarkup=(desc)=> {
  return {__html: desc};
}
//   const sx = (100 - (30 / photo.width) * 100) / 100;
// const sy = (100 - (30 / photo.height) * 100) / 100;
  renderImage=({index, left, top, key, photo })=>{

  const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};
var direction="column"
  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  backgroundColor:'grey'
};
    return(<div class="gl_item">
    <Link to={`/web/image/${(photo.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${photo.id}`}>
    <div class="img top_div"><img style={{imgStyle,width:"100%",backgroundColor:this.state.color_code[Math.floor(Math.random()*this.state.color_code.length)]}} {...photo} onClick={()=>this.imageSelect(photo)}/></div></Link>
      <div class="b_d">
        <div class="icons">
          <i class="fa fa-heart"></i>
          <i class="fa fa-angle-down"><span>Collect</span></i>
        </div>
      </div>
      <div class="t_d">
        <div class="det">
          <div class="info">
            <p><img src="images/logo.png" alt="" /> {photo.title}</p>
          </div>
          <div class="dwn">
            <i class="fa fa-download"></i>
          </div>
        </div>
      </div>
    </div>)
  }




  render()
  {
  return (<div class="masonary" id="masonary"><Gallery photos={this.props.view_more_result} direction={"row"} renderImage={this.renderImage}/>

                </div>)
    }
}
export default Stagger;
