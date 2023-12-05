import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { roomMap, roomStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Room } from "../../Resources/GlobalInterfaces";



export function RoomComponent() {
    const [m, setMap] = useAtom(roomMap);
    const [status, setStatus] = useAtom(roomStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('rooms');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Room;
                    tempMap.set(um.SortKey, um);
                }
                console.log("room Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("room initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}