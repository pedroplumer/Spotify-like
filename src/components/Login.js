import React from 'react';
import {Container} from 'react-bootstrap';


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-playback-state";

const Login = () => {

    return (
        <Container>
            <a className="btn btn-success btn-large" href={AUTH_URL}>LOGIN TO SPOTIFY</a>
        </Container>
      
    )

}

export default Login;