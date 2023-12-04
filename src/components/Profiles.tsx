import React, { useState } from 'react';

interface Profile {
  firstName: string;
  lastName: string;
  profileType: string;
}

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

      {/* Profiles Table */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Profile Type</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={index}>
              <td>{profile.firstName}</td>
              <td>{profile.lastName}</td>
              <td>{profile.profileType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
