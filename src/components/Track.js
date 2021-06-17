import React from 'react';

const Track = ({track, handleTrackSelect}) => {


    const onTrackClick = () => {
        handleTrackSelect(track)
    }

    return(
        <div className="d-flex m-2 align-items-center" style={{cursor: "pointer"}} onClick={onTrackClick}>
            <img src={track.albumUrl} style={{height: "64px", width: "64px"}}/>
            <div className="m-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}

export default Track;