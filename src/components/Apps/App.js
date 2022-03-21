import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults : [
      { id: 1, name: 'mama1', artist: 'mama1', album: 'mama1'},
      { id: 2, name: 'mama2', artist: 'mama2', album: 'mama2'},
      { id: 3 , name: 'mama3', artist: 'mama3', album: 'mama3'} 
    ],
    
      playlistName: 'mama',

      playlistTracks: [
        { id: 4, name: 'mama4', artist: 'mama4', album: 'mama4'},
        { id: 5, name: 'mama5', artist: 'mama5', album: 'mama5'},
        { id: 6, name: 'mama6', artist: 'mama6', album: 'mama6'}
      ]
    };
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);   
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return; 
    }
      tracks.push(track);
      this.setState({playlistTracks: tracks});  
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((savedTrack)=> savedTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">

  {/* inserted HTML for app JS - given by codecademy*/}
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
         <SearchResults 
         searchResults={this.state.searchResults}
         onAdd={this.addTrack} 
         />
          <Playlist 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack} 
           />
        </div>
      </div>
    </div>
{/* end of inserted HTML for app JS */}
    
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
 }
}

export default App;
