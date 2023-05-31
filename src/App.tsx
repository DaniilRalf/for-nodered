import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Autocomplete, AutocompleteRenderInputParams, Chip, TextField } from "@mui/material"
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase'

let FILTER_NAME = ['name', 'owner', 'uuid', 'mac', 'vendor', 'model']


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

const customStyleMaterial = `
    .MuiDataGrid-menuList {
        display: flex;
        flex-direction: column;
    }
`


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

const columnsConfigMain: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 80, description: 'Test desc', sortable: false},
    {field: 'uuid', headerName: 'uuid', width: 200, description: 'Test desc', sortable: false},
    {field: 'name', headerName: 'Device name', width: 130, description: 'Test desc', sortable: false},
    {field: 'vendor', headerName: 'Vendor', width: 130, description: 'Test desc', sortable: false},
    {field: 'model', headerName: 'Model', width: 130, description: 'Test desc', sortable: false},
    {
        field: 'accounts', headerName: 'Device owner',
        description: 'This column has a value getter and is not sortable.',
        sortable: false, width: 160,
        valueGetter: (params: GridValueGetterParams) => {
            const inputData = ''
            params.row.accounts.map((itemAccount: string) => inputData + ` ${itemAccount}`)
            return inputData
        },
    },
]
const columnsConfigSelect: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 80, description: 'Test desc', sortable: false},
    {field: 'uuid', headerName: 'uuid', width: 200, description: 'Test desc', sortable: false},
    {field: 'name', headerName: 'Device name', width: 130, description: 'Test desc', sortable: false},
    {field: 'vendor', headerName: 'Vendor', width: 130, description: 'Test desc', sortable: false},
    {field: 'model', headerName: 'Model', width: 130, description: 'Test desc', sortable: false},
    {
        field: 'accounts', headerName: 'Device owner',
        description: 'This column has a value getter and is not sortable.',
        sortable: false, width: 160,
        valueGetter: (params: GridValueGetterParams) => {
            const inputData = ''
            params.row.accounts.map((itemAccount: string) => inputData + ` ${itemAccount}`)
            return inputData
        },
    },
    {field: 'remove', headerName: '', width: 130, description: '', sortable: false, renderCell: (params) =>
            (<><PhonelinkEraseIcon style={{cursor: 'pointer'}} /></>)
    },
]
const rowsTest: RowType[] = [
    {id: 0, accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test1", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "12d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor1', virtual: true,},
    {id: 0, accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: 'test model 2', name: "test2", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "22d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor2', virtual: true,},
    {id: 0, accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test3", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "32d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor3', virtual: true,},
    {id: 0, accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test4", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "42d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor4', virtual: true,},
    {id: 0, accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test5", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "52d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor5', virtual: true,},
]

/** data from table and config data column================================================*/





function App() {

    const [dataMainTable, setDataMainTable] = useState<RowType[]>()
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const [dataSelectTable, setDataSelectTable] = useState<RowType[]>()

    const [allChipsMainTable, setAllChipsMainTable] = useState<{ detail: string, value: string }[]>([])

    useEffect((): void => {
        generateMainData()
    }, [])

    const generateMainData = (): void => {
        rowsTest.map((device, index) => device.id = index + 1)
        setDataMainTable(rowsTest)
    }


    /** function for Main Table=====================================================================*/

    /** change checkbox*/
    function handleSelectionModelChange(arrSelectRow: any[]): void {
        setSelectedRows(arrSelectRow)
        if (dataMainTable) {
            const selectedRows: RowType[] = dataMainTable.filter((row: RowType) => arrSelectRow.includes(row.uuid))
            setDataSelectTable(selectedRows)
        }
    }
    function deleteCheckboxFromSelectTable(itemRow: any): void {
        if (dataMainTable) {
            const selectedRowsNew: string[] = selectedRows.filter((uuid: string) => uuid !== itemRow)
            handleSelectionModelChange(selectedRowsNew)
        }
    }
    /** paginator change*/
    function handlePageChange(params: { page: number, pageSize: number }): void {
        // console.log(params)
    }
    /** function for Main Table=====================================================================*/











    /** event and options for autocomplete=========================================================*/
    const defaultPropsAutocomplete = {
        options: (allChipsMainTable.slice(-1)[0]?.detail === 'tag') ? [] : FILTER_NAME,
        getOptionLabel: (option: string) => option,
    }
    const changeAutocomplete = (event: any): void => {
        /** делаем асинхронно, чтобы выбранный чипс из селекта успел встать в инпут*/
        setTimeout(() => {
            const inputData: string = event.target.value
            if (inputData) {
                /** functionality for serial saving chips and tags*/
                if (FILTER_NAME.includes(inputData) && !(allChipsMainTable.slice(-1)[0])) {
                    setAllChipsMainTable([...allChipsMainTable, {detail: 'tag', value: inputData}])
                    event.target.value = ''
                    /** удаляем значение из общего массива чтобы не отображать элемент в Селекте*/
                    FILTER_NAME = FILTER_NAME.filter((item) => item !== inputData)
                } else if (allChipsMainTable.slice(-1)[0]?.detail === 'tag') {
                    setAllChipsMainTable([...allChipsMainTable, {detail: 'chip', value: inputData}])
                    event.target.value = ''
                } else if (allChipsMainTable.slice(-1)[0]?.detail === 'chip' && FILTER_NAME.includes(inputData)) {
                    setAllChipsMainTable([...allChipsMainTable, {detail: 'tag', value: inputData}])
                    event.target.value = ''
                    /** удаляем значение из общего массива чтобы не отображать элемент в Селекте*/
                    FILTER_NAME = FILTER_NAME.filter((item) => item !== inputData)
                }
            }
        }, 100)
    }
    /** event and options for autocomplete=========================================================*/


    /** event and options for chips================================================================*/
    const handleDelete = (deleteChip: {detail: string, value: string}, indexElement: number): void => {
        const allElementsAfterDelete = [...allChipsMainTable]
        if (deleteChip.detail === 'chip') {
            /** добавление элементом назад в массив*/
            FILTER_NAME.push(allElementsAfterDelete[indexElement - 1].value)
            allElementsAfterDelete.splice((indexElement - 1), 2)
        } else if (deleteChip.detail === 'tag') {
            /** добавление элементом назад в массив*/
            FILTER_NAME.push(deleteChip.value)
            allElementsAfterDelete.splice(indexElement, 1)
        }
        setAllChipsMainTable(allElementsAfterDelete)
        setTimeout(() => {
            const test: any = document.querySelector('.main_table input')
            test.value = ''
        })
    }
    const generateChips = allChipsMainTable.map((itemChips: { detail: string, value: string }, index: number) => {
        if (itemChips.detail === 'tag') {
            return (
                <Chip key={index} label={itemChips.value}
                      style={allChipsMainTable.length > index + 1
                          ? {backgroundColor: '#179bff', color: 'white', borderRadius: '10px 0px 0px 10px'}
                          : {backgroundColor: '#179bff', color: 'white', marginRight: '10px'}}
                      onDelete={allChipsMainTable.length > index + 1 ? undefined : () => handleDelete(itemChips, index)}
                />
            )
        } else {
            return (
                <Chip key={index} label={itemChips.value}
                      style={{
                          backgroundColor: '#ececec',
                          color: 'black',
                          borderRadius: '0px 10px 10px 0px',
                          marginRight: '5px'
                      }}
                      onDelete={() => handleDelete(itemChips, index)}
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
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <TextField {...params} label="Поиск" variant="standard" />
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
                        rows={dataMainTable} columns={columnsConfigMain}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 10},
                            },
                        }}
                        pageSizeOptions={[2, 5, 10]} checkboxSelection
                        disableColumnFilter={true}

                        onPaginationModelChange={handlePageChange}

                        getRowId={(row) => row.uuid}
                        rowSelectionModel={selectedRows}
                        onRowSelectionModelChange={handleSelectionModelChange}
                    />}
                </div>
            </div>


            <div className="main_table">
                {/*/!** filter table allData*!/*/}
                {/*{dataSelectTable && dataSelectTable.length > 0 && <div style={customStyle.filter}>*/}
                {/*    <div style={customStyle.chips}>*/}
                {/*        {generateChips}*/}
                {/*    </div>*/}
                {/*    <div style={customStyle.autocomplete}>*/}
                {/*        <Autocomplete*/}
                {/*            {...defaultPropsAutocomplete}*/}
                {/*            renderInput={(params: AutocompleteRenderInputParams) => (*/}
                {/*                <TextField {...params}*/}
                {/*                           label="Поиск"*/}
                {/*                           variant="standard"*/}
                {/*                />*/}
                {/*            )}*/}
                {/*            onKeyDown={(e) => {*/}
                {/*                if (e.key === 'Enter') changeAutocomplete(e)*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>}*/}
                {/** table with select data*/}
                <div style={{height: "auto", maxHeight: 400, width: '100%', marginBottom: 50}}>
                    {dataSelectTable && dataSelectTable.length > 0 && <DataGrid
                        rows={dataSelectTable} columns={columnsConfigSelect}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 5},
                            },
                        }}
                        disableRowSelectionOnClick={true}
                        pageSizeOptions={[2, 5, 10]}
                        disableColumnFilter={true}
                        onPaginationModelChange={handlePageChange}

                        onCellClick={(params) => {
                            // TODO: функцонал клика по ячейке, его использовать для удаления из таблицы
                            if (params.field === 'remove') {
                                const clickedRow = params.row.uuid
                                deleteCheckboxFromSelectTable(clickedRow)
                            }
                        }}
                    />}
                </div>
            </div>


            <style>{customStyleMaterial}</style>
        </div>
    );
}

export default App;
