import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { bookingMap, bookingStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Booking } from "../../Resources/GlobalInterfaces";



export function BookingComponent() {
    const [m, setMap] = useAtom(bookingMap);
    const [status, setStatus] = useAtom(bookingStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('bookings');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Booking;
                    tempMap.set(um.SortKey, um);
                }
                console.log("booking Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("booking initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}