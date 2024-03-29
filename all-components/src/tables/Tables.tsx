import React, { useEffect, useMemo, useState } from 'react'
import {
    DataGrid,
    GridCellParams,
    GridColDef, GridColumnHeaderParams,
    GridRenderCellParams, GridValidRowModel,
    GridValueGetterParams
} from '@mui/x-data-grid'
import { Autocomplete, AutocompleteRenderInputParams, Button, Chip, TextField } from "@mui/material"
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase'

// import Pagination from 'rc-pagination';

import { Pagination, Select } from 'antd';
// const { Option } = Select;

let FOR_FILTER_MAIN_TABLE = ['name', 'uuid', 'mac', 'vendor', 'model']
let FOR_FILTER_SELECT_TABLE = ['name', 'uuid', 'mac', 'vendor', 'model']

const customStyle = {
    filter: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        alignItems: 'end',
        marginBottom: '10px'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
    },
    autocomplete: {
        minWidth: '300px'
    },
    table: {
        maxHeight: 380,
        width: '100%',
        marginBottom: 15
    },
    chip: {
        backgroundColor: '#ececec',
        color: 'black',
        borderRadius: '0px 10px 10px 0px',
        marginRight: '5px'
    },
    tagOnce: {backgroundColor: '#179bff', color: 'white', marginRight: '10px'},
    tagSplice: {backgroundColor: '#179bff', color: 'white', borderRadius: '10px 0px 0px 10px'},
    btnGroup: {
        display: 'flex',
        justifyContent: 'end',
    }
}

const customStyleMaterial = `
     p, div {font-size: 13px!important}
    .MuiDataGrid-menuList {display: flex;flex-direction: column;}
    .MuiDataGrid-selectedRowCount {display: none;}
    .MuiMenuItem-root:first-child {display: none;}
    .MuiDataGrid-panelFooter {display: none;}
    .ant-pagination {transform: translateY(-43px)}
    
    .MuiDataGrid-columnsPanel > *:nth-child(-n+2) { .MuiSwitch-root {display: none;}}
`

const localePagination = {
    // Options.jsx
    items_per_page: '/ page',
    jump_to: 'Go to',
    jump_to_confirm: 'confirm',
    page: 'Page',

    // Pagination.jsx
    prev_page: 'Previous Page',
    next_page: 'Next Page',
    prev_5: 'Previous 5 Pages',
    next_5: 'Next 5 Pages',
    prev_3: 'Previous 3 Pages',
    next_3: 'Next 3 Pages',
    page_size: 'Page Size',
}


/** data from table and config data column================================================*/
interface RowType {
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
    {field: 'uuid', headerName: 'uuid', width: 290, description: 'Test desc', sortable: false, },
    {field: 'name', headerName: 'Device name', width: 110, description: 'Test desc', sortable: false},
    {field: 'vendor', headerName: 'Vendor', width: 100, description: 'Test desc', sortable: false},
    {field: 'model', headerName: 'Model', width: 130, description: 'Test desc', sortable: false},
    {
        field: 'accounts', headerName: 'Device owner',
        description: 'This column has a value getter and is not sortable.',
        sortable: false, width: 160,
        valueGetter: (params: GridValueGetterParams) => {
            const inputData = ''
            params.row.accounts.map((itemAccount: string): string => inputData + ` ${itemAccount}`)
            return inputData
        },
    },
]
const columnsConfigSelect: GridColDef[] = [
    {
        field: 'remove',
        headerName: '',
        width: 130,
        description: '',
        sortable: false,
        renderCell: (_params: GridRenderCellParams<any>) =>
            (<><PhonelinkEraseIcon style={{cursor: 'pointer'}} /></>),
        renderHeader: () => (<><PhonelinkEraseIcon style={{cursor: 'pointer'}} /></>)
    },
    {field: 'uuid', headerName: 'uuid', width: 290, description: 'Test desc', sortable: false},
    {field: 'name', headerName: 'Device name', width: 110, description: 'Test desc', sortable: false},
    {field: 'vendor', headerName: 'Vendor', width: 100, description: 'Test desc', sortable: false},
    {field: 'model', headerName: 'Model', width: 130, description: 'Test desc', sortable: false},
    {
        field: 'accounts', headerName: 'Device owner',
        description: 'This column has a value getter and is not sortable.',
        sortable: false, width: 160,
        valueGetter: (params: GridValueGetterParams) => {
            const inputData = ''
            params.row.accounts.map((itemAccount: string): string => inputData + ` ${itemAccount}`)
            return inputData
        },
    },
]
const rowsTest: RowType[] = [
    {accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test1", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "12d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor1', virtual: true,},
    {accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: 'test model 2', name: "test2", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "22d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor2', virtual: true,},
    {accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test3", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "32d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor3', virtual: true,},
    {accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test4", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "42d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor4', virtual: true,},
    {accounts: [], aliases: [], description: null, deviceTags: [], firmwareInfo: null, lastRequestDatetime: "2023-05-24 07:54:48Z", model: null, name: "test5", provide: "U", type: "VOIP_MOBILE_PHONE", uuid: "52d22cda-105c-4b56-9f44-075f7c82547b", vendor: 'test vendor5', virtual: true,},
]

/** data from table and config data column================================================*/



function Tables() {

    const [dataMainTable, setDataMainTable] = useState<RowType[]>()
    const [allChipsMainTable, setAllChipsMainTable] = useState<{ detail: string, value: string }[]>([])
    const [selectedRows, setSelectedRows] = useState<string[]>([])

    const [dataSelectTable, setDataSelectTable] = useState<RowType[]>()
    const [allChipsSelectTable, setAllChipsSelectTable] = useState<{ detail: string, value: string }[]>([])
    const [filterSelectTableData, setFilterSelectTableData] = useState<{[key: string]: string}>({})
    const [viewsSelectTable, setViewsSelectTable] = useState<RowType[]>()

    useEffect((): void => {
        generateMainData()
    }, [])

    const generateMainData = (): void => {
        setDataMainTable(rowsTest)
    }


    /** GLOBAL function=======================================================================*/
    const generateDataForFiltered = (data: { detail: string, value: string }[], table: string): void => {
        const result = {} as any
        for (let i = 0; i < data.length; i += 2) {
            const key = data[i].value
            const value = data[i + 1].value
            result[key] = value
        }
        setFilterSelectTableData(result)
    }
    /** cортировка Select таблицы*/
    useMemo(() => {
        let afterFilterDataSelectTable: RowType[] = []
        if (Object.keys(filterSelectTableData).length > 0) {
            for (let [key, value] of Object.entries(filterSelectTableData)) {
                // @ts-ignore
                afterFilterDataSelectTable = dataSelectTable!.filter((itemRow: RowType) => itemRow[key]?.includes(value))
            }
        } else {
            afterFilterDataSelectTable = dataSelectTable!
        }
        setViewsSelectTable(afterFilterDataSelectTable)
    }, [filterSelectTableData, selectedRows])
    /** GLOBAL function=======================================================================*/


    /** MAIN table function=====================================================================*/
    /** change checkbox*/
    function handleSelectionModelChange(arrSelectRow: any[]): void {
        setSelectedRows(arrSelectRow)
        if (dataMainTable) {
            const selectedRows: RowType[] = dataMainTable.filter((row: RowType) => arrSelectRow.includes(row.uuid))
            setDataSelectTable(selectedRows)
        }
    }
    function deleteCheckboxFromSelectTable(itemRow: string[]): void {
        if (dataMainTable) {
            const selectedRowsNew: string[] = selectedRows.filter((uuid: string) => !itemRow.includes(uuid))
            handleSelectionModelChange(selectedRowsNew)
        }
    }
    // /** paginator change*/
    // function handlePageChangeMainTable(params: { page: number, pageSize: number }): void {
    //     // console.log(params)
    // }
    /** event and options for autocomplete*/
    const [virtualSelectValue, setVirtualSelectValue] = useState<string | null>('')

    const defaultPropsAutocompleteMainTable = {
        options: (allChipsMainTable.slice(-1)[0]?.detail === 'tag') ? [] : FOR_FILTER_MAIN_TABLE,
        getOptionLabel: (option: string) => option,
        value: virtualSelectValue,
    }

    const changeAutocompleteMainTable = (event: any): void => {
        /** делаем асинхронно, чтобы выбранный чипс из селекта успел встать в инпут*/
        setTimeout(() => {
            const inputData: string = event.target.value
            if (inputData) {
                /** functionality for serial saving chips and tags*/
                if (FOR_FILTER_MAIN_TABLE.includes(inputData) && !(allChipsMainTable.slice(-1)[0])) {
                    setAllChipsMainTable([...allChipsMainTable, {detail: 'tag', value: inputData}])
                    /** удаляем значение из общего массива чтобы не отображать элемент в Селекте*/
                    FOR_FILTER_MAIN_TABLE = FOR_FILTER_MAIN_TABLE.filter((item) => item !== inputData)
                } else if (allChipsMainTable.slice(-1)[0]?.detail === 'tag') {
                    setAllChipsMainTable([...allChipsMainTable, {detail: 'chip', value: inputData}])
                } else if (allChipsMainTable.slice(-1)[0]?.detail === 'chip' && FOR_FILTER_MAIN_TABLE.includes(inputData)) {
                    setAllChipsMainTable([...allChipsMainTable, {detail: 'tag', value: inputData}])
                    /** удаляем значение из общего массива чтобы не отображать элемент в Селекте*/
                    FOR_FILTER_MAIN_TABLE = FOR_FILTER_MAIN_TABLE.filter((item) => item !== inputData)
                }
                event.target.value = ''
                setVirtualSelectValue('')
            }
        }, 100)
    }
    /** event and options for chips*/
    const handleDeleteMainTable = (deleteChip: { detail: string, value: string }, indexElement: number): void => {
        const allElementsAfterDelete = [...allChipsMainTable]
        if (deleteChip.detail === 'chip') {
            /** добавление элементом назад в массив*/
            FOR_FILTER_MAIN_TABLE.push(allElementsAfterDelete[indexElement - 1].value)
            allElementsAfterDelete.splice((indexElement - 1), 2)
        } else if (deleteChip.detail === 'tag') {
            /** добавление элементом назад в массив*/
            FOR_FILTER_MAIN_TABLE.push(deleteChip.value)
            allElementsAfterDelete.splice(indexElement, 1)
        }
        setAllChipsMainTable(allElementsAfterDelete)
        setTimeout(() => {
            const test: any = document.querySelector('.main_table input')
            test.value = ''
        })
    }
    const generateChipsMainTable = allChipsMainTable.map((itemChips: { detail: string, value: string }, index: number) => {
        if (itemChips.detail === 'tag') {
            return (
                <Chip key={index} label={itemChips.value}
                      style={allChipsMainTable.length > index + 1
                          ? customStyle.tagSplice
                          : customStyle.tagOnce}
                      onDelete={allChipsMainTable.length > index + 1 ? undefined : () => handleDeleteMainTable(itemChips, index)}
                />
            )
        } else {
            return (
                <Chip key={index} label={itemChips.value}
                      style={customStyle.chip}
                      onDelete={() => handleDeleteMainTable(itemChips, index)}
                />
            )
        }
    })
    /** MAIN table function=====================================================================*/


    /** SELECT table function===================================================================*/
    // /** paginator change*/
    // function handlePageChangeSelectTable(params: { page: number, pageSize: number }): void {
    //     // console.log(params)
    // }
    // /** event and options for autocomplete*/
    // const defaultPropsAutocompleteSelectTable = {
    //     options: (allChipsSelectTable.slice(-1)[0]?.detail === 'tag') ? [] : FOR_FILTER_SELECT_TABLE,
    //     getOptionLabel: (option: string) => option,
    // }
    // const changeAutocompleteSelectTable = (event: any): void => {
    //     /** делаем асинхронно, чтобы выбранный чипс из селекта успел встать в инпут*/
    //     setTimeout(() => {
    //         const inputData: string = event.target.value
    //         if (inputData) {
    //             /** functionality for serial saving chips and tags*/
    //             if (FOR_FILTER_SELECT_TABLE.includes(inputData) && !(allChipsSelectTable.slice(-1)[0])) {
    //                 setAllChipsSelectTable([...allChipsSelectTable, {detail: 'tag', value: inputData}])
    //                 event.target.value = ''
    //                 /** удаляем значение из общего массива чтобы не отображать элемент в Селекте*/
    //                 FOR_FILTER_SELECT_TABLE = FOR_FILTER_SELECT_TABLE.filter((item) => item !== inputData)
    //             } else if (allChipsSelectTable.slice(-1)[0]?.detail === 'tag') {
    //                 setAllChipsSelectTable([...allChipsSelectTable, {detail: 'chip', value: inputData}])
    //                 event.target.value = ''
    //                 generateDataForFiltered([...allChipsSelectTable, {detail: 'chip', value: inputData}], 'select') /** фильтруем таблицу*/
    //             } else if (allChipsSelectTable.slice(-1)[0]?.detail === 'chip' && FOR_FILTER_SELECT_TABLE.includes(inputData)) {
    //                 setAllChipsSelectTable([...allChipsSelectTable, {detail: 'tag', value: inputData}])
    //                 event.target.value = ''
    //                 /** удаляем значение из общего массива чтобы не отображать элемент в Селекте*/
    //                 FOR_FILTER_SELECT_TABLE = FOR_FILTER_SELECT_TABLE.filter((item) => item !== inputData)
    //             }
    //         }
    //     }, 100)
    // }
    // /** event and options for chips*/
    // const handleDeleteSelectTable = (deleteChip: { detail: string, value: string }, indexElement: number): void => {
    //     const allElementsAfterDelete = [...allChipsSelectTable]
    //     if (deleteChip.detail === 'chip') {
    //         /** добавление элементом назад в массив*/
    //         FOR_FILTER_SELECT_TABLE.push(allElementsAfterDelete[indexElement - 1].value)
    //         allElementsAfterDelete.splice((indexElement - 1), 2)
    //         generateDataForFiltered(allElementsAfterDelete, 'select') /** фильтруем таблицу*/
    //     } else if (deleteChip.detail === 'tag') {
    //         /** добавление элементом назад в массив*/
    //         FOR_FILTER_SELECT_TABLE.push(deleteChip.value)
    //         allElementsAfterDelete.splice(indexElement, 1)
    //     }
    //     setAllChipsSelectTable(allElementsAfterDelete)
    //     setTimeout(() => {
    //         const test: any = document.querySelector('.select_table input')
    //         test.value = ''
    //     })
    // }
    // const generateChipsSelectTable = allChipsSelectTable.map((itemChips: { detail: string, value: string }, index: number) => {
    //     if (itemChips.detail === 'tag') {
    //         return (
    //             <Chip key={index} label={itemChips.value}
    //                   style={allChipsSelectTable.length > index + 1
    //                       ? customStyle.tagSplice
    //                       : customStyle.tagOnce}
    //                   onDelete={allChipsSelectTable.length > index + 1 ? undefined : () => handleDeleteSelectTable(itemChips, index)}
    //             />
    //         )
    //     } else {
    //         return (
    //             <Chip key={index} label={itemChips.value}
    //                   style={customStyle.chip}
    //                   onDelete={() => handleDeleteSelectTable(itemChips, index)}
    //             />
    //         )
    //     }
    // })
    /** SELECT table function===================================================================*/



    /** paginator change*/
    // function onShowSizeChange(current: number, pageSize: number): void {
    //     // console.log(current);
    //     // console.log(pageSize);
    // }
    function onChange(current: number, pageSize: number): void {
        console.log("onChange:current=", current);
        console.log("onChange:pageSize=", pageSize);
    }


    function test2 (test: any) {
        console.log(test)
    }


    return (
        <div className="App">


            <div className="main_table">
                {/** filter table allData*/}
                <div style={customStyle.filter}>
                    <div style={customStyle.chips}>
                        {generateChipsMainTable}
                    </div>
                    <div style={customStyle.autocomplete}>
                        <Autocomplete
                            onOpen={(e) =>setVirtualSelectValue(null)}
                            {...defaultPropsAutocompleteMainTable}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <TextField {...params} label="Поиск" variant="standard" />
                            )}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') changeAutocompleteMainTable(e)
                            }}
                        />
                    </div>
                </div>
                {/** table with all data*/}
                <div style={customStyle.table}>
                    {dataMainTable && <DataGrid
                        getRowId={(row) => row.uuid}
                        rows={dataMainTable} columns={columnsConfigMain}
                        hideFooterPagination={true}
                        disableColumnFilter={true}

                        checkboxSelection
                        rowSelectionModel={selectedRows}
                        onRowSelectionModelChange={handleSelectionModelChange}
                    />}

                    {dataMainTable && <>
                        <Pagination
                            className="ant-pagination"
                            defaultCurrent={3} //active page number
                            total={450} //count all elements
                            locale={localePagination}
                            pageSize={10}
                            pageSizeOptions={[10, 25, 50]} //page sizer
                            // onShowSizeChange={onShowSizeChange} //change page-size
                            onChange={onChange} //change all
                        />
                    </>}
                </div>
            </div>



            <div className="select_table">
                {/** table with select data*/}
                <div style={customStyle.table}>
                    {viewsSelectTable && viewsSelectTable.length > 0 && <DataGrid
                        getRowId={(row) => row.uuid}
                        rows={viewsSelectTable} columns={columnsConfigSelect}

                        disableRowSelectionOnClick={true}
                        disableColumnFilter={true}
                        hideFooterPagination={true}

                        onCellClick={(params: GridCellParams): void => {
                            if (params.field === 'remove') {
                                const clickedRow = params.row.uuid
                                deleteCheckboxFromSelectTable([clickedRow])
                            }
                        }}
                        onColumnHeaderClick={(param: GridColumnHeaderParams<GridValidRowModel, any, any>): void => {
                            if (param.field === 'remove') deleteCheckboxFromSelectTable(selectedRows)
                        }}
                    />}
                </div>
                {viewsSelectTable && viewsSelectTable.length > 0 && <div style={customStyle.btnGroup}>
                    <Button variant="contained">Применить</Button>
                </div>}
            </div>


            <style>{customStyleMaterial}</style>
        </div>
    )
}
export default Tables
