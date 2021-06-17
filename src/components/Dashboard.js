import React, {useState, useEffect} from 'react';
import {Container, Form} from 'react-bootstrap';
import useAuth from '../customHooks/useAuth';
import spotifyWebApi from 'spotify-web-api-node';
import {CLIENT_ID} from '../api/Constants';
import Track from './Track';
import Player from './Player';

const spotifyApi = new spotifyWebApi({
    clientId: CLIENT_ID
});

const Dashboard = ({code}) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const handleTrackSelect = (track) => {
        setSelectedTrack(track);
    }
    

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect( async () =>  {
        if(!search) return setSearchResults([])
        if(!accessToken) return;
        let cancel = false;
        try{
            if(cancel) return
            let data = await spotifyApi.searchTracks(search);
            let tracks = data.body.tracks.items;
            let formattedTracks = tracks.map((track) => {
                const smallestAlbumImage = track.album.images.reduce((smallest,image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])
                
                let formattedArtist = track.artists.map((artist) => {return artist.name}).join(", ");
                
                return {
                    artist: formattedArtist,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            })
            
            setSearchResults(formattedTracks);
        }
        catch(err){
            console.log(err)
        }
        return () => cancel = true
    },[search, accessToken])

    return(
        <Container className="d-flex flex-column py-2" style={{height: '100vh'}}>
            <Form.Control type='search' placeholder='Search songs/Artists' value={search} 
            onChange={e => setSearch(e.target.value)}/>
            <div className="flex-grow-1 my-2" style={{ overflowY: 'auto'}}>
                {searchResults.map(track => (
                    <Track track={track} id={track.uri} handleTrackSelect={handleTrackSelect}/>
                ))}
            </div>
            <div><Player accessToken={accessToken} trackUri={selectedTrack?.uri}/></div>
        </Container>
    )
}

export default Dashboard;