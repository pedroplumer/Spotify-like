import React from 'react';

const Track = ({track, id}) => {

    return(
        <div className="d-flex m-2 align-items-cener">
            <img src={track.albumUrl} style={{height: '64px', width: '64px'}}/>
        </div>
    )
}

export default Track;