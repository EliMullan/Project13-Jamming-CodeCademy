
let accessToken;
const clientID = 'f09e6689c43c47298a42bb8e36555809';
const redirectURI = 'http://localhost:3000';

const Spotify = {
 // Stept 74 - Get a Spotify user’s access token 
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } 
        //Check for access toke match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]; 
            const expiresIn = Number(expiresInMatch[1]);
            //This clears out the parameters
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
      },
    

    // Step 84  - Send a search request to the Spotify API*
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}` , {
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
                artists: track.artists[0].name,
                album: track.album.name,
                URI: track.uri
            }));
        });
    },

    savePlaylist(name, trackURIs) {
        if(!name || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userID;
        return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST', 
                body: JSON.stringify({name: name})
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                });
            });
        });
    }
}


export default Spotify;