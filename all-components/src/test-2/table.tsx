import React, {useCallback, useEffect, useState} from 'react'
import {Checkbox, Table} from "antd"
import Settings from "./settings"
import type { CheckboxChangeEvent, TableColumnsType } from 'antd'
import {ColumnCustomType, COLUMNS_SETTINGS, testData} from "./data"
import { DeleteOutline } from '@material-ui/icons'

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
     * Метод для генерации и управления чекбоксами в строках
     * */
    const renderCheckboxRowMainTable = (_checked: boolean, record: any, _index: number, _originNode: React.ReactNode): React.ReactNode => {
        /** Определяем, выбран ли данный элемент */
        const isSelected = selectedRowKeys.includes(record.key)
        /** Обработчик изменения состояния чекбокса */
        const onCheckboxChange = (e: CheckboxChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                /** Добавляем ключ строки в список выбранных */
                setSelectedRowKeys([...selectedRowKeys, record.key])
                /** Корректируем состав второй таблицы */    
                setDataTableSecond((prevData: any) => ([...prevData, record]))
            } else {
                /** Убираем ключ строки из списка выбранных */
                setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.key))
                /** Корректируем состав второй таблицы */
                setDataTableSecond((prevData: any) => prevData.filter((device: any) => device.uuid !== record.key))
            }
        }
        return <Checkbox checked={isSelected} onChange={onCheckboxChange} />
    }

    /**
     * ГЛАВНАЯ ТАБЛИЦА
     * Метод для изменения положения колонок
     * */
    const onChangeColumn = useCallback((column: ColumnCustomType[]) => {
        setColumnsSettings(column)
    }, [])

    /**
     * ВТОРОСТЕПЕННАЯ ТАБЛИЦА
     * Метод для генерации и управления чекбоксами в строках
     * */
    const renderCheckboxRowSecondTable = (_checked: boolean, record: any, _index: number, _originNode: React.ReactNode): React.ReactNode => {
        const onClickOnDelete = () => {
            setDataTableSecond((prevDara: any) => prevDara.filter((device: any) => device.key !== record.key))
            setSelectedRowKeys((prevDara: React.Key[]) => prevDara.filter((uuid: React.Key) => uuid !== record.key))
        } 
        return <div style={{cursor: 'pointer'}} onClick={onClickOnDelete}><DeleteOutline /></div>
    }

    /**
     * ВТОРОСТЕПЕННАЯ ТАБЛИЦА
     * Метод для генерации и управления чекбоксом в шапке
     * */
    const renderCheckboxHeaderSecondTable = (_originNode: React.ReactNode): React.ReactNode => {
        const onClickOnDelete = () => {
            setDataTableSecond([])
            setSelectedRowKeys([])
        } 
        return <div style={{cursor: 'pointer'}} onClick={onClickOnDelete}><DeleteOutline /></div>
    }

    return (
        <div>
            <Settings columns={columnsSettings as ColumnCustomType[]} onChangeColumn={onChangeColumn}/>
            <div style={{border: '1px solid grey', borderRadius: '10px', margin: '20px 0 20px 0'}}>
                <Table
                    dataSource={dataTable}
                    columns={columnsSettings}
                    size={'small'}
                    pagination={{position: ['bottomCenter']}}
                    rowSelection={{selectedRowKeys, renderCell: renderCheckboxRowMainTable}}
                />
            </div>
            <div style={{border: '1px solid grey', borderRadius: '10px', margin: '20px 0 20px 0'}}>
                <Table
                    dataSource={dataTableSecond}
                    columns={columnsSettings}
                    size={'small'}
                    pagination={false}
                    rowSelection={{renderCell: renderCheckboxRowSecondTable, columnTitle: renderCheckboxHeaderSecondTable}}
                />
            </div>
        </div>
    )
}

export default TableTest
