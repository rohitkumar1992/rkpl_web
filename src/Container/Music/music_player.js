import React from 'react';
// import ReactAudioPlayer from 'react-audio-player';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import FaHeadphones from 'react-icons/lib/fa/headphones'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js';
import $ from 'jquery'
//import WaveSurfer from 'react-wavesurfer';
const options = {
  //audio lists model
  // audioLists: audioList2,

  //default play index of the audio player  [type `number` default `0`]
  defaultPlayIndex: 0,

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
  preload: false,

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
}
class Player extends React.Component{
  state={showPlayer:false,audioList:[
    {
      name: 'Bedtime Stories',
      singer: 'Jay Chou',
      cover:
        'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
      musicSrc:'music.mp3'
    },
  ], }
  componentDidMount()
  {
this.loadWave()
  }
  loadWave=()=>{
    var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#999',
    progressColor: 'purple',
    interact:false
});
wavesurfer.load('music.mp3');
wavesurfer.setMute(true)
this.setState({wavesurfer:wavesurfer},function()
{
      $('#waveform').hide();
})
  }
  onAudioPlay=()=>{
    // this.state.wavesurfer.on('ready', function () {
    $('#waveform').show();
        this.state.wavesurfer.play();
        this.state.wavesurfer.setMute(true)
    //});
  }
  onAudioPause=()=>{
    this.state.wavesurfer.pause();
    this.state.wavesurfer.setMute(true)
  }
  onAudioProgress=(audio)=>{
    console.log(audio);
  }
  onAudioSeeked=(audio)=>{
    var current_time=this.state.wavesurfer.getCurrentTime();
    var skip_time=audio.currentTime-current_time
    this.state.wavesurfer.skip(Math.floor(skip_time))
    this.state.wavesurfer.setMute(true)
  }
  onAudioReload=()=>{
      this.state.wavesurfer.seekTo(0);
      this.state.wavesurfer.setMute(true)
  }
  render()
  {
    const {showPlayer}=this.state;
    const Data=(<div><ReactAudioPlayer
    src="music.mp3"
    controls
  /></div>)
    return(<div><button onClick={()=>this.setState({showPlayer:true})}>Play</button>

    <button onClick={()=>this.setState({showPlayer:false})}>Close</button>
    <div id="waveform" ></div>
    {showPlayer && <div><ReactJkMusicPlayer audioLists={this.state.audioList} {...options} mode="full"  onAudioPlay={()=>this.onAudioPlay()} onAudioReload={()=>{this.onAudioReload()}} onAudioPause={()=>this.onAudioPause()} onAudioSeeked={this.onAudioSeeked}/></div>}</div>)
  }
}
export default Player;
