import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { CellValueChangedEvent, ColDef, GridOptions } from 'ag-grid-community';
import { useEffect, useMemo, useState } from 'react';
import { classMap, clientMap, instructorMap, roomMap, staffMap, studentMap } from '../Resources/GlobalStates';
import { useAtom } from 'jotai';

// AG Grid column definitions

export default function Profiles() {
  const [profileType, setProfileType] = useState('Staff');

  const [studentData, setStudentData] = useAtom(studentMap);
  const [staffData, setStaffData] = useAtom(staffMap);
  const [roomData, setRoomData] = useAtom(roomMap);
  const [instructorData, setInstructorData] = useAtom(instructorMap);
  const [clientData, setClientData] = useAtom(clientMap);
  const [classData, setClassData] = useAtom(classMap);


  const instructorArray = useMemo(() => Array.from(instructorData.values()), [instructorData]);
  const staffArray = useMemo(() => Array.from(staffData.values()), [staffData]);
  const roomArray = useMemo(() => Array.from(roomData.values()), [roomData]);
  const studentArray = useMemo(() => Array.from(studentData.values()), [studentData]);
  const clientArray = useMemo(() => Array.from(clientData.values()), [clientData]);
  const classArray = useMemo(() => Array.from(classData.values()), [classData]);

  const inFields = useMemo(() => ['inFirstName', 'inLastName', 'PartitionKey', 'Author', 'inNotes'], []);
  const inHeaders  = useMemo(() => ['First Name', 'Last Name', 'Type', 'Author', 'Notes'], []);
  const inLocked = useMemo(() => [2, 3], []);

  const stfFields  = useMemo(() => ["staffUser", "staffFirstName", "staffLastName", "PartitionKey", "Author", "SortKey", "staffApproved"], []);
  const stfHeaders = useMemo(() => ['Username', 'First Name', 'Last Name', 'Type', 'Author', 'ID', 'Approved?'], []);
  const stfLocked = useMemo(() => [0, 3, 4, 5], []);

  const rmFields = useMemo(() => ["SortKey", "rmMax"], []);
  const rmHeaders = useMemo(() => ["Code", "Capacity"], []);
  const rmLocked = useMemo(() => [0], []);


  const claFields = useMemo(() => ["classInstructor", "classNotes", "Author", "PartitionKey"], []);
  const claHeaders = useMemo(() => ["Instructor", "Notes", "Author", "Type"], []);
  const claLocked = useMemo(() => [2, 3], []);

  const clFields = useMemo(() => ["clFirstName", "clLastName", "PartitionKey", "clBalance", "clNotes", "Author"], []);
  const clHeaders = useMemo(() => ["First Name", "Last Name", "Type", "Balance", "Notes", "Author"], []);
  const clLocked = useMemo(() => [2, 5], []);


  const stFields = useMemo(() => ["stFirstName", "stLastName", "PartitionKey", "Author", "stClient", "stNotes"], []);
  const stHeaders = useMemo(() => ["First Name", "Last Name", "Type", "Author", "Client", "Notes"], []);
  const stLocked = useMemo(() => [2, 3], []);


  const [rowData, setRowData] = useState(Array.from(staffData.values()));
  const [columnDefs, setColumnDefs] = useState(stfHeaders.map((header, index) => ({ headerName: header, field: stfFields[index], filter: true,})) as ColDef[]);
  
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const gridOptions: GridOptions = {
    quickFilterText: '', // Initial quick filter value
  };

  const updateData = (headers: string[], fields: string[], rd: any, locked: number[]) => {
    console.log("Grid updating..");
      setColumnDefs(headers.map((header, index) => ({ headerName: header, field: fields[index], filter: true, editable: (!locked.includes(index)) })));
      setRowData(rd);
  };

  function onGridReady(params: { api: any; columnApi: any }) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
  const onFilterTextChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    (gridApi as any)?.setQuickFilter(e.target.value);
  }
  
  
  function onCellValueChanged(event: CellValueChangedEvent<any, any>): void {
    console.log(event.data);
    (async() => {
      const rq = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event.data),
      }
      console.log("REQUEST", rq);
      const res = await fetch(`${import.meta.env.VITE_URL}${event.data.PartitionKey.substring(1)}`, rq);
      console.log("RESPONSE", res);
      if(res.ok) {

      }
    })();

    
  }

  useEffect(() => {
    
    console.log("DEBUG",studentData.get("7c2b3c4d-5e6f-7g8h-9i10-jk11lmno12pq"));
    console.log("Set to:",profileType);
    switch(profileType) {
      case "Instructors":
        updateData(inHeaders, inFields, instructorArray, inLocked);
        break;
      case "Clients":
        updateData(clHeaders, clFields, clientArray, clLocked);
        break;
      case "Students":
        updateData(stHeaders, stFields, studentArray, stLocked);
        break;
      case "Rooms":
        updateData(rmHeaders, rmFields, roomArray, rmLocked);
        break;
      case "Classes":
        updateData(claHeaders, claFields, classArray, claLocked);
        break;
      default:
        updateData(stfHeaders, stfFields, staffArray, stfLocked);
        break;
    }
  }, [profileType]);

  useEffect(() => {
    console.log(rowData);
    const requestOptions = {

    }
  }, [rowData]);

  useEffect(() => {
    console.log(columnDefs);
  }, [columnDefs]);


  return (
    <div style={({paddingTop: 200, paddingLeft: 100})}>

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

        <div className="example-header">
          <span  style={{fontSize: 24}}>Quick Filter: </span>
          <input
            type="search"
            id="filter-text-box"
            placeholder="Filter..."
            onChange={onFilterTextChange}
            className="input-field"
          />
        </div>

      <div className="ag-theme-quartz ag-theme-ymd" style={{ height: 500, width: 1250 }}>
        <AgGridReact
        key={profileType}
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout='autoHeight' 
          animateRows={true}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
}
