# Spotify web app

Small project to practice ReactJS and NodeJS, using Spotify´s API.
It contains a login feateure, search songs feature and sidebar displaying the user´s playlists.

## Libraries

### `axios`

Chosen library to connect to TMDB APIs, as it requires little setup and it is pretty straightforward.\
Implementation can be found in the [`api.js` file.](./src/services/api.js)

### `spotify-web-api-node` (app & server dependency)

Chosen to deal with tokens, load albums, search artists and music

### `react-spotify-web-playback`
Built in web-player designed to work with spotify´s tokens.

# Available Scripts

`yarn start`: Runs the app in the development mode @ [http://localhost:3000](http://localhost:3000).

`yarn test`: Launches the test runner in the interactive watch mode.

`yarn build`: Builds the app for production to the `build` folder.

## Server 

`yarn start`: Runs the **NodeJS** server that retrieves the necessary tokens @ [http://localhost:3001](http://localhost:3001).
