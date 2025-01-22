import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Table} from "antd"
import Settings, {ColumnCustomType} from "./settings"
import type { TableColumnsType } from 'antd'
import {testData} from "./data"

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
        ...COLUMNS_SETTINGS_DEFAULT,
        hidden: true
    },
    {
        title: 'Mac',
        dataIndex: 'mac',
        key: '3',
        ...COLUMNS_SETTINGS_DEFAULT
    },
]

const TableTest = () => {

    /** Конфигурация колонок */
    const [columnsSettings, setColumnsSettings] = React.useState<TableColumnsType>([])

    /** Данные для главной таблицы */
    const [dataTable, setTableData] = React.useState<any>([])

    /** Выбранные строки главной таблицы */
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    /** Первичная загрузка данных, реализовать тут запросы к АПИ*/
    useEffect(() => {
        setColumnsSettings(COLUMNS_SETTINGS)
        /** Добавляем ключи для корректной генерации компонента */
        setTableData(testData.map((device, index: number) => ({...device, key: `${device.uuid}`})))
    }, [])




    const dataTableSecond = useMemo(() => {
        dataTable.forEach((device: any, index: number) => {
            if (selectedRowKeys.includes(device.uuid)) {

            }
        })
        return dataTable
    }, [selectedRowKeys, dataTable])




    /**
     * ГЛАВНАЯ ТАБЛИЦА
     * Метод для изменения положения колонок
     * */
    const onChangeColumn = useCallback((column: ColumnCustomType[]) => {
        setColumnsSettings(column)
    }, [])

    /**
     * ГЛАВНАЯ ТАБЛИЦА
     * Метод для изменения чекбоксов
     * */
    const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }, [])

    return (
        <div>
            <Settings columns={columnsSettings as ColumnCustomType[]} onChangeColumn={onChangeColumn}/>
            <div style={{border: '1px solid grey', borderRadius: '10px', margin: '20px 0 20px 0'}}>
                <Table
                    dataSource={dataTable}
                    columns={columnsSettings}
                    size={'small'}
                    rowSelection={{selectedRowKeys, onChange: onSelectChange}}
                    pagination={{position: ['bottomCenter']}}
                />
            </div>
            <div style={{border: '1px solid grey', borderRadius: '10px', margin: '20px 0 20px 0'}}>
                <Table
                    dataSource={dataTableSecond}
                    columns={columnsSettings}
                    size={'small'}
                />
            </div>
        </div>
    )
}

export default TableTest
