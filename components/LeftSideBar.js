import {HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon,RssIcon} from "@heroicons/react/outline"
import {HeartIcon} from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useSpotify from "../hooks/useSpotify"
import {useRecoilState} from "recoil"
import {playlistIdState} from "../atoms/playlistAtom"


function LeftSideBar(){
    const {data:session,status} = useSession()
    const spotifyApi = useSpotify()
    const [playlists,setPlaylists] = useState([])
    const [playlistId,setPlaylistId] = useRecoilState(playlistIdState)


    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    },[session,spotifyApi])

    console.log(playlists)

    return (
        <div>

            <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900  h-screen sm:m-w-[12rem] lg:max-w-[15rem] hidden md:inline-block pb-36">

                <img className="w-36 mt-5 mb-5 cursor-pointer" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="spotify"/>

                <div className="space-y-4 h-screen  overflow-y-scroll scrollbar-hide">

                    <button className="flex items-center space-x-2 hover:text-white">
                        <HomeIcon className="h-5 w-5 flex"/>
                        <p>Home</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <SearchIcon className="h-5 w-5"/>
                        <p>Search</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <LibraryIcon className="h-5 w-5"/>
                        <p>Library</p>
                    </button>
                    <hr className="border-t-[0.1px] border-gray-900"/>

                    <button className="flex items-center space-x-2 hover:text-white">
                        <PlusCircleIcon className="h-5 w-5 flex"/>
                        <p>Create Playlist</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <HeartIcon className="h-5 w-5 text-blue-500"/>
                        <p>Liked Song</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <RssIcon className="h-5 w-5 text-green-500"/>
                        <p>Your episodes</p>
                    </button>
                    <hr className="border-t-[0.1px] border-gray-900"/>

                    {/* playlists */}
                    {playlists.map((playlist) => (
                        <p key={playlist.id} onClick={() => (setPlaylistId(playlist.id))} className="cursor-pointer hover:text-white">{playlist.name}</p>
                    ))}
                    
                </div>
            </div>

        </div>
    )
}

export default LeftSideBar