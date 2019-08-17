import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ControlsService } from '../controls/controls.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @Input() videoPlayer:any;
  videoList:any;
  videoDteails:any;
  videoSoruce:any;

  @Output() private outer = new EventEmitter<any>();

  constructor(private controlsService: ControlsService) { }

  ngOnInit() {

    this.controlsService.getJsonData().then((res) => {
      this.videoList = res;
      this.videoDteails = [];
      for(let i=0;i<this.videoList.length;i++){
        this.videoDteails.push({videoName:this.videoList[i].videoName,videoPath:this.videoList[i].videoPath});
      }
    });
  }

  changeVideo(item){
    for(let i=0;i<this.videoDteails.length;i++){
        if(this.videoDteails[i].videoName==item.videoName){
          this.videoSoruce = this.videoDteails[i].videoPath;
        }
    }
    $("video").remove();
    $("source").remove();
    $("#videodiv").html("<video id='media-video' width='100%' height='auto'><source src='"+this.videoSoruce+"' type='video/mp4'></video>");
    this.outer.emit($("#media-video")[0]);
  }
}
