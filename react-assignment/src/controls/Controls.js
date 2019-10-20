import React, { Component } from 'react';
import './Controls.css';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Controls extends Component{
    constructor(props) {
        super(props)
        this.state={
          totalData:'',
          like:0,
          unlike:0
        }
      }

componentDidMount(){
    fetch('./manifest.json', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
      })
      .then(response => response.json())
      .then(data => {
      this.setState({totalData: data});
      console.log(localStorage.getItem('like'));
      if(JSON.parse(localStorage.getItem('like'))==""||JSON.parse(localStorage.getItem('like'))==null){
        this.state.like = parseInt(this.state.totalData["like"]);
      }else{
        this.state.like = parseInt(localStorage.getItem('like'));
      }
      if(JSON.parse(localStorage.getItem('unlike'))==""||JSON.parse(localStorage.getItem('unlike'))==null){
        this.state.unlike = parseInt(this.state.totalData["unlike"]);
      }else{
        this.state.unlike = parseInt(localStorage.getItem('unlike'));
      }
      this.videoLike.innerText = this.state.like;
      this.videoUnLike.innerText = this.state.unlike;
    })

}

togglePlayPause() {
    this.props.methodToChild().play();
}

    stopPlayer() {
        this.props.methodToChild().pause();
   }
   
   changeVolume(direction) {
       if (direction === '+') {
        this.props.methodToChild().volume += this.props.methodToChild().volume == 1 ? 0 : 0.1;
       }
       else{
        this.props.methodToChild().volume -= (this.props.methodToChild().volume == 0 ? 0 : 0.1);
       } 
       this.props.methodToChild().volume = parseFloat(this.props.methodToChild().volume).toFixed(1);
       this.videoVolume.text=this.props.methodToChild().volume*10;
       this.videoVolume.innerText = this.props.methodToChild().volume*10;
   }
   
    toggleMute() {
       if (this.props.methodToChild().muted) {
           this.changeButtonIcon($('#mute-icon'),'fa-volume-mute', 'fa-volume-up');
           this.props.methodToChild().muted = false;
       }
       else {
           this.changeButtonIcon($('#mute-icon'), 'fa-volume-up','fa-volume-mute');
           this.props.methodToChild().muted = true;
       }
   }
   
    replayMedia() {
       this.resetPlayer();
   }
   
   

    changeButtonIcon(btnIcon, oldIcon, newIcon) {
       btnIcon.removeClass(oldIcon);
       btnIcon.addClass(newIcon);
   }
   
    loadVideo() {
       for (var i = 0; i < arguments.length; i++) {
           var file = arguments[i].split('.');
           var ext = file[file.length - 1];
           if (this.canPlayVideo(ext)) {
               this.resetPlayer();
               this.props.methodToChild().src = arguments[i];
               this.props.methodToChild().load();
               this.changeButtonIcon(this.playPauseIcon, 'fa-pause-circle', 'fa-play-circle');
               break;
           }
       }
   }

    canPlayVideo(ext) {
       var ableToPlay = this.props.methodToChild().canPlayType('video/' + ext);
       return (ableToPlay == '') ? false : true;
   }
   

    resetPlayer() {
        this.props.methodToChild().play();
       this.props.methodToChild().currentTime = 0;
   }
   

    likeVideo() {
        this.state.like = this.state.like+1;
        localStorage.setItem('like',this.state.like.toString());
        this.videoLike.innerText = this.state.like;
   }
   
    unlikeVideo() {
        this.state.unlike = this.state.unlike+1;
        localStorage.setItem('unlike',this.state.unlike.toString());
        this.videoUnLike.innerText = this.state.unlike;
   }

  render(){
    return(
        <div id='media-controls'>
            <div id="progressWrap" >
                    <div id="playProgress">
                        <span id="showProgress"></span>
                    </div>
                </div>
                <button type='button' id='replay-button'onClick={()=>this.replayMedia()}>
                    <em className="fas fa-reply"></em>
                </button>	
                <button type="button" id='play-pause-button'onClick={()=>this.togglePlayPause()}>
                    <em className="fas fa-play-circle"></em>
                </button>
                <button type='button' id='stop-button'onClick={()=>this.stopPlayer()}>
                          <em className='fas fa-stop-circle'></em></button>
                      <button type='button' id='volume-inc-button'onClick={()=>this.changeVolume("+")}><em className="fas fa-plus-circle"></em></button>
                      <button type='button' id='volume-dec-button'onClick={()=>this.changeVolume("-")} ><em className="fas fa-minus-circle"></em></button>
                <button type='button' id='mute-button'onClick={()=>this.toggleMute()} ><em id='mute-icon' className="fas fa-volume-up"></em><span id='video-volume' ref={span => this.videoVolume = span} className="badge badge-light" ></span></button>
                <button type='button' id='like-button'onClick={()=>this.likeVideo()}><em className="far fa-thumbs-up"></em><span id='video-like' ref={span => this.videoLike = span} className="badge badge-light"></span></button>
                <button type='button' id='unlike-button'onClick={()=>this.unlikeVideo()}><em className="far fa-thumbs-down"></em><span id='video-unlike' ref={span => this.videoUnLike = span} className="badge badge-light"></span></button>
     </div>            
    )
  }
}

export default Controls;
