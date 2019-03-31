import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
  render(){

      let trackItems;
      if (this.props.tracks){
        trackItems=this.props.tracks.map(track => {
          return <Track
            key={track.id}
            track={track}
            onRemove={this.props.onRemove}
            onAdd={this.props.onAdd}
            isRemoval={this.props.isRemoval}
          />;
        })
      }

    return(
      <div className="TrackList">
      {trackItems}
      </div>
    );
  }
}


export default TrackList;
