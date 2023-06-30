import React, { ReactElement, useEffect, useState } from 'react'
// import {MyWindow} from '../../nodes/shared/types'
// import {useTranslation} from 'react-i18next'
import { Select } from 'antd'
import { Button } from 'antd'
import { Space, Spin } from 'antd'
import { PlusOutlined, DeleteOutlined, TagOutlined } from '@ant-design/icons'
import { serverLogic } from "./server_logic";

// const i18nMessagePrefix = 'vendor_routing.'

/** TYPES==================================================================================*/
interface ModelListInterface { value: string, label: string, }
interface QuantityModelInterface { index: number, value: string, }
enum AllPropertyEnum {Model = 'model', Vendor = 'vendor'}
/** TYPES==================================================================================*/

/** STYLES=================================================================================*/
const customStyleMaterial = `
        .main {
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
        
           ::-webkit-scrollbar {
                width: 7px;
                height: 7px;
            }
           ::-webkit-scrollbar-track {
                -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
                background-color: #f9f9fd;
                border-radius: 10px;
           }
           ::-webkit-scrollbar-thumb {
                background-color: #4398dd;
                border-radius: 10px;
           }
           .main-preloader {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
           }
           .main-select {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                margin-right: 35px;
                
           }
        }
    `
const customStyle = {
    selectList: {
        display: 'flex',
        // eslint-disable-next-line @typescript-eslint/prefer-as-const
        flexDirection: 'column' as 'column',
        paddingRight: '10px',
        maxHeight: '660px',
        // eslint-disable-next-line @typescript-eslint/prefer-as-const
        overflowY: 'auto' as 'auto'
    },
    selectBlock: {
        display: 'flex',
        // eslint-disable-next-line @typescript-eslint/prefer-as-const
        flexDirection: 'row' as 'row',
        alignItems: 'center',
        marginBottom: '10px',
    },
    selectItem: {
        width: '100%',
        marginRight: '10px'
    },
    addModelBtn: {
        marginBottom: '10px'
    }
}
/** STYLES=================================================================================*/


const DeviceForm = (_props: any): JSX.Element => {

    // const [_t] = useTranslation()

    const allProperty: ModelListInterface[] = [{value: AllPropertyEnum.Model, label: AllPropertyEnum.Model},
        {value: AllPropertyEnum.Vendor, label: AllPropertyEnum.Vendor},]
    const [activeProperty, setActiveProperty] = useState<AllPropertyEnum>()

    const [viewList, setViewList] = useState<ModelListInterface[]>([])
    const [forSelectList, setForSelectList] = useState<ModelListInterface[]>([])
    const [selectedList, setSelectedList] = useState<QuantityModelInterface[]>([])

    const [preloader, setPreloader] = useState<boolean>(false)

    /** GLOBAL FUNCTION===================================================================*/
        /** подтягиваем сохраненные данные из ноды*/
        useEffect((): void => {
            //TODO: вот на этом моменте делаем запрос и получаем все модели, но перед этим подтягиваем все данные из сохраненой ноды

            // const propertyType: string = 'model'
            // const propertyList: QuantityModelInterface[] = [
            //     {index: 1688011764336, value: 'test1'},
            //     {index: 1688011766336, value: 'test0'},
            //     {index: 1688011769496, value: 'test3'},
            // ]
            // if (propertyType && propertyList) {
            //     setActiveProperty(propertyType as AllPropertyEnum)
            //     setTimeout(() => setSelectedList(propertyList))
            //     /** удаляем эоементы из списка*/
            //     setTimeout((): void => {
            //         propertyList.forEach((value: QuantityModelInterface): void => {
            //             setForSelectList(prevList => prevList.filter(item => item.value !== value.value));
            //         })
            //     })
            // }
            serverLogic()
        }, [])

        /** каждый раз при изменении выбранного свойства для роутинга запрашиваем список данных*/
        useEffect(() => {
            if (activeProperty === AllPropertyEnum.Vendor) {
                setSelectedList([{index: Date.parse(new Date().toISOString()), value: ''}])
                const testList: ModelListInterface[] = [
                    {value: 'test0', label: 'test0'},
                    {value: 'test1', label: 'test1'},
                    {value: 'test2', label: 'test2'},
                    {value: 'test3', label: 'test3'},
                    {value: 'test4', label: 'test4'},
                ]
                setForSelectList(testList)
                setViewList(testList)
            } else if (activeProperty === AllPropertyEnum.Model) {
                setSelectedList([{index: Date.parse(new Date().toISOString()), value: ''}])
                const testList: ModelListInterface[] = [
                    {value: 'test0', label: 'test0'},
                    {value: 'test1', label: 'test1'},
                    {value: 'test2', label: 'test2'},
                    {value: 'test3', label: 'test3'},
                    {value: 'test4', label: 'test4'},
                ]
                setForSelectList(testList)
                setViewList(testList)
            }
        }, [activeProperty])

        /** формируем лист свойств для формирования выхов*/
        useEffect((): void => {
            const sortQuantityModel = selectedList.filter((itemModel: QuantityModelInterface) => !!itemModel.value)
            //TODO: вот на этом моменте отсортировали все елементы которые не содержат value и сохранять в глобальную область видимости
            //console.log(sortQuantityModel)
        }, [selectedList])
    /** GLOBAL FUNCTION===================================================================*/

    /** ACTIVE PROPERTY===================================================================*/
        const changeActiveProperty = (value: AllPropertyEnum, _option: any): void => {
            setActiveProperty(value)
        }
    /** ACTIVE PROPERTY===================================================================*/

    /** SELECT LIST=======================================================================*/
        const onAddModel = (): void => {
            setSelectedList([...selectedList, {index: Date.parse(new Date().toISOString()), value: ''}])
        }
        const onRemoveModel = (elem: number, value: any): void => {
            const newArray = [...selectedList].filter((item: any) => item.index !== elem )
            setSelectedList(newArray)
            /** добавляем элементы в список*/
            // setForSelectList([...forSelectList, {value: value, label: value}])
            setViewList([...viewList, {value: value, label: value}])
        }
        const changeSelects = (value: any, option: any, index: number): void => {
            const newArray = selectedList.map(item => {
                if (item.index === index) {
                    item.value = option.value
                }
                return item
            })
            setSelectedList(newArray)
            /** удаляем эоементы из списка*/
            // setForSelectList(prevList => prevList.filter(item => item.value !== value));

            const newArr = forSelectList.filter(obj => {
                    const count = selectedList.filter(item => item.value === obj.value).length;
                    return count === 0;
            })
            setViewList(newArr)
            // console.log('-----------------------------------')
            // console.log(newArr)
            // console.log('-----------------------------------')
        }
        const checkDisableBtn = (): boolean => {
            return !((selectedList.length > 0 && selectedList[selectedList.length - 1].value) || selectedList.length === 0);
        }
    /** SELECT LIST=======================================================================*/


    const constructSelectList = (): ReactElement => {
        const construct: JSX.Element[] = selectedList.map((item: QuantityModelInterface, index: number) => {
            return <div style={customStyle.selectBlock} key={item.index}>
                <Select style={customStyle.selectItem}
                        showSearch placeholder="Выберите модель"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={viewList}
                        onChange={(value, option) => changeSelects(value, option, item.index)}
                        value={selectedList[index].value}
                /><DeleteOutlined rev="true" onClick={() => onRemoveModel(item.index, item.value)}/>
            </div>
        })
        return (
            <div style={customStyle.selectList}>
                {construct}
            </div>
        )
    }


    // TODO: добавить переводя во всю верстку в том числе и в лейблы
    return (
        <div className="main">
            <div className="main-select">
                <div className="main-select-desc">
                    <TagOutlined rev="true"/><div style={{display: "inline-block", marginLeft: '7px'}}>Модель</div>
                </div>
                <Select
                    showSearch style={{ width: 350 }}
                    placeholder="Выберите свойства для роутинга" optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={allProperty}
                    onChange={(value, option) => changeActiveProperty(value, option)}
                    value={activeProperty}
                />
            </div>
            {!activeProperty && preloader && <div className="main-preloader">
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>}
            {activeProperty && <div className="main-body">
                {constructSelectList()}
                <Button  style={customStyle.addModelBtn} icon={<PlusOutlined rev="true"/>}
                         type="primary" shape="round" size={'large'}
                         onClick={() => onAddModel()}
                         disabled={checkDisableBtn()}
                >Добавить {activeProperty}</Button>
            </div>}
            <style>{customStyleMaterial}</style>
        </div>
    )
}
export default DeviceForm;
