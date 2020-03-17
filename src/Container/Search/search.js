import React from 'react';
import {Link} from 'react-router-dom';
import {TAG,SEARCH,color_code} from '../../url';
import axios from 'axios';
import Not_Found from '../../Component/not_found/not_found';
import LoadingGif from '../../Component/Loader/loading_gif'
import cogoToast from 'cogo-toast';
import Share from '../Share/Share';
import WordWrap from '../../Component/wordwrap';
import $ from 'jquery'
class Search extends React.Component{
  state={keyword:'',isLoading:false,not_found:false,searchType:'',searchresult:[],loading_msg:'Please Wait',total_result:0}
  componentDidMount()
  {
    this.setState({keyword:this.props.match.params.keyword,searchType:this.props.match.params.searchType},
    function(){
      this.getData();
    })
  }
  componentDidUpdate()
  {
    if(this.props.match.params.keyword!=this.state.keyword || this.props.match.params.searchType!=this.state.searchType)
    {
      this.setState({keyword:this.props.match.params.keyword,searchType:this.props.match.params.searchType,isLoading:false,not_found:false},
      function(){
        this.getData();
      })
   }
  }
  getData=()=>{
    axios.post(SEARCH,{
      'user_id':localStorage.getItem('user_id'),
      'search':this.state.keyword,
      'limit':100,
      'tag':TAG,
      'type':this.state.searchType,
    }).then((res)=>{
      if(res.data.success==1)
      {
        var response=res.data.data;
        this.setState({searchresult:response.data,total_result:response.total});
         setTimeout(()=>this.setState({isLoading:true}),1000);
      }
    }).catch((error)=>{
      this.setState({not_found:true})
    })
  }
  createMarkup=(desc)=> {
  return {__html: desc};
}
  render()
  {
  const {isLoading,not_found,searchresult,loading_msg,total_result,keyword}=this.state;
  if(!not_found)
    {
    const SearchResult=(searchresult.length>0 && searchresult.map((result,key)=>{
      return(<div class="item" style={{backgroundColor:color_code[Math.floor(Math.random()*color_code.length)]}}>
                    <Link to={result.tag=="image"?`/web/image/${(result.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`:`/web/video/${(result.title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${result.id}`} class="box">
                        <div class="img" >
                            <img class="load_place_vert1" src={result.large_thumb} alt=""/>
                            <span class="pendng"><em>{result.tag=="image"?"Image":"Video"}</em></span>
                        </div>
                        <div class="desc">
                            <span class="title">{result.title.replace(/^(.{8}[^\s]*).*/, "$1")}</span>
                            <div class="det" dangerouslySetInnerHTML={this.createMarkup(result.short_desc)}></div>
                        </div>
                    </Link>
                </div>)
              }))
      if(isLoading)
      {
    return(<section class="inner_cont top_div">
      <div class="container">
        <article class="cat_gal_wrap ver_cat" >
        <div class="search_key">
          <h2><span>Search Keyword:</span> {this.state.keyword}</h2>
        </div>
        <aside class="cat_gal_head">
          {searchresult.length>0 && <h2>Total Result Found :{total_result}</h2>}
          {searchresult.length==0 && <h2 class="s_noresult"><img src="images/no_result.gif"/></h2>}
        </aside>
        <div class="ver_cat_list">{SearchResult}</div>
        <div class="clearfix"></div>
      </article></div></section>)
     }
     else
      {
         return(<LoadingGif message={loading_msg}/>);
      }
   }
   else {
     return(<Not_Found/>)
   }
  }
}
export default Search
