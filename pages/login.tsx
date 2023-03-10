import {getProviders,signIn} from "next-auth/react" 

function Login({providers}:any) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen justify-center">
            <img className="w-80 mb-5" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="spotify"/>

            {providers && !!Object.keys(providers).length && Object.values(providers).map((provider:any) => (
                <div key={provider.name}>
                    <button className="bg-[#18D860] text-white p-5 rounded-full" 
                    onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
                        Login with {provider.name}
                    </button>
                </div>
            ))}


        </div>
    )
}

export default Login;

export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}