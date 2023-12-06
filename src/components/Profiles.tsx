import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions } from 'ag-grid-community';
import React, { useEffect, useMemo, useState } from 'react';
import { classMap, clientMap, instructorMap, roomMap, staffMap, studentMap } from '../Resources/GlobalStates';
import { useAtom } from 'jotai';

interface Profile {
  firstName: string;
  lastName: string;
  profileType: string;
}

// AG Grid column definitions

export default function Profiles() {
  const [profileType, setProfileType] = useState('Staff');

  const [studentData] = useAtom(studentMap);
  const [staffData] = useAtom(staffMap);
  const [roomData] = useAtom(roomMap);
  const [instructorData] = useAtom(instructorMap);
  const [clientData] = useAtom(clientMap);
  const [classData] = useAtom(classMap);


  const instructorArray = useMemo(() => Array.from(instructorData.values()), [instructorData]);
  const staffArray = useMemo(() => Array.from(staffData.values()), [staffData]);
  const roomArray = useMemo(() => Array.from(roomData.values()), [roomData]);
  const studentArray = useMemo(() => Array.from(studentData.values()), [studentData]);
  const clientArray = useMemo(() => Array.from(clientData.values()), [clientData]);
  const classArray = useMemo(() => Array.from(classData.values()), [classData]);

  const inFields = useMemo(() => ['inFirstName', 'inLastName', 'PartitionKey', 'Author', 'inNotes'], []);
  const inHeaders  = useMemo(() => ['First Name', 'Last Name', 'Type', 'Author', 'Notes'], []);

  const stfFields  = useMemo(() => ["staffFirstName", "staffLastName", "PartitionKey", "Author", "SortKey", "staffApproved"], []);
  const stfHeaders = useMemo(() => ['First Name', 'Last Name', 'Type', 'Author', 'ID', 'Approved?'], []);

  const rmFields = useMemo(() => ["SortKey", "rmMax"], []);
  const rmHeaders = useMemo(() => ["Code", "Capacity"], []);

  const claFields = useMemo(() => ["classInstructor", "classNotes", "Author"], []);
  const claHeaders = useMemo(() => ["Instructor", "Notes", "Author"], []);

  const clFields = useMemo(() => [""], []);
  const clHeaders = useMemo(() => [], []);

  const stFields = useMemo(() => [], []);
  const stHeaders = useMemo(() => [], []);


  const [gridOptions, setGridOptions] = useState({
    columnDefs: [] as ColDef[],
    rowData: [] as any[],
  } as GridOptions);
  
  const updateData = (headers: string[], fields: string[], rowData: any[]) => {
    console.log("Grid updating..");
    setGridOptions({
      columnDefs: headers.map((header, index) => ({ headerName: header, field: fields[index] })),
      rowData: rowData,
    });
  };
  

  useEffect(() => {
    console.log("Set to:",profileType);
    switch(profileType) {
      case "Instructors":
        updateData(inHeaders, inFields, instructorArray);
        break;
      case "Clients":
        updateData(clHeaders, clFields, clientArray);
        break;
      case "Students":
        updateData(stHeaders, stFields, studentArray);
        break;
      case "Rooms":
        updateData(rmHeaders, rmFields, roomArray);
        break;
      case "Classes":
        updateData(claHeaders, claFields, classArray);
        break;
      default:
        updateData(stfHeaders, stfFields, staffArray);
        break;
    }
  }, [profileType]);

  useEffect(() => {
    console.log(gridOptions);
  }, [gridOptions])


  // useEffect(() => {
  //   if(array && headers && fields) {
  //     console.log("fields", fields);
  //     console.log("Data", array);
  //     console.log("Headers", headers);
  //     updateData(headers, fields, array);
  //   }
  // }, [headers, fields, array]);

  return (
    <div style={({paddingTop: 250})}>

        <div>
          <select id="profileType" value={profileType} onChange={(e) => setProfileType(e.target.value)} required className="input-field">
            <option value="Staff">Staff</option>
            <option value="Students">Students</option>
            <option value="Clients">Clients</option>
            <option value="Instructors">Instructors</option>
            <option value="Rooms">Rooms</option>
            <option value="Classes">Classes</option>
          </select>
        </div>

      <div className="ag-theme-quartz" style={{ height: 500, width: 1500 }}>
        <AgGridReact
        key={profileType}
          gridOptions={gridOptions}
          domLayout='autoHeight' 
        />
      </div>
    </div>
  );
}
