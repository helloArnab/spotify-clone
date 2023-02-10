import { useRecoilState } from "recoil"
import useSpotify from "../hooks/useSpotify"
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom"

function milliesToMiniutesAndSeconds(millis){
    const minutes = Math.floor(millis/60000)
    const seconds = ((millis%60000)/1000).toFixed(0)
    return seconds == 60 ? minutes + 1 + ":00" : minutes+":" + (seconds < 10 ? "0" : "") + seconds
}

function Song({track,order}){
    const spotifyApi = useSpotify()
    const [currrentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)

    const playSong  = () => {
        try {
            setCurrentTrackId(track.track.id)
            setIsPlaying(true)
            spotifyApi.play({
                uris: [track.track.uri],
            })
        } catch (error) {
            console.log("Error while playing"+error)
        }
    }
    

    return (
        <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-4" onClick={playSong}>
                <p>{order+1}</p>
                <img className="h-10 w-10" src={track.track.album.images[0].url} alt=''/>
                <div>
                    <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
                    <p className="w-40">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0" >
                <p className="hidden md:inline w-40">{track.track.album.name}</p>
                <p>{milliesToMiniutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song