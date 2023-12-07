import React, { useState } from 'react';
import { BookingComponent } from "./DataComponents/Bookings";
import { ClassComponent } from "./DataComponents/Classes";
import { ClientComponent } from "./DataComponents/Clients";
import { InstructorComponent } from "./DataComponents/Instructors";
import { RoomComponent } from "./DataComponents/Rooms";
import { StaffComponent } from "./DataComponents/Staff";
import { StudentComponent } from "./DataComponents/Students";
import { TransactionComponent } from "./DataComponents/Transactions";
import { Hud } from "./Hud";

import companyLogo from "../assets/img/YMDLogo.png";

export function AuthPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // For now, just loging the inputs to the console
        console.log('Username:', userName);
        console.log('Password:', password);

        // Update login status
        setLoggedIn(true);

        // Clear username and password fields
        setUserName('');
        setPassword('');
    };

    const handleLogout = () => {
        // Perform logout actions, e.g., reset state, clear session, etc.
        setLoggedIn(false);
    };

    return (
        <>
            
            {!loggedIn && (
                <div style={{width: '100%', paddingLeft: '20%'}}>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="input-field"
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleLogin} className='custom-btn'>Login</button>
                </div>
            )}

            {loggedIn && (
                <>
                    <Hud onLogout={handleLogout} />
                    <BookingComponent />
                    <StaffComponent />
                    <ClassComponent />
                    <ClientComponent />
                    <InstructorComponent />
                    <RoomComponent />
                    <StudentComponent />
                    <TransactionComponent />
                </>
            )}
        </>
    );
}
