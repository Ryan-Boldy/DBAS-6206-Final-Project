import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import React, { useState } from 'react';

interface Profile {
  firstName: string;
  lastName: string;
  profileType: string;
}

// AG Grid column definitions
const columnDefs: ColDef[] = [
  { headerName: 'First Name', field: 'firstName' },
  { headerName: 'Last Name', field: 'lastName' },
  { headerName: 'Profile Type', field: 'profileType' },
];
export default function Profiles() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileType, setProfileType] = useState('Developer');
  const [profiles, setProfiles] = useState<Array<Profile>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update profiles with new entry
    setProfiles((prevProfiles) => [
      ...prevProfiles,
      {
        firstName,
        lastName,
        profileType,
      },
    ]);

    // Clear form inputs
    setFirstName('');
    setLastName('');
    setProfileType('Developer');
  };

  return (
    <div>
      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <select id="profileType" value={profileType} onChange={(e) => setProfileType(e.target.value)} required className="input-field">
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button className="custom-btn" type="submit">Submit</button>
      </form>

      {/* AG Grid Table */}
      <div className="ag-theme-quartz" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={profiles}
          columnDefs={columnDefs}
          domLayout='autoHeight' // optional, adjusts the height automatically
        />
      </div>
    </div>
  );
}
