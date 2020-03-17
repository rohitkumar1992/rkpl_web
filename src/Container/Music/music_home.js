import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import FaHeadphones from 'react-icons/lib/fa/headphones'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js';
import LoadingGif from '../../Component/Loader/loading_gif'
import $ from 'jquery'
const audioLists=[{
  id:1,
  name: 'Bedtime Stories',
  singer: 'One Wave',
  cover:
    'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
  musicSrc:'music.mp3'
},
{
  id:2,
  name: 'Never Stop Dream',
  singer: 'Material Music',
  cover:
    'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
  musicSrc:'music.mp3'
},
{
  id:3,
  name: 'Happy Talk',
  singer: 'Young President',
  cover:
    'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
  musicSrc:'music.mp3'
},
{
  id:4,
  name: 'Voice Of The Future',
  singer: 'Sound Design',
  cover:
    'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
  musicSrc:'music.mp3'
}]

class Music extends React.Component
{
  state={showPlayer:false,audioList:[],loading_msg:'Please Wait',isLoading:false,playUrl:[],wavesurfer:[],wave_key:'',options:{
    //audio lists model
     audioLists: audioLists,

    //default play index of the audio player  [type `number` default `0`]
    // defaultPlayIndex: 0,

    //if you want dynamic change current play audio you can change it [type `number` default `0`]
    // playIndex: 0,

    //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
    theme: 'dark',

    // Specifies movement boundaries. Accepted values:
    // - `parent` restricts movement within the node's offsetParent
    //    (nearest node with position relative or absolute), or
    // - a selector, restricts movement within the targeted node
    // - An object with `left, top, right, and bottom` properties.
    //   These indicate how far in each direction the draggable
    //   can be moved.
    bounds: 'body',

    // Replace a new playlist with the first loaded playlist
    // instead of adding it at the end of it.
    // [type `boolean`, default `false`]
    clearPriorAudioLists: false,

    // Play your new play list right after your new play list is loaded turn false.
    // [type `boolean`, default `false`]
    autoPlayInitLoadPlayList: false,

    //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
    //"auto|metadata|none" "true| false"
    preload: true,

    //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
    glassBg: true,

    //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
    remember: false,

    //The Audio Can be deleted  [type `Boolean`, default `true`]
    remove: false,

    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition: {
      top: 300,
      left: 120
    },
  controllerTitle: <FaHeadphones />,
    // play mode text config of the audio player
    playModeText: {
      order: 'Order',
      orderLoop: 'Loop',
      singleLoop: 'Repeat',
      shufflePlay: 'Shuffle'
    },

    //audio controller open text  [ type `String | ReactNode` default 'open']
    openText: 'Play',

    //audio controller close text  [ type `String | ReactNode` default 'close']
    closeText: 'Close',

    //audio theme switch checkedText  [ type `String | ReactNode` default '-']
    checkedText: '',

    //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
    unCheckedText: '',

    // audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
    notContentText: 'Atul',

    panelTitle: 'Shantanu',

    defaultPlayMode: 'order',

    //audio mode        mini | full          [type `String`  default `mini`]
    mode: 'mini',

    /**
     * [ type `Boolean` default 'false' ]
     * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
     */
    once: false,

    //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
    autoPlay: true,

    //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
    toggleMode: true,

    //audio cover is show of the "mini" mode [type `Boolean` default 'true']
    showMiniModeCover: true,

    //audio playing progress is show of the "mini"  mode
    showMiniProcessBar: true,

    //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
    drag: true,

    //drag the audio progress bar [type `Boolean` default `true`]
    seeked: true,

    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]

    //Displays the audio load progress bar.  [type `Boolean` default `true`]
    showProgressLoadBar: true,

    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,

    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,

    //download button display of the audio player panel   [type `Boolean` default `true`]
    showDownload: true,

    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showPlayMode: true,

    //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
    showThemeSwitch: true,

    //lyric display of the audio player panel   [type `Boolean` default `false`]
    showLyric: true,

    //Extensible custom content       [type 'Array' default '[]' ]
    extendsContent: [],

    //default volume of the audio player [type `Number` default `100` range `0-100`]
    defaultVolume: 100,

    //playModeText show time [type `Number(ms)` default `700`]
    playModeShowTime: 600,

    //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
    loadAudioErrorPlayNext: true,

    // Auto hide the cover photo if no cover photo is available [type `Boolean` default `false`]
    autoHiddenCover: true,
  } }
  componentDidMount()
  {
this.setState({isLoading:true,audioList:audioLists},function(){this.loadWave()})
    //this.setState({isLoading:true}),1000)
  }
  loadWave=()=>{
    for(var i=0;i<audioLists.length;i++)
    {
      var wavesurfer = WaveSurfer.create({
      container: '#waveform_'+audioLists[i].id,
      waveColor: 'grey',
      progressColor: '#0195ed',
      interact:false,
      barGap:3,
      barWidth:1,
      barHeight:1,
      forceDecode:true,
      height:40,
  });
  wavesurfer.load(audioLists[i].musicSrc);
  wavesurfer.setMute(true);
  var list_comb=this.state.wavesurfer;
  // list_comb.push(this.state.wavesurfer);
  list_comb.push(wavesurfer)
  this.setState({wavesurfer:list_comb},function()
  {
      //  $('#waveform').hide();
  })
    }
  }
  onAudioPlay=(key)=>{
    // this.state.wavesurfer.on('ready', function () {
        this.state.wavesurfer[this.state.wave_key].play();
        this.state.wavesurfer[this.state.wave_key].setMute(true)
    //});
  }
  onAudioPause=()=>{
    this.state.wavesurfer[this.state.wave_key].pause();
    this.state.wavesurfer[this.state.wave_key].setMute(true)
  }
  onAudioProgress=(audio)=>{
    //console.log(audio);
  }
  onAudioSeeked=(audio)=>{
    var current_time=this.state.wavesurfer[this.state.wave_key].getCurrentTime();
    var skip_time=audio.currentTime-current_time
    this.state.wavesurfer[this.state.wave_key].skip(Math.floor(skip_time))
    this.state.wavesurfer[this.state.wave_key].setMute(true)
  }
  onAudioReload=()=>{
      this.state.wavesurfer[this.state.wave_key].seekTo(0);
      this.state.wavesurfer[this.state.wave_key].setMute(true)
  }
  PlayMusic=(key)=>{
    // var key_url=''
    // if(this.state.wave_key=='')
    // {
    //   key_url=key;
    // }
    // else {
    //   key_url=this.state.wave_key
    // }
    // this.state.wavesurfer[key_url].seekTo(0);
    // this.state.wavesurfer[key_url].play();
    // this.state.wavesurfer[key_url].setMute(true)
    this.setState({showPlayer:false})
    if(this.state.wave_key!=='')
    {
      this.state.wavesurfer[this.state.wave_key].pause();
        this.state.wavesurfer[this.state.wave_key].seekTo(0);
        this.state.wavesurfer[this.state.wave_key].setMute(true)
    var current_play=this.state.audioList.filter((data)=>{return data.id==key+1});
    var not_current_play=this.state.audioList.filter((data)=>{return data.id!=key+1});
    for(var i=0;i<not_current_play.length;i++)
    {
            current_play.push(not_current_play[i]);
    }
   //  const data = {
   //   ...this.state.options,
   //   clearPriorAudioLists: true,
   //   audioLists: current_play
   // }
   // this.setState({
   //   params: data
   // })
    this.setState({wave_key:key,showPlayer:true},function()
  {
   //this.onAudioPlay(key)
  })
}
else {
  this.setState({wave_key:key,showPlayer:true},function()
{
 this.onAudioPlay(0)
})
}
  }
onAudioPlayTrackChange=(currentPlayIndex,audioLists,audioInfo)=>{
  this.PlayMusic(currentPlayIndex-1)
}
  render()
  {
  const {showPlayer,isLoading,playUrl,loading_msg}=this.state;
  if(isLoading)
  {
    const Listing=this.state.audioList.map((res,key)=>{
      return(  <li key={key}>
          <div class="mp_m_c">
            <div class="mp_t_a">
              <div class="pl_ttl">
                {this.state.wave_key==`${key}` && <a href="javascript:" class="icn" ><i className="fa fa-pause"></i></a>}
                {this.state.wave_key!=`${key}`  && <a href="javascript:" class="icn" onClick={()=>this.PlayMusic(key)} ><i className="fa fa-play"></i></a>}
                <div class="ttl">
                  <a href="javascript:" class="heading">{res.name}</a>
                  <span>
                    by <a href="javascript:">{res.singer}</a>
                  </span>
                </div>
              </div>
            </div>
            <div class="mp_i_a">
              <div id={`waveform_${res.id}`} style={{width:"100%"}}></div>
              <div class="presentation">

              </div>
            </div>
            <div class="mp_l_v">
              <p>2:28</p>
            </div>
            <div class="mp_b_v">
              <p>160</p>
            </div>
            <div class="mp_i_b">
              <div class="sv_crt">
                <button type="button" class="crt">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  <span>Save</span>
                </button>
                <button type="button" class="sv">
                  <i class="fa fa-share-square-o" aria-hidden="true"></i>
                  <span>Share</span>
                </button>
                <button type="button" class="sv">
                  <i class="fa fa-download" aria-hidden="true"></i>
                  <span>Try</span>
                </button>
              </div>
            </div>
            <div class="mp_d_b">
              <a href="javascript:" data-toggle="collapse" href={`#mp_cont_${res.id}`}><i class="fa fa-angle-down"></i></a>
            </div>
          </div>
          <div class="mp_cont_l collapse" id={`mp_cont_${res.id}`}>
            <div class="mp_cont">
              <div class="mp_c">
                <p>gritty and punchy, with Southern Rock elements featuring exciting electric guitar and male aahs to create a rowdy and confident mood.</p>
              </div>
              <div class="mp_c">
                <h3>Moods</h3>
                <div class="btn_list">
                  <a href="javascript:" class="btn">Arousing</a>
                  <a href="javascript:" class="btn">Confident</a>
                  <a href="javascript:" class="btn">Energetic</a>
                </div>
              </div>
              <div class="mp_c">
                <h3>Genres</h3>
                <div class="btn_list">
                  <a href="javascript:" class="btn">Arousing</a>
                  <a href="javascript:" class="btn">Confident</a>
                  <a href="javascript:" class="btn">Energetic</a>
                </div>
              </div>
              <div class="mp_c">
                <h3>Instruments</h3>
                <div class="btn_list">
                  <a href="javascript:" class="btn">Arousing</a>
                  <a href="javascript:" class="btn">Confident</a>
                  <a href="javascript:" class="btn">Energetic</a>
                </div>
              </div>
            </div>
          </div>

        </li>)
    });
    return(
      <section class="inner_cont music_page top_div">
        <div class="music_cont">
          <div class="container">
              <article class="top_cat_detail">
                <h2>Get The Best Music Content</h2>
                <p>Find the best music content you need to help you successfully meet your project planning goals and deadline</p>
                <div class="buttons">
                  <a href="javascript:;" class="btn btn_join">Join</a>
                </div>
              </article>
              {showPlayer && <div><ReactJkMusicPlayer  {...this.state.options} mode="full"  onAudioPlay={()=>this.onAudioPlay()} onAudioReload={()=>{this.onAudioReload()}} onAudioPause={()=>this.onAudioPause()} onAudioSeeked={this.onAudioSeeked} onAudioPlayTrackChange={this.onAudioPlayTrackChange}/></div>}
              <article class="music_tab_area">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a class="nav-link active">Most Popular</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">Most Recent</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">Genres</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">Moods</a>
                  </li>
                </ul>
                <div class="cont_area" id="mostpopular">
                  <div class="populer_list">
                    <div class="mp_g_t">
                      <p class="lngth">Length</p>
                      <p class="bpm">BPM</p>
                    </div>
                    <ul class="p_list">
                      {Listing}
                    </ul>
                  </div>
                </div>
                <div class="buttons">
                  <a href="javascript:" class="btndefault">Browse all tracks</a>
                </div>
              </article>
              <article class="cat_gal_wrap vdo_cat">
                <aside class="cat_gal_head">
                    <h2>Music collections</h2>
                    <a href="javascript:;" class="viewall">View All <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                </aside>
                <aside class="cat_list_box">
                    <div class="vd_cat_list">
                        <div class="item">
                            <a class="box" href="javascript:;">
                                <div class="img">
                                    <img src="images/music_collection1.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Christmas Classics</h3>
                                    <p>57 Tracks</p>
                                </div>
                            </a>
                        </div>
                        <div class="item">
                            <a class="box" href="javascript:;">
                                <div class="img">
                                    <img src="images/music_collection2.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Refreshing Falls Tunes</h3>
                                    <p>15 Tracks</p>
                                </div>
                            </a>
                        </div>
                        <div class="item">
                            <a class="box" href="javascript:;">
                                <div class="img">
                                    <img src="images/music_collection3.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Vacation Vibes</h3>
                                    <p>60 Tracks</p>
                                </div>
                            </a>
                        </div>
                        <div class="item">
                            <a class="box" href="javascript:;">
                                <div class="img">
                                    <img src="images/music_collection4.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Ultimate PRO Free Hits</h3>
                                    <p>19 Tracks</p>
                                </div>
                            </a>
                        </div>
                        <div class="item">
                            <a class="box" href="javascript:;">
                                <div class="img">
                                    <img src="images/music_collection5.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Epic Film Scores</h3>
                                    <p>15 Tracks</p>
                                </div>
                            </a>
                        </div>
                        <div class="item">
                            <a class="box" href="javascript:;">
                                <div class="img">
                                    <img src="images/music_collection6.jpg" alt="" />
                                </div>
                                <div class="desc">
                                    <h3>Moving Masterworks</h3>
                                    <p>17 Tracks</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </aside>
                <div class="clearfix"></div>
              </article>
              <article class="p_track">
                <h3>Download the perfect track for your project</h3>
                <div class="p_track_l">
                  <div class="box">
                      <div class="cont">
                          <div class="icon">
                            <i class="fa fa-music"></i>
                          </div>
                          <h2>Exclusive content</h2>
                          <p>Discover a curated library created by expert musicians you won’t find anywhere else.</p>
                      </div>
                  </div>
                  <div class="box">
                      <div class="cont">
                          <div class="icon">
                            <i class="fa fa-star-o"></i>
                          </div>
                          <h2>Fresh tracks</h2>
                          <p>Listen to thousands of songs, with more added every day.</p>
                      </div>
                  </div>
                  <div class="box">
                      <div class="cont">
                          <div class="icon">
                            <i class="fa fa-sort-amount-asc"></i>
                          </div>
                          <h2>Short & loops</h2>
                          <p>All tracks include shorts and loops to fit in every project.</p>
                      </div>
                  </div>
                  <div class="box new">
                      <div class="cont">
                          <div class="ttl">New</div>
                          <div class="icon">
                            <div><sup><i class="fa fa-inr"></i></sup><span>149</span><sub>/month</sub></div>
                          </div>
                          <h2>Unlimited tracks</h2>
                          <p>Perfect for online projects.</p>
                          <a href="javascript:" class="btndefault">See details</a>
                      </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </article>
              <article class="music_boxes">
                <div class="m_bl_list">
                  <div class="item">
                    <div class="img">
                      <img src="images/artist1.jpg" alt="" />
                    </div>
                    <div class="info">
                      <h3>Artist of the month: Harrison Amer</h3>
                      <p>Harrison Amer is a music producer from Toronto, Canada. He creates modern and refreshing soundscapes using elements of electronica, pop, and indie music. He holds a Master’s degree in Music Production, Technology, and Innovation from Berklee College of Music.</p>
                      <a href="javascript:" class="btndefault">Discover Harrison's Music</a>
                    </div>
                  </div>
                  <div class="item">
                    <div class="img">
                      <img src="images/artist2.jpg" alt="" />
                    </div>
                    <div class="info">
                      <h3>Submit your music and start earning</h3>
                      <p>Planetshare and PremiumBeat are working together to provide the best platform for sharing your royalty-free music with the world. Join our community of artists and producers to earn money doing what you love.</p>
                      <a href="javascript:" class="btndefault">Submit Music</a>
                    </div>
                  </div>
                </div>
                <div class="cleafix"></div>
              </article>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="music_ac">
          <div class="container">
            <div class="ac_area">
              <div class="box l">
                <h2>Enjoy more features with a free account</h2>
                <p>Sign up now to get even more out of Planetshare music, like saving your favorite music, downloading songs before you buy, keeping track of your listening history, and easily accessing all your images, videos, and music in one place.</p>
              </div>
              <div class="box r">
                <form class="music_form">
                  <h3>Log in</h3>
                  <div class="inputbox">
                    <input type="email" alt="" />
                    <label>Email or Username</label>
                  </div>
                  <div class="inputbox">
                    <input type="password" alt="" />
                    <label>Password</label>
                  </div>
                  <div class="buttons">
                    <button type="submit" class="btndefault">Log in</button>
                  </div>
                  <div class="forgot">
                    <a href="javascript:">Forgot your password?</a>
                  </div>
                  <div class="free_ac">
                    <p>Don't have a free account yet?</p>
                    <a href="javascript:" class="btndefault">Create your account</a>
                  </div>
                  <div class="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
    </section>
)
  }
  else {
    return(<LoadingGif message={loading_msg}/>)
  }
  }
}
export default Music;
