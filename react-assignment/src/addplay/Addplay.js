import React, { Component } from 'react';
import './Addplay.css';

class Addplay extends Component{

  constructor(props) {
    super(props);
    this.state={
      videoNo:'1',
      list:{},
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetch('http://localhost:3003/videoList', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
      console.log("logs");
      this.setState({
        list: data
      });
    })
  }

  add(){
    fetch('http://localhost:3003/getMockData', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    var validation = reg.test(this.videoUrl);
    if(validation){
      this.video.videoNo = this.state.videoNo;
      this.video.approved = false;
      this.video.videoName = this.videoName;
      this.video.videoUrl = this.videoUrl;
      this.controlsService.addAddData(this.video);
    }else{
      alert("please check if the url is correct!");
    }

  }

  render(){
    console.log(this.state.list);
    return(
<div className="container">
<div className="row">
        <div className="col-lg-6">
          <div className="input-group">
            <span className="">
              Title:
            </span>&nbsp;&nbsp;
            <input type="text" className="form-control" name="videoName" />
          </div>
        </div>
  </div>
    <div className="row">
        <div className="col-lg-6">
          <div className="input-group">
            <span className="">
               URL:
            </span>&nbsp;&nbsp;
            <input type="text" className="form-control" name="videoUrl" ref="videoUrl"/>
          </div>
      </div>
</div>
<div className="row"></div>
{<br />}
<div className="row">
<span className="input-group-btn">
        <button className="btn btn-primary" type="button"onClick={()=>this.add()} >Add Video</button>
</span>
</div>
{<br />}
<div id="table-list">
    <table className="table table-bordered">
        <thead>
            <tr>
            <th>NO</th>
            <th>title</th>
            <th>url</th>
            <th colSpan="3">Operation</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</div>
</div>
)
}
}

export default Addplay;




                {  
                  (this.state.list.length==0)
                  ?null
                  :this.state.list((item,index)=>{
                   return (
                    <tr>
                    <td>{item["videoName"]}</td>
                    <td ><input type="text" className="form-control" /></td>
                    <td ><input type="url" className="form-control" value={this.state.videoPath}/></td>
                    <td ><button className="btn btn-primary" type="button" >Edit</button></td>
                    <td><button className="btn btn-primary" type="button" >Delete</button></td>
                    <td><button className="btn btn-primary" type="button">Approve</button></td>
                    </tr>
                    )
                    },this)
                    }


