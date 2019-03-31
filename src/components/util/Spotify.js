const clientId='93ab16fbb4c54d2b98ca588d71dc27bf'
let accessToken;//77
const redirectUri='https://headbobbin.surge.sh'
const searchBase = 'https://api.spotify.com/v1/';

//https://accounts.spotify.com/authorize

const Spotify={


    getAccessToken(){
      if(accessToken){
        return accessToken;
      }
   if(window.location.href.match(/access_token=([^&]*)/)
        && window.location.href.match(/expires_in=([^&]*)/)) {
      /* accessToken =  window.location.href.match(/access_token=([^&]*)/)
       let expiresIn= window.location.href.match(/expires_in=([^&]*)/)
       console.log(`The accessToken is: ${accessToken}`);
       window.setTimeout(() => accessToken = '', expiresIn * 1000);
       window.history.pushState('Access Token', null, '/');
       return accessToken;*/

          const accessTokenHtml = window.location.href.match(/access_token=([^&]*)/);
          //console.log(window.location.href.match(/access_token=([^&]*)/))
           const expiresInTmp = window.location.href.match(/expires_in=([^&]*)/);
           //Access Token
           accessToken = accessTokenHtml[1];
           //Expires
           let expiresIn = Number(expiresInTmp[1]);
           //console.log('the access token is: ', accessToken);
          // console.log('expires in: ', expiresIn, ' seg.');

           window.setTimeout(() => accessToken = '', expiresIn * 1000);
           window.history.pushState('Access Token', null, '/');;
           return accessToken;

    }
    else{
      //https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=REDIRECT_URI
      let spotifyUrl=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      window.location= spotifyUrl
    //  console.log(spotifyUrl)
    }
  },
  search(searchTerm){
     const accessToken = Spotify.getAccessToken();
     return fetch(`${searchBase}search?type=track&q=${searchTerm}`,{
         headers: {Authorization: `Bearer ${accessToken}`}
     }).then((response) => {
         return response.json();
     }).then((jsonResponse) => {
         if (!jsonResponse.tracks) {
             return [];
         }else{
             //console.log(jsonResponse.tracks);
             return jsonResponse.tracks.items.map(track =>({
                 id: track.id,
                 name: track.name,
                 artist: track.artists[0].name,
                 album: track.album.name,
                 uri: track.uri

                 })
             );
         }
     })
 },
 savePlaylist(name, trackUris) {
    const accessToken = Spotify.getAccessToken();
    if (!name || !trackUris || trackUris.length === 0) return;
    const searchURL = `${searchBase}me`;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userID;
    let playlistID;
    fetch(searchURL, {
      headers: headers
    })
    .then(response => response.json())
    .then(jsonResponse => userID = jsonResponse.id)
    .then(() => {
      const createPlaylistUrl = `${searchBase}users/${userID}/playlists`;
      fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
          name: name
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistID = jsonResponse.id)
        .then(() => {
          const addPlaylistTracksUrl = `${searchBase}users/${userID}/playlists/${playlistID}/tracks`;
          fetch(addPlaylistTracksUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
            uris: trackUris
            })
          });
        })
    })
  }
};

export default Spotify;
