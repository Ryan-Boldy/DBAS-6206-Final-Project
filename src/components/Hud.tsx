import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { activeTab } from "../Resources/GlobalStates";
import Home from "./Home";
import Calendar from "./Calendar";
import Financials from "./Financials";
import Contact from "./Contact";
import Profiles from "./Profiles";

export function Hud() {

    const tabs = ["Home", "Calendar", "Financials", "Profiles", "Contact"];

    const [tab, setTab] = useAtom(activeTab);

    const tabClick = useCallback((event: any) => {
        setTab(event.target.id);
    }, []);

    //Default to home.
    let page: JSX.Element = <Home />;
    switch(tab) {
        case "Calendar":
            page = <Calendar />;
            break;
        case "Financials":
            page = <Financials />;
            break;
        case "Profiles":
            page = <Profiles />;
            break;
        case "Contact":
            page = <Contact />;
    }
    console.log("Rending tab", tab);
    return(
        <>
            <div>
                {tabs.map((t) => {
                    return <button id={t} key={t} onClick={tabClick}>{t}</button>
                })}
            </div>
            {page}
        </>
    );

}