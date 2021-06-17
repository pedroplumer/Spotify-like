const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');
const lyricsFinder = require('lyrics-finder');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const REDIRECT_URI = 'http://localhost:3000';
const CLIENT_ID = '8f340a62ffa247d0a60d2e4d829a73f9';
const CLIENT_SECRET = '9f1015dea58a431aafe95634f6649601';

app.post('/login',  async (req, res) => {
    const code = req.body.code;
    const SpotifyApi = new SpotifyWebApi({
        redirectUri: REDIRECT_URI,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
    })
    try{
        let data = await SpotifyApi.authorizationCodeGrant(code);
        let tokens = {
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        }
        res.json(tokens);
    }
    catch (err) {
        console.log(err)
    }
    
})

app.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: REDIRECT_URI,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken
    })

    try{
        let data = await spotifyApi.refreshAccessToken();
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        })
    }catch (err) {
        console.log(err);
        res.sendStatus(400);
    }

})

app.get('/lyrics', async (req,res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No lyrics found"
    res.json({lyrics})
})

app.listen(3001);