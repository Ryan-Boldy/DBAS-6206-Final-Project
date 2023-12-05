import { BookingComponent } from "./DataComponents/Bookings";
import { ClassComponent } from "./DataComponents/Classes";
import { ClientComponent } from "./DataComponents/Clients";
import { InstructorComponent } from "./DataComponents/Instructors";
import { RoomComponent } from "./DataComponents/Rooms";
import { StaffComponent } from "./DataComponents/Staff";
import { StudentComponent } from "./DataComponents/Students";
import { TransactionComponent } from "./DataComponents/Transactions";
import { Hud } from "./Hud";

export function AuthPage() {
    
    return(
        <>
            <Hud />
            <BookingComponent />
            <StaffComponent />
            <ClassComponent />
            <ClientComponent />
            <InstructorComponent />
            <RoomComponent />
            <StudentComponent />
            <TransactionComponent />
        </>
    )
}