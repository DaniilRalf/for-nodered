import React, {useEffect} from 'react'
import {Table} from "antd";
import Settings, {ColumnCustomType} from "./settings";
import type { TableColumnsType } from 'antd';
import {testData} from "./data";

const COLUMNS_SETTINGS_DEFAULT: {hidden: false, ellipsis: true} = {
    hidden: false,
    ellipsis: true,
}

const COLUMNS_SETTINGS: TableColumnsType = [
    {
        title: 'UUID',
        dataIndex: 'uuid',
        key: '0',
        ...COLUMNS_SETTINGS_DEFAULT
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: '1',
        ...COLUMNS_SETTINGS_DEFAULT
    },
    {
        title: 'Vendor',
        dataIndex: 'vendor',
        key: '2',
        ...COLUMNS_SETTINGS_DEFAULT
    },
    {
        title: 'Mac',
        dataIndex: 'mac',
        key: '3',
        ...COLUMNS_SETTINGS_DEFAULT
    },
]

const TableTest = () => {

    const [columnsSettings, setColumnsSettings] = React.useState<TableColumnsType>([])

    const [dataTable, setTableData] = React.useState<any>([])

    /** Первичная загрузка данных, реализовать тут запросы к АПИ*/
    useEffect(() => {
        setColumnsSettings(COLUMNS_SETTINGS)
        /** Добавляем ключи для корректной генерации компонента */
        setTableData(testData.map((device, index: number) => ({...device, key: `${index}`})))
    }, [])

    return (
        <div>
            <Settings columns={columnsSettings as ColumnCustomType[]} />
            <Table dataSource={dataTable} columns={columnsSettings} size={'small'} />
        </div>
    )
}

export default TableTest