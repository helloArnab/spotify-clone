import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi,{ LOGIN_URL } from "../../../lib/Spotify"

async function refreshAccessToken(token){
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const {body:refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("Refresh token is: ",refreshedToken)

        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hr as 3600 returns from spotify API
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        }


    } catch (error) {
        console.error(error)

        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages:{
        signIn: '/login'
    },
    callbacks: {
        async jwt({token,account,user}){

            //Initial sign in
            if(account && user){
                return {
                    ...token,
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at * 1000,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                }
            }

            // Return previous token if the access token has not expired yet
            if(Date.now() < token.accessTokenExpires){
                console.log("Access token expired")
                return token
            }

            // Access token has expired, try to update it
            console.log("access token expired, refreshing...")
            return await refreshAccessToken(token)
        },

        async session({session,token}){
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username

            return session
        }
    }
})