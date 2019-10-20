import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends Component{

  componentDidMount(){

  }

  render(){
    return(
<div className="list-group">
        <a className="list-group-item"onClick={()=>this.props.changeVideoN()} >NEXT</a>
        <a className="list-group-item"onClick={()=>this.props.changeVideoB()} >BACK</a>
</div>
      )
   }
}

export default Playlist;