import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { ControlsService } from './controls.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  @Input() videoPlayer:any;
  playPauseBtn:any
  playPauseIcon:any;
  muteBtn:any;
  muteIcon:any;
  progressBar:any;
  like:any;
  unlike:any;
	volume:any;
	playProgress:any;
	progressWrap:any;
	showProgress:any;
	progressFlag:any;
	likenum:any;
	unlikenum:any;

constructor(private controlsService: ControlsService) { }

ngOnInit() {

	let go =  this;
	
	// Get handles to each of the buttons and required elements
  this.playPauseIcon = $('#play-pause-button');
  this.muteBtn = $('#mute-button'); 
  this.muteIcon = $('#mute-icon'); 
	this.like = $('#video-like'); 
	this.unlike = $('#video-unlike'); 
	this.volume = $('#video-volume'); 
	this.playProgress = $('#playProgress');
	this.progressWrap = $('#progressWrap');
	this.showProgress = $('#showProgress');

	// Hide the browser's default controls
	this.videoPlayer.controls = false;
	 
	this.progressWrap.mousedown(function(e){
		if(go.videoPlayer.paused || go.videoPlayer.ended){
			go.videoPlayer.play();
			clearInterval(go.progressFlag);
			var length = e.pageX - go.progressWrap.offset().left;
			var percent = length / go.progressWrap.width();
			go.playProgress.width(percent * (go.progressWrap.width()) - 2 + "px");
			go.videoPlayer.currentTime = percent * go.videoPlayer.duration;
			var go1 = go;
			go1.progressFlag = setInterval(function(){
				var percent = go1.videoPlayer.currentTime / go1.videoPlayer.duration;
				$(go1.playProgress).width(percent * ($(go1.progressWrap).width()) - 2 + "px");
				$(go1.showProgress).html((percent * 100).toFixed(1) + "%");
			}, 80);
	}
	else{
		clearInterval(go.progressFlag);
		var length = e.pageX - go.progressWrap.offset().left;
		var percent = length / go.progressWrap.width();
		go.playProgress.width(percent * (go.progressWrap.width()) - 2 + "px");
		go.videoPlayer.currentTime = percent * go.videoPlayer.duration;
		var go1 = go;
		go.progressFlag = setInterval(function(){
			var percent = go1.videoPlayer.currentTime / go1.videoPlayer.duration;
			$(go1.playProgress).width(percent * ($(go1.progressWrap).width()) - 2 + "px");
			$(go1.showProgress).html((percent * 100).toFixed(1) + "%");
		}, 80);
	}
	});
  
	this.volume.innerText = this.videoPlayer.volume*10;

	this.controlsService.getDemoData().then((res) => {
		this.likenum = res["like"];
		this.unlikenum = res["unlike"]
		var c_number = localStorage.getItem('like');
		if(c_number=='NaN'){
			c_number = 0+"";
		}
		this.likenum = parseInt(this.likenum)+parseInt(c_number);
		var c_number = localStorage.getItem('unlike');
		if(c_number=='NaN'){
			c_number = 0+"";
		}
		this.unlikenum = parseInt(this.unlikenum)+parseInt(c_number);

		$(this.like).html(this.likenum);
		$(this.unlike).html(this.unlikenum);
	});
}
				
togglePlayPause() {
	 var that = this;
	// If the mediaPlayer is currently paused or has ended
	if (that.videoPlayer.paused || that.videoPlayer.ended) {
		if (that.videoPlayer.ended){
			that.videoPlayer.currentTime = 0;
	}
	  that.videoPlayer.play();
		that.progressFlag = setInterval(function(){
			var percent = that.videoPlayer.currentTime / that.videoPlayer.duration;
			$(that.playProgress).width(percent * ($(that.progressWrap).width()) - 2 + "px");
			$(that.showProgress).html((percent * 100).toFixed(1) + "%");
		}, 80);
		
	}
	// Otherwise it must currently be playing
}

// Stop the current media from playing, and return it to the start position
 stopPlayer() {
	this.videoPlayer.pause();
	//this.videoPlayer.currentTime = 0;
}

// Changes the volume on the media player
changeVolume(direction) {
	if (direction === '+') {
		this.videoPlayer.volume += this.videoPlayer.volume == 1 ? 0 : 0.1;
	}
	else{
		this.videoPlayer.volume -= (this.videoPlayer.volume == 0 ? 0 : 0.1);
	} 
	this.videoPlayer.volume = parseFloat(this.videoPlayer.volume).toFixed(1);
	this.volume.text(this.videoPlayer.volume*10);
}

// Toggles the media player's mute and unmute status
 toggleMute() {
	if (this.videoPlayer.muted) {
		// Change the cutton to be a mute button
		this.changeButtonIcon(this.muteIcon,'fa-volume-mute', 'fa-volume-up');
		// Unmute the media player
		this.videoPlayer.muted = false;
	}
	else {
		// Change the button to be an unmute button
		this.changeButtonIcon(this.muteIcon, 'fa-volume-up','fa-volume-mute');
		// Mute the media player
		this.videoPlayer.muted = true;
	}
}

// Replays the media currently loaded in the player
 replayMedia() {
	this.resetPlayer();
  //this.changeButtonIcon(this.playPauseIcon, 'fa-play-circle', 'fa-pause-circle');
}


// Updates a button's title, innerHTML and CSS class to a certain value
 changeButtonIcon(btnIcon, oldIcon, newIcon) {
    btnIcon.removeClass(oldIcon);
    btnIcon.addClass(newIcon);
}

// Loads a video item into the vedio player
 loadVideo() {
	for (var i = 0; i < arguments.length; i++) {
		var file = arguments[i].split('.');
        var ext = file[file.length - 1];
		// Check if this media can be played
		if (this.canPlayVideo(ext)) {
			// Reset the player, change the source file and load it
			this.resetPlayer();
			this.videoPlayer.src = arguments[i];
      this.videoPlayer.load();
      this.changeButtonIcon(this.playPauseIcon, 'fa-pause-circle', 'fa-play-circle');
			break;
		}
	}
}
// Checks if the browser can play this particular type of file or not
 canPlayVideo(ext) {
	var ableToPlay = this.videoPlayer.canPlayType('video/' + ext);
	return (ableToPlay == '') ? false : true;
}

// Resets the media player
 resetPlayer() {
	this.videoPlayer.play();
	// Move the media back to the start
	this.videoPlayer.currentTime = 0;
	// Ensure that the play pause button is set as 'play'
}

// Click the like currently video
 likeVideo() {
	this.likenum = parseInt(this.likenum)+1;
	localStorage.setItem('like',this.likenum.toString());
	$(this.like).html(this.likenum);
}

// Click the unlike currently video
 unlikeVideo() {
	this.unlikenum = parseInt(this.unlikenum)+1;
	localStorage.setItem('unlike',this.unlikenum.toString());
	$(this.unlike).html(this.unlikenum);
}
}
