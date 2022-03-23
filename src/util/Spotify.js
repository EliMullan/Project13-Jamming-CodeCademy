
var accessToken;
const clientID = '';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
 /* START - Stept 74 - Get a Spotify user’s access token */
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch & expiresInMatch) {
            accessToken = accessTokenMatch[1]; 
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
            console.log(accessUrl);
        }
        
      },
    /* END - Stept 74 - Get a Spotify user’s access token */

    /* START - Step 84  - Send a search request to the Spotify API*/
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
          })
        .then((response) => { 
           return response.json();
            })
            .then((jsonResponse) => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                URI: track.uri
            }));
        });
    }
/* END - Step  - Send a search request to the Spotify API*/
}


export {Spotify};