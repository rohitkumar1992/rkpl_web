import ReactDOM from "react-dom";
import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import $ from 'jquery'
class Cropper extends Component {
  state = {
    src: null,
    croppedImageUrl:'',
    crop: {
      unit: 'px',
      width: 250,
      height: 375,
      x: 25,
      y: 25
    },
    cropped_img_data_url:null
  };
componentDidMount()
{
  this.setState({src:this.props.original_img,croppedImageUrl:this.props.croppedImageUrl})
}
// componentDidUpdate()
// {
//   console.log("update"+this.props.croppedImageUrl );
//   // (this.state.croppedImageUrl!=this.props.croppedImageUrl || this.state.src!=this.props.original_img)&&
//   if(this.props.updateTrue)
//   {
//     this.setState({src:this.props.original_img,croppedImageUrl:this.props.croppedImageUrl})
//   }
// }
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>{
      //console.log(reader.result)
        this.setState({ src: reader.result })}
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      //this.props.cropImgUrl(this.state.src,croppedImageUrl)
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
// return canvas;
var dataURL = canvas.toDataURL();
// var pic = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//var pic = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// console.log(dataURL);
this.setState({cropped_img_data_url:dataURL})
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        // console.log(blob);
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, src,cropped_img_data_url} = this.state;
    return (
      <div className="App">
        <div>
          {croppedImageUrl=='' && <div>
          <label for="upload_vimg1" class="crop_upload">
              <input type="file" id="upload_vimg1" accept="image/*" onChange={this.onSelectFile} />
              <i class="fa fa-upload" aria-hidden="true"></i>
              <b>Upload key artwork <sup>*</sup></b>
              <p>Click here to choose poster file to upload</p>
              <img src="" id="bid_thumbnail" alt="" />
          </label></div>}
        </div>
        <div >
          {src && <div>
            <a href="javascript:" className="back" onClick={()=>this.setState({croppedImageUrl:'',src:null})}><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
            <div class="crop_container"><ReactCrop
              src={src}
              crop={crop}
              maxHeight={375}
              minHeight={375}
              maxWidth={250}
              minWidth={250}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            /></div>
          </div>}
        </div>
        <div class="buttons">
          <button type="button" class="btndefault" onClick={()=>{$("#portal_modal").removeClass("show");this.props.onChange();this.props.cropImgUrl(this.state.src,croppedImageUrl,cropped_img_data_url)}} disabled={croppedImageUrl==''?true:false}>Save</button>
        </div>
        {/*croppedImageUrl && (
          <div class="cropped_img"><img alt="Crop" style={{ maxWidth: "50%" }} src={croppedImageUrl} /></div>
        )*/}
      </div>
    );
  }
}

export default Cropper;
