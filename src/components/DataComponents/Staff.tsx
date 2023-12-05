import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { staffMap, staffStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Staff } from "../../Resources/GlobalInterfaces";



export function StaffComponent() {
    const [m, setMap] = useAtom(staffMap);
    const [status, setStatus] = useAtom(staffStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('staff');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Staff;
                    tempMap.set(um.SortKey, um);
                }
                console.log("Staff Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("Staff initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}