import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {AUTH_URL, CLIENT_ID, RESPONSE_TYPE, REDIRECT_URI, SCOPES} from '../api/Constants';


const Login = () => {
    
    const [authUrl, setAuthUrl] = useState("");

    useEffect(() => {
         let urlWithClientId = AUTH_URL.concat("client_id=", CLIENT_ID )
         let urlWithResponseType =  urlWithClientId.concat("&response_type=", RESPONSE_TYPE)
         let urlWithRedirectUri =  urlWithResponseType.concat("&redirect_uri=", REDIRECT_URI)
         let urlWithScope =  urlWithRedirectUri.concat("&scope=", SCOPES.join("%20"))
         setAuthUrl(urlWithScope);
    },[])
   

    return (
        <Container className="d-flex justify-content-center align-items-center" 
            stlye={{minHeight: "100vh"}}>
            <a className="btn btn-success btn-large" href={authUrl}>LOGIN TO SPOTIFY</a>
        </Container>
      
    )

}

export default Login;