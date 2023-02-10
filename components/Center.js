import { ChevronDownIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import {shuffle} from "lodash"
import {useRecoilValue,useRecoilState} from "recoil"
import { playlistIdState,playlistState } from "../atoms/playlistAtom"
import spotifyApi from "../lib/Spotify"
import Songs from "./Songs"

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

function Center(){
    const {data:session} = useSession()
    const [color,setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist,setplaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColor(shuffle(colors).pop())
    },[playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
        .then((data) => {
            setplaylist(data.body)
        }).catch((err) => {
            console.log("Something went wrong!",err)
        });
    },[spotifyApi,playlistId])

    console.log(playlist)

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" onClick={signOut}>
                    <img className="rounded-full w-7 h-7" src={session?.user?.image ?? ''} alt=""/>
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="w-5 h-5"/>
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} text-white p-8 h-72`}>

                <img className="w-44 h-44 shadow-2x" src={playlist?.images?.[0]?.url} alt=""/>
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>

            <div>
                <Songs/>
            </div>
        </div>
    )
}

export default Center