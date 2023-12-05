import { useEffect } from "react"
import { Retrieve } from "../../Resources/GlobalFunctions";
import { transactionMap, transactionStatus } from "../../Resources/GlobalStates";
import { useAtom } from "jotai";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Transaction } from "../../Resources/GlobalInterfaces";



export function TransactionComponent() {
    const [m, setMap] = useAtom(transactionMap);
    const [status, setStatus] = useAtom(transactionStatus);

    useEffect(() => {
        if(!status) {
            (async() => {
                const data = await Retrieve('transactions');
                const tempMap = new Map(m);
                for(const item of data) {
                    const um = unmarshall(item) as Transaction;
                    tempMap.set(um.SortKey, um);
                }
                console.log("transaction Data:", tempMap);
                setMap(tempMap);
            })().then(() => {
                console.log("transaction initialized.");
                setStatus(true);
            });
        }
    }, []);

    return(<></>);
}