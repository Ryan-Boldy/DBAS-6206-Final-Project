import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions } from 'ag-grid-community';
import { useEffect, useMemo, useState } from 'react';
import { classMap, clientMap, instructorMap, roomMap, staffMap, studentMap } from '../Resources/GlobalStates';
import { useAtom } from 'jotai';


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

  const claFields = useMemo(() => ["classInstructor", "classNotes", "Author", "PartitionKey"], []);
  const claHeaders = useMemo(() => ["Instructor", "Notes", "Author", "Type"], []);

  const clFields = useMemo(() => ["clFirstName", "clLastName", "PartitionKey", "clBalance", "clNotes", "Author"], []);
  const clHeaders = useMemo(() => ["First Name", "Last Name", "Type", "Balance", "Notes", "Author"], []);

  const stFields = useMemo(() => ["stFirstName", "stLastName", "PartitionKey", "Author", "stClient", "stNotes"], []);
  const stHeaders = useMemo(() => ["First Name", "Last Name", "Type", "Author", "Client", "Notes"], []);

  const [rowData, setRowData] = useState(Array.from(staffData.values()));
  const [columnDefs, setColumnDefs] = useState(stfHeaders.map((header, index) => ({ headerName: header, field: stfFields[index] })) as ColDef[]);

  const updateData = (headers: string[], fields: string[], rd: any) => {
    console.log("Grid updating..");
      setColumnDefs(headers.map((header, index) => ({ headerName: header, field: fields[index] })));
      setRowData(rd);
  };

  useEffect(() => {
    
    console.log("DEBUG",studentData.get("7c2b3c4d-5e6f-7g8h-9i10-jk11lmno12pq"));
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
    console.log(rowData);
  }, [rowData]);

  useEffect(() => {
    console.log(columnDefs);
  }, [columnDefs]);

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
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout='autoHeight' 
        />
      </div>
    </div>
  );
}
