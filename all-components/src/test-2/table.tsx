import React, {useCallback, useEffect, useState} from 'react'
import {Checkbox, Table} from "antd"
import Settings from "./settings"
import type { CheckboxChangeEvent, TableColumnsType } from 'antd'
import {ColumnCustomType, COLUMNS_SETTINGS, testData} from "./data"

const TableTest = () => {

    /** Конфигурация колонок */
    const [columnsSettings, setColumnsSettings] = React.useState<TableColumnsType>([])

    /** Данные для главной таблицы */
    const [dataTable, setDataTable] = React.useState<any>([])
    const [dataTableSecond, setDataTableSecond] = React.useState<any>([])

    /** Выбранные строки главной таблицы */
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    /** Первичная загрузка данных, реализовать тут запросы к АПИ*/
    useEffect(() => {
        setColumnsSettings(COLUMNS_SETTINGS)
        /** Добавляем ключи для корректной генерации компонента */
        setDataTable(testData.map((device, index: number) => ({...device, key: `${device.uuid}`})))
    }, [])

    /**
     * ГЛАВНАЯ ТАБЛИЦА
     * Метод для генерации и управления чекбоксами
     * */
    const testtest = (checked: boolean, record: any, _index: number, _originNode: React.ReactNode): React.ReactNode => {
        // Определяем, выбран ли данный элемент
        const isSelected = selectedRowKeys.includes(record.key)
        // Обработчик изменения состояния чекбокса
        const onCheckboxChange = (e: CheckboxChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                // Добавляем ключ строки в список выбранных
                setSelectedRowKeys([...selectedRowKeys, record.key])

                setDataTableSecond((prevData: any) => ([...prevData, record]))
            } else {
                // Убираем ключ строки из списка выбранных
                setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.key))

                setDataTableSecond((prevData: any) => prevData.filter((device: any) => device.uuid !== record.key))
            }
        }
        return (
            <Checkbox
                checked={isSelected}
                onChange={onCheckboxChange}
            />
        )
    }

    /**
     * ГЛАВНАЯ ТАБЛИЦА
     * Метод для изменения положения колонок
     * */
    const onChangeColumn = useCallback((column: ColumnCustomType[]) => {
        setColumnsSettings(column)
    }, [])

    return (
        <div>
            <Settings columns={columnsSettings as ColumnCustomType[]} onChangeColumn={onChangeColumn}/>
            <div style={{border: '1px solid grey', borderRadius: '10px', margin: '20px 0 20px 0'}}>
                <Table
                    dataSource={dataTable}
                    columns={columnsSettings}
                    size={'small'}
                
                    rowSelection={{selectedRowKeys, renderCell: testtest}}
                    pagination={{position: ['bottomCenter']}}
                />
            </div>
            <div style={{border: '1px solid grey', borderRadius: '10px', margin: '20px 0 20px 0'}}>
                <Table
                    dataSource={dataTableSecond}
                    columns={columnsSettings}
                    size={'small'}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default TableTest
