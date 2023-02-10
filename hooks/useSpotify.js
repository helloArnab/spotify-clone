import { signIn,useSession } from "next-auth/react"
import { useEffect } from "react"
import spotifyApi from "../lib/Spotify"

function useSpotify(){
    const {data:session,status} = useSession()

    useEffect(() => {
        if(session){
            // If refresh access token attemt to fail, direct user to login..
            if(session.error === "RefreshAccessTokenError"){
                signIn()
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    },[session])

    return spotifyApi
}

export default useSpotify