import React, {ReactElement, useEffect, useState} from 'react'
import { Select } from "antd"
import { Button } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'

function Selects() {

    //TODO: подготовить переводы

    const customStyleMaterial = `
        .main {
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
        }
    `

    const customStyle = {
        selectList: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            paddingRight: '10px',
            maxHeight: '660px',
            overflowY: 'auto' as 'auto'
        },
        selectBlock: {
            display: 'flex',
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

    const modelsList = [
            {value: 'test0', label: 'test0'},
            {value: 'test1', label: 'test1'},
            {value: 'test2', label: 'test2'},
            {value: 'test3', label: 'test3'},
            {value: 'test4', label: 'test4'},
    ]

    //TODO: create types
    const [quantityModel, setQuantityModel] = useState<any[]>([])
    // const [quantityModel, setQuantityModel] = useState<any[]>([{index: Date.parse(new Date().toISOString()), value: ''}])

    useEffect(() => {
        console.log(quantityModel)
        //TODO: вот на этом моменте отсортировать все елементы которые не содержат value и сохранять в глобальную область видимости
    }, [quantityModel])









    const changeSelects = (_value: any, option: any, index: any): void => {
        const newArray = quantityModel.map(item => {
            if (item.index === index) {
                item.value = option.value
            }
            return item
        })
        setQuantityModel(newArray)
    }
    const onAddModel = (): void => {
        setQuantityModel([...quantityModel, {index: Date.parse(new Date().toISOString()), value: ''}])
    }
    const onRemoveModel = (elem: number) => {
        const newArray = [...quantityModel].filter((item: any) => item.index !== elem )
        setQuantityModel(newArray)
    }


    //TODO: добавить типизацию
    const constructSelectList = (): ReactElement => {
        const construct = quantityModel.map((item: any) => {
            return <div style={customStyle.selectBlock} key={item.index}>
                <Select style={customStyle.selectItem}
                        showSearch placeholder="Выберите модель"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={modelsList}
                        onChange={(value: any, option: any) => changeSelects(value, option, item.index)}
                /><CloseOutlined onClick={() => onRemoveModel(item.index)}/>
            </div>
        })
        return (
            <div style={customStyle.selectList}>
                {construct}
            </div>
        )
    }


    return (
        <div className="main">
            <Button  style={customStyle.addModelBtn} icon={<PlusOutlined />}
                     type="primary" shape="round" size={'large'}
                     onClick={() => onAddModel()}
            >Добавить модель</Button>
            {constructSelectList()}
            <style>{customStyleMaterial}</style>
        </div>
    )
}
export default Selects
