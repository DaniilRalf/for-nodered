import React, {ReactElement, useEffect, useState} from 'react'
import { Select } from "antd"
import { Button } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'

function Selects() {

    //TODO: подготовить переводы

    const customStyle = {
        selectList: {
            display: 'flex',
            flexDirection: 'column' as 'column',
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
        <div className="selects">
            <Button  style={customStyle.addModelBtn} icon={<PlusOutlined />}
                     type="primary" shape="round" size={'large'}
                     onClick={() => onAddModel()}
            >Добавить модель</Button>
            {constructSelectList()}
        </div>
    )
}
export default Selects
