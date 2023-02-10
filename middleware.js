import { request } from "http";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    // Token will exist if user is logged in
    const token = await getToken({req, secret:process.env.JWT_SECRET});

    const {pathname} = req.nextUrl

    if(pathname.startsWith("/_next")){
        return NextResponse.next()
    }

    // Allow the request if the following is true...
    // 1. Its a request for next-auth session & provider fetching
    // 2. the token exists

    if(pathname.includes("/api/auth") || token){
        return NextResponse.next()
    }

    // Redirect them to login if they dont have token and are requesting a protected route
    if(!token && pathname !== "/login"){
        const loginUrl = new URL("/login",req.url)
        return NextResponse.redirect(loginUrl)
    }
}