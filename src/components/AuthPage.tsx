import { useEffect, useRef } from "react";
import { GoogleOAuth } from "./GoogleOAuth";
//import {google} from "googleapis";

const clientID = "183448905797-f5ldvmv4cpomfugb0r0jrga86sviqrdv.apps.googleusercontent.com";
const redirectURI = "http://localhost:5173"
const scope = "https://www.googleapis.com/auth/userinfo.email";
const baseURL = "https://accounts.google.com/o/oauth2/auth"

export function AuthPage() {
    const anchorRef = useRef<HTMLAnchorElement>(null);
    const token = GoogleOAuth();
    useEffect(() => {
        if(anchorRef.current) {
            anchorRef.current.href = `${baseURL}?scope=${scope}&redirect_uri=${redirectURI}&client_id=${clientID}&response_type=token`;
        }
    }, []);

    if(token) {
        return (<><p>Authenticated. Display some components here.</p></>);
    } else {
        return (
            <>
                <a className='auth-button' ref={anchorRef}>Login</a>
            </>
        )

    }
}