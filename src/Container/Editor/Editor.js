import React from 'react';
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor';
import $ from 'jquery';
import {GETIMAGEDATA,TAG} from '../../url';
import axios from 'axios';
import Not_Found from '../../Component/not_found/not_found';
import ActivityLoader from 'react-loader-spinner';
// import './Editor.css'
import cogoToast from 'cogo-toast';
class Editor extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={image_data:[],not_found:false,isLoading:true,loading_msg:'Please Wait'}
    this.editorRef = React.createRef();
  }
  componentDidMount()
  {

//     var instance = new ImageEditor(document.getElementById('tui-image-editor'), {
//      includeUI: {
//          loadImage: {
//              path: 'images/dubbing1.jpg',
//              name: 'SampleImage'
//          },
//          initMenu: 'filter',
//          menuBarPosition: 'bottom'
//      },
//     cssMaxWidth: 700,
//     cssMaxHeight: 500,
//     selectionStyle: {
//         cornerSize: 20,
//         rotatingPointOffset: 70
//     }
// });
const editorInstance = this.editorRef.current.getInstance();
editorInstance.addIcon('arrow');
editorInstance.on('objectActivated', function(props) {
    console.log(props);
    console.log(props.type);
    console.log(props.id);
});
    this.setState({image_id:this.props.match.params.image_id,image_name:this.props.match.params.image_name},function()
  {
       setTimeout(()=>this.setState({isLoading:true}),1000);
       this.getData();
  });
  }
  getData=()=>{
    axios.post(GETIMAGEDATA,{
      'user_id':localStorage.getItem('user_id'),
      'tag':TAG,
      'image_id':this.state.image_id,
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data;
        this.setState({image_data:response.data});
        console.log(response.data);
         setTimeout(()=>this.setState({isLoading:true}),1000);
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.image_id!=this.state.image_id )
    {
      this.setState({image_id:this.props.match.params.image_id,image_name:this.props.match.params.image_name,isLoading:true,not_found:false},function()
    {
      this.getData();
    });
   }
  }
  handleClickButton = () => {
    alert('hi')
    const editorInstance = this.editorRef.current.getInstance();
    editorInstance.on('objectActivated', function(props) {
        console.log(props);
        console.log(props.type);
        console.log(props.id);
    });
  };
  render()
  {
    const {image_data,isLoading,not_found,loading_msg}=this.state;
    const imageEditorOptions={
      includeUI: {
    loadImage: {
      path: 'images/dubbing1.jpg',
      name: 'SampleImage'
    },
    menu: ['shape', 'filter'],
    initMenu: 'filter',
    uiSize: {
        width: '100%',
        height: '700px'
    },
    menuBarPosition: 'bottom'
  },
  cssMaxWidth: 700,
  cssMaxHeight: 500,
  selectionStyle: {
    cornerSize: 20,
    rotatingPointOffset: 70
  }

    }
    if(!not_found)
    {
      if(isLoading)
      {
      return( <>
        <ImageEditor
               ref={this.editorRef}
               {...imageEditorOptions}
             />
             <button onClick={this.handleClickButton}>Flip image by X Axis!</button>
  <div id="tui-image-editor"></div></>)
    }
    else {
      return(<div class="container loader_cont"><ActivityLoader
        type="Triangle"
         color="black"
         height={100}
         width={100}
         />
         <h3>{loading_msg}</h3>
         </div>);
    }
  }
  else {
      return(<Not_Found/>)
  }
 }
}
export default Editor;
// <ImageEditor
// includeUI={{
// loadImage: {
//   path: 'images/dubbing1.jpg',
//   name: 'SampleImage'
// },
// initMenu: 'filter',
// uiSize: {
//   width: '100%',
//   height: '700px'
// },
// menuBarPosition: 'bottom'
// }}
// cssMaxHeight={500}
// cssMaxWidth={700}
// selectionStyle={{
// cornerSize: 20,
// rotatingPointOffset: 70
// }}
// usageStatistics={true}
// />
