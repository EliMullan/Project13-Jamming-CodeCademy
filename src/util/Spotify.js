
var accessToken;
const clientID = 'f09e6689c43c47298a42bb8e36555809';
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
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
      },
    /* END - Stept 74 - Get a Spotify user’s access token */

    /* START - Step  - Send a search request to the Spotify API*/
    search(searchTerm) {
        return fetch('https://api.spotify.com/v1/search?type=TRACK&q=' + searchTerm, {headers: {Authorisation: "Bearer" + accessToken}})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('request failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                URI: track.uri
            }));
        });
    }
}


export {Spotify};