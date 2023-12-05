import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { clientMap, clientStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Client } from "../../Resources/GlobalInterfaces";



export function ClientComponent() {
    const [m, setMap] = useAtom(clientMap);
    const [status, setStatus] = useAtom(clientStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('clients');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Client;
                    tempMap.set(um.SortKey, um);
                }
                console.log("client Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("client initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}