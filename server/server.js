const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();


app.post('/login',  async (req, res) => {
    const code = req.body.code;
    const SpotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '8b945ef10ea24755b83ac50cede405a0',
        clientSecret: '9f1015dea58a431aafe95634f6649601'
    })

    let data = await SpotifyApi.authorizationCodeGrant(code);
    let tokens = {
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
    }


})