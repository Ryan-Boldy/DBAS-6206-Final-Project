import React, { useEffect, useState, useMemo, ChangeEvent, FormEvent } from "react";
import { classMap, roomMap, bookingMap, instructorMap, user } from '../Resources/GlobalStates';
import { useAtom } from 'jotai';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import DatePicker from 'react-datepicker';
import { EventApi } from "@fullcalendar/core/index.js";
import { v4 as uuidv4 } from 'uuid';
import { Booking } from "../Resources/GlobalInterfaces";

export default function Calendar() {
    const [formData, setFormData] = useState({
        class: '',
        room: '',
        date: '',
        stime: '',
        etime: '',
    });
    const [auth] = useAtom(user);
    const [bookings, setBookings] = useState<string[]>([]);
    const [instructorData] = useAtom(instructorMap);
    const [classDropdownOptions, setClassDropdownOptions] = useState<string[]>([]);
    const [classDropDownNames, setClassDropDownNames] = useState<string[]>([]);
    const [roomDropdownOptions, setRoomDropdownOptions] = useState<string[]>([]);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [bookingData, setBookingData] = useAtom(bookingMap);
    const [classData, setClassData] = useAtom(classMap);
    const [roomData, setRoomData] = useAtom(roomMap);
    const [hoveredEvent, setHoveredEvent] = useState<any>(null);


    const bookingArray = useMemo(() => Array.from(bookingData.values()), [bookingData]);
    const classArray = useMemo(() => Array.from(classData.values()), [classData]);
    const roomArray = useMemo(() => Array.from(roomData.values()), [roomData]);
    
    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const booking = bookingArray.map((bookingObj) => bookingObj.SortKey);
            setBookings(booking);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchBookings();
    }, [bookingArray]);

    const handleEventMouseEnter = (info: {event: EventApi}) => {
        setHoveredEvent(info.event);
      };
    
    useEffect(() => {
        // Fetch classes from the database
        // Assuming classData is an array of class objects with a property 'sortkey'
        const classes = classArray.map((classObj) => classObj.SortKey);
        const classNames = classArray.map((classObj) => classObj.clName);
        setClassDropdownOptions(classes);
        setClassDropDownNames(classNames);
      }, [classArray]);
      useEffect(() => {
        // Fetch rooms from the database
        // Assuming classData is an array of class objects with a property 'sortkey'
        const rooms = roomArray.map((roomObj) => roomObj.SortKey);
        setRoomDropdownOptions(rooms);
      }, [classArray]);


      const handleClassChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleRoomChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };  
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Implement your logic to handle form submission, e.g., sending data to a server
        try {
            const time = new Date(`${formData.date}T${formData.etime}`).toISOString();
            const b = {
                PartitionKey: "/bookings",
                SortKey: uuidv4(),
                bkTime: time,
                Author: auth,
                bkNotes: "",
                bkRoom: formData.room,
                bkClass: formData.class,
            }
            console.log(b);
            const response = await fetch(`${import.meta.env.VITE_URL}bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(b),
            });

            if (response.ok) {
                console.log('Form data submitted successfully');
                // Clear the form after successful submission
                setFormData({
                    class: '',
                    room: '',
                    date: '',
                    stime: '',
                    etime: '',
                });
                const bkMap = new Map(bookingData);
                bkMap.set(b.SortKey, b as Booking);
                setBookingData(bkMap);
            } else {
                console.error('Error submitting form data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px', marginLeft: '20%', width: '1000px', paddingTop: "5%"}}>
        <div style={{ display: 'flex', width: 'max-content'}}>

            {/* Right half - Contact Form */}
            <div style={{ flex: 1 }}>
                {/* Form */}
                <form style={{ display: 'flex', flexDirection: 'column', marginTop: "30%" }} onSubmit={handleSubmit}>

                    {/* Class dropdown input */}
                    <select
                        id="class"
                        name="class"
                        value={formData.class}
                        onChange={handleClassChange}
                        required
                        className="input-field"
                    >
                        <option value="" disabled>Select a Class</option>
                        {classDropdownOptions.map((className, index) => (
                        <option key={className} value={className}>
                            {classDropDownNames[index]}
                        </option>
                        ))}
                    </select>


                    {/* Room dropdown input */}
                    <select
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleRoomChange}
                        required
                        className="input-field"
                    >
                        <option value="" disabled>Select a Room</option>
                        {roomDropdownOptions.map((roomName, index) => (
                        <option key={index} value={roomName}>
                            {roomName}
                        </option>
                        ))}
                    </select>

                    {/* Date picker input. This needs to have a time picker as well as the date */}
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        required
                        placeholder="Select a date"
                        className="input-field"
                    />

                    {/* End Time input */}
                    <input
                        type="time"
                        id="etime"
                        name="etime"
                        value={formData.etime}
                        onChange={handleTimeChange}
                        required
                        placeholder="End Time"
                        className="input-field"
                    />
                    {/* Submit button */}
                    <button className="custom-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
        <div style={{ flex: 1, textAlign: 'left', marginRight: '10%', paddingTop: '10%'}}>
            <div className="calendar-container" style={{ width: 1250, height: 1250, paddingLeft: "5%"}}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    // NEED: SET UP EVENT BOOKING
                    events={bookingArray.map((booking) => ({title: classData.get(booking.bkClass)?.clName, description: booking.bkRoom, instructor: (() => {const res = instructorData.get(classData.get(booking.bkClass)?.classInstructor as string); return `${res?.inFirstName} ${res?.inLastName}`})(), start: booking.bkTime, end: new Date(new Date(booking.bkTime).getTime()+3600*1000).toISOString()}) as any)}
                    eventClick={handleEventMouseEnter} // Handle event mouse enter
                />
            </div>
        </div>
        {hoveredEvent && (
        <div
          style={{
            position: 'absolute',
            top: '60%', // Adjust the percentage as needed
            left: '50%', // Adjust the percentage as needed
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            padding: '5px',
            background: '#fff',
          }}
        >
          <strong>Class Name: {hoveredEvent.title}</strong>
          <p>Room: {hoveredEvent.extendedProps?.description}</p>
          <p>Instructor: {hoveredEvent.extendedProps?.instructor}</p>

        </div>
      )}
    </div>
  );
}
