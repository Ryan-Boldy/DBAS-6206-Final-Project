import React, { useEffect, useState, useMemo, ChangeEvent, FormEvent } from "react";
import { classMap, roomMap } from '../Resources/GlobalStates';
import { useAtom } from 'jotai';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
    const [formData, setFormData] = useState({
        class: '',
        room: '',
        date: '',
        stime: '',
        etime: '',
    });
    
    const [classDropdownOptions, setClassDropdownOptions] = useState<string[]>([]);
    const [roomDropdownOptions, setRoomDropdownOptions] = useState<string[]>([]);
    const [classData, setClassData] = useAtom(classMap);
    const [roomData, setRoomData] = useAtom(roomMap);
    const classArray = useMemo(() => Array.from(classData.values()), [classData]);
    const roomArray = useMemo(() => Array.from(roomData.values()), [roomData]);
    useEffect(() => {
        // Fetch classes from the database
        // Assuming classData is an array of class objects with a property 'sortkey'
        const classes = classArray.map((classObj) => classObj.SortKey);
        setClassDropdownOptions(classes);
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
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
            } else {
                console.error('Error submitting form data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px', marginLeft: '20%', width: '100%'}}>
        <div style={{ display: 'flex', width: 'max-content'}}>
            <div style={{ flex: 1, textAlign: 'left', marginRight: '10%' }}>
                <div className="calendar-container" style={{ width: '100%'}}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        //events={events}
                    />
                </div>
            </div>

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
                        <option key={index} value={className}>
                            {className}
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

                    {/* Date picker input */}
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        placeholder="Select a date"
                        className="input-field"
                    />

                    {/* Start Time input */}
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.stime}
                        onChange={handleChange}
                        required
                        placeholder="Start Time"
                        className="input-field"
                    />

                    {/* End Time input */}
                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.etime}
                        onChange={handleChange}
                        required
                        placeholder="End Time"
                        className="input-field"
                    />
                    {/* Submit button */}
                    <button className="custom-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
  );
}
