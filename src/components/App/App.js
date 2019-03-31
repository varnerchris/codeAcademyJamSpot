import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';
//import Track from '../Track/Track';

class App extends React.Component{
constructor(props){
  super(props);
  this.state={
    searchResults:[    ],
    playlistName:'PlaylistDefaultName',
    playlistTracks:[
      /*{
        name:'playlistTrackName',
        artist:'playlistSongArtist',
        album:'playlistSongAlbum',
        id:'Id'
      }*/
    ]
  }
  this.addTrack=this.addTrack.bind(this);
  this.removeTrack=this.removeTrack.bind(this);
  this.updatePlaylistName=this.updatePlaylistName.bind(this);
  this.savePlaylist=this.savePlaylist.bind(this);
  this.search=this.search.bind(this);
}
search(searchTerm){
  console.log(`APP search ran and logged ${searchTerm}`);
  console.log(Spotify.getAccessToken())
  Spotify.search(searchTerm).then(searchResults =>{
           this.setState({searchResults: searchResults});
       });
}

savePlaylist(){
  const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris);

      //reset search results and playlist name to default values after saving playlist
      this.setState({
        searchResults: [],
        playlistTracks:[]
      });
      this.updatePlaylistName('New Playlist');
    }

updatePlaylistName(name){
  this.setState({playlistName:name});
}

addTrack(track){
        let newTracks = this.state.playlistTracks.map(track => track);
        //console.log('newtracks' ,newTracks);
         if(this.state.playlistTracks.find(savedTrack =>
             savedTrack.id === track.id)){

            return;

         }else{
             console.log('adding track');
             newTracks.push(track);
            // this.setState({searchResults:newTracks})
             this.setState({ playlistTracks: newTracks });
         }
    }

removeTrack(track){
let newTracks = this.state.playlistTracks.map(track => track);
  if(this.state.playlistTracks.find(savedTrack =>
             savedTrack.id === track.id)){
                 newTracks.pop(track);
                 this.setState({ playlistTracks: newTracks });
}}

  render() {
  return(
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar
          onSearch={this.search}
        />

      <div className="App-playlist">

        <SearchResults
          searchResults={this.state.searchResults}
          onAdd={this.addTrack}
        />

        <Playlist
          playlistTracks={this.state.playlistTracks}
          playlistName={this.state.playlistName}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
        />

      </div>
    </div>
  </div>
);
}
}

export default App;
