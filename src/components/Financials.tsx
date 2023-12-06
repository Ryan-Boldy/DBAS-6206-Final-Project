import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions } from 'ag-grid-community';
import { useEffect, useMemo, useState } from 'react';
import { transactionMap} from '../Resources/GlobalStates';
import { useAtom } from 'jotai';


export default function Financials() {

    const [profileType, setProfileType] = useState('Transactions');


    const [transactionData] = useAtom(transactionMap);

    const transactionArray = useMemo(() => Array.from(transactionData.values()), [transactionData]);

    const trFields = useMemo(() => ["trStatus", "trAmount", "trClient", "trAuthor", "trInstructor"], []);
    const trHeaders = useMemo(() => ["Status", "Amount", "Client", "Author", "Instructor"], []);

    const [rowData, setRowData] = useState(Array.from(transactionData.values()));
    const [columnDefs, setColumnDefs] = useState(trHeaders.map((header, index) => ({ headerName: header, field: trFields[index], filter: true,})) as ColDef[]);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const gridOptions: GridOptions = {
        quickFilterText: '', // Initial quick filter value
    };

    function onGridReady(params: { api: any; columnApi: any }) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }
    const onFilterTextChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        (gridApi as any)?.setQuickFilter(e.target.value);
    }


    useEffect(() => {
        console.log("DEBUG",transactionData.get("9b2b3c4d-5e6f-7g8h-9i10-jk11lmno12pq"));
        console.log("Set to:",profileType);
    }, [profileType]);

    useEffect(() => {
        console.log(rowData);
    }, [rowData]);

    useEffect(() => {
        console.log(columnDefs);
    }, [columnDefs]);

    return (
        <div style={({paddingTop: 200, paddingLeft: 100})}>

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
                />
            </div>
        </div>
    );
}