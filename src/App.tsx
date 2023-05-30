import './App.css';
import React, {ReactNode, useEffect, useState} from 'react'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import ChipInput from "material-ui-chip-input"
import {Autocomplete, Chip, ChipProps, TextField} from "@mui/material"
import {Simulate} from "react-dom/test-utils";
import focus = Simulate.focus;

const FILTER_NAME = ['name', 'owner', 'uuid', 'mac', 'vendor', 'model']


const customStyle = {
    filter: {
        display: 'flex',
        alignItems: 'end',
        marginBottom: '10px'
    },
    chips: {
        display: 'flex',
    },
    autocomplete: {
        width: '100%',
    },
}



/** data from table and config data column================================================*/
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
/** data from table and config data column================================================*/





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

    
    /** function for table event====================================================================*/
    /** change checkbox*/
    function handleSelectionModelChange(newSelection: any[]) {
        if (dataMainTable) {
            const selectedRows = dataMainTable.filter((row) => newSelection.includes(row.id))

            setDataSelectTable(selectedRows)
        }
    }
    /** paginator change*/
    function handlePageChange(params: { page: number, pageSize: number }) {
        // console.log(params)
    }
    /** function for table event====================================================================*/









    const [allChips, setAllChips] = useState<{detail: string, value: string}[]>([])
    
    /** event and options for autocomplete=========================================================*/
    const defaultPropsAutocomplete = {
        options: FILTER_NAME,
        getOptionLabel: (option: string) => option,
    }
    const changeAutocomplete = (event: any) => {
        /** делаем асинхронно, чтобы выбранный чипс из селекта успел встать в инпут*/
        setTimeout(() => {
            const inputData: string = event.target.value
            if (inputData) {
                /** functionality for serial saving chips and tags*/
                if (FILTER_NAME.includes(inputData) && !(allChips.slice(-1)[0])) {
                        setAllChips([...allChips, {detail: 'tag', value: inputData}])
                        event.target.value = ''
                } else if (allChips.slice(-1)[0]?.detail === 'tag') {
                        setAllChips([...allChips, {detail: 'chip', value: inputData}])
                        event.target.value = ''
                } else if (allChips.slice(-1)[0]?.detail === 'chip' && FILTER_NAME.includes(inputData)) {
                    setAllChips([...allChips, {detail: 'tag', value: inputData}])
                    event.target.value = ''
                }
            }
        }, 100)
    }
    /** event and options for autocomplete=========================================================*/

    
    /** event and options for chips================================================================*/
    // TODO: сейчас  дропаются все чипсы с одинаковым названгием, исправить
    const handleDelete = (deleteChip: string) => {
        const allChopsAfterDelete = allChips.filter((chip) => chip.value !== deleteChip)
        setAllChips(allChopsAfterDelete)
    }
    const generateChips = allChips.map((itemChips: {detail: string, value: string}, index: number) => {
        if (itemChips.detail === 'tag') {
            return (
                <Chip key={index} label={itemChips.value}
                      style={allChips.length > index+1
                          ? {backgroundColor: '#179bff', color: 'white', borderRadius: '10px 0px 0px 10px'}
                          : {backgroundColor: '#179bff', color: 'white', marginRight: '10px'}}
                      onDelete={allChips.length > index+1 ? undefined : () => handleDelete(itemChips.value)}
                />
            )
        } else {
            return (
                <Chip key={index} label={itemChips.value}
                      style={{backgroundColor: '#ececec', color: 'black', borderRadius: '0px 10px 10px 0px', marginRight: '5px'}}
                      onDelete={() => handleDelete(itemChips.value)}
                />
            )
        }

    })
    /** event and options for chips================================================================*/
    
    
    
    return (
        <div className="App">



            <div className="main_table">
                {/** filter table allData*/}
                <div style={customStyle.filter}>
                    <div style={customStyle.chips}>
                        {generateChips}
                    </div>
                    <div style={customStyle.autocomplete}>
                        <Autocomplete
                            {...defaultPropsAutocomplete}
                            renderInput={(params) => (
                                <TextField {...params}
                                           label="Поиск"
                                           variant="standard"
                                />
                            )}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') changeAutocomplete(e)
                            }}
                        />
                    </div>
                </div>
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
            </div>






            <ChipInput
                defaultValue={['clown fish', 'whale', 'shark']}
                fullWidth
                label='Fish and chips'
                placeholder='Type and press enter to add chips'
                newChipKeyCodes={[13,188,186]}
                onBeforeAdd={(val) => {
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
