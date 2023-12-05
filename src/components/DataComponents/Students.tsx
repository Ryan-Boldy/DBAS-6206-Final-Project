import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { studentMap, studentStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Student } from "../../Resources/GlobalInterfaces";



export function StudentComponent() {
    const [m, setMap] = useAtom(studentMap);
    const [status, setStatus] = useAtom(studentStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('students');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Student;
                    tempMap.set(um.SortKey, um);
                }
                console.log("student Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("student initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}