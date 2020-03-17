import React from 'react';
import LoadingGif from '../../../Component/Loader/loading_gif'
class Message extends React.Component{
  state={loading:false,loading_msg:'Please Wait'}
  componentDidMount(){
        setTimeout(()=>this.setState({loading:true}),1000)
  }
  render()
  {
    const {loading,loading_msg}=this.state
    if(loading)
    {
    return(<section class="dashb_cont">
        <div class="container">
            <div class="dash_inbox">
                <div class="box l">
                    <form class="srch">
                        <div class="searchbox collapse" id="searchbox">
                            <div class="inputbox">
                                <input type="text" placeholder="Search for a username" />
                            </div>
                        </div>
                        <div class="btn_search" data-toggle="collapse" data-target="#searchbox"><i class="fa fa-search"></i><span class="close">Close</span></div>
                    </form>
                    <ul class="mail_links">
                        <li>
                            <button class="btn_link">All Conversations</button>
                        </li>
                    </ul>
                </div>
                <div class="box r">
                    <div class="empty_area">
                        <i class="fa fa-comments-o" aria-hidden="true"></i>
                        <p><strong>No message to show</strong></p>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
    </section>)
  }
  else {
    return(<LoadingGif message={loading_msg}/>)
  }
  }
}
export default Message;
