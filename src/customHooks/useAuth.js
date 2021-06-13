import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect( async () => {
        try{
            let tokens = await axios.post('http://localhost:3001/login',{code});
            setAccessToken(tokens.data.accessToken)
            setRefreshToken(tokens.data.refreshToken)
            setExpiresIn(tokens.data.expiresIn)
            window.history.pushState({}, null, '/')
        }
        catch(err){
            window.location= '/'
        }
    },[code])

    useEffect( async () => {
        if(!refreshToken || !expiresIn) return
        const refreshInterval = setInterval( async () => {
            try{
                let tokens = await axios.post('http://localhost:3001/refresh', {
                    refreshToken
                })
                setAccessToken(tokens.data.accessToken)
                setExpiresIn(tokens.data.expiresIn)
            }
            catch(err){
                window.location= '/'
            }
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(refreshInterval);
    }, [refreshToken, expiresIn])
    
    return accessToken;
}

export default useAuth;