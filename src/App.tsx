import './App.css';
import React, {useEffect, useState} from 'react'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import ChipInput from "material-ui-chip-input";
import { Menu } from '@material-ui/core';



/** data from table and config data column==========================*/
interface RowType {
    id: number,
    accounts: any[],
    aliases: any[],
    description: string | null,
    deviceTags: any[],
    firmwareInfo: string | null,
    lastRequestDatetime: string | null,
    model: string | null,
    name: string,
    provide: string | null,
    type: string
    uuid: string,
    vendor: string | null,
    virtual: boolean,
}
const columnsConfig: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 80, description: 'Test desc', },
    {field: 'uuid', headerName: 'uuid', width: 200, description: 'Test desc', },
    {field: 'name', headerName: 'Device name', width: 130, description: 'Test desc', },
    {field: 'vendor', headerName: 'Vendor', width: 130, description: 'Test desc', },
    {field: 'model', headerName: 'Model', width: 130, description: 'Test desc', },
    {
        field: 'accounts',
        headerName: 'Device owner',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) => {
            const inputData = ''
            params.row.accounts.map((itemAccount: string) => inputData + ` ${itemAccount}`)
            return inputData
        },
    },
]
const rowsTest: RowType[] = [
    {id: 0, accounts:[], aliases:[], description:null, deviceTags:[], firmwareInfo:null, lastRequestDatetime:"2023-05-24 07:54:48Z", model:null, name:"test1", provide:"U", type:"VOIP_MOBILE_PHONE", uuid:"12d22cda-105c-4b56-9f44-075f7c82547b", vendor:'test vendor1', virtual:true,},
    {id: 0, accounts:[], aliases:[], description:null, deviceTags:[], firmwareInfo:null, lastRequestDatetime:"2023-05-24 07:54:48Z", model:'test model 2', name:"test2", provide:"U", type:"VOIP_MOBILE_PHONE", uuid:"22d22cda-105c-4b56-9f44-075f7c82547b", vendor:'test vendor2', virtual:true,},
    {id: 0, accounts:[], aliases:[], description:null, deviceTags:[], firmwareInfo:null, lastRequestDatetime:"2023-05-24 07:54:48Z", model:null, name:"test3", provide:"U", type:"VOIP_MOBILE_PHONE", uuid:"32d22cda-105c-4b56-9f44-075f7c82547b", vendor:'test vendor3', virtual:true,},
    {id: 0, accounts:[], aliases:[], description:null, deviceTags:[], firmwareInfo:null, lastRequestDatetime:"2023-05-24 07:54:48Z", model:null, name:"test4", provide:"U", type:"VOIP_MOBILE_PHONE", uuid:"42d22cda-105c-4b56-9f44-075f7c82547b", vendor:'test vendor4', virtual:true,},
    {id: 0, accounts:[], aliases:[], description:null, deviceTags:[], firmwareInfo:null, lastRequestDatetime:"2023-05-24 07:54:48Z", model:null, name:"test5", provide:"U", type:"VOIP_MOBILE_PHONE", uuid:"52d22cda-105c-4b56-9f44-075f7c82547b", vendor:'test vendor5', virtual:true,},
]





function App() {

    const [dataMainTable, setDataMainTable] = useState<RowType[]>()
    const [dataSelectTable, setDataSelectTable] = useState<RowType[]>()

    useEffect(() => {
        generateMainData()
    }, [])

    const generateMainData = () => {
        rowsTest.map((device, index) => device.id = index + 1)
        setDataMainTable(rowsTest)
    }




    /** function for table event====================================*/
    /** change checkbox*/
    function handleSelectionModelChange(newSelection: any[]) {
        if (dataMainTable) {
            const selectedRows = dataMainTable.filter((row) => newSelection.includes(row.id))

            setDataSelectTable(selectedRows)
        }
    }
    /** paginator change*/
    function handlePageChange(params: { page: number, pageSize: number }) {
        console.log(params)
    }




    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };




    return (
        <div className="App">

            <ChipInput
                onClick={handleClick}
                dataSource={['test1', 'test2']}
                fullWidth
                label='Fish and chips'
                placeholder='Type and press enter to add chips'
                newChipKeyCodes={[13,188,186]}
                onBeforeAdd={(val) => {
                    console.log(val)
                    if(val === 'abc') return false;
                    return true;
                }}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <div className="">sdfsdfsd</div>
                <div className="">sdfsdfsd</div>
                <div className="">sdfsdfsd</div>
            </Menu>




            {/** table with all data*/}
            <div style={{height: "auto", maxHeight: 400, width: '100%', marginBottom: 50}}>
                {dataMainTable && <DataGrid
                    rows={dataMainTable} columns={columnsConfig}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 2},
                        },
                    }}
                    pageSizeOptions={[2, 5, 10]} checkboxSelection
                    columnVisibilityModel={{id: false}}

                    onRowSelectionModelChange={handleSelectionModelChange}
                    onPaginationModelChange={handlePageChange}
                />}
            </div>




            <ChipInput
                defaultValue={['clown fish', 'whale', 'shark']}
                fullWidth
                label='Fish and chips'
                placeholder='Type and press enter to add chips'
                newChipKeyCodes={[13,188,186]}
                onBeforeAdd={(val) => {
                    console.log(val)
                    if(val == 'abc') return false;
                    return true;
                }}
            />
            {/** table with select data*/}
            <div style={{height: "auto", maxHeight: 400, width: '100%', marginBottom: 50}}>
                {dataSelectTable && dataSelectTable.length > 0 && <DataGrid
                    rows={dataSelectTable} columns={columnsConfig}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[2, 5, 10]}
                    columnVisibilityModel={{id: false}}

                    onPaginationModelChange={handlePageChange}
                />}
            </div>



        </div>
    );
}

export default App;
