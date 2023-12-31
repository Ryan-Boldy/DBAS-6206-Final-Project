import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions } from 'ag-grid-community';
import { useEffect, useMemo, useState } from 'react';
import { classMap, clientMap, instructorMap, roomMap, staffMap, studentMap, transactionMap, user } from '../Resources/GlobalStates';
import { useAtom } from 'jotai';
import { Client, Instructor } from '../Resources/GlobalInterfaces';
import { v4 as uuidv4 } from 'uuid';
// AG Grid column definitions


export default function Profiles() {
  const [profileType, setProfileType] = useState('Staff');

  const [studentData, setStudentData] = useAtom(studentMap);
  const [staffData, setStaffData] = useAtom(staffMap);
  const [roomData, setRoomData] = useAtom(roomMap);
  const [instructorData, setInstructorData] = useAtom(instructorMap);
  const [clientData, setClientData] = useAtom(clientMap);
  const [classData, setClassData] = useAtom(classMap);
  const [transactionData, setTransactionData] = useAtom(transactionMap);
  const [auth] = useAtom(user);

  const transactionArray = useMemo(() => Array.from(transactionData.values()), [transactionData]);
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


  const claFields = useMemo(() => ["clName", "classNotes", "Author", "PartitionKey"], []);
  const claHeaders = useMemo(() => ["Class Name", "Notes", "Author", "Type"], []);
  const claLocked = useMemo(() => [2, 4], []);

  const clFields = useMemo(() => ["clFirstName", "clLastName", "PartitionKey", "clBalance", "clNotes", "Author"], []);
  const clHeaders = useMemo(() => ["First Name", "Last Name", "Type", "Balance", "Notes", "Author"], []);
  const clLocked = useMemo(() => [2, 5], []);


  const stFields = useMemo(() => ["stFirstName", "stLastName", "PartitionKey", "Author","stNotes"], []);
  const stHeaders = useMemo(() => ["First Name", "Last Name", "Type", "Author", "Notes"], []);
  const stLocked = useMemo(() => [2, 3], []);

  const trFields = useMemo(() => ["trStatus", "trAmount", "Author", "trNotes"], []);
  const trHeaders = useMemo(() => ["Paid?", "Amount", "Author", "Notes"], []);
  const trLocked = useMemo(() => [2], []);

  const [rowData, setRowData] = useState<any[]>(Array.from(staffData.values()));
  const [columnDefs, setColumnDefs] = useState(stfHeaders.map((header, index) => ({ headerName: header, field: stfFields[index], filter: true,})) as ColDef[]);
  
  const [gridApi, setGridApi] = useState(null);
  const [, setGridColumnApi] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);



  const gridOptions: GridOptions = {
    quickFilterText: '', // Initial quick filter value
  };


  const updateData = (headers: string[], fields: string[], rd: any, locked: number[]) => {
    console.log("Grid updating..");
    const newColumnDefs: ColDef[] = headers.map((header, index) => ({
      headerName: header,
      field: fields[index],
      filter: true,
      editable: !locked.includes(index),
    }));

    if (profileType === "Classes") {
      newColumnDefs.push({
        headerName: "Instructor Name",
        field: "instructorName",
        valueGetter: function (params) {
          const rowNode = params.node;
        
          if (rowNode && rowNode.data) {
            const rowId = rowNode.id;
            console.log("Row ID:", rowNode.id);
            const classInstructor = rowNode.data.classInstructor;
            console.log("Class Instructor:", classInstructor);
        
            if (classInstructor) {
              const instructorsArray = Array.from(instructorData.values());
              console.log("Instructor Array:", instructorsArray);
        
              const matchingInstructor = instructorsArray.find(
                (instructor) => instructor.SortKey === classInstructor
              );
              console.log("Matching Instructor:", matchingInstructor);
              const instructorName = matchingInstructor
                ? `${matchingInstructor.inFirstName} ${matchingInstructor.inLastName}`
                : "Instructor Not Found";
        
              return instructorName;
            }
          }
        },
      });
    }
    
    if (profileType === "Transactions") {
      newColumnDefs.push({
        headerName: "Instructor",
        field: "instructor",
        valueGetter: function (params) {
          const rowNode = params.node;
        
          if (rowNode && rowNode.data) {
            const rowId = rowNode.id;
            console.log("Row ID:", rowNode.id);
            const transactionInstructor = rowNode.data.trInstructor;
            console.log("transaction Instructor:", transactionInstructor);
        
            if (transactionInstructor) {
              const instructorsArray = Array.from(instructorData.values());
              console.log("Instructor Array:", instructorsArray);
        
              const matchingInstructor = instructorsArray.find(
                (instructor) => instructor.SortKey === transactionInstructor
              );
              console.log("Matching Instructor:", matchingInstructor);
              const instructorName = matchingInstructor
                ? `${matchingInstructor.inFirstName} ${matchingInstructor.inLastName}`
                : "Instructor Not Found";
        
              return instructorName;
            }
          }
        },
      });
      newColumnDefs.push({
        headerName: "Client",
        field: "client",
        valueGetter: function (params) {
          const rowNode = params.node;
        
          if (rowNode && rowNode.data) {
            const rowId = rowNode.id;
            console.log("Row ID:", rowNode.id);
            const transactionClient = rowNode.data.trClient;
            console.log("transaction Client:", transactionClient);
        
            if (transactionClient) {
              const iclientArray = Array.from(clientData.values());
              console.log("Client Array:", clientArray);
        
              const matchingClient = clientArray.find(
                (client) => client.SortKey === transactionClient
              );
              console.log("Matching Client:", matchingClient);
              const clientName = matchingClient
                ? `${matchingClient.clFirstName} ${matchingClient.clLastName}`
                : "Client Not Found";
        
              return clientName;
            }
          }
        },
      });
    }
    if(profileType !== "Rooms" && profileType !== "Transactions" && profileType !== "Staff") {
      newColumnDefs.push({
        headerName: "Active?",
        field: "active",
        editable: true
      })
    }
  
    // Add a button column definition for the "Actions" column
    if (profileType === "Classes" || profileType === "Clients" || profileType === "Transactions") {
      newColumnDefs.push({
        headerName: "",
        cellRenderer: (params: any) => (
          <button onClick={() => handleButtonClick(params.data)}>Modify</button>
        ),
      });
    }
  
    
    setColumnDefs(newColumnDefs);
    setRowData(rd);
  };


  function onGridReady(params: { api: any; columnApi: any }) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
  const onFilterTextChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    (gridApi as any)?.setQuickFilter(e.target.value);
  }
  

  function createClick(): void {
    switch(profileType) {
      case "Instructors":
        onCellValueChanged({data: {PartitionKey: '/instructors', SortKey: uuidv4(), Author: auth, inFirstName: "FirstName", inLastName: "LastName", inNotes: " ", active: true}});
        break;
      case "Clients":
        onCellValueChanged({data: {PartitionKey: '/clients', SortKey: uuidv4(), Author: auth, clFirstName: "FirstName", clLastName: "LastName", clNotes: " ", clStudents: [], clBalance: 0, active: true}});
        break;
      case "Students":
        onCellValueChanged({data: {PartitionKey: '/students', SortKey: uuidv4(), Author: auth, stFirstName: "FirstName", stLastName: "LastName", stNotes: " ", active: true}});
        break;
      case "Rooms":
        break;
      case "Classes":
        onCellValueChanged({data: {PartitionKey: '/class', SortKey: uuidv4(), Author: auth, students: [], classInstructor: " ", classNotes: " ", clName: " ", active: true}});
        break;
      case "Transactions":
        onCellValueChanged({data: {PartitionKey: '/transactions', SortKey: uuidv4(), Author: auth, trClient: " ", trInstructor: " ", trStatus: false, trAmount: 0, trNotes: " ", active: true }});
        break;
      default:
        //updateData(stfHeaders, stfFields, staffArray, stfLocked);
        break;
    }
  }

  function onCellValueChanged(event: any): void {
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
        let m;
        switch(event.data.PartitionKey) {
          case "/instructors":
            m = new Map(instructorData);
            m.set(event.data.SortKey, event.data);
            setInstructorData(m);
            setRowData(Array.from(m.values()));
            break;
          case "/staff":
            m = new Map(staffData);
            m.set(event.data.SortKey, event.data);
            setStaffData(m);
            setRowData(Array.from(m.values()));

            break;
          case "/students":
            m = new Map(studentData);
            m.set(event.data.SortKey, event.data);
            setStudentData(m);
            setRowData(Array.from(m.values()));

            break;
          case "/clients":
            m = new Map(clientData);
            m.set(event.data.SortKey, event.data);
            setClientData(m);
            setRowData(Array.from(m.values()));

            break;
          case "/rooms":
            m = new Map(roomData);
            m.set(event.data.SortKey, event.data);
            setRoomData(m);
            setRowData(Array.from(m.values()));

            break;
          case "/transactions":
            m = new Map(transactionData);
            m.set(event.data.SortKey, event.data);
            setTransactionData(m);
            setRowData(Array.from(m.values()));
  
              break;
          default:
            m = new Map(classData);
            m.set(event.data.SortKey, event.data);
            setClassData(m);
            console.log("M", m);
            setRowData(Array.from(m.values()));

            break;
        }
      }
    })();

    
  }

  useEffect(() => {
    
    console.log("DEBUG",instructorData.get("3f2b3c4d-5e6f-7g8h-9i10-jk11lmno12pq"));
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
      case "Transactions":
        updateData(trHeaders, trFields, transactionArray, trLocked);
        break;
      default:
        updateData(stfHeaders, stfFields, staffArray, stfLocked);
        break;
    }
  }, [profileType]);

  useEffect(() => {
    console.log(columnDefs);
  }, [columnDefs]);


  const closeMenu = () => {
    // Close the menu and reset the selected row data
    setIsMenuOpen(false);
    setSelectedRowData(null);
  };

  const handleButtonClick = (rowData: any) => {
    // Add your logic here for handling the button click
    console.log("Button clicked for row data:", rowData);
    setSelectedRowData(rowData);
    setIsMenuOpen(true);
    // Perform any other actions you need
  };
  
  const renderMenuContent = () => {
    // Common menu structure
    return (
      <div className="menu-content">
        {/* Render form fields or any other components to modify the rowData */}
        {/* For example, you can use input fields to edit the rowData */}
        {/* <input type="text" value={selectedRowData.someProperty} onChange={(e) => handleInputChange(e)} /> */}
        {/* Add other form fields as needed */}
        <button onClick={closeMenu} className='custom-btn' style={{marginBottom: '2%'}}>Close</button>
      </div>
    );
  };
  
  const renderClassesMenu = () => {
    const handleInstructorChange = (instructor: Instructor) => {
      setSelectedRowData({...selectedRowData, classInstructor: instructor.SortKey})
      const event = {data: {...selectedRowData, classInstructor: instructor.SortKey}};
      onCellValueChanged(event);
    };
  
    const handleStudentChange = (studentId: string) => {
      // Create a new array to represent the updated students
      const updatedStudents = [...selectedRowData.students];
    
      // Check if the studentId is already in the array
      const index = updatedStudents.indexOf(studentId);
    
      if (index !== -1) {
        // If the studentId is found, remove it
        updatedStudents.splice(index, 1);
      } else {
        // If the studentId is not found, add it
        updatedStudents.push(studentId);
      }
    
      // Log or use the updatedStudents array as needed
      console.log(updatedStudents);
    
      // If you need to update the selectedRowData with the new array
      // (this is typically done with a state update in a React component)
      setSelectedRowData({ ...selectedRowData, students: updatedStudents });
      const event = {data: {...selectedRowData, students: updatedStudents}};
      onCellValueChanged(event);
    };  
  
    return (
      <div>
        <p style={{fontSize: 'large'}}>Modify Class: {selectedRowData.SortKey}</p>
        {/* Customize the menu for the "Clients" profileType */}
        <div>
          <p>Select an Instructor:</p>
          {instructorArray.map((instructor) => (
            <label key={instructor.SortKey}>
              <input
                type="radio"
                value={instructor.SortKey}
                checked={selectedRowData.classInstructor === instructor.SortKey}
                onChange={() => handleInstructorChange(instructor)}
              />
              {`${instructor.inFirstName} ${instructor.inLastName}`}
            </label>
          ))}
        </div>
        <div>
          <p>Select Students:</p>
          {studentArray.map((student) => (
            <label key={student.SortKey}>
              <input
                type="checkbox"
                value={student.SortKey}
                checked={selectedRowData.students.includes(student.SortKey) }
                onChange={() => handleStudentChange(student.SortKey)}
              />
              {`${student.stFirstName} ${student.stLastName}`}
            </label>
          ))}
        </div>
        {renderMenuContent()}
      </div>
    );
  };
  
  const renderClientsMenu = () => {
  
    const handleStudentChange = (studentId: string) => {
      // Create a new array to represent the updated students
      const updatedStudents = [...selectedRowData.clStudents];
    
      // Check if the studentId is already in the array
      const index = updatedStudents.indexOf(studentId);
    
      if (index !== -1) {
        // If the studentId is found, remove it
        updatedStudents.splice(index, 1);
      } else {
        // If the studentId is not found, add it
        updatedStudents.push(studentId);
      }
    
      // Log or use the updatedStudents array as needed
      console.log(updatedStudents);
    
      // If you need to update the selectedRowData with the new array
      // (this is typically done with a state update in a React component)
      setSelectedRowData({ ...selectedRowData, clStudents: updatedStudents });
      const event = {data: {...selectedRowData, clStudents: updatedStudents}};
      onCellValueChanged(event);
    };  
  
    return (
      <div>
        <p style={{fontSize: 'large'}}>Modify Client: {selectedRowData.SortKey}</p>
        {/* Customize the menu for the "Clients" profileType */}
        <div>
          <p>Select Students:</p>
          {studentArray.map((student) => (
            <label key={student.SortKey}>
              <input
                type="checkbox"
                value={student.SortKey}
                checked={selectedRowData.clStudents.includes(student.SortKey) }
                onChange={() => handleStudentChange(student.SortKey)}
              />
              {`${student.stFirstName} ${student.stLastName}`}
            </label>
          ))}
        </div>
        {renderMenuContent()}
      </div>
    );
  };

  const renderTransactionsMenu = () => {
    const handleInstructorChange = (instructor: Instructor) => {
      setSelectedRowData({...selectedRowData, trInstructor: instructor.SortKey})
      const event = {data: {...selectedRowData, trInstructor: instructor.SortKey}};
      onCellValueChanged(event);
    };
  
    const handleClientChange = (client: Client) => {
      setSelectedRowData({...selectedRowData, trClient: client.SortKey})
      const event = {data: {...selectedRowData, trClient: client.SortKey}};
      onCellValueChanged(event);
    };
  
    return (
      <div>
        <p style={{fontSize: 'large'}}>Modify Transaction: {selectedRowData.SortKey}</p>
        {/* Customize the menu for the "Clients" profileType */}
        <div>
          <p>Select an Instructor:</p>
          {instructorArray.map((instructor) => (
            <label key={instructor.SortKey}>
              <input
                type="radio"
                value={instructor.SortKey}
                checked={selectedRowData.trInstructor === instructor.SortKey}
                onChange={() => handleInstructorChange(instructor)}
              />
              {`${instructor.inFirstName} ${instructor.inLastName}`}
            </label>
          ))}
        </div>
        <div>
          <p>Select a Client:</p>
          {clientArray.map((client) => (
            <label key={client.SortKey}>
              <input
                type="radio"
                value={client.SortKey}
                checked={selectedRowData.trClient === client.SortKey}
                onChange={() => handleClientChange(client)}
              />
              {`${client.clFirstName} ${client.clLastName}`}
            </label>
          ))}
        </div>
        {renderMenuContent()}
      </div>
    );
  }

  return (
    <div style={({paddingTop: 200, paddingLeft: 100})}>

        {isMenuOpen && selectedRowData && (
          <div className="menu-container">
            {/* Render different menus based on profileType */}
            {profileType === 'Clients' ? renderClientsMenu() : null}
            {profileType === 'Classes' ? renderClassesMenu() : null}
            {profileType === 'Transactions' ? renderTransactionsMenu() : null}

          </div>
        )}
        <div>
          <select id="profileType" value={profileType} onChange={(e) => {closeMenu(); setProfileType(e.target.value);}} required className="input-field">
            <option value="Staff">Staff</option>
            <option value="Students">Students</option>
            <option value="Clients">Clients</option>
            <option value="Instructors">Instructors</option>
            <option value="Rooms">Rooms</option>
            <option value="Classes">Classes</option>
            <option value="Transactions">Transactions</option>

          </select>
        </div>
        <button onClick={createClick}>Add Record</button>
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
