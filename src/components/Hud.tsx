import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { activeTab } from "../Resources/GlobalStates";
import Home from "./Home";
import Calendar from "./Calendar";
import Contact from "./Contact";
import Profiles from "./Profiles";

import companyLogo from "../assets/img/YMDLogo.png";

interface HudProps {
    onLogout: () => void;
}
export function Hud({ onLogout }: HudProps) {

    const tabs = ["Home", "Calendar", "Profiles", "Contact"];

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
        case "Profiles":
            page = <Profiles />;
            break;
        case "Contact":
            page = <Contact />;
    }
    console.log("Rending tab", tab);
    return(
        <>
            <div className="navbar">
                <img src={companyLogo} alt="Company Logo" className="company-logo" />
                <h1 className="spacer">Your Music Depot</h1>
                <div className="tab-container">
                    {tabs.map((t) => (
                        <button className="navbar-btn" id={t} key={t} onClick={tabClick}>
                        {t}
                        </button>
                    ))}
                    {onLogout && (
                        <button className="navbar-btn" onClick={onLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
            {page}
        </>
    );

}