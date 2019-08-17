import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ControlsService } from '../controls/controls.service';

@Component({
  selector: 'app-addplay',
  templateUrl: './addplay.component.html',
  styleUrls: ['./addplay.component.css']
})
export class AddPlayComponent implements OnInit {
  videoList:any;
  video:any;
  videoNo:any;
  videoName:any;
  videoUrl:any;
  id:any;

  constructor(private controlsService: ControlsService) { }

  ngOnInit() {

    this.video = {};

    this.videoNo = "1";

    this.id = 1;

    this.getData();

  }

  getData(){
    this.controlsService.getAddData().then((res) => {
      this.videoList = res;
      for(let i=0; i<this.videoList.length; i++){
        this.videoList[i].noEditorTitle = true;
        this.videoList[i].noEditorUrl = true;
      }
      this.videoNo = (this.videoList.length+1).toString();
      this.id = this.videoList.length+1;
    });
  }

  add(){
    var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    var validation = reg.test(this.videoUrl);
    if(validation){
      this.video.videoNo = this.videoNo;
      this.video.approved = false;
      this.video.videoName = this.videoName;
      this.video.videoUrl = this.videoUrl;
      this.controlsService.addAddData(this.video);
    }else{
      alert("please check if the url is correct!");
    }

  }

  delete(id){
    this.controlsService.deleteData(id).then((res) => {
      console.log(res);
    });
  }

  editor(id){
    for(let i =0;i<this.videoList.length;i++){
       if(this.videoList[i].id == id){
         if(this.videoList[i].noEditorTitle == false || this.videoList[i].noEditorUrl == false){
            this.videoList[i].approved = false;
            this.controlsService.editorAddData(id,this.videoList[i]);
        }else{
            alert("please click title or url input if you want to edit them");
        }
      }
    }
  }

  approve(id){
      for(let i =0;i<this.videoList.length;i++){
          if(this.videoList[i].id == id){
            this.videoList[i].approved = true;
            this.controlsService.approveAddData(id,this.videoList[i]);
           }
       }
  }

  canEditor(id){
    for(let i =0;i<this.videoList.length;i++){
      if(this.videoList[i].id == id){
        this.videoList[i].noEditorTitle = false;
        this.videoList[i].noEditorUrl = false;
      }
    }
  }

}
