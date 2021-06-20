import React, {useState, useEffect} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import useAuth from '../customHooks/useAuth';
import spotifyWebApi from 'spotify-web-api-node';
import {CLIENT_ID} from '../api/Constants';
import Track from './Track';
import Player from './Player';
import axios from 'axios';

const spotifyApi = new spotifyWebApi({
    clientId: CLIENT_ID
});

const Dashboard = ({code}) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [lyrics, setLyrics] = useState('')
    const [playlists, setPlaylists] = useState([]);
    
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
                let smallestAlbumImage = getSmallestAlbumImage(track);
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
    
    useEffect( async () => {
        if(!selectedTrack) return 
        
        let res = await axios.get('http://localhost:3001/lyrics', {
            params: {
                track: selectedTrack.title,
                artist: selectedTrack.artist
            }
        })
        
        setLyrics(res.data.lyrics)
        
    }, [selectedTrack])
    
    const handleTrackSelect = (track) => {
        setSelectedTrack(track);
        setSearch('');
        setLyrics('')
    }
    
    const getSmallestAlbumImage = (track) => {
        return track.album.images.reduce((smallest,image) => {
            if(image.height < smallest.height) return image
            return smallest
        }, track.album.images[0])
    }

    const loadPlaylists = async () => {
        let data = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        setPlaylists(data.data.items)
    }

    const loadPlaylist = async (tracks) => {
        let data = await axios.get(tracks.href, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        let trackList = data.data.items.map((item) => {
            let smallestAlbumImage = getSmallestAlbumImage(item.track);
            let formattedArtist = item.track.artists.map((artist) => {return artist.name}).join(", ");
            return {
                artist: formattedArtist,
                title: item.track.name,
                uri: item.track.uri,
                albumUrl: smallestAlbumImage.url
            }});

        
        setSearchResults(trackList)
    }
    return(
        <Container className="d-flex flex-row py-2">
            <div className="py-2">
                <Button onClick={loadPlaylists} variant="outline-success">Playlists</Button>
                {playlists ? playlists.map((playlist) => <div style={{cursor: "pointer"}} onClick={() => loadPlaylist(playlist.tracks)}>{playlist.name}</div>) : <div>nope</div>}
            </div>
            <Container className="d-flex flex-column py-2" style={{height: '100vh'}}>
                <Form.Control type='search' placeholder='Search songs/Artists' value={search} 
                onChange={e => setSearch(e.target.value)}/>
                <div className="flex-grow-1 my-2" style={{ overflowY: 'auto'}}>
                    {searchResults.map(track => (
                        <Track track={track} id={track.uri} handleTrackSelect={handleTrackSelect}/>
                    ))}
                    {searchResults.length === 0 && (
                        <div className="text-center" style={{ whiteSpace: 'pre'}}> 
                            {lyrics}
                        </div>
                    )}
                </div>
                <div><Player accessToken={accessToken} trackUri={selectedTrack?.uri}/></div>
            </Container>
        </Container>
    )
}

export default Dashboard;