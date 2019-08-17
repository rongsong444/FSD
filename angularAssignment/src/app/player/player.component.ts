import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  videoPlayer:any;
  videoDiv:any;
  videoSoruce:any;


  constructor() { }

  ngOnInit() {
    this.videoPlayer = $("#media-video")[0];
    this.videoSoruce = 'assets/mp4/sample2.mp4';
    $(this.videoPlayer).html("<source src="+this.videoSoruce+" type='video/mp4'>");
    //this.videoPlayer.play();
  }

  runParent(msg:any){
    this.videoPlayer = msg;
}
}
