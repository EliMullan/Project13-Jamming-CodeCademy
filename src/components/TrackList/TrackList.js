import React from 'react';
import { Track } from '../Track/Track';
import './TrackList.css';


export class TrackList extends React.Component {
    render() {
        return(
            <div className="TrackList" >
    {/* You will add a map method that renders a set of Track components */}
            {this.props.tracks.map(track =>               
                <Track 
                    track={track}                    
                    key={track.id}
                    name={track.name}
                    artist={track.artist}
                    album={track.album} 
                    onAdd={this.props.onAdd}  
                    isRemoval={this.props.isRemoval}  
                    onRemove={this.props.onRemove}                                                        
                />
            )}
            </div>
        )
    }
}

