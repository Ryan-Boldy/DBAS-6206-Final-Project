import { useAtom } from "jotai";
import { authToken } from "../Resources/GlobalStates";
import { useEffect } from "react";
import queryString from 'query-string';


export function GoogleOAuth() {
    const [token, setToken] = useAtom(authToken);

    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { hash } = window.location;
            if (!token && hash) {
            console.log(hash);
            const parsedHash = queryString.parse(hash);
            console.log(parsedHash);
            // Our access token lives in the `access_token` variable in the hash
            parsedHash['access_token'] && setToken(parsedHash['access_token'] as string);
            
            // Clear any items from the hash that were provided by implicit grant flow
            [
              'access_token',
              'token_type',
              'expires_in',
              'refresh_token',
              'refresh_token_expires_in'
            ].forEach((key) => Reflect.deleteProperty(parsedHash, key));
            window.location.hash = queryString.stringify(parsedHash);
          }
      }
    }, [token]);

    return token;
}