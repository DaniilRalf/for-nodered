import React, {useEffect, useState} from "react"
import {Button, Select} from "antd"
import {DeleteOutlined, PlusOutlined, TagOutlined} from "@ant-design/icons"
import {customStyleMaterial} from "./assets/styles"
import {CloseOutlined} from "@material-ui/icons";

//TODO: может ли одно и то-же свойство быть присвоено нескольким выходам

// TODO: перенести енам в основной файл с типами
enum AllPropertyEnum {Model = 'model', Vendor = 'vendor'}

// TODO: соответствует RoutingGroupPropertyList
interface RoutingGroupInterface {
    index: number,
    valueList: string[]
}
interface ModelListInterface { value: string, label: string, }

const RoutingGroupComponent = (_props: any): JSX.Element =>  {

    /** All types for this node */
    const allProperty: ModelListInterface[] = [
        {value: AllPropertyEnum.Model, label: AllPropertyEnum.Model},
        {value: AllPropertyEnum.Vendor, label: AllPropertyEnum.Vendor},
    ]

    /** Active type this node */
    const [activeProperty, setActiveProperty] = useState<AllPropertyEnum>(AllPropertyEnum.Model)

    /** Active outputs groups */
    const [groupsOutputsList, setGroupsOutputsList] = useState<RoutingGroupInterface[]>([])




    useEffect((): void => {
        // TODO: на этом месте подставить данные из пропса, или пустой массив
        const test = [
            {index: 213123123, valueList: ['zsadfsdf', 'asdavzxsd', 'asdasddev']},
            {index: 214523123, valueList: ['zsadfsdf']},
        ]
        setGroupsOutputsList(test)
    }, [])

    const changeActiveProperty = (value: AllPropertyEnum, _option: ModelListInterface | ModelListInterface[]): void => {
        setActiveProperty(value)
        setGroupsOutputsList([])
    }

    const addNewOutputsGroup = (): void => {
        const newGroupsOutputsList: RoutingGroupInterface[] = [...groupsOutputsList, {index: Date.parse(new Date().toISOString()), valueList: []}]
        setGroupsOutputsList(newGroupsOutputsList)
    }

    const removeOutputsGroup = (indexGroup: number): void => {
        const newGroupsOutputsList: RoutingGroupInterface[] = [...groupsOutputsList]
        newGroupsOutputsList.splice(indexGroup, 1)
        setGroupsOutputsList(newGroupsOutputsList)
    }





    const constructOutputGroupItemsList = (item: string[]): JSX.Element[] => {
        return item.map((elem: string) => {
            return (
                <div className="outputs-item">
                    <Select className="select"
                            showSearch
                            placeholder="Выберите модель"
                            optionFilterProp="children"
                            value={elem}
                            // filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            // filterSort={(optionA, optionB) =>
                            //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            // }
                            // options={viewList}
                            // onChange={(value, option) => changeSelects(value, option, item.index)}
                            // value={selectedList[index].value}
                    /><DeleteOutlined rev="true"
                                      // onClick={() => onRemoveModel(item.index, item.value)}
                        />
                </div>
            )
        })
    }

    const constructOutputsGroupsList: JSX.Element[] = groupsOutputsList.map((element: RoutingGroupInterface, index: number) => {
        return (
            <div className="main-outputs-item" key={index}>
                <div className="line">
                    <div className="number">выход №{index + 1}</div>
                    <hr/>
                    <CloseOutlined className="close"
                                   onClick={() => removeOutputsGroup(index)}
                    />
                </div>
                <div className="outputs">
                    {constructOutputGroupItemsList(element.valueList || [])}
                </div>
                <div className="btn">
                    <Button icon={<PlusOutlined rev="true"/>}
                            type="primary" shape="round" size={'large'}
                            // onClick={addNewOutputsGroup}
                        // TODO: translate
                    >Добавить {activeProperty}</Button>
                </div>
            </div>
        )
    })

    return (
        <div className="main">

            {/** Select-input======================================== */}
            <div className="main-select">
                <div className="main-select-desc">
                    <TagOutlined className="icon" rev="true" />
                    {/*TODO: translate*/}
                    <div className="text">Тип</div>
                </div>
                <Select
                    className="main-select-input"
                    showSearch optionFilterProp="children"
                    // TODO: translate
                    placeholder="Выберите свойства для роутинга"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={allProperty}
                    value={activeProperty}
                    onChange={(value, option) => changeActiveProperty(value, option)}
                />
            </div>

            {/** Add-outputs-btn ==================================== */}
            <div className="main-add">
                <div className="main-add-output">
                    <Button icon={<PlusOutlined rev="true"/>}
                            type="primary" shape="round" size={'large'}
                            onClick={addNewOutputsGroup}
                    // TODO: translate
                    >Добавить выход</Button>
                </div>
            </div>

            {/** Outputs-block ====================================== */}
            <div className="main-outputs">
                {constructOutputsGroupsList}
            </div>

            <style>{customStyleMaterial}</style>
        </div>
    )
}

export default RoutingGroupComponent
