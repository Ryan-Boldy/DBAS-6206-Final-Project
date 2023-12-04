import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { bookingMap, bookingStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";


export function Booking() {
    const [bkMap, setBkMap] = useAtom(bookingMap);
    const [bkStatus, setBkStatus] = useAtom(bookingStatus);

    useEffect(() => {
        if(!bkStatus) {
            (async() => {
                const res = await (await Retrieve("bookings")).json();
            })().then(() => {
                setBkStatus(true);
            });
        }
    }, []);

    return(<></>);
}