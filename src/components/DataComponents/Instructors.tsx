import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { instructorMap, instructorStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Instructor } from "../../Resources/GlobalInterfaces";



export function InstructorComponent() {
    const [m, setMap] = useAtom(instructorMap);
    const [status, setStatus] = useAtom(instructorStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('instructors');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Instructor;
                    tempMap.set(um.SortKey, um);
                }
                console.log("instructor Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("instructor initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}