import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { classMap, classStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Class } from "../../Resources/GlobalInterfaces";



export function ClassComponent() {
    const [m, setMap] = useAtom(classMap);
    const [status, setStatus] = useAtom(classStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('class');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Class;
                    tempMap.set(um.SortKey, um);
                }
                console.log("class Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("class initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}