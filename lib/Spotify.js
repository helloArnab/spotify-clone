import SpotifyWebApi from "spotify-web-api-node";



const scopes =[
    "ugc-image-upload",
    "user-read-playback-state",
    "app-remote-control",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-follow-modify",
    "playlist-read-collaborative",
    "user-follow-read",
    "user-read-currently-playing",
    "user-read-playback-position",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-read-email",
    "user-top-read",
    "streaming",
    "user-read-recently-played",
    "user-read-private",
    "user-library-read",
].join(",")


const params={
    scope:scopes,
}

const queryParamString = new URLSearchParams(params)

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi

export {LOGIN_URL}