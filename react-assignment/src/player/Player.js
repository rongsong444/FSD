import React, { Component } from 'react';
import './Player.css';
import Controls from '../controls/Controls.js';
import Playlist from '../playlist/Playlist.js';
import Addplay from '../addplay/Addplay.js';
import $ from 'jquery';

class Player extends Component{
  constructor(props) {
    super(props);
    this.state={
      videopath:'../sample2.mp4',
    }
    this.changeN=this.changeN.bind(this);
    this.changeB=this.changeB.bind(this);
  }

  methodToChild(){

    return this.refs.media;
    
}

changeN(){
  this.setState({
    videopath: '../sample4.mp4',
  });
  }

  changeB(){
    this.setState({
      videopath: '../sample2.mp4',
    });
    }

componentDidMount(){

}

  render(){
    console.log('render called');
    return(
      <div className="player" >
          <div className="player-title">
            <p>Angular Video Player</p>
            </div>
            <div id="videodiv" className="player-content" ref="videodiv">
                <video id='media-video' ref="media" src={this.state.videopath}>
                </video>
             </div>
             <Controls methodToChild={this.methodToChild.bind(this)}></Controls>
             <Playlist changeVideoN={this.changeN} changeVideoB={this.changeB}></Playlist>
             {<br />}
             <Addplay></Addplay>
        </div>         
    )
  }
}
export default Player;
