import React from 'react';
import ReactJWPlayer from 'react-jw-player';
const Player=(props)=>{
  return(<ReactJWPlayer
  style={{backgroundColor:'grey'}}
  playerId='jw-player'
  playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
  file={props.url}
  aspectRatio="16:9"
  isAutoPlay={true}
  controls={true}
  repeat="true"
    customProps={{
      controls: true,
      repeat: true,
      stretching: 'fill',
      preload: 'auto',
      volume: 100,
      width: '100%',
      height: '100%',
  }}
  />)
}
export default Player;
